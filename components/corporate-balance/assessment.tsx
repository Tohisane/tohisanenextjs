"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import {
  STORAGE_KEY,
  calculateScores,
  dimensionIntros,
  dimensions,
  questions,
  questionsPerStep,
  responseOptions,
} from "@/lib/assessment"

export function Assessment() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [details, setDetails] = useState({ name: "", email: "", organization: "", role: "" })
  const [error, setError] = useState("")

  const isDetailsStep = step === dimensions.length
  const stepQuestions = useMemo(
    () => questions.slice(step * questionsPerStep, step * questionsPerStep + questionsPerStep),
    [step],
  )

  function choose(questionId: string, value: number) {
    setAnswers((current) => ({ ...current, [questionId]: value }))
    setError("")
  }

  function next() {
    if (!stepQuestions.every((question) => answers[question.id])) {
      setError("Please answer all three statements before continuing.")
      return
    }
    setError("")
    setStep((current) => current + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function previous() {
    setError("")
    setStep((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!details.name || !details.email || !details.organization) {
      setError("Please provide your name, work email, and organization.")
      return
    }

    const payload = {
      ...calculateScores(answers),
      respondent: details,
      completedAt: new Date().toISOString(),
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    router.push("/results")
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      {/* Eight-segment progress, echoing the index dial */}
      <div className="flex items-center gap-3">
        {dimensions.map((dimension, index) => (
          <span
            key={dimension}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
              index < step || isDetailsStep ? "bg-[#A47D47]" : index === step ? "bg-[#A47D47]/50" : "bg-[#173B2F]/12"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[#A47D47]">
        {isDetailsStep ? "Final step" : `Dimension ${step + 1} of ${dimensions.length}`}
      </p>

      {!isDetailsStep ? (
        <>
          <h1 className="mt-5 text-5xl leading-none text-[#173B2F] md:text-6xl">{dimensions[step]}</h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#173B2F]/60">
            {dimensionIntros[dimensions[step]]}
          </p>

          <div className="mt-14 flex flex-col">
            {stepQuestions.map((question, index) => (
              <div
                key={question.id}
                role="group"
                aria-labelledby={`${question.id}-label`}
                className="border-t border-[#173B2F]/10 py-10 first:border-t-0 first:pt-0"
              >
                <p
                  id={`${question.id}-label`}
                  className="flex gap-4 text-pretty text-xl leading-snug text-[#173B2F] md:text-2xl"
                >
                  <span className="mt-1 shrink-0 text-xs tracking-[0.2em] text-[#A47D47]">
                    {String(step * questionsPerStep + index + 1).padStart(2, "0")}
                  </span>
                  <span>{question.prompt}</span>
                </p>

                <div className="mt-7 grid grid-cols-5 gap-2">
                  {responseOptions.map((option) => {
                    const selected = answers[question.id] === option.value
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border px-2 py-4 text-center transition-colors ${
                          selected
                            ? "border-[#A47D47] bg-[#A47D47]/10"
                            : "border-[#173B2F]/12 hover:border-[#A47D47]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={selected}
                          onChange={() => choose(question.id, option.value)}
                          className="sr-only"
                        />
                        <span className={`text-2xl leading-none ${selected ? "text-[#A47D47]" : "text-[#173B2F]/40"}`}>
                          {option.value}
                        </span>
                        <span className="text-[0.7rem] leading-tight text-[#173B2F]/55">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {error ? (
            <p role="alert" className="mt-8 text-sm text-[#A47D47]">
              {error}
            </p>
          ) : null}

          <div className="mt-12 flex items-center justify-between border-t border-[#173B2F]/10 pt-10">
            <button
              type="button"
              onClick={previous}
              disabled={step === 0}
              className="text-xs uppercase tracking-[0.18em] text-[#173B2F]/60 transition-colors hover:text-[#173B2F] disabled:opacity-0"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-3 rounded-full bg-[#173B2F] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#F5F1E8] transition-colors hover:bg-[#0F2A22]"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <h1 className="mt-5 text-pretty text-5xl leading-none text-[#173B2F] md:text-6xl">Receive your results</h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#173B2F]/60">
            Your report appears immediately. These details label the report and make it easier to discuss your
            organization during a consultation.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {[
              { key: "name", label: "Name", type: "text", autoComplete: "name", required: true },
              { key: "email", label: "Work email", type: "email", autoComplete: "email", required: true },
              { key: "organization", label: "Organization", type: "text", autoComplete: "organization", required: true },
              {
                key: "role",
                label: "Role or title (optional)",
                type: "text",
                autoComplete: "organization-title",
                required: false,
              },
            ].map((field) => (
              <label key={field.key} className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#A47D47]">{field.label}</span>
                <input
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  value={details[field.key as keyof typeof details]}
                  onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                  className="border-b border-[#173B2F]/20 bg-transparent pb-3 text-xl text-[#173B2F] outline-none transition-colors placeholder:text-[#173B2F]/30 focus:border-[#A47D47]"
                />
              </label>
            ))}
          </div>

          <label className="mt-12 flex cursor-pointer items-start gap-4 border-t border-[#173B2F]/10 pt-10">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-[#A47D47]"
            />
            <span className="text-pretty leading-relaxed text-[#173B2F]/70">
              I understand this is an organizational reflection tool, not a medical, psychological, or legal
              assessment.
            </span>
          </label>

          {error ? (
            <p role="alert" className="mt-8 text-sm text-[#A47D47]">
              {error}
            </p>
          ) : null}

          <div className="mt-12 flex items-center justify-between border-t border-[#173B2F]/10 pt-10">
            <button
              type="button"
              onClick={previous}
              className="text-xs uppercase tracking-[0.18em] text-[#173B2F]/60 transition-colors hover:text-[#173B2F]"
            >
              Back
            </button>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full bg-[#173B2F] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#F5F1E8] transition-colors hover:bg-[#0F2A22]"
            >
              View my results
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
