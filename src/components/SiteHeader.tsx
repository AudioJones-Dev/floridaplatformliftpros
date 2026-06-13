import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo/metadata";

const navLinkClass = "text-brand-50/90 hover:text-white transition";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-900/96 shadow-lg shadow-brand-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link
          href="/"
          className="flex items-center rounded-lg bg-white px-3 py-2 shadow-sm"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/brand/florida-platform-lift-pros-logo.png"
            alt={siteConfig.name}
            width={320}
            height={129}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          <Link href="/services/vertical-platform-lifts" className={navLinkClass}>VPL</Link>
          <Link href="/services/stair-lifts" className={navLinkClass}>Stair Lifts</Link>
          <Link href="/services/vehicle-lifts" className={navLinkClass}>Vehicle Lifts</Link>
          <Link href="/services/ada-ramps" className={navLinkClass}>ADA Ramps</Link>
          <Link href="/services/mobile-home-accessibility" className={navLinkClass}>Mobile Homes</Link>
          <Link href="/resources/vertical-platform-lift-cost-florida" className={navLinkClass}>Cost Guide</Link>
          <Link href="/book-assessment" className="rounded-lg bg-accent-500 px-4 py-2 font-extrabold text-brand-900 transition hover:bg-accent-300">Book Assessment</Link>
        </nav>
        <a href={`tel:${siteConfig.phoneRaw}`} className="font-bold text-accent-300 md:hidden">{siteConfig.phone}</a>
      </div>
    </header>
  );
}
