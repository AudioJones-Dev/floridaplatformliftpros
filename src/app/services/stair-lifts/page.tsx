import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stair Lift Installation Florida | Straight & Curved Stair Lifts",
  description:
    "Professional stair lift installation across South and Southwest Florida. Straight and curved indoor and outdoor stair lifts from Harmar and Bruno. Aging-in-place specialists.",
};

const faqs = [
  {
    question: "What is a stair lift?",
    answer:
      "A stair lift is a motorized chair that travels along a rail mounted to your staircase, carrying a person safely up or down without the need to climb. Stair lifts are the most cost-effective home accessibility solution for two-story homes and are widely used for aging-in-place, post-surgery recovery, and long-term mobility needs.",
  },
  {
    question: "What is the difference between a straight and a curved stair lift?",
    answer:
      "A straight stair lift travels along a single uninterrupted flight of stairs and uses a stock rail — making it less expensive and faster to install. A curved stair lift navigates landings, turns, or spiral staircases and requires a custom-fabricated rail measured to your exact staircase. Curved units cost more and have a longer lead time but are essential where the staircase is not perfectly straight.",
  },
  {
    question: "Can a stair lift be installed outdoors?",
    answer:
      "Yes. Outdoor stair lifts are designed with weather-resistant components, sealed motors, UV-resistant covers, and corrosion-protected rails to handle Florida's humidity, salt air, and rain. Common applications include raised entry steps, pool decks, dock approaches, and elevated mobile home or porch entries.",
  },
  {
    question: "How much does a stair lift cost in Florida?",
    answer:
      "Most straight indoor stair lifts in Florida cost $3,500–$6,000 installed, including the rail, chair, battery backup, and basic install. Curved stair lifts typically range from $9,000–$18,000 because the rail is custom-fabricated. Outdoor and heavy-duty models add $1,000–$3,000 to the comparable indoor price. Final cost depends on staircase length, turn complexity, and any required electrical work.",
  },
  {
    question: "How long does stair lift installation take?",
    answer:
      "Most straight stair lifts can be installed in a single half-day visit once the unit is on hand. Curved stair lifts require staircase measurement first, then 2–4 weeks of custom rail fabrication before the install day, which itself usually takes 4–6 hours.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Stair Lift Installation Florida",
  description: "Straight and curved stair lift installation across South and Southwest Florida.",
  canonicalPath: "/services/stair-lifts",
  schemas: [
    ServiceSchema({
      name: "Stair Lift Installation",
      description:
        "Straight and curved indoor and outdoor stair lift installation across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      url: "/services/stair-lifts",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/stair-lifts" },
      { name: "Stair Lifts", url: "/services/stair-lifts" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "Straight & Curved Stair Lift Installation in Florida",
      subheadline:
        "Indoor and outdoor stair lifts from Harmar and Bruno. Aging-in-place specialists serving South and Southwest Florida — fast straight-rail installs, custom curved fabrication.",
      ctaText: "Book Free Site Assessment",
      ctaHref: "/book-assessment",
      secondaryCtaText: `Call ${siteConfig.phone}`,
      secondaryCtaHref: `tel:${siteConfig.phoneRaw}`,
      badge: "Harmar & Bruno Certified · Licensed & Insured",
    },
    {
      type: "trust-strip",
      items: [
        "Straight & Curved Models",
        "Indoor & Outdoor",
        "Harmar & Bruno Certified",
        "Same-Week Install (Straight)",
        "Free Site Assessment",
      ],
    },
    {
      type: "direct-answer",
      question: "Should I get a straight stair lift, curved stair lift, or vertical platform lift?",
      answer:
        "If your staircase has no turns or landings, a straight stair lift is the fastest and most affordable solution. If your staircase has any curve, landing, or 90° turn, you need a curved stair lift — they are custom-fabricated to your exact rail. If you use a wheelchair or cannot transfer to a stair lift seat, a vertical platform lift is the appropriate solution. Our free site assessment matches you to the right product based on your staircase, mobility needs, and budget.",
    },
    {
      type: "comparison",
      heading: "Straight vs. Curved Stair Lifts",
      colA: "Straight Stair Lift",
      colB: "Curved Stair Lift",
      rows: [
        { label: "Best For", a: "Single straight flight", b: "Turns, landings, spiral" },
        { label: "Typical Cost", a: "$3,500–$6,000", b: "$9,000–$18,000" },
        { label: "Lead Time", a: "Same week", b: "2–4 weeks (custom rail)" },
        { label: "Install Time", a: "Half-day", b: "4–6 hours after delivery" },
        { label: "Battery Backup", a: "Standard", b: "Standard" },
        { label: "Outdoor Models", a: "Available", b: "Available" },
      ],
    },
    {
      type: "process",
      heading: "Our Stair Lift Installation Process",
      steps: [
        {
          step: 1,
          title: "Free Site Assessment",
          description:
            "We measure your staircase, evaluate turns and landings, and assess electrical access to recommend the right model.",
        },
        {
          step: 2,
          title: "Model Selection & Quote",
          description:
            "Choose between Harmar and Bruno straight or curved configurations, indoor or outdoor — we provide a transparent quote with no surprises.",
        },
        {
          step: 3,
          title: "Rail Fabrication (Curved Only)",
          description:
            "For curved stair lifts, we order a custom-fabricated rail measured to your exact staircase. Lead time is typically 2–4 weeks.",
        },
        {
          step: 4,
          title: "Installation Day",
          description:
            "Our certified installers mount the rail, install the chair, wire to existing household power, and test all safety features.",
        },
        {
          step: 5,
          title: "Training & Handoff",
          description:
            "We walk you through safe operation, the battery backup system, and emergency manual lowering — and provide all warranty documentation.",
        },
      ],
    },
    {
      type: "service-area",
      heading: "Stair Lift Service Areas",
      areas: siteConfig.serviceAreas,
      note: `We install stair lifts across ${siteConfig.serviceAreaStatement}`,
    },
    {
      type: "faq",
      heading: "Stair Lift FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free Stair Lift Assessment",
      subtext: "Same-week install on most straight stair lifts. Free measurement and quote — no obligation.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
      secondaryText: "Explore VPL Options",
      secondaryHref: "/services/vertical-platform-lifts",
    },
    {
      type: "internal-links",
      heading: "Related Pages",
      links: [
        { label: "Vertical Platform Lift Installation", href: "/services/vertical-platform-lifts" },
        { label: "Vehicle Lift Installation", href: "/services/vehicle-lifts" },
        { label: "ADA Wheelchair Ramp Installation", href: "/services/ada-ramps" },
        { label: "Mobile Home Accessibility", href: "/services/mobile-home-accessibility" },
        { label: "VPL Cost Guide", href: "/resources/vertical-platform-lift-cost-florida" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Ready for a Stair Lift Installation Quote?",
      subtext: "Call or text for a free site assessment — straight and curved Harmar and Bruno lifts available.",
      ctaText: "Book Free Assessment",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function StairLiftsPage() {
  return <RenderPage config={pageConfig} />;
}
