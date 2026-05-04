import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertical Platform Lift Installation Florida | ADA VPL Experts",
  description:
    "Professional vertical platform lift installation across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties — including Fort Myers, Naples, Cape Coral, Bonita Springs, and Estero. ADA-compliant, permitted, and installed by licensed specialists.",
};

const faqs = [
  {
    question: "What is a vertical platform lift?",
    answer:
      "A vertical platform lift (VPL) is an ADA-compliant mechanical device that lifts a person in a wheelchair or mobility device vertically between levels. They are commonly installed at porches, stages, decks, and low-rise floor-level transitions as an alternative to full elevator installation.",
  },
  {
    question: "How much does a vertical platform lift cost in Florida?",
    answer:
      "In Florida, most residential vertical platform lifts cost between $12,000 and $30,000 installed, depending on lift height, site preparation, concrete pad requirements, permitting, platform size, and whether the unit is residential, commercial, or enclosed.",
  },
  {
    question: "Do I need a permit for a vertical platform lift in Florida?",
    answer:
      "Yes. Florida requires building permits for VPL installation in most jurisdictions. Permit requirements vary by county. We manage the permit process on your behalf as part of our full-service installation.",
  },
  {
    question: "Does Medicaid pay for a vertical platform lift in Florida?",
    answer:
      "Florida Medicaid's HCBS (Home and Community Based Services) waivers — including the iBudget waiver for individuals with developmental disabilities — may cover vertical platform lift installation under home modification benefits. We recommend contacting your Medicaid case manager to determine eligibility and prior authorization requirements.",
  },
  {
    question: "How long does it take to install a vertical platform lift?",
    answer:
      "Most residential VPL installations are completed in 1–3 days once permits are issued. Concrete pad curing, site preparation, and permit timelines can add 1–4 weeks to the total project timeline.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Vertical Platform Lift Installation Florida",
  description: "ADA-compliant VPL installation across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
  canonicalPath: "/services/vertical-platform-lifts",
  schemas: [
    ServiceSchema({
      name: "Vertical Platform Lift Installation",
      description:
        "ADA-compliant vertical platform lift installation for residential and commercial properties across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      url: "/services/vertical-platform-lifts",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/vertical-platform-lifts" },
      { name: "Vertical Platform Lifts", url: "/services/vertical-platform-lifts" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "Vertical Platform Lift Installation in Florida",
      subheadline:
        "ADA-compliant VPL installation for homes, commercial buildings, stages, and porches across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties. Licensed, insured, and permitted.",
      ctaText: "Book Free Site Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: "View Cost Guide",
      secondaryCtaHref: "/resources/vertical-platform-lift-cost-florida",
      badge: "Licensed & Permitted · Free Assessments",
    },
    {
      type: "trust-strip",
      items: [
        "ADA Compliant",
        "Permit Included",
        "Residential & Commercial",
        "Free Site Assessment",
        `Call ${siteConfig.phone}`,
      ],
    },
    {
      type: "direct-answer",
      question: "What is a vertical platform lift?",
      answer:
        "A vertical platform lift (VPL) is an ADA-compliant mechanical device that moves a wheelchair user or person with limited mobility vertically between floor levels. Unlike elevators, VPLs require minimal shaft construction, making them ideal for existing homes, churches, stages, porches, and commercial entries. They are available in open, enclosed, residential, and commercial configurations.",
    },
    {
      type: "service-grid",
      heading: "Who Uses Vertical Platform Lifts?",
      services: [
        {
          title: "Residential Homes",
          description: "Access raised entries, porches, decks, and multi-level interiors without major construction.",
          href: "/book-assessment",
        },
        {
          title: "Commercial Buildings",
          description: "ADA Title III compliance for retail, churches, restaurants, and offices.",
          href: "/book-assessment",
        },
        {
          title: "Mobile Homes",
          description: "Specialized lifts for manufactured home entry elevations.",
          href: "/services/mobile-home-accessibility",
        },
        {
          title: "Stages & Platforms",
          description: "Stage lifts for performers and speakers using mobility devices.",
          href: "/book-assessment",
        },
        {
          title: "Modular Buildings",
          description: "ADA access for temporary and modular structures.",
          href: "/services/modular-trailer-ada-access",
        },
        {
          title: "Public Facilities",
          description: "Municipal buildings, parks, and public facilities requiring ADA upgrades.",
          href: "/book-assessment",
        },
      ],
    },
    {
      type: "comparison",
      heading: "Vertical Platform Lift vs. Traditional Elevator",
      colA: "Vertical Platform Lift",
      colB: "Traditional Elevator",
      rows: [
        { label: "Installation Cost", a: "$12,000–$30,000", b: "$20,000–$100,000+" },
        { label: "Construction Required", a: "Minimal", b: "Significant shaft/pit work" },
        { label: "Travel Height", a: "Up to 14 ft", b: "Unlimited" },
        { label: "Permit Required", a: "Yes", b: "Yes" },
        { label: "ADA Compliant", a: "Yes", b: "Yes" },
        { label: "Install Time", a: "1–3 days", b: "Weeks to months" },
      ],
    },
    {
      type: "process",
      heading: "Our Installation Process",
      steps: [
        { step: 1, title: "Free Site Assessment", description: "We visit your property to evaluate the site, measure the rise, assess the structural requirements, and recommend the right lift model." },
        { step: 2, title: "Custom Quote & Design", description: "We provide a detailed quote that includes equipment, concrete pad (if needed), permit fees, and installation labor." },
        { step: 3, title: "Permit Application", description: "Our team handles the building permit application with your local Florida jurisdiction." },
        { step: 4, title: "Site Preparation", description: "We complete any needed site prep including concrete pad pours, electrical work coordination, and structural reinforcement." },
        { step: 5, title: "Lift Installation & Inspection", description: "Our licensed crew installs the lift and schedules all required county and state inspections." },
        { step: 6, title: "Training & Handoff", description: "We walk you through operating the lift safely and provide all documentation." },
      ],
    },
    {
      type: "cost",
      heading: "Vertical Platform Lift Cost in Florida",
      items: [
        { label: "Basic Residential VPL", range: "$12,000–$18,000", note: "Open platform, short rise" },
        { label: "Enclosed Residential VPL", range: "$18,000–$25,000", note: "Enclosed cab with doors" },
        { label: "Commercial VPL", range: "$20,000–$30,000+", note: "Higher duty cycle, code requirements" },
        { label: "Concrete Pad (if needed)", range: "$500–$2,500" },
        { label: "Permit Fees", range: "$150–$800", note: "Varies by county" },
      ],
      disclaimer: "Pricing is an estimate range. Final cost depends on site conditions, lift model, local permit requirements, and site prep needs. Contact us for a free site assessment and custom quote.",
    },
    {
      type: "service-area",
      heading: "Vertical Platform Lift Installation Areas",
      areas: siteConfig.serviceAreas,
      note: `We serve residential and commercial clients across ${siteConfig.serviceAreaStatement}`,
    },
    {
      type: "faq",
      heading: "Vertical Platform Lift FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free Vertical Platform Lift Assessment",
      subtext: "We evaluate your site, explain your options, and provide a detailed quote — no obligation.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryText: "View Cost Guide",
      secondaryHref: "/resources/vertical-platform-lift-cost-florida",
    },
    {
      type: "internal-links",
      heading: "Related Pages",
      links: [
        { label: "VPL Cost Guide for Florida", href: "/resources/vertical-platform-lift-cost-florida" },
        { label: "Mobile Home Accessibility", href: "/services/mobile-home-accessibility" },
        { label: "ADA Wheelchair Ramp Installation", href: "/services/ada-ramps" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Call or Text to Schedule Your VPL Assessment",
      subtext: `Serving ${siteConfig.serviceAreaStatement}`,
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function VPLPage() {
  return <RenderPage config={pageConfig} />;
}
