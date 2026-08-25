"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Waves,
  Leaf,
  Star,
  CheckCircle2,
  ArrowRight,
  Clock,
  Video,
  FileText,
  Heart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const benefits = [
  {
    icon: Clock,
    title: "45-Minute Deep Dive",
    desc: "Unhurried time to explore your stress patterns, sleep habits, and body discomfort without judgment.",
  },
  {
    icon: FileText,
    title: "Personalized Wellness Roadmap",
    desc: "Walk away with a clear, actionable plan tailored to your lifestyle and goals.",
  },
  {
    icon: Video,
    title: "Virtual or In-Person",
    desc: "Meet from the comfort of your home or schedule an in-person session.",
  },
  {
    icon: Heart,
    title: "Compassionate Guidance",
    desc: "For people who feel dismissed, overwhelmed, or unsure where to begin.",
  },
];

const includes = [
  "Comprehensive intake assessment",
  "Stress and pain pattern mapping",
  "Botanical education recommendations",
  "Cannabinoid guidance (if appropriate)",
  "Sleep and nervous system strategies",
  "Written summary and next steps",
];

export default function ConsultationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleOpenModal = () => {
    console.log("[v0] Button clicked, opening modal");
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#D7C8B3]/60 bg-[#F5F1E8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A47D47] text-[#A47D47]">
              <Sun className="h-4 w-4" />
              <Waves className="-ml-1 h-4 w-4" />
            </div>
            <div className="font-serif text-xl tracking-[0.28em]">TOHISANE</div>
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

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-[#A47D47]">Private Support</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">
              Pain Clarity Consultation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#3f5148]">
              A 45-minute wellness strategy session for people who feel dismissed, overwhelmed, or
              unsure where to begin. Get clarity on your path to relief.
            </p>
          </motion.div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-[#EFE7DA] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <Card
                  key={title}
                  className="rounded-[2rem] border-[#D7C8B3] bg-[#FBF8F1] shadow-sm"
                >
                  <CardContent className="p-6">
                    <Icon className="mb-6 h-8 w-8 text-[#A47D47]" />
                    <h3 className="font-serif text-xl">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#3f5148]">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#A47D47]">
                What&apos;s Included
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Everything you need to start your wellness journey
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#3f5148]">
                Your consultation is designed to give you clarity, not confusion. We map your unique
                patterns and create a practical, non-medical wellness plan.
              </p>
            </div>
            <div className="space-y-4">
              {includes.map((item) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-[1.5rem] border border-[#D7C8B3] bg-[#FBF8F1] p-5"
                >
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-[#A47D47]" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-[#173B2F] px-5 py-20 text-[#F5F1E8]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-1 text-[#A47D47]">
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
            </div>
            <p className="font-serif text-3xl leading-relaxed md:text-4xl">
              &quot;For the first time, I had language for what my body was doing. The roadmap gave
              me hope and a clear starting point.&quot;
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#D7C8B3]">
              — Sarah M., Client
            </p>
          </div>
        </section>

        {/* Pricing & Booking */}
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mx-auto max-w-2xl">
            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-[#FBF8F1] shadow-lg">
              <div className="bg-[#173B2F] p-8 text-center text-[#F5F1E8]">
                <p className="text-sm uppercase tracking-[0.25em] text-[#D7C8B3]">
                  Pain Clarity Consultation
                </p>
                <p className="mt-4 font-serif text-6xl">$125</p>
                <p className="mt-2 text-[#D7C8B3]">45-minute session</p>
              </div>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {includes.slice(0, 4).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#A47D47]" />
                      <p className="text-[#3f5148]">{item}</p>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={handleOpenModal}
                  className="mt-8 w-full rounded-full bg-[#173B2F] py-6 text-base text-[#F5F1E8] hover:bg-[#0f2a21]"
                >
                  Book Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-4 text-center text-sm text-[#3f5148]">
                  Secure booking. Cancel or reschedule anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Brand Card */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="mx-auto max-w-md">
            <div className="rounded-[2rem] bg-[#173B2F] p-6 shadow-2xl">
              <div className="rounded-[1.5rem] bg-[#EFE7DA] p-8">
                <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#A47D47]">
                  <div className="text-center text-[#A47D47]">
                    <Sun className="mx-auto h-8 w-8" />
                    <Leaf className="mx-auto mt-1 h-7 w-7 text-[#173B2F]" />
                    <Waves className="mx-auto mt-1 h-7 w-7 text-[#173B2F]" />
                  </div>
                </div>
                <h2 className="text-center font-serif text-4xl tracking-[0.18em]">TOHISANE</h2>
                <p className="mt-3 text-center text-sm uppercase tracking-[0.25em] text-[#A47D47]">
                  Ancient Wisdom. Modern Wellness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#D7C8B3] px-5 py-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="font-serif text-2xl tracking-[0.28em]">TOHISANE</div>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#A47D47]">
                Ancient Wisdom. Modern Wellness.
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

      {/* Calendly Floating Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center gap-2 rounded-full bg-[#173B2F] px-6 py-4 text-[#F5F1E8] shadow-lg transition-transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium">Book a Consultation</span>
        </button>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>
              <section className="min-h-fit rounded-3xl border border-neutral-200 bg-white/90 p-12 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">TOHISANE</p>
                  <h1 className="mt-4 text-4xl font-light tracking-wide text-black md:text-5xl">
                    Book a Consultation
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
                    Personalized restorative protocols designed to support balance, calm, and
                    intentional living through intelligent phyto-wellness and restorative care.
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
                    We believe healing begins when people reconnect to themselves. In a world shaped
                    by constant stimulation and modern exhaustion, TOHISANE creates personalized
                    protocols designed to support balance, ease discomfort, and cultivate a calmer
                    way of living.
                  </p>
                </div>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
