import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { quizUrl, dimensions, trustPoints } from "./content"

function BalanceDial() {
  const total = dimensions.length
  const radius = 78
  const center = 100
  const gap = 5

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Dial divided into ${total} equal segments, one for each workplace dimension`}
    >
      {dimensions.map((_, index) => {
        const step = 360 / total
        const start = index * step + gap / 2 - 90
        const end = (index + 1) * step - gap / 2 - 90
        const toRad = (deg: number) => (deg * Math.PI) / 180
        const x1 = center + radius * Math.cos(toRad(start))
        const y1 = center + radius * Math.sin(toRad(start))
        const x2 = center + radius * Math.cos(toRad(end))
        const y2 = center + radius * Math.sin(toRad(end))

        return (
          <path
            key={index}
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
            fill="none"
            stroke="#A47D47"
            strokeWidth={index % 2 === 0 ? 6 : 2}
            strokeLinecap="butt"
            opacity={index % 2 === 0 ? 0.95 : 0.5}
          />
        )
      })}
    </svg>
  )
}

export function Hero() {
  return (
    <section id="top" className="border-b border-[#173B2F]/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-center lg:gap-20 lg:py-28">
        <div className="lg:flex-1">
          <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">
            The Corporate Balance Index&trade;
          </p>
          <h1 className="mt-8 text-pretty text-5xl font-normal leading-[1.05] tracking-tight text-[#173B2F] md:text-6xl lg:text-7xl">
            Is your workplace designed for health?
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#173B2F]/75 md:text-xl">
            Measure the health of your organization&mdash;not only the health of your
            employees. Discover the workplace conditions influencing resilience,
            engagement, recovery, and sustainable performance.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={quizUrl}
              className="group inline-flex items-center gap-3 rounded-full bg-[#173B2F] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#F5F1E8] transition-colors hover:bg-[#0F2B22]"
            >
              Begin the 5-minute assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#method"
              className="border-b border-[#A47D47]/40 pb-1 text-sm uppercase tracking-[0.16em] text-[#A47D47] transition-colors hover:border-[#A47D47]"
            >
              Explore the framework
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm tracking-[0.08em] text-[#173B2F]/55">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#A47D47]"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-[22rem]">
          <div className="rounded-[2rem] bg-[#173B2F] px-10 py-12 text-[#F5F1E8]">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#A47D47]">
              Organizational Balance
            </p>
            <div className="relative mx-auto mt-10 h-48 w-48">
              <BalanceDial />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl leading-none">8</span>
                <span className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-[#F5F1E8]/60">
                  dimensions
                </span>
              </div>
            </div>
            <p className="mt-10 text-pretty text-base leading-relaxed text-[#F5F1E8]/70">
              A structured view of the conditions that make health and performance
              easier to sustain.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
