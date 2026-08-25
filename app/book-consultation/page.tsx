"use client";

import Link from "next/link";

export default function BookConsultationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8] px-6">
      <section className="w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white/90 p-12 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">TOHISANE</p>
          <h1 className="mt-4 text-4xl font-light tracking-wide text-black md:text-5xl">
            Book a Consultation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Personalized restorative protocols designed to support balance, calm, and intentional
            living through intelligent phyto-wellness and restorative care.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <a
            href="mailto:seren@tohisane.com?subject=TOHISANE Consultation Request"
            className="rounded-2xl bg-black px-8 py-5 text-center text-sm tracking-[0.15em] text-white transition hover:bg-neutral-800"
          >
            MESSAGE SEREN
          </a>
          <a
            href="tel:+14234639916"
            className="rounded-2xl border border-black px-8 py-5 text-center text-sm tracking-[0.15em] text-black transition hover:bg-neutral-100"
          >
            CALL +1 (423) 463-9916
          </a>
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-10 text-center">
          <p className="text-sm leading-relaxed text-neutral-500">
            We believe healing begins when people reconnect to themselves. In a world shaped by
            constant stimulation and modern exhaustion, TOHISANE creates personalized protocols
            designed to support balance, ease discomfort, and cultivate a calmer way of living.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-400 transition hover:text-neutral-600"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
