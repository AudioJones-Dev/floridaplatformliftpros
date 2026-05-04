"use client";
import { useState } from "react";
import type { FAQSection } from "../types";

export default function FAQBlock({ heading, faqs }: FAQSection) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{heading}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 font-medium text-gray-800 flex justify-between items-center hover:bg-gray-50"
              >
                {faq.question}
                <span className="text-blue-600 text-xl">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
