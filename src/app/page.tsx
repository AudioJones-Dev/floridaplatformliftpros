import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import {
  LocalBusinessSchema,
  ServiceSchema,
  BreadcrumbSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Florida Platform Lift Pros | ADA Lift & Ramp Installation",
  description:
    "Florida's trusted ADA vertical platform lift and wheelchair ramp installation company. Serving Miami-Dade, Broward, Palm Beach, Lee, Collier, and more.",
};

const pageConfig: PageEngineConfig = {
  title: "Florida Platform Lift Pros",
  description: "ADA vertical platform lift and ramp installation across South Florida.",
  canonicalPath: "/",
  schemas: [
    LocalBusinessSchema(),
    BreadcrumbSchema([{ name: "Home", url: "/" }]),
    ServiceSchema({
      name: "Vertical Platform Lift Installation",
      description: "Professional ADA-compliant vertical platform lift installation in Florida.",
      url: "/services/vertical-platform-lifts",
    }),
  ],
  sections: [
    {
      type: "hero",
      headline: "Florida's Platform Lift & ADA Ramp Experts",
      subheadline: `Professional ADA-compliant vertical platform lifts, wheelchair ramps, and accessibility solutions across South and Southwest Florida. Serving ${siteConfig.serviceAreas.slice(0, 4).join(", ")}, and more.`,
      ctaText: "Book Free Site Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: "View All Services",
      secondaryCtaHref: "/services/vertical-platform-lifts",
      badge: "Licensed & Insured · Florida ADA Specialists",
    },
    {
      type: "trust-strip",
      items: [
        "Licensed & Insured",
        "ADA Compliant Installs",
        "Permit Assistance",
        "Free Site Assessments",
        "8 Counties Served",
        "Residential & Commercial",
      ],
    },
    {
      type: "service-grid",
      heading: "Our Accessibility Services",
      services: [
        {
          title: "Vertical Platform Lift Installation",
          description: "ADA-compliant platform lifts for homes, businesses, and public buildings.",
          href: "/services/vertical-platform-lifts",
        },
        {
          title: "ADA Wheelchair Ramp Installation",
          description: "Custom-built wheelchair ramps that meet ADA slope and width requirements.",
          href: "/services/ada-ramps",
        },
        {
          title: "Mobile Home Accessibility",
          description: "Lifts and ramps tailored for manufactured and mobile home entry challenges.",
          href: "/services/mobile-home-accessibility",
        },
        {
          title: "Modular Building ADA Access",
          description: "ADA access solutions for modular buildings, trailers, and temporary structures.",
          href: "/services/modular-trailer-ada-access",
        },
        {
          title: "Accessibility Site Assessments",
          description: "Free on-site evaluation to determine the best accessibility solution for your property.",
          href: "/book-assessment",
        },
        {
          title: "VPL Cost Guide",
          description: "Understand what a vertical platform lift costs in Florida before you buy.",
          href: "/resources/vertical-platform-lift-cost-florida",
        },
      ],
    },
    {
      type: "service-area",
      heading: "Areas We Serve",
      areas: siteConfig.serviceAreas,
      note: "Don't see your county? Contact us — we may still be able to help.",
    },
    {
      type: "cta",
      heading: "Ready to Improve Accessibility?",
      subtext: "Get a free site assessment and custom quote from Florida's platform lift specialists.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryText: "Call/Text Us",
      secondaryHref: `tel:${siteConfig.phoneRaw}`,
    },
    {
      type: "faq",
      heading: "Frequently Asked Questions",
      faqs: [
        {
          question: "What is a vertical platform lift?",
          answer:
            "A vertical platform lift (VPL) is an ADA-compliant mechanical lift that raises a person in a wheelchair or mobility device vertically between floor levels. Unlike traditional elevators, VPLs are open or enclosed platforms with minimal shaft construction requirements, making them ideal for porches, stages, and low-rise vertical travel.",
        },
        {
          question: "Do I need a permit for a vertical platform lift in Florida?",
          answer:
            "Yes. Most Florida jurisdictions require a building permit for vertical platform lift installation. Requirements vary by county and municipality. Florida Platform Lift Pros handles permit applications and inspections as part of our installation process.",
        },
        {
          question: "How long does an ADA ramp need to be?",
          answer:
            "ADA guidelines require a minimum 1:12 slope ratio — meaning for every 1 inch of rise, the ramp must be at least 12 inches long. For example, a 24-inch step would require at least a 24-foot ramp. Our team calculates the exact specs during your free site assessment.",
        },
        {
          question: "Can you install a lift or ramp on a mobile home?",
          answer:
            "Yes. We specialize in mobile and manufactured home accessibility. Entry heights and structural differences require custom solutions. We assess each mobile home individually to determine the safest and most code-compliant approach.",
        },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Call or Text for a Free Assessment",
      subtext: "We serve Miami-Dade, Broward, Palm Beach, Lee, Collier, and more.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function HomePage() {
  return <RenderPage config={pageConfig} />;
}
