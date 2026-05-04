import Link from "next/link";
import type { BottomCTASection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function BottomCTABlock({ heading, subtext, ctaText, ctaHref }: BottomCTASection) {
  return (
    <section className="py-12 px-6 bg-yellow-400 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{heading}</h2>
        {subtext && <p className="text-blue-800 mb-6">{subtext}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={ctaHref} className="bg-blue-900 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-800 transition">
            {ctaText}
          </Link>
          <a href={`tel:${siteConfig.phoneRaw}`} className="bg-white text-blue-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition">
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
