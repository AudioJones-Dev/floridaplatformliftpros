import Link from "next/link";
import Image from "next/image";
import type { BottomCTASection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function BottomCTABlock({ heading, subtext, ctaText, ctaHref }: BottomCTASection) {
  return (
    <section className="bg-accent-500 px-6 py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_380px]">
        <div className="text-center lg:text-left">
          <h2 className="mb-2 text-2xl font-extrabold text-brand-900">{heading}</h2>
          {subtext && <p className="mb-6 text-brand-800">{subtext}</p>}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link href={ctaHref} className="rounded-lg bg-brand-900 px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-brand-800">
              {ctaText}
            </Link>
            <a href={`tel:${siteConfig.phoneRaw}`} className="rounded-lg bg-white px-8 py-4 text-center text-lg font-bold text-brand-900 transition hover:bg-brand-50">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg border-4 border-white/70 shadow-xl shadow-brand-900/20 lg:block">
          <Image
            src="/photos/site-assessment-installer.webp"
            alt="Installer measuring a Florida entry for an accessibility lift assessment"
            fill
            sizes="380px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
