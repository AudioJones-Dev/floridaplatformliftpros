import Link from "next/link";
import type { CTASection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function CTABlock({ heading, subtext, ctaText, ctaHref, secondaryText, secondaryHref }: CTASection) {
  return (
    <section
      className="relative overflow-hidden bg-brand-900 px-6 py-16 text-center text-white"
      style={{ backgroundImage: "url('/backgrounds/navy-cta-blueprint-grid.svg')", backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-brand-900/78" />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-extrabold text-white">{heading}</h2>
        {subtext && <p className="mb-8 text-brand-100">{subtext}</p>}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={ctaHref} className="rounded-lg bg-accent-500 px-8 py-4 text-lg font-extrabold text-brand-900 transition hover:bg-accent-300">
            {ctaText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link href={secondaryHref} className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-brand-900">
              {secondaryText}
            </Link>
          )}
        </div>
        <p className="mt-6 text-sm text-brand-100">
          Or call/text:{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="font-bold text-accent-300 underline">
            {siteConfig.phone}
          </a>
          {" | "}
          <a href={`mailto:${siteConfig.email}`} className="font-bold text-accent-300 underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
