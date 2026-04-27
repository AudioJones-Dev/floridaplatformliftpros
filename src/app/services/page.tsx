import type { Metadata } from "next";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";
import { globalFaqs } from "@/data/faq";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";

export const metadata: Metadata = {
  title: "Accessibility Services",
  description:
    "Explore our full range of accessibility services: vertical platform lifts, ADA ramps, grab bars, stair lifts, and more — installed throughout South Florida.",
  alternates: { canonical: "https://floridaplatformliftpros.com/services" },
};

export default function ServicesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  const servicesFaqs = globalFaqs.filter((f) =>
    ["General", "Products", "Installation"].includes(f.category ?? "")
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Accessibility Services
          </h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">
            ADA-compliant accessibility solutions for Florida homes and businesses.
            Every installation is fully permitted, inspected, and backed by our
            satisfaction guarantee.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Installation Process
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              We handle everything from your first call to the final inspection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Site Assessment",
                description:
                  "A certified technician visits your property to evaluate the space, measure, and discuss your needs.",
              },
              {
                step: "02",
                title: "Custom Quote",
                description:
                  "You receive a detailed written quote with product options, timeline, and complete pricing.",
              },
              {
                step: "03",
                title: "Permit & Schedule",
                description:
                  "We apply for all required permits and schedule installation at a time that works for you.",
              },
              {
                step: "04",
                title: "Install & Inspect",
                description:
                  "Our team installs your equipment and coordinates the final inspection with your local building department.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-black text-amber-500/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={servicesFaqs}
        title="Service FAQs"
        subtitle="Common questions about our installation process and products."
      />

      <CTASection />
    </>
  );
}
