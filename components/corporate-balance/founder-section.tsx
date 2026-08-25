import Image from "next/image"
import Link from "next/link"
import { bookingUrl } from "./content"

export function FounderSection() {
  return (
    <section className="border-b border-[#173B2F]/10">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center lg:gap-20 lg:py-28">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#EFE7DA]">
          <Image
            src="/images/restorative-workspace.png"
            alt="A quiet desk beside a window with a trailing plant, notebook, and ceramic cup in soft daylight"
            fill
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
            About the Founder
          </p>
          <h2 className="mt-6 text-4xl text-[#173B2F] md:text-5xl">
            Kathryn E. Arnold
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#173B2F]/50">
            Founder, TOHISANE &middot; Salutogenic Practitioner
          </p>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#173B2F]/70">
            Kathryn works with organizations to identify the conditions that support
            employee well-being, organizational clarity, and sustainable performance.
            Her approach brings together salutogenesis, communications, project
            leadership, and restorative workplace design.
          </p>
          <Link
            href={bookingUrl}
            className="mt-10 inline-block border-b border-[#A47D47]/40 pb-1 text-sm uppercase tracking-[0.16em] text-[#A47D47] transition-colors hover:border-[#A47D47]"
          >
            Schedule an introductory conversation
          </Link>
        </div>
      </div>
    </section>
  )
}
