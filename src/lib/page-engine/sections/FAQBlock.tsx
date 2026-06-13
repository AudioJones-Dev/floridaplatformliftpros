"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FAQSection } from "../types";
import { siteConfig } from "@/lib/seo/metadata";

export default function FAQBlock({ heading, faqs }: FAQSection) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-lg border border-ink-100 bg-surface-50 p-6 shadow-sm">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-white">
            <Image src="/icons/faq-support.svg" alt="" width={36} height={36} className="h-9 w-9" />
          </span>
          <h2 className="mb-3 text-2xl font-extrabold text-brand-900">Need help deciding?</h2>
          <p className="mb-5 text-sm leading-6 text-ink-500">
            A site assessment confirms lift height, ramp slope, permit needs, and the right access option for the property.
          </p>
          <Link
            href="/book-assessment"
            className="inline-flex w-full justify-center rounded-lg bg-accent-500 px-5 py-3 text-sm font-extrabold text-brand-900 transition hover:bg-accent-300"
          >
            Site Assessment
          </Link>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="mt-3 inline-flex w-full justify-center rounded-lg border border-brand-200 bg-white px-5 py-3 text-sm font-bold text-brand-900 transition hover:border-lift-300"
          >
            Call or Text {siteConfig.phone}
          </a>
        </aside>
        <div>
          <h2 className="mb-8 text-3xl font-extrabold text-brand-900">{heading}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="overflow-hidden rounded-lg border border-ink-100 bg-white shadow-sm">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-4 text-left font-bold text-ink-900 transition hover:bg-surface-50"
                >
                  {faq.question}
                  <span className="text-2xl text-brand-700">{open === i ? "-" : "+"}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm leading-7 text-ink-500">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
