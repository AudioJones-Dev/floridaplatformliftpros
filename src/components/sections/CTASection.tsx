import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/seo/metadata";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showPhone?: boolean;
}

export function CTASection({
  title = "Ready to Make Your Space Accessible?",
  subtitle = "Get a free on-site assessment from Florida's trusted accessibility specialists. We serve Miami-Dade, Broward, and Palm Beach counties.",
  primaryCta = { label: "Request a Free Quote", href: "/contact" },
  secondaryCta,
  showPhone = true,
}: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-500/10 via-gray-900 to-gray-900 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          )}
          {showPhone && (
            <Button
              href={`tel:${siteConfig.phone}`}
              variant="outline"
              size="lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </Button>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Free estimates • Licensed &amp; insured • Permits handled
        </p>
      </div>
    </section>
  );
}
