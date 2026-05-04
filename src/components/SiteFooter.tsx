import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function SiteFooter() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Florida Platform Lift Pros</h3>
          <p className="text-blue-200 text-sm mb-3">ADA-compliant vertical platform lifts, wheelchair ramps, and accessibility solutions across South and Southwest Florida.</p>
          <p className="text-sm"><a href={`tel:${siteConfig.phoneRaw}`} className="text-yellow-300 font-bold">{siteConfig.phone}</a></p>
          <p className="text-sm"><a href={`mailto:${siteConfig.email}`} className="text-yellow-300">{siteConfig.email}</a></p>
        </div>
        <div>
          <h3 className="font-bold mb-3">Services</h3>
          <ul className="space-y-1 text-sm text-blue-200">
            <li><Link href="/services/vertical-platform-lifts" className="hover:text-white">Vertical Platform Lifts</Link></li>
            <li><Link href="/services/ada-ramps" className="hover:text-white">ADA Wheelchair Ramps</Link></li>
            <li><Link href="/services/mobile-home-accessibility" className="hover:text-white">Mobile Home Accessibility</Link></li>
            <li><Link href="/services/modular-trailer-ada-access" className="hover:text-white">Modular Building ADA Access</Link></li>
            <li><Link href="/book-assessment" className="hover:text-white">Book Free Assessment</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Service Areas</h3>
          <ul className="text-sm text-blue-200 space-y-1">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-blue-700 text-center text-xs text-blue-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.{" "}
        <Link href="/resources/vertical-platform-lift-cost-florida" className="underline hover:text-white">VPL Cost Guide</Link>
      </div>
    </footer>
  );
}
