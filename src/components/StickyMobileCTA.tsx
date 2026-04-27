"use client";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-blue-900 border-t-2 border-yellow-400">
      <div className="grid grid-cols-2 divide-x divide-yellow-400">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex flex-col items-center justify-center py-3 text-white font-bold text-sm"
        >
          <span className="text-yellow-400 text-xl mb-0.5">📞</span>
          Call/Text
          <span className="text-yellow-300 text-xs">{siteConfig.phone}</span>
        </a>
        <Link
          href="/book-assessment"
          className="flex flex-col items-center justify-center py-3 text-blue-900 font-bold text-sm bg-yellow-400"
        >
          <span className="text-xl mb-0.5">📋</span>
          Book Free Assessment
        </Link>
      </div>
    </div>
  );
}
