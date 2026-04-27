import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function SiteHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-blue-900 text-xl leading-tight">
          Florida Platform<br className="hidden sm:block" /> Lift Pros
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/services/vertical-platform-lifts" className="text-gray-700 hover:text-blue-900">VPL Installation</Link>
          <Link href="/services/ada-ramps" className="text-gray-700 hover:text-blue-900">ADA Ramps</Link>
          <Link href="/services/mobile-home-accessibility" className="text-gray-700 hover:text-blue-900">Mobile Homes</Link>
          <Link href="/resources/vertical-platform-lift-cost-florida" className="text-gray-700 hover:text-blue-900">Cost Guide</Link>
          <Link href="/book-assessment" className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Book Assessment</Link>
        </nav>
        <a href={`tel:${siteConfig.phoneRaw}`} className="md:hidden font-bold text-blue-900">{siteConfig.phone}</a>
      </div>
    </header>
  );
}
