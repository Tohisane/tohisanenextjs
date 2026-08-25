import Link from "next/link"

export function SiteHeader({ action }: { action?: { label: string; href: string } }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#173B2F]/10 bg-[#F5F1E8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/corporate-balance"
          className="text-lg tracking-[0.28em] text-[#173B2F]"
          aria-label="TOHISANE home"
        >
          TOHISANE
        </Link>
        {action ? (
          <Link
            href={action.href}
            className="text-xs uppercase tracking-[0.18em] text-[#A47D47] transition-colors hover:text-[#173B2F]"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#173B2F]/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg tracking-[0.28em] text-[#173B2F]">TOHISANE</p>
          <p className="mt-2 text-[#173B2F]/60">Restorative organizational health.</p>
        </div>
        <div className="flex flex-col gap-2 text-[#173B2F]/60 sm:items-end">
          <span>&copy; {new Date().getFullYear()} TOHISANE</span>
          <a href="mailto:seren@tohisane.com" className="transition-colors hover:text-[#A47D47]">
            seren@tohisane.com
          </a>
        </div>
      </div>
    </footer>
  )
}
