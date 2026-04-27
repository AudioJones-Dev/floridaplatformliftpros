import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/seo/metadata";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  badge?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  phone?: string;
}

export function HeroSection({
  headline,
  subheadline,
  badge,
  primaryCta = { label: "Request a Free Quote", href: "/contact" },
  secondaryCta = { label: "Book a Call", href: `tel:${siteConfig.phone}` },
  phone,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 sm:py-28 lg:py-36">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {badge && (
            <div className="mb-6">
              <Badge>{badge}</Badge>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {headline}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
          {phone && (
            <p className="mt-6 text-sm text-gray-500">
              Or call us directly:{" "}
              <a
                href={`tel:${phone}`}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                {phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
