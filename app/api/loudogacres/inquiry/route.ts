import { NextResponse } from 'next/server';

const REQUEST_TYPES = [
  'Botanical enhancement',
  'Tractor & property service',
  'Landscape stewardship',
  'Bespoke landscaping',
  'Landscape consultation',
  'Contractor partnership',
] as const;

const LIMITS = { name: 100, email: 254, location: 150, estimate: 400, details: 4000 };
const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

// Best-effort per-instance limiter; serverless instances do not share this map.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  if (recentSubmissions.size > 5000) recentSubmissions.clear();
  return hits.length > RATE_MAX;
}

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LOUDOG_INQUIRY_TO_EMAIL || 'loudogacres@gmail.com';
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  const from =
    process.env.LOUDOG_INQUIRY_FROM_EMAIL ||
    (domain ? `Loudog Acres Website <inquiries@${domain}>` : 'Loudog Acres Website <onboarding@resend.dev>');

  if (!apiKey) {
    console.error('Loudog inquiry: RESEND_API_KEY is not configured.');
    return fail('Online inquiries are temporarily unavailable. Please try again later.', 503);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) return fail('Too many submissions. Please wait a few minutes and try again.', 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid submission.', 400);
  }

  // Honeypot and timing checks: report success to bots so they do not retry.
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (clean(body.company, 200) || !Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const location = clean(body.location, LIMITS.location);
  const estimate = clean(body.estimate, LIMITS.estimate);
  const details = clean(body.details, LIMITS.details);
  const requestType = clean(body.requestType, 60);

  if (name.length < 2) return fail('Please enter your name.', 400);
  if (!EMAIL_PATTERN.test(email)) return fail('Please enter a valid email address.', 400);
  if (!REQUEST_TYPES.includes(requestType as (typeof REQUEST_TYPES)[number])) return fail('Please choose a service.', 400);
  if (details.length < 10) return fail('Please share a few more details about your project.', 400);

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Location', location || 'Not provided'],
    ['Service', requestType],
    ['Selected estimate', estimate || 'Not selected'],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nProject details:\n${details}`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#26261f;max-width:600px">
<h2 style="font-family:Georgia,serif;font-weight:400;color:#1c2820;margin:0 0 16px">New Loudog Acres inquiry</h2>
<table style="border-collapse:collapse;width:100%;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #d6cbb9;color:#68745d;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 0;border-bottom:1px solid #d6cbb9">${escapeHtml(v)}</td></tr>`)
    .join('')}</table>
<h3 style="font-family:Georgia,serif;font-weight:400;margin:24px 0 8px">Project details</h3>
<p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(details)}</p>
</div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((address) => address.trim()).filter(Boolean),
        reply_to: email,
        subject: `Loudog Acres inquiry: ${requestType} — ${name}`.replace(/[\r\n]+/g, ' '),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Loudog inquiry: Resend rejected the email', response.status, await response.text());
      return fail('We could not send your message right now. Please try again shortly.', 502);
    }
  } catch (error) {
    console.error('Loudog inquiry: Resend request failed', error);
    return fail('We could not send your message right now. Please try again shortly.', 502);
  }

  return NextResponse.json({ ok: true });
}
