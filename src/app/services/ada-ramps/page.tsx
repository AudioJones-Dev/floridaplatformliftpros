import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADA Wheelchair Ramp Installation Florida | Licensed & Permitted",
  description:
    "Custom ADA wheelchair ramp installation across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties. Aluminum, wood, and modular ramps designed to meet ADA slope, width, and landing requirements.",
};

const faqs = [
  {
    question: "How long does an ADA ramp need to be?",
    answer:
      "The ADA requires a minimum 1:12 slope ratio — for every 1 inch of rise, the ramp must extend 12 inches in length. A 24-inch step requires at least a 24-foot ramp run. Additional landings are required for rises over 30 inches.",
  },
  {
    question: "What materials are ADA ramps made from?",
    answer:
      "ADA-compliant ramps can be made from aluminum, wood, concrete, or modular systems. Aluminum and modular ramps are popular for residential use because they are durable, lightweight, and can often be installed without a permit in some counties.",
  },
  {
    question: "Do I need a permit for an ADA ramp in Florida?",
    answer:
      "Permit requirements for wheelchair ramps vary by Florida county and municipality. Permanent ramps often require a building permit. We advise on permit requirements during your free site assessment.",
  },
  {
    question: "Can I get an ADA ramp for a mobile home?",
    answer:
      "Yes. Mobile home entry ramps require custom design due to the typical entry height and site constraints. We design and install ramps for manufactured and mobile homes throughout Florida.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "ADA Wheelchair Ramp Installation Florida",
  description: "Custom ADA ramp installation across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
  canonicalPath: "/services/ada-ramps",
  schemas: [
    ServiceSchema({
      name: "ADA Wheelchair Ramp Installation",
      description: "Custom ADA-compliant wheelchair ramp installation for residential and commercial properties across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      url: "/services/ada-ramps",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/ada-ramps" },
      { name: "ADA Ramps", url: "/services/ada-ramps" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "ADA Wheelchair Ramp Installation in Florida",
      subheadline:
        "Custom-built, ADA-compliant wheelchair ramps for homes, businesses, mobile homes, and commercial buildings across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      ctaText: "Book Free Site Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: `Call ${siteConfig.phone}`,
      secondaryCtaHref: `tel:${siteConfig.phoneRaw}`,
      badge: "Licensed & Insured · ADA Compliant",
    },
    {
      type: "trust-strip",
      items: ["ADA Slope Compliance", "Custom Designs", "Wood, Aluminum & Modular", "Permit Assistance", "Free Site Assessment"],
    },
    {
      type: "direct-answer",
      question: "How long does an ADA ramp need to be?",
      answer:
        "The ADA requires a 1:12 minimum slope ratio. For every 1 inch of vertical rise, the ramp must be at least 12 inches long. A 24-inch rise requires at minimum a 24-foot ramp. Handrails are required on both sides for ramps with a rise greater than 6 inches, and rest landings are required every 30 inches of rise.",
    },
    {
      type: "process",
      heading: "Our Ramp Installation Process",
      steps: [
        { step: 1, title: "Free Site Assessment", description: "We measure the entry height and evaluate the site to design a ramp that meets ADA requirements and fits your space." },
        { step: 2, title: "Material & Design Selection", description: "Choose from aluminum, pressure-treated wood, or modular ramp systems based on your budget and needs." },
        { step: 3, title: "Permit Coordination", description: "We handle permit applications where required so your ramp is fully legal and code-compliant." },
        { step: 4, title: "Installation", description: "Our licensed crew installs your ramp to ADA specifications including handrails, edge protection, and non-slip surfaces." },
        { step: 5, title: "Inspection & Handoff", description: "We walk you through the completed ramp and provide all documentation." },
      ],
    },
    {
      type: "service-area",
      heading: "Ramp Installation Service Areas",
      areas: siteConfig.serviceAreas,
    },
    {
      type: "faq",
      heading: "ADA Ramp FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free ADA Ramp Assessment",
      subtext: "Custom ramp design and installation. No obligation site visit.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryText: "View VPL Options",
      secondaryHref: "/services/vertical-platform-lifts",
    },
    {
      type: "internal-links",
      heading: "Related Pages",
      links: [
        { label: "Vertical Platform Lift Installation", href: "/services/vertical-platform-lifts" },
        { label: "Mobile Home Accessibility", href: "/services/mobile-home-accessibility" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Ready for a Custom ADA Ramp?",
      subtext: "Call or text for a free site assessment.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function ADARampsPage() {
  return <RenderPage config={pageConfig} />;
}
