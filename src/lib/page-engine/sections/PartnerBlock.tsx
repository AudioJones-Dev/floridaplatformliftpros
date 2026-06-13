import Link from "next/link";
import type { PartnerSection } from "../types";

export default function PartnerBlock({
  eyebrow,
  headline,
  body,
  bullets,
  ctaText,
  ctaHref,
}: PartnerSection) {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-lg border border-brand-100 bg-surface-50 p-7 shadow-sm md:grid-cols-[1.1fr_.9fr] md:p-10">
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-normal text-lift-700">{eyebrow}</p>
          <h2 className="mb-5 max-w-3xl text-3xl font-extrabold leading-tight text-brand-900 md:text-4xl">
            {headline}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-ink-700">{body}</p>
          <Link
            href={ctaHref}
            className="mt-7 inline-flex rounded-lg bg-accent-500 px-6 py-3 font-extrabold text-brand-900 transition hover:bg-accent-300"
          >
            {ctaText}
          </Link>
        </div>
        <div className="rounded-lg border border-white bg-white p-6 shadow-sm">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-lift-100 bg-lift-50 p-4">
              <p className="text-xs font-bold uppercase tracking-normal text-lift-700">Florida Platform Lift Pros</p>
              <p className="mt-2 text-lg font-extrabold text-brand-900">Assessment + project qualification</p>
            </div>
            <div className="rounded-lg border border-accent-100 bg-accent-50 p-4">
              <p className="text-xs font-bold uppercase tracking-normal text-accent-700">Florida Ramp & Lift</p>
              <p className="mt-2 text-lg font-extrabold text-brand-900">Professional installation</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-ink-700">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lift-500" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
