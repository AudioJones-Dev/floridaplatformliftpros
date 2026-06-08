import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({
  title: "Modular Building ADA Access Florida | Platform Lifts & Ramps",
  description:
    "ADA-compliant platform lifts and ramps for modular buildings, trailers, and temporary structures in Florida. Licensed installation with permit handling.",
  path: "/services/modular-trailer-ada-access",
});

const faqs = [
  {
    question: "Do modular buildings need to be ADA accessible in Florida?",
    answer:
      "In most cases, yes. If a modular building or portable classroom is used by the public or employees, ADA Title II or Title III accessibility requirements typically apply. This includes accessible entrances, which may require a lift or ramp. Requirements vary by use case and occupancy classification.",
  },
  {
    question: "What is the best ADA solution for a modular trailer?",
    answer:
      "The most common solutions for modular trailers and portable buildings are: (1) a modular aluminum ramp system for lower entry heights; or (2) a vertical platform lift for taller entries or where limited horizontal space prevents a compliant ramp run.",
  },
  {
    question: "Can a vertical platform lift be used with a temporary structure?",
    answer:
      "Yes, certain vertical platform lift models are designed for semi-permanent or relocatable installation. We can advise on the right approach based on whether your structure is permanent or temporary.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Modular Building ADA Access",
  description: "ADA access solutions for modular buildings and trailers in Florida.",
  canonicalPath: "/services/modular-trailer-ada-access",
  schemas: [
    ServiceSchema({
      name: "Modular Building ADA Access",
      description: "ADA-compliant platform lifts and ramps for modular buildings and trailers in Florida.",
      url: "/services/modular-trailer-ada-access",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/modular-trailer-ada-access" },
      { name: "Modular ADA Access", url: "/services/modular-trailer-ada-access" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "ADA Access for Modular Buildings & Trailers in Florida",
      subheadline:
        "Platform lifts and custom ramps for modular buildings, portable classrooms, office trailers, and temporary structures across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: `Call ${siteConfig.phone}`,
      secondaryCtaHref: `tel:${siteConfig.phoneRaw}`,
      badge: "Licensed & Insured · ADA Compliance Specialists",
    },
    {
      type: "trust-strip",
      items: ["Modular Structure Specialists", "Lift & Ramp Solutions", "ADA Title II & III", "Permit Handled", "Free Assessment"],
    },
    {
      type: "direct-answer",
      question: "Do modular buildings need to be ADA accessible in Florida?",
      answer:
        "Yes — in most cases. If a modular building, portable classroom, or office trailer is open to the public or used by employees, ADA accessibility requirements typically apply. This includes accessible entrances, which may require a vertical platform lift or ramp. Florida Platform Lift Pros assesses your specific structure and recommends the compliant solution.",
    },
    {
      type: "process",
      heading: "Our Process for Modular ADA Access",
      steps: [
        { step: 1, title: "Free Site Assessment", description: "We evaluate your modular building, measure the entry rise, and assess the site for lift or ramp installation." },
        { step: 2, title: "ADA Compliance Review", description: "We identify applicable ADA requirements for your structure type and occupancy." },
        { step: 3, title: "Solution Design & Quote", description: "We design the right lift or ramp system and provide a detailed quote." },
        { step: 4, title: "Permit & Installation", description: "We handle permits and complete the installation to code." },
      ],
    },
    {
      type: "service-area",
      heading: "Modular ADA Access Service Areas",
      areas: siteConfig.serviceAreas,
    },
    {
      type: "faq",
      heading: "Modular Building ADA FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free Modular ADA Access Assessment",
      subtext: "Bring your modular building into ADA compliance. Free site visit.",
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
        { label: "ADA Ramp Installation", href: "/services/ada-ramps" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Contact Us for Modular ADA Compliance",
      subtext: `We serve commercial, educational, and government clients across ${siteConfig.serviceAreaStatement}`,
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function ModularADAPage() {
  return <RenderPage config={pageConfig} />;
}
