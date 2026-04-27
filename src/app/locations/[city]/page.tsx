import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { locations, getLocationBySlug } from "@/data/locations";
import { services } from "@/data/services";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildFAQSchema } from "@/lib/schema/faq";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { siteConfig } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  return {
    title: `Vertical Platform Lifts in ${location.city}, FL`,
    description: `Florida Platform Lift Pros installs ADA-compliant vertical platform lifts and ramps in ${location.city}, ${location.county} County. Free estimates, fully permitted.`,
    alternates: {
      canonical: `https://floridaplatformliftpros.com/locations/${city}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const lbSchema = {
    ...buildLocalBusinessSchema(),
    areaServed: {
      "@type": "City",
      name: location.city,
      containedIn: `${location.county} County, FL`,
    },
  };

  const faqSchema = buildFAQSchema(location.faqs);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/locations" },
    { name: location.city, url: `/locations/${location.slug}` },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/locations" }, { label: location.city }]} />
          <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-4">
            {location.county} County · {location.state}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Vertical Platform Lifts in {location.city}, FL
          </h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">
            {location.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-block rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-8 py-4 text-lg transition-colors"
            >
              Request a Free Quote in {location.city}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-950 font-semibold px-8 py-4 text-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10">
            Accessibility Services in {location.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Locally */}
      <section className="py-20 bg-gray-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Trusted by {location.city} Homeowners and Businesses
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Florida Platform Lift Pros has been the go-to accessibility contractor
              in {location.city} for over 15 years. We understand local building codes,
              work directly with the {location.county} County Building Department, and
              have completed hundreds of installations throughout the area.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                `Licensed in ${location.county} County`,
                "Fully insured and bonded",
                "Same-week site assessments",
                "All permits pulled & managed",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 bg-gray-950 rounded-xl p-4 border border-white/5"
                >
                  <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <FAQSection
        faqs={location.faqs}
        title={`Platform Lift FAQs for ${location.city}`}
        subtitle={`Common questions from ${location.city} residents and business owners.`}
      />

      <CTASection
        title={`Ready to Improve Accessibility in ${location.city}?`}
        subtitle={`Contact Florida Platform Lift Pros for a free on-site assessment in ${location.city}. We handle everything from quote to final inspection.`}
      />
    </>
  );
}
