import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ArticleSchema, FAQPageSchema, BreadcrumbSchema, ServiceSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertical Platform Lift Cost in Florida 2025 | Price Guide",
  description:
    "How much does a vertical platform lift cost in Florida? In 2025, most residential VPLs cost $12,000–$30,000 installed. Full breakdown of costs, factors, and tips.",
};

const faqs = [
  {
    question: "How much does a vertical platform lift cost in Florida?",
    answer:
      "In Florida, most residential vertical platform lifts cost between $12,000 and $30,000 installed, depending on lift height, site preparation, concrete pad requirements, permitting, platform size, and whether the unit is residential, commercial, or enclosed.",
  },
  {
    question: "What factors affect VPL cost in Florida?",
    answer:
      "Key cost factors include: total lift height (rise), whether an enclosed cab is required, site preparation needs (concrete pad, electrical), platform size, local permit fees (varies by county), lift brand and model, and whether the project is residential or commercial.",
  },
  {
    question: "Does Medicaid pay for a vertical platform lift in Florida?",
    answer:
      "Florida Medicaid HCBS waivers — including the iBudget waiver for individuals with developmental disabilities — may cover home modifications including VPL installation. Eligibility requires prior authorization. Contact your Medicaid case manager or support coordinator to determine whether your situation qualifies.",
  },
  {
    question: "Are there grants or programs to help pay for a VPL in Florida?",
    answer:
      "Potential funding sources include: Florida Medicaid HCBS waivers, Veterans Affairs (VA) SAH/SHA grants for qualifying veterans, USDA Rural Development home repair loans and grants, local Area Agency on Aging programs, and nonprofit accessibility assistance organizations. A free assessment with us can help you understand your options.",
  },
  {
    question: "Is a concrete pad required for a vertical platform lift?",
    answer:
      "Many vertical platform lift installations require a concrete pad for the base of the unit. Pad size and thickness depend on the lift model and local code requirements. Pad installation typically adds $500–$2,500 to the total cost.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Vertical Platform Lift Cost in Florida",
  description: "Complete cost guide for VPL installation in Florida.",
  canonicalPath: "/resources/vertical-platform-lift-cost-florida",
  schemas: [
    ArticleSchema({
      headline: "Vertical Platform Lift Cost in Florida 2025",
      description:
        "In Florida, most residential vertical platform lifts cost between $12,000 and $30,000 installed. Full breakdown of pricing factors.",
      url: "/resources/vertical-platform-lift-cost-florida",
      datePublished: "2025-01-01",
      dateModified: "2025-04-01",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Resources", url: "/resources/vertical-platform-lift-cost-florida" },
      { name: "VPL Cost Florida", url: "/resources/vertical-platform-lift-cost-florida" },
    ]),
    ServiceSchema({
      name: "Vertical Platform Lift Installation",
      description: "Professional VPL installation in Florida.",
      url: "/services/vertical-platform-lifts",
    }),
  ],
  sections: [
    {
      type: "hero",
      headline: "How Much Does a Vertical Platform Lift Cost in Florida?",
      subheadline:
        "In Florida, most residential vertical platform lifts cost between $12,000 and $30,000 installed. Get a free site assessment and custom quote from Florida Platform Lift Pros.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: "View VPL Service",
      secondaryCtaHref: "/services/vertical-platform-lifts",
      badge: "2025 Florida Price Guide",
    },
    {
      type: "trust-strip",
      items: ["Licensed Installers", "Transparent Pricing", "Free Site Assessment", "Permit Included", `Call ${siteConfig.phone}`],
    },
    {
      type: "direct-answer",
      question: "How much does a vertical platform lift cost in Florida?",
      answer:
        "In Florida, most residential vertical platform lifts cost between $12,000 and $30,000 installed, depending on lift height, site preparation, concrete pad requirements, permitting, platform size, and whether the unit is residential, commercial, or enclosed.",
    },
    {
      type: "cost",
      heading: "Vertical Platform Lift Price Breakdown (Florida)",
      items: [
        { label: "Basic Residential Open VPL (up to 5 ft rise)", range: "$12,000–$18,000" },
        { label: "Enclosed Residential VPL", range: "$18,000–$25,000" },
        { label: "Commercial VPL (ADA Title III)", range: "$20,000–$30,000+" },
        { label: "Concrete Pad Installation", range: "$500–$2,500", note: "If required" },
        { label: "Electrical Work (if needed)", range: "$300–$1,500" },
        { label: "Permit Fees", range: "$150–$800", note: "Varies by Florida county" },
        { label: "Site Preparation", range: "$200–$2,000", note: "Grading, demolition if needed" },
      ],
      disclaimer: "All prices are estimates for Florida market. Actual cost depends on site conditions, lift model, local permit requirements, and access to site. Get a free site assessment for an accurate quote.",
    },
    {
      type: "comparison",
      heading: "VPL Cost: Residential vs. Commercial",
      colA: "Residential VPL",
      colB: "Commercial VPL",
      rows: [
        { label: "Typical Cost Installed", a: "$12,000–$25,000", b: "$20,000–$30,000+" },
        { label: "ADA Standard", a: "ADA residential", b: "ADA Title III / commercial" },
        { label: "Duty Cycle", a: "Light (home use)", b: "Heavy (public use)" },
        { label: "Enclosure", a: "Optional", b: "Often required" },
        { label: "Permit Required", a: "Yes", b: "Yes" },
      ],
    },
    {
      type: "faq",
      heading: "Vertical Platform Lift Cost FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get an Accurate VPL Quote for Your Florida Property",
      subtext: "Free on-site assessment. We measure, recommend, and quote your project — no obligation.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryText: "View VPL Service Page",
      secondaryHref: "/services/vertical-platform-lifts",
    },
    {
      type: "internal-links",
      heading: "Related Pages",
      links: [
        { label: "Vertical Platform Lift Installation", href: "/services/vertical-platform-lifts" },
        { label: "Book a Free Site Assessment", href: "/book-assessment" },
        { label: "Mobile Home Accessibility", href: "/services/mobile-home-accessibility" },
        { label: "ADA Ramp Installation", href: "/services/ada-ramps" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Ready for a Custom VPL Quote?",
      subtext: "We provide free, no-obligation site assessments across South Florida.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function VPLCostPage() {
  return <RenderPage config={pageConfig} />;
}
