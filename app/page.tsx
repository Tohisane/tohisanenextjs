"use client";

import { motion } from "framer-motion";
import {
  Search,
  Menu,
  ShieldCheck,
  HeartPulse,
  Moon,
  ArrowRight,
  CheckCircle2,
  Star,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  {
    title: "Stress-Driven Pain",
    desc: "Support for tension, flare-ups, and body discomfort linked to overwhelm.",
    icon: HeartPulse,
  },
  {
    title: "Sleep + Recovery",
    desc: "Evening rituals and botanical education for deeper rest and next-day resilience.",
    icon: Moon,
  },
  {
    title: "Daily Calm",
    desc: "Plant-based routines for nervous system balance and steadier days.",
    icon: Leaf,
  },
  {
    title: "Cannabinoid Education",
    desc: "Evidence-informed education on cannabinoids and their role in restorative wellness.",
    icon: ShieldCheck,
  },
];

const products = [
  {
    name: "Balance",
    use: "Daily Botanical + Cannabinoid Support",
    price: "$48",
    tag: "Best Seller",
    icon: "balance",
  },
  { name: "Sleep", use: "Nighttime Botanical Ritual", price: "$42", tag: "Rest", icon: "sleep" },
  { name: "Relief", use: "Body Comfort Blend", price: "$58", tag: "Recovery", icon: "relief" },
];

