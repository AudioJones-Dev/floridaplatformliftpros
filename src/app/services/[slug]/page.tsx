import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { services, getServiceBySlug } from "@/data/services";
import { buildServiceSchema } from "@/lib/schema/service";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: {
      canonical: `https://floridaplatformliftpros.com/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.fullDescription,
    url: `/services/${service.slug}`,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{service.title}</h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-5">About This Service</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{service.fullDescription}</p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-5">Key Features</h2>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-8 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-gray-400 text-sm">
                      <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-3">Get a Free Quote</h3>
                <p className="text-sm text-gray-400 mb-5">
                  Contact us today for a free on-site assessment and written quote.
                </p>
                <a
                  href="/contact"
                  className="block text-center rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-5 py-3 text-sm transition-colors"
                >
                  Request a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
