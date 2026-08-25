"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResultType = "RESTORE" | "REGULATE" | "REPLENISH" | "RECONNECT";

type Question = {
  question: string;
  options: { text: string; result: ResultType }[];
};

const questions: Question[] = [
  {
    question: "At the end of most days, you feel…",
    options: [
      { text: "Physically depleted", result: "RESTORE" },
      { text: "Wired even when I'm tired", result: "REGULATE" },
      { text: "Like I'm running on empty", result: "REPLENISH" },
      { text: "Disconnected from myself", result: "RECONNECT" },
    ],
  },
  {
    question: "What would make the biggest difference in your life right now?",
    options: [
      { text: "Deeper rest", result: "RESTORE" },
      { text: "More calm", result: "REGULATE" },
      { text: "More sustainable energy", result: "REPLENISH" },
      { text: "More meaning and presence", result: "RECONNECT" },
    ],
  },
  {
    question: "When stress builds, what tends to happen first?",
    options: [
      { text: "My sleep suffers", result: "RESTORE" },
      { text: "I become tense or overstimulated", result: "REGULATE" },
      { text: "My routines and nutrition slip", result: "REPLENISH" },
      { text: "I withdraw from things I enjoy", result: "RECONNECT" },
    ],
  },
  {
    question: "Which environment sounds most restorative right now?",
    options: [
      { text: "A dark, quiet room with nowhere to be", result: "RESTORE" },
      { text: "A peaceful garden or forest", result: "REGULATE" },
      { text: "A kitchen filled with nourishing foods and botanicals", result: "REPLENISH" },
      { text: "A beach, trail, or beautiful place with someone I love", result: "RECONNECT" },
    ],
  },
  {
    question: "Your relationship with wellness currently feels…",
    options: [
      { text: "I know I need more recovery", result: "RESTORE" },
      { text: "I'm constantly trying to manage stress", result: "REGULATE" },
      { text: "I want better tools and routines", result: "REPLENISH" },
      {
        text: "I want wellness to feel more like living and less like work",
        result: "RECONNECT",
      },
    ],
  },
  {
    question: "Which word are you craving most?",
    options: [
      { text: "Rest", result: "RESTORE" },
      { text: "Ease", result: "REGULATE" },
      { text: "Vitality", result: "REPLENISH" },
      { text: "Presence", result: "RECONNECT" },
    ],
  },
];

const results: Record<
  ResultType,
  { title: string; description: string; focus: string; practices: string[] }
> = {
  RESTORE: {
    title: "Restore",
    description:
      "Your answers suggest that restoration may begin with giving your body and mind more opportunity to recover. Instead of adding more to your routine, your next step may be creating more space for rest.",
    focus:
      "TOHISANE explores the conditions that support recovery through sleep, restorative environments, gentle routines, botanicals and intentional pauses.",
    practices: [
      "Protect your evening wind-down",
      "Create quieter transitions between work and rest",
      "Explore restorative botanical education",
      "Build recovery into your routine before exhaustion arrives",
    ],
  },
  REGULATE: {
    title: "Regulate",
    description:
      "Your answers suggest that your system may be asking for greater steadiness. The goal is not to eliminate every source of stress, but to create conditions that make stress easier to move through.",
    focus:
      "TOHISANE explores calm through environment, rhythm, behavioral science, plant-based wellness and restorative daily practices.",
    practices: [
      "Reduce unnecessary stimulation",
      "Spend deliberate time outdoors",
      "Create small rituals that signal safety and ease",
      "Explore botanicals and cannabinoid education thoughtfully",
    ],
  },
  REPLENISH: {
    title: "Replenish",
    description:
      "Your answers suggest that you may be spending more energy than you are restoring. Replenishment is about supporting the resources that allow you to participate fully in your own life.",
    focus:
      "TOHISANE explores nourishment, phytomedicine, restorative routines and the everyday conditions that support vitality.",
    practices: [
      "Build consistent nourishment into your day",
      "Revisit the routines that support steady energy",
      "Explore evidence-informed phytomedicine",
      "Choose restoration before reaching depletion",
    ],
  },
  RECONNECT: {
    title: "Reconnect",
    description:
      "You may not need another thing to optimize. Your answers suggest that restoration may come from feeling more present — with yourself, other people and the world around you.",
    focus:
      "TOHISANE explores human flourishing through nature, community, meaningful ritual, thoughtful environments and the practice of presence.",
    practices: [
      "Spend time somewhere that makes you notice your surroundings",
      "Choose connection over constant stimulation",
      "Make room for curiosity, beauty and play",
      "Create rituals that bring you back to the present",
    ],
  },
};

