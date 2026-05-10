import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center py-16">
        <div className="text-sm font-bold uppercase tracking-wide text-blue-900 mb-3">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          We can&apos;t find that page.
        </h1>
        <p className="text-gray-700 mb-8">
          The page you&apos;re looking for may have moved. Try one of our most popular pages
          below, or call us directly at{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-blue-900 font-bold underline">
            {siteConfig.phone}
          </a>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8">
          <Link
            href="/book-assessment"
            className="bg-blue-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Book Free Assessment
          </Link>
          <Link
            href="/"
            className="border-2 border-blue-900 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Back to Home
          </Link>
        </div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            <Link href="/services/vertical-platform-lifts" className="underline hover:text-blue-900">
              Vertical Platform Lifts
            </Link>
          </li>
          <li>
            <Link href="/services/stair-lifts" className="underline hover:text-blue-900">
              Stair Lifts
            </Link>
          </li>
          <li>
            <Link href="/services/ada-ramps" className="underline hover:text-blue-900">
              ADA Wheelchair Ramps
            </Link>
          </li>
          <li>
            <Link
              href="/resources/vertical-platform-lift-cost-florida"
              className="underline hover:text-blue-900"
            >
              VPL Cost Guide
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
