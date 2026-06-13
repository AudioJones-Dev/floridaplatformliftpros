"use client";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-900 border-t-2 border-accent-500">
      <div className="grid grid-cols-2 divide-x divide-accent-500">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex flex-col items-center justify-center py-3 text-white font-bold text-sm"
        >
          Call/Text
          <span className="text-accent-300 text-xs">{siteConfig.phone}</span>
        </a>
        <Link
          href="/book-assessment"
          className="flex flex-col items-center justify-center py-3 text-brand-900 font-extrabold text-sm bg-accent-500"
        >
          Book Site Assessment
        </Link>
      </div>
    </div>
  );
}
