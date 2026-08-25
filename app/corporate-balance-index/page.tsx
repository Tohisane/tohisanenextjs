import type { Metadata } from "next"
import { Assessment } from "@/components/corporate-balance/assessment"
import { SiteFooter, SiteHeader } from "@/components/corporate-balance/site-header"

export const metadata: Metadata = {
  title: "Take the Corporate Balance Index™ | TOHISANE",
  description: "Complete the confidential five-minute salutogenic workplace assessment.",
}

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#173B2F]">
      <SiteHeader />
      <main>
        <Assessment />
      </main>
      <SiteFooter />
    </div>
  )
}
