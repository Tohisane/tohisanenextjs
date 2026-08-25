import type { Metadata } from "next"
import { ResultsDashboard } from "@/components/corporate-balance/results-dashboard"
import { SiteFooter, SiteHeader } from "@/components/corporate-balance/site-header"

export const metadata: Metadata = {
  title: "Corporate Balance Report™ | TOHISANE",
  description: "Your organizational profile across the eight dimensions of workplace balance.",
}

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <SiteHeader action={{ label: "Book a consultation", href: "/book" }} />
      <main>
        <ResultsDashboard />
      </main>
      <SiteFooter />
    </div>
  )
}
