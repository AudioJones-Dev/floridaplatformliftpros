import Link from "next/link";
import type { CTASection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function CTABlock({ heading, subtext, ctaText, ctaHref, secondaryText, secondaryHref }: CTASection) {
  return (
    <section className="py-16 px-6 bg-blue-900 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        {subtext && <p className="text-blue-100 mb-8">{subtext}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={ctaHref} className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">
            {ctaText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link href={secondaryHref} className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-blue-900 transition">
              {secondaryText}
            </Link>
          )}
        </div>
        <p className="mt-6 text-blue-200 text-sm">
          Or call/text:{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-yellow-300 font-bold underline">
            {siteConfig.phone}
          </a>
          {" · "}
          <a href={`mailto:${siteConfig.email}`} className="text-yellow-300 font-bold underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
