import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/corporate-balance/site-header"

export const metadata: Metadata = {
  title: "Book a Workplace Balance Consultation | TOHISANE",
  description:
    "A focused 30-minute conversation for HR leaders reviewing their Corporate Balance Index™ results.",
}

const bookingEmbedUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL
const contactEmail = "seren@tohisane.com"

const agenda = [
  "Your Corporate Balance Index™ results",
  "Your strongest organizational foundations",
  "Your most important workplace pressure points",
  "Two or three practical next steps",
]

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <SiteHeader action={{ label: "Take the assessment", href: "/corporate-balance-index" }} />

      <main>
        <section className="border-b border-[#173B2F]/10">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-24">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Complimentary consultation</p>
              <h1 className="mt-6 text-pretty text-5xl leading-none text-[#173B2F] md:text-6xl">
                Book a Workplace Balance Consultation.
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#173B2F]/70 md:text-xl">
                A focused conversation for HR leaders and organizational decision-makers who want to understand where
                workplace conditions are supporting health&mdash;and where they may be creating unnecessary strain.
              </p>
            </div>

            <aside className="rounded-[1.5rem] bg-[#EFE7DA] p-8 md:p-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A47D47]">30 minutes</span>
              <h2 className="mt-5 text-2xl leading-snug text-[#173B2F]">What we will cover</h2>
              <ul className="mt-8 flex flex-col">
                {agenda.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[#173B2F]/10 py-4 text-pretty leading-relaxed text-[#173B2F]/70 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
            {bookingEmbedUrl ? (
              <iframe
                src={bookingEmbedUrl}
                title="Schedule a Workplace Balance Consultation"
                className="h-[760px] w-full rounded-[1.5rem] border border-[#173B2F]/10 bg-[#EFE7DA]"
              />
            ) : (
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Request a time</p>
                <h2 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
                  Send a note and we will find a time that works.
                </h2>
                <p className="mt-8 text-pretty text-lg leading-relaxed text-[#173B2F]/70">
                  Include your organization and a few windows of availability. If you have completed the Corporate
                  Balance Index&trade;, mention your overall score so the conversation can start with your results.
                </p>
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent("Workplace Balance Consultation")}`}
                  className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#173B2F] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#F5F1E8] transition-colors hover:bg-[#0F2A22]"
                >
                  Request a consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
