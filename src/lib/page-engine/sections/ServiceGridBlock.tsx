import Link from "next/link";
import Image from "next/image";
import type { ServiceGridSection } from "../types";

const serviceIcons: Record<string, string> = {
  "Vertical Platform Lift Installation": "/icons/vertical-platform-lift.svg",
  "Stair Lift Installation": "/icons/stair-lift.svg",
  "Vehicle Lift Installation": "/icons/vehicle-lift.svg",
  "ADA Wheelchair Ramp Installation": "/icons/ada-ramp.svg",
  "Mobile Home Accessibility": "/icons/mobile-home-accessibility.svg",
  "Modular Building ADA Access": "/icons/modular-building-access.svg",
  "Accessibility Site Assessments": "/icons/site-assessment.svg",
  "VPL Cost Guide": "/icons/cost-guide.svg",
  "Residential Homes": "/icons/residential-commercial.svg",
  "Commercial Buildings": "/icons/residential-commercial.svg",
  "Stages & Platforms": "/icons/vertical-platform-lift.svg",
  "Public Facilities": "/icons/ada-compliant.svg",
};

export default function ServiceGridBlock({ heading, services }: ServiceGridSection) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-18">
      <div
        className="pointer-events-none absolute inset-0 opacity-[.035]"
        style={{ backgroundImage: "url('/backgrounds/service-blueprint-pattern.svg')" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-brand-900">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative overflow-hidden rounded-lg border border-ink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-lift-300 hover:shadow-xl hover:shadow-brand-900/10"
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(228,165,28,.14), transparent 34%), linear-gradient(180deg, #FFFFFF, #F5F8FB)",
                }}
              />
              <div
                className="absolute right-0 top-0 h-28 w-40 opacity-0 transition group-hover:opacity-100"
                style={{ backgroundImage: "url('/backgrounds/card-technical-lines.svg')" }}
              />
              <div className="relative">
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-brand-100 bg-white shadow-sm">
                  <Image
                    src={serviceIcons[service.title] ?? "/icons/vertical-platform-lift.svg"}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-brand-900">{service.title}</h3>
                <p className="text-sm leading-6 text-ink-500">{service.description}</p>
                <span className="mt-5 inline-block text-sm font-bold text-brand-700 group-hover:text-lift-700">
                  Learn more -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
