import Link from "next/link";
import type { InternalLinksSection } from "../types";

export default function InternalLinksBlock({ heading, links }: InternalLinksSection) {
  return (
    <section className="py-10 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{heading}</h3>
        <ul className="flex flex-wrap gap-4">
          {links.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="text-blue-700 underline text-sm hover:text-blue-900">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
