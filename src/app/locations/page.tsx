import type { Metadata } from "next";
import { LocationCard } from "@/components/sections/LocationCard";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { locations } from "@/data/locations";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Florida Platform Lift Pros serves Miami-Dade, Broward, and Palm Beach counties. Find your city for local pricing and availability.",
  alternates: { canonical: "https://floridaplatformliftpros.com/locations" },
};

export default function LocationsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/locations" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Service Areas
          </h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">
            We install vertical platform lifts, ADA ramps, and accessibility solutions
            throughout South Florida. Select your city for local service information.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>

          <div className="mt-14 bg-gray-900 rounded-2xl border border-white/5 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Don&apos;t See Your City?
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Our service area extends beyond the cities listed. We serve all of
              Miami-Dade, Broward, and Palm Beach counties, as well as parts of
              Collier, Monroe, and Martin counties. Contact us to confirm availability
              in your area.
            </p>
            <a
              href="/contact"
              className="inline-block mt-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-6 py-3 text-sm transition-colors"
            >
              Check Availability in Your Area
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
