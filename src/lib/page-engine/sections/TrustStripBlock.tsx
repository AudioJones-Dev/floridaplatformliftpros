import Image from "next/image";
import type { TrustStripSection } from "../types";

const trustIcons: Record<string, string> = {
  "Licensed & Insured": "/icons/licensed-insured.svg",
  "ADA Compliant Installs": "/icons/ada-compliant.svg",
  "Permit Assistance": "/icons/permit-assistance.svg",
  "Site Assessments": "/icons/site-assessment-check.svg",
  "8 Counties Served": "/icons/counties-served.svg",
  "Residential & Commercial": "/icons/residential-commercial.svg",
};

export default function TrustStripBlock({ items }: TrustStripSection) {
  return (
    <section className="bg-brand-800 px-6 py-5 text-white shadow-inner shadow-brand-950/20">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-3 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 transition hover:border-lift-300/50 hover:bg-white/10"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white">
              <Image
                src={trustIcons[item] ?? "/icons/licensed-insured.svg"}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
