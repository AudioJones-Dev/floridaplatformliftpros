import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { LocationCard } from "@/components/sections/LocationCard";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { globalFaqs } from "@/data/faq";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildFAQSchema } from "@/lib/schema/faq";

export const metadata: Metadata = {
  title: "Florida Platform Lift Pros — Vertical Platform Lifts & ADA Ramps",
  description:
    "Florida's trusted installer of vertical platform lifts, ADA ramps, and accessibility solutions. Serving Miami, Fort Lauderdale, and all of South Florida. Licensed, insured, free estimates.",
  alternates: { canonical: "https://floridaplatformliftpros.com" },
};

export default function HomePage() {
  const lbSchema = buildLocalBusinessSchema();
  const faqSchema = buildFAQSchema(globalFaqs.slice(0, 6));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection
        badge="South Florida's #1 Accessibility Installer"
        headline="Vertical Platform Lifts & ADA Ramps for Florida Homes and Businesses"
        subheadline="Florida Platform Lift Pros installs ADA-compliant vertical platform lifts, custom ramps, and full accessibility solutions throughout Miami-Dade, Broward, and Palm Beach counties. Licensed, insured, and permitted."
        phone="(305) 555-0187"
      />

      <TrustIndicators />

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Accessibility Solutions Built for Florida
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              From single-family homes to commercial properties, we design, install,
              and permit every project from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              View all services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Why South Florida Homeowners and Businesses Choose Us
              </h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed">
                With over 15 years of experience in Florida&apos;s demanding climate, we
                understand what it takes to install durable, code-compliant
                accessibility solutions that last.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Full permit management — we handle every inspection",
                  "Marine-grade materials for coastal environments",
                  "Medicaid, VA grant, and financing assistance",
                  "Same-week site assessments in most areas",
                  "Post-installation service and maintenance plans",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-300">
                    <svg
                      className="w-5 h-5 text-amber-400 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Free On-Site Assessment",
                  description:
                    "We visit your property, evaluate the space, and provide a detailed written quote — no charge.",
                },
                {
                  title: "ADA & Florida Code Compliance",
                  description:
                    "Every installation meets ADA requirements, ASME A18.1, and the Florida Building Code.",
                },
                {
                  title: "Fast Installation",
                  description:
                    "Most residential lifts are installed in one to two days. We work on your schedule.",
                },
                {
                  title: "Lifetime Support",
                  description:
                    "We stand behind our work. Annual maintenance plans and priority service for all past customers.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-gray-950 rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-base font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Areas We Serve
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              We serve communities throughout Miami-Dade, Broward, and Palm Beach
              counties with fast response times and local expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              See all service areas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={globalFaqs.slice(0, 6)}
        title="Common Questions About Platform Lifts in Florida"
        subtitle="Everything you need to know before requesting a quote."
      />

      <CTASection />
    </>
  );
}