const order: ResultType[] = ["RESTORE", "REGULATE", "REPLENISH", "RECONNECT"];

export default function RestorativeCheckInPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ResultType[]>([]);
  const [finished, setFinished] = useState(false);

  const result = useMemo<ResultType>(() => {
    const scores: Record<ResultType, number> = {
      RESTORE: 0,
      REGULATE: 0,
      REPLENISH: 0,
      RECONNECT: 0,
    };
    answers.forEach((answer) => {
      scores[answer] += 1;
    });
    return order.reduce((best, current) => (scores[current] > scores[best] ? current : best));
  }, [answers]);

  function answerQuestion(choice: ResultType) {
    const next = [...answers];
    next[currentQuestion] = choice;
    setAnswers(next);

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function restart() {
    setAnswers([]);
    setCurrentQuestion(0);
    setFinished(false);
  }

  const progress = finished ? 100 : ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const content = results[result];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <header className="sticky top-0 z-50 border-b border-[#D7C8B3]/60 bg-[#F5F1E8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-[0.3em]">TOHISANE</span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#A47D47]">
              Restorative Wellness House
            </span>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full border-[#173B2F] text-[#173B2F] hover:bg-[#E8DFD1]"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 md:py-20">
        {!finished ? (
          <section className="rounded-[2rem] border border-[#D7C8B3] bg-[#FBF8F1] p-6 shadow-sm md:p-12">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-[#A47D47]">
              The Restorative Wellness Check-In
            </p>
            <h1 className="mt-4 text-balance text-center font-serif text-4xl leading-tight md:text-5xl">
              What does your life need more of right now?
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-center leading-relaxed text-[#3f5148]">
              Six thoughtful questions to help you identify where restoration may begin.
            </p>

            <div className="mt-10 h-[2px] w-full bg-[#D7C8B3]">
              <div
                className="h-full bg-[#173B2F] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#A47D47]">
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <h2 className="mt-3 font-serif text-2xl leading-snug md:text-3xl">
              {question.question}
            </h2>

            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option) => (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => answerQuestion(option.result)}
                  className="rounded-[1.25rem] border border-[#D7C8B3] bg-transparent px-5 py-4 text-left leading-relaxed transition hover:border-[#173B2F] hover:bg-[#173B2F] hover:text-[#F5F1E8]"
                >
                  {option.text}
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                type="button"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#3f5148] underline decoration-[#D7C8B3] underline-offset-4 hover:text-[#173B2F]"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}

            <p className="mt-10 text-xs leading-6 text-[#6b7a72]">
              This check-in is educational and does not provide a medical diagnosis.
            </p>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-[#D7C8B3] bg-[#FBF8F1] p-6 shadow-sm md:p-12">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-[#A47D47]">
              Your Restorative Focus
            </p>
            <h1 className="mt-4 text-center font-serif text-5xl leading-tight md:text-6xl">
              {content.title}
            </h1>
            <div className="mx-auto mt-6 h-px w-16 bg-[#A47D47]" />

            <p className="mx-auto mt-8 max-w-xl text-pretty text-center leading-relaxed text-[#3f5148]">
              {content.description}
            </p>

            <div className="my-8 border-y border-[#D7C8B3] py-7 leading-relaxed text-[#3f5148]">
              {content.focus}
            </div>

            <h2 className="font-serif text-2xl md:text-3xl">Begin here.</h2>
            <div className="mt-4">
              {content.practices.map((practice) => (
                <div
                  key={practice}
                  className="flex gap-4 border-b border-[#D7C8B3] py-3 leading-relaxed"
                >
                  <span aria-hidden="true" className="text-[#A47D47]">
                    —
                  </span>
                  <p>{practice}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="sm:flex-1">
                <Button className="w-full rounded-full bg-[#173B2F] py-6 text-xs uppercase tracking-[0.18em] text-[#F5F1E8] hover:bg-[#0f2a21]">
                  Explore TOHISANE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={restart}
                className="w-full rounded-full border-[#173B2F] py-6 text-xs uppercase tracking-[0.18em] text-[#173B2F] hover:bg-[#E8DFD1] sm:flex-1"
              >
                Take the check-in again
              </Button>
            </div>

            <p className="mt-10 border-t border-[#D7C8B3] pt-6 text-xs leading-6 text-[#6b7a72]">
              The TOHISANE Restorative Wellness Check-In is for educational purposes only. It is not
              intended to diagnose, treat, cure, or prevent any medical condition and is not a
              substitute for advice from a qualified healthcare professional.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
