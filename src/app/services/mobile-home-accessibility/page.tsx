import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Home Accessibility Lifts & Ramps Florida | Platform Lift Pros",
  description:
    "Wheelchair lifts and ADA ramps for mobile and manufactured homes in Florida. Custom accessibility solutions for elevated mobile home entries.",
};

const faqs = [
  {
    question: "Can you put a wheelchair lift on a mobile home?",
    answer:
      "Yes. Vertical platform lifts and modular ramp systems can be installed on manufactured and mobile homes. The approach depends on the entry height, existing porch structure, and site conditions. We assess each mobile home individually to design the safest, most code-compliant solution.",
  },
  {
    question: "What accessibility options are available for mobile homes?",
    answer:
      "The main options for mobile home accessibility are: (1) a vertical platform lift for entries with a rise of 2–10+ feet; (2) a modular aluminum or wood ramp for rises up to about 2–3 feet; or (3) a combination of a small platform lift with a short approach ramp. The best solution depends on the entry height, available space, and budget.",
  },
  {
    question: "Do mobile home accessibility projects require permits in Florida?",
    answer:
      "Generally yes. Permanent lifts and ramps on mobile homes typically require a building permit in Florida, though requirements vary by county. We manage the permitting process for all our installations.",
  },
  {
    question: "Does Medicaid pay for mobile home accessibility modifications?",
    answer:
      "Florida Medicaid HCBS waivers may cover home modification benefits including accessibility lifts and ramps. Eligibility depends on the specific waiver program and individual circumstances. Contact your Medicaid case manager or support coordinator to explore prior authorization.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Mobile Home Accessibility",
  description: "Wheelchair lifts and ramps for mobile and manufactured homes in Florida.",
  canonicalPath: "/services/mobile-home-accessibility",
  schemas: [
    ServiceSchema({
      name: "Mobile Home Accessibility",
      description: "Wheelchair lifts and ADA ramps for manufactured and mobile homes in Florida.",
      url: "/services/mobile-home-accessibility",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/mobile-home-accessibility" },
      { name: "Mobile Home Accessibility", url: "/services/mobile-home-accessibility" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "Mobile Home Accessibility Solutions in Florida",
      subheadline:
        "Wheelchair lifts, platform lifts, and ADA ramps designed specifically for manufactured and mobile home entries across South and Southwest Florida.",
      ctaText: "Book Free Site Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: `Call ${siteConfig.phone}`,
      secondaryCtaHref: `tel:${siteConfig.phoneRaw}`,
      badge: "Manufactured Home Specialists · Licensed & Insured",
    },
    {
      type: "trust-strip",
      items: ["Mobile Home Specialists", "Lift & Ramp Options", "Permit Handled", "Custom Site Assessment", "South Florida Coverage"],
    },
    {
      type: "direct-answer",
      question: "Can you put a wheelchair lift on a mobile home?",
      answer:
        "Yes. Vertical platform lifts can be installed at mobile and manufactured home entries, even at elevated entry heights of 3–10+ feet. The solution depends on the specific entry structure, available landing space, and ground conditions. Our team assesses your mobile home individually to determine whether a vertical lift, modular ramp, or combination approach is the right fit.",
    },
    {
      type: "comparison",
      heading: "Mobile Home Accessibility Options",
      colA: "Vertical Platform Lift",
      colB: "Modular Ramp System",
      rows: [
        { label: "Best For", a: "Rises 2 ft+", b: "Rises up to ~2.5 ft" },
        { label: "Space Required", a: "Small footprint", b: "Long run required" },
        { label: "Cost Range", a: "$12,000–$25,000", b: "$1,500–$8,000" },
        { label: "Permit Required", a: "Usually yes", b: "Sometimes" },
        { label: "Weight Capacity", a: "500–750 lbs", b: "600–800 lbs" },
      ],
    },
    {
      type: "process",
      heading: "How We Approach Mobile Home Accessibility",
      steps: [
        { step: 1, title: "Free Site Assessment", description: "We visit your mobile home to measure entry height, evaluate the existing structure, and assess site conditions." },
        { step: 2, title: "Solution Recommendation", description: "Based on your entry height, budget, and space, we recommend the best lift or ramp solution." },
        { step: 3, title: "Permit & Approval", description: "We handle permit applications with your county." },
        { step: 4, title: "Installation", description: "Our licensed crew completes the installation safely and to code." },
        { step: 5, title: "Final Inspection", description: "All required inspections are scheduled and passed before handoff." },
      ],
    },
    {
      type: "service-area",
      heading: "Mobile Home Service Areas",
      areas: siteConfig.serviceAreas,
    },
    {
      type: "faq",
      heading: "Mobile Home Accessibility FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free Mobile Home Accessibility Assessment",
      subtext: "We assess your mobile home and recommend the right solution.",
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
        { label: "ADA Wheelchair Ramp Installation", href: "/services/ada-ramps" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Call or Text for a Free Mobile Home Assessment",
      subtext: "We solve mobile home accessibility challenges across South Florida.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function MobileHomeAccessibilityPage() {
  return <RenderPage config={pageConfig} />;
}
