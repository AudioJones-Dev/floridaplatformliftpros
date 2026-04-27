import Link from "next/link";
import type { HeroSection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function HeroBlock({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  badge,
}: HeroSection) {
  return (
    <section className="bg-blue-900 text-white py-20 px-6 text-center">
      {badge && (
        <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
        {headline}
      </h1>
      <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">{subheadline}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={ctaHref}
          className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition"
        >
          {ctaText}
        </Link>
        {secondaryCtaText && secondaryCtaHref && (
          <Link
            href={secondaryCtaHref}
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-blue-900 transition"
          >
            {secondaryCtaText}
          </Link>
        )}
      </div>
      <p className="mt-6 text-blue-200 text-sm">
        Call or Text:{" "}
        <a href={`tel:${siteConfig.phoneRaw}`} className="underline font-bold text-yellow-300">
          {siteConfig.phone}
        </a>
      </p>
    </section>
  );
}
