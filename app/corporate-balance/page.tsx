import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/corporate-balance/hero"
import { DimensionsSection } from "@/components/corporate-balance/dimensions-section"
import { FounderSection } from "@/components/corporate-balance/founder-section"
import { benefits, quizUrl } from "@/components/corporate-balance/content"

export const metadata: Metadata = {
  title: "The Corporate Balance Index™ | TOHISANE",
  description:
    "A confidential five-minute assessment measuring the workplace conditions that influence resilience, engagement, recovery, and sustainable performance.",
}

export default function CorporateBalancePage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <header className="sticky top-0 z-20 border-b border-[#173B2F]/10 bg-[#F5F1E8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#top"
            className="text-lg tracking-[0.28em] text-[#173B2F]"
            aria-label="TOHISANE home"
          >
            TOHISANE
          </a>
          <Link
            href={quizUrl}
            className="text-xs uppercase tracking-[0.18em] text-[#A47D47] transition-colors hover:text-[#173B2F]"
          >
            Take the assessment
          </Link>
        </div>
      </header>

      <main>
        <Hero />

        <section className="border-b border-[#173B2F]/10">
          <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
            <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
              A Different Question
            </p>
            <h2 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
              Most wellness programs try to change employees.
            </h2>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-[#173B2F]/70 md:text-xl">
              Salutogenesis asks what creates health in the first place. The Corporate
              Balance Index&trade; helps leaders examine whether the workplace itself
              supports clarity, meaning, recovery, belonging, and the ability to manage
              everyday demands.
            </p>
          </div>
        </section>

        <section className="border-b border-[#173B2F]/10">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
                What You Receive
              </p>
              <h2 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
                A useful starting point&mdash;not another generic wellness score.
              </h2>
            </div>
            <ul className="flex flex-col justify-center">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="border-b border-[#173B2F]/10 py-6 text-pretty text-lg leading-relaxed text-[#173B2F]/75 first:pt-0 last:border-b-0 last:pb-0"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <DimensionsSection />

        <section className="border-b border-[#173B2F]/10">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="rounded-[2rem] bg-[#EFE7DA] px-8 py-14 md:px-16 md:py-20">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
                  Why Salutogenesis?
                </p>
                <h2 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
                  From managing illness to creating the conditions for health.
                </h2>
                <p className="mt-8 text-pretty text-lg leading-relaxed text-[#173B2F]/70 md:text-xl">
                  A salutogenic approach focuses on the resources that help people
                  understand demands, respond effectively, and find meaning in their
                  work. For organizations, that means looking carefully at systems,
                  leadership practices, communication, culture, and recovery&mdash;not
                  placing the full burden of wellness on individual employees.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FounderSection />

        <section className="bg-[#173B2F] text-[#F5F1E8]">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
            <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
              Begin With Insight
            </p>
            <h2 className="mt-6 text-pretty text-4xl leading-tight md:text-5xl">
              How well does your workplace support human health?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#F5F1E8]/70">
              Complete the confidential five-minute assessment and begin identifying
              the strengths and hidden pressure points within your organization.
            </p>
            <Link
              href={quizUrl}
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#F5F1E8] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#173B2F] transition-colors hover:bg-[#EFE7DA]"
            >
              Take the Corporate Balance Index&trade;
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#173B2F]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg tracking-[0.28em] text-[#173B2F]">TOHISANE</p>
            <p className="mt-2 text-[#173B2F]/60">
              Restorative organizational health.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[#173B2F]/60 sm:items-end">
            <span>&copy; {new Date().getFullYear()} TOHISANE</span>
            <a
              href="mailto:seren@tohisane.com"
              className="transition-colors hover:text-[#A47D47]"
            >
              seren@tohisane.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
