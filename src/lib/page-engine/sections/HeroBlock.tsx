import Link from "next/link";
import Image from "next/image";
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
    <section className="relative isolate overflow-hidden bg-brand-900 px-6 py-20 text-white sm:py-24 lg:py-28">
      <picture className="absolute inset-0 -z-20">
        <source
          media="(max-width: 640px)"
          srcSet="/hero/fplp-hero-vpl-florida-mobile.webp"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="/hero/fplp-hero-vpl-florida-tablet.webp"
        />
        <Image
          src="/hero/fplp-hero-vpl-florida-desktop.webp"
          alt="Vertical platform lift installed at a Florida entrance with accessible access"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,31,61,.94),rgba(6,31,61,.72),rgba(6,31,61,.24))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(228,165,28,.22),transparent_28%),linear-gradient(180deg,rgba(6,31,61,0),rgba(6,31,61,.32))]" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {badge && (
            <span className="inline-flex rounded-full border border-accent-300/50 bg-accent-500 text-brand-900 px-3 py-1 text-xs font-extrabold uppercase tracking-normal shadow-sm">
              {badge}
            </span>
          )}
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight !text-white md:text-6xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-50 md:text-xl">{subheadline}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-8 py-4 text-lg font-extrabold text-brand-900 shadow-lg shadow-brand-950/20 transition hover:bg-accent-300"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-brand-900"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
          <p className="mt-6 text-sm text-brand-50">
            Call or Text:{" "}
            <a href={`tel:${siteConfig.phoneRaw}`} className="font-bold text-accent-300 underline">
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
