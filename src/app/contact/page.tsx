import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us — Free Quote",
  description:
    "Request a free on-site accessibility assessment in South Florida. We respond within one business day. Serving Miami-Dade, Broward, and Palm Beach counties.",
  alternates: { canonical: "https://floridaplatformliftpros.com/contact" },
};

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Get Your Free Quote
          </h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">
            Fill out the form below and a member of our team will contact you within
            one business day to schedule your free on-site assessment.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Form */}
            <div>
              <div className="bg-gray-900 rounded-2xl border border-white/5 p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Request a Free Assessment
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  No obligation. We&apos;ll visit your property, evaluate the space, and
                  provide a detailed written quote.
                </p>
                <LeadForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Other Ways to Reach Us
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Phone</p>
                      <a href={`tel:${siteConfig.phone}`} className="text-amber-400 hover:text-amber-300 transition-colors text-lg font-semibold">
                        {siteConfig.phone}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Mon–Fri 8 AM – 6 PM, Sat 9 AM – 2 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Email</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-amber-400 hover:text-amber-300 transition-colors">
                        {siteConfig.email}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Address</p>
                      <p className="text-gray-400">
                        {siteConfig.address.street}<br />
                        {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Service Area</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Miami",
                    "Fort Lauderdale",
                    "Hialeah",
                    "Hollywood",
                    "Pembroke Pines",
                    "Coral Springs",
                    "Boca Raton",
                    "West Palm Beach",
                    "Miramar",
                    "Homestead",
                    "Doral",
                    "Aventura",
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {city}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-3">
                  What to Expect
                </h3>
                <ul className="space-y-2">
                  {[
                    "Response within 1 business day",
                    "Free on-site assessment",
                    "Detailed written quote",
                    "No high-pressure sales tactics",
                    "Permit management included",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
