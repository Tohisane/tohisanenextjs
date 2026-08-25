"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  STORAGE_KEY,
  type Dimension,
  dimensions,
  recommendations,
  scoreBand,
} from "@/lib/assessment"

type StoredResult = {
  overall: number
  dimensionScores: Record<Dimension, number>
  respondent: { name: string; email: string; organization: string; role: string }
  completedAt: string
}

const CENTER = 130
const MIN_R = 34
const MAX_R = 122

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)]
}

/** Coxcomb segment: each dimension occupies 45deg, its radius encodes the score. */
function segmentPath(index: number, score: number) {
  const gap = 1.5
  const a1 = index * 45 + gap
  const a2 = (index + 1) * 45 - gap
  const r = MIN_R + (MAX_R - MIN_R) * (score / 100)
  const [x1, y1] = polar(a1, r)
  const [x2, y2] = polar(a2, r)
  const [ix2, iy2] = polar(a2, MIN_R)
  const [ix1, iy1] = polar(a1, MIN_R)
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A ${MIN_R} ${MIN_R} 0 0 0 ${ix1} ${iy1} Z`
}

export function ResultsDashboard() {
  const [result, setResult] = useState<StoredResult | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setResult(JSON.parse(stored))
      } catch {
        setResult(null)
      }
    }
    setLoaded(true)
  }, [])

  const ranked = useMemo(() => {
    if (!result) return []
    return dimensions
      .map((dimension) => ({ dimension, score: result.dimensionScores[dimension] }))
      .sort((a, b) => a.score - b.score)
  }, [result])

  if (!loaded) {
    return <div className="mx-auto max-w-6xl px-6 py-32" aria-busy="true" />
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">No results found</p>
        <h1 className="mt-6 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
          Complete the assessment to generate your report.
        </h1>
        <Link
          href="/corporate-balance-index"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#173B2F] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#F5F1E8] transition-colors hover:bg-[#0F2A22]"
        >
          Begin assessment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    )
  }

  const band = scoreBand(result.overall)
  const priorities = ranked.slice(0, 3)
  const strengths = [...ranked].reverse().slice(0, 2)

  return (
    <div>
      {/* Report header + coxcomb dial */}
      <section className="border-b border-[#173B2F]/10">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.1fr_auto] lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Corporate Balance Report&trade;</p>
            <h1 className="mt-6 text-pretty text-5xl leading-none text-[#173B2F] md:text-6xl">
              {result.respondent.organization}
            </h1>
            <p className="mt-5 text-lg text-[#173B2F]/60">
              Prepared for {result.respondent.name}
              {result.respondent.role ? ` · ${result.respondent.role}` : ""}
            </p>

            <div className="mt-12 flex items-end gap-5 border-t border-[#173B2F]/10 pt-10">
              <span className="text-7xl leading-none text-[#173B2F] md:text-8xl">{result.overall}</span>
              <span className="pb-2 text-xl text-[#173B2F]/40">/ 100</span>
            </div>
            <h2 className="mt-6 text-pretty text-2xl leading-snug text-[#173B2F] md:text-3xl">{band.title}</h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-[#173B2F]/65">{band.description}</p>
          </div>

          <div className="mx-auto">
            <svg viewBox="0 0 260 260" className="h-[260px] w-[260px]" role="img" aria-label="Dimension score dial">
              <circle cx={CENTER} cy={CENTER} r={MAX_R} fill="none" stroke="#173B2F" strokeOpacity="0.08" />
              <circle cx={CENTER} cy={CENTER} r={(MIN_R + MAX_R) / 2} fill="none" stroke="#173B2F" strokeOpacity="0.06" />
              {dimensions.map((dimension, index) => (
                <path
                  key={dimension}
                  d={segmentPath(index, result.dimensionScores[dimension])}
                  fill="#A47D47"
                  fillOpacity={0.22 + (result.dimensionScores[dimension] / 100) * 0.6}
                  stroke="#A47D47"
                  strokeOpacity="0.5"
                  strokeWidth="0.75"
                />
              ))}
              <circle cx={CENTER} cy={CENTER} r={MIN_R - 6} fill="none" stroke="#173B2F" strokeOpacity="0.12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Dimension scores */}
      <section className="border-b border-[#173B2F]/10">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Dimension scores</p>
              <h2 className="mt-5 text-pretty text-4xl leading-tight text-[#173B2F] md:text-5xl">
                Your organizational profile
              </h2>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-[#173B2F]/20 px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#173B2F] transition-colors hover:border-[#A47D47] hover:text-[#A47D47] print:hidden"
            >
              Print or save PDF
            </button>
          </div>

          <div className="mt-14 flex flex-col">
            {dimensions.map((dimension) => {
              const score = result.dimensionScores[dimension]
              return (
                <div key={dimension} className="border-t border-[#173B2F]/10 py-6 first:border-t-0">
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="text-xl text-[#173B2F] md:text-2xl">{dimension}</span>
                    <span className="text-xl text-[#A47D47]">{score}</span>
                  </div>
                  <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[#173B2F]/10">
                    <div className="h-full rounded-full bg-[#A47D47]" style={{ width: `${score}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Strengths and priorities */}
      <section className="border-b border-[#173B2F]/10">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <article>
            <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Current strengths</p>
            <h2 className="mt-5 text-pretty text-3xl leading-tight text-[#173B2F] md:text-4xl">
              Build on what is already working.
            </h2>
            <div className="mt-10 flex flex-col">
              {strengths.map(({ dimension, score }) => (
                <div key={dimension} className="flex gap-6 border-t border-[#173B2F]/10 py-7 first:border-t-0 first:pt-0">
                  <span className="shrink-0 text-2xl leading-none text-[#A47D47]">{score}</span>
                  <div>
                    <h3 className="text-xl text-[#173B2F]">{dimension}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-[#173B2F]/65">{recommendations[dimension]}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article>
            <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Priority opportunities</p>
            <h2 className="mt-5 text-pretty text-3xl leading-tight text-[#173B2F] md:text-4xl">
              Begin where strain is most visible.
            </h2>
            <div className="mt-10 flex flex-col">
              {priorities.map(({ dimension, score }) => (
                <div key={dimension} className="flex gap-6 border-t border-[#173B2F]/10 py-7 first:border-t-0 first:pt-0">
                  <span className="shrink-0 text-2xl leading-none text-[#A47D47]">{score}</span>
                  <div>
                    <h3 className="text-xl text-[#173B2F]">{dimension}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-[#173B2F]/65">{recommendations[dimension]}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-[#173B2F] text-[#F5F1E8] print:hidden">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-28">
          <p className="text-xs uppercase tracking-[0.32em] text-[#A47D47]">Next step</p>
          <h2 className="mt-6 text-pretty text-4xl leading-tight md:text-5xl">
            Turn your results into a practical workplace balance plan.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[#F5F1E8]/70">
            A complimentary consultation reviews your strongest foundations, your most important pressure points, and
            the first two or three changes worth considering.
          </p>
          <Link
            href="/book"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#F5F1E8] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#173B2F] transition-colors hover:bg-[#EFE7DA]"
          >
            Book a Workplace Balance Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <p className="mx-auto max-w-3xl px-6 py-14 text-center text-sm leading-relaxed text-[#173B2F]/50">
        This assessment is designed for reflection and strategic planning. It is not a validated clinical instrument
        and should not be used to diagnose health conditions or make employment decisions about individuals.
      </p>
    </div>
  )
}