const ProductIcon = ({ type }: { type: string }) => {
  if (type === "balance") {
    return (
      <svg viewBox="0 0 80 100" className="h-24 w-20" fill="none" stroke="#A47D47" strokeWidth="1.5">
        <circle cx="40" cy="8" r="3" fill="#A47D47" />
        <ellipse cx="40" cy="50" rx="25" ry="40" />
        <path d="M40 10 Q25 50 40 90 Q55 50 40 10" />
        <circle cx="40" cy="92" r="3" fill="#A47D47" />
      </svg>
    );
  }
  if (type === "sleep") {
    return (
      <svg viewBox="0 0 100 80" className="h-20 w-24" fill="none" stroke="#A47D47" strokeWidth="1.5">
        <circle cx="50" cy="8" r="3" fill="#A47D47" />
        <circle cx="50" cy="35" r="15" />
        <path d="M15 50 Q30 42 50 50 Q70 58 85 50" />
        <path d="M10 60 Q30 52 50 60 Q70 68 90 60" />
        <path d="M15 70 Q30 62 50 70 Q70 78 85 70" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 100" className="h-24 w-16" fill="none" stroke="#A47D47" strokeWidth="1.5">
      {/* Main stem */}
      <path d="M30 90 L30 20" />
      {/* Horizontal line with circle */}
      <path d="M15 75 L45 75" />
      <circle cx="30" cy="75" r="4" fill="#A47D47" />
      {/* Bottom right leaf */}
      <path d="M30 65 Q42 60 45 50 Q46 42 38 45 Q30 48 30 55" />
      {/* Middle left leaf */}
      <path d="M30 50 Q18 45 15 35 Q14 27 22 30 Q30 33 30 40" />
      {/* Top right leaf */}
      <path d="M30 35 Q42 30 44 22 Q45 15 37 17 Q30 20 30 27" />
      {/* Very top leaf */}
      <path d="M30 22 Q22 15 25 8 Q28 3 30 8 Q32 3 35 8 Q38 15 30 22" />
    </svg>
  );
};

const steps = [
  "Take the pain-pattern quiz",
  "Receive a personalized wellness roadmap",
  "Explore botanicals, cannabinoid support, and restorative practices",
  "Track what works and refine your routine",
];

export default function TohisaneWebsite() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <header className="sticky top-0 z-50 border-b border-[#D7C8B3]/60 bg-[#F5F1E8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-[0.35em]">TOHISANE</span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#A47D47]">
                Restorative Wellness House
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm tracking-wide md:flex">
            <a href="#shop" className="hover:text-[#A47D47]">
              Shop
            </a>
            <a href="#how" className="hover:text-[#A47D47]">
              How It Works
            </a>
            <a href="#consult" className="hover:text-[#A47D47]">
              Consults
            </a>
            <a href="#learn" className="hover:text-[#A47D47]">
              Learn
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Search className="h-5 w-5" />
            <Link href="/restorative-check-in">
              <Button className="rounded-full bg-[#173B2F] px-6 text-[#F5F1E8] hover:bg-[#0f2a21]">
                Take the Quiz
              </Button>
            </Link>
          </div>
          <Menu className="h-6 w-6 md:hidden" />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-serif text-5xl leading-tight md:text-7xl">
                Whole-body support for pain that feels ignored.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#3f5148]">
                TOHISANE helps midlife adults with stress-driven body pain create realistic wellness
                strategies through botanical education, cannabinoid guidance, sleep support, and
                nervous system care.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/restorative-check-in">
                  <Button className="w-full rounded-full bg-[#173B2F] px-8 py-6 text-base text-[#F5F1E8] hover:bg-[#0f2a21]">
                    Take the Restorative Wellness Check-In{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-consultation">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#173B2F] px-8 py-6 text-base text-[#173B2F] hover:bg-[#E8DFD1]"
                  >
                    Book a Consultation
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[#8B6E4E]">
                Education • Botanical guidance • Plant-based routines
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[2rem] bg-[#173B2F] p-6 shadow-2xl">
                <div className="rounded-[1.5rem] bg-[#EFE7DA] p-8">
                  <div className="text-center">
                    <h2 className="font-serif text-4xl tracking-[0.18em]">TOHISANE</h2>
                    <p className="mt-3 text-sm uppercase tracking-[0.25em] text-[#A47D47]">
                      Pain Wellness Strategy
                    </p>
                  </div>
                  <div className="mt-8 space-y-3">
                    {steps.map((step) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-2xl bg-white/60 p-3 text-sm"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#A47D47]" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#173B2F] px-5 py-10 text-[#F5F1E8]">
          <div className="mx-auto grid max-w-7xl gap-6 text-center md:grid-cols-3">
            <div>
              <p className="font-serif text-3xl">1:1</p>
              <p className="text-sm uppercase tracking-[0.2em] text-[#D7C8B3]">Wellness Consults</p>
            </div>
            <div>
              <p className="font-serif text-3xl">Botanical</p>
              <p className="text-sm uppercase tracking-[0.2em] text-[#D7C8B3]">
                Cannabinoid Education
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl">6 Weeks</p>
              <p className="text-sm uppercase tracking-[0.2em] text-[#D7C8B3]">
                Relief Reset Program
              </p>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-[#A47D47]">
              Start with support
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Understand your needs</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {categories.map(({ title, desc, icon: Icon }) => (
              <Card
                key={title}
                className="rounded-[2rem] border-[#D7C8B3] bg-[#FBF8F1] shadow-sm"
              >
                <CardContent className="p-6">
                  <Icon className="mb-6 h-8 w-8 text-[#A47D47]" />
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#3f5148]">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-[#EFE7DA] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-[#A47D47]">
                Featured formulas
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Plant rituals for modern discomfort
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((p) => (
                <Card
                  key={p.name}
                  className="overflow-hidden rounded-[2rem] border-none bg-[#F5F1E8] shadow-md"
                >
                  <div className="flex h-48 items-center justify-center rounded-xl bg-[#173B2F]">
                    <ProductIcon type={p.icon} />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 inline-flex rounded-full bg-[#D7C8B3]/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#173B2F]">
                      {p.tag}
                    </div>
                    <h3 className="font-serif text-2xl">TOHISANE {p.name}</h3>
                    <p className="mt-2 text-sm text-[#3f5148]">{p.use}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-serif text-xl">{p.price}</span>
                      <Button className="rounded-full bg-[#173B2F] text-[#F5F1E8]">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#A47D47]">How it works</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              A calm path when you do not know what to try next.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f5148]">
              We start by mapping your stress, sleep, lifestyle, and discomfort patterns. Then we
              build a practical, non-medical wellness plan with botanicals, cannabinoid education,
              and daily rituals you can discuss with your healthcare provider.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.5rem] border border-[#D7C8B3] bg-[#FBF8F1] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173B2F] text-[#F5F1E8]">
                  {index + 1}
                </div>
                <p className="pt-2 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="consult" className="px-5 pb-20">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#173B2F] p-8 text-[#F5F1E8] md:p-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#D7C8B3]">
                  Private support
                </p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">Pain Clarity Consultation</h2>
                <p className="mt-5 leading-8 text-[#E8DFD1]">
                  A 45-minute wellness strategy session for people who feel dismissed, overwhelmed,
                  or unsure where to begin.
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#F5F1E8] p-7 text-[#173B2F]">
                <div className="mb-3 flex gap-1 text-[#A47D47]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="font-serif text-2xl">
                  &quot;For the first time, I had language for what my body was doing.&quot;
                </p>
                <Link href="/consultation" className="mt-6 block">
                  <Button className="w-full rounded-full bg-[#173B2F] py-6 text-[#F5F1E8] hover:bg-[#0f2a21]">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#D7C8B3] px-5 pb-56 pt-10 md:pb-40">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="font-serif text-2xl tracking-[0.35em]">TOHISANE</div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#A47D47]">
                Restorative Wellness House
              </p>
            </div>
            <p className="max-w-xl text-xs leading-6 text-[#3f5148]">
              Disclaimer: TOHISANE provides wellness education and botanical guidance only. This
              website does not provide medical advice, diagnosis, or treatment. Consult a licensed
              healthcare professional for medical concerns.
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Calendly Widget */}
      <aside className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]">
        <div className="w-60 rounded-[1.5rem] border border-[#D7C8B3] bg-[#FBF8F1]/95 p-4 shadow-lg backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A47D47]">TOHISANE</p>

          <h3 className="mt-1 font-serif text-lg leading-snug text-[#173B2F]">
            Book a Consultation
          </h3>

          <p className="mt-2 text-xs leading-5 text-[#3f5148]">
            Begin your personalized restorative protocol.
          </p>

          <a
            href="https://calendly.com/seren-tohisane/wellness-strategy-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-full bg-[#173B2F] px-4 py-2.5 text-center text-xs uppercase tracking-[0.18em] text-[#F5F1E8] transition hover:bg-[#0f2a21]"
          >
            Book Consultation
          </a>
        </div>
      </aside>
    </div>
  );
}
