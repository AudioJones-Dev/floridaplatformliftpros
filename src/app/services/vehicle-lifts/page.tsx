import RenderPage from "@/lib/page-engine/render-page";
import type { PageEngineConfig } from "@/lib/page-engine/types";
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Lift Installation Florida | Wheelchair & Scooter Lifts",
  description:
    "Wheelchair and mobility scooter vehicle lift installation across South and Southwest Florida. Hitch-mounted, interior, and platform lifts for vans, SUVs, and trucks. Free vehicle compatibility check.",
};

const faqs = [
  {
    question: "What types of vehicle lifts are available?",
    answer:
      "The three most common vehicle lift configurations are: (1) hitch-mounted exterior platform lifts that attach to a Class II or III tow receiver and carry a power chair or scooter outside the vehicle; (2) interior platform lifts that load a chair or scooter into the cargo area of an SUV or van; and (3) hybrid swing-arm lifts that lift a folded chair into the trunk. The right choice depends on the vehicle, the mobility device, and how often it's loaded.",
  },
  {
    question: "Which vehicles can have a vehicle lift installed?",
    answer:
      "Most vehicle lifts are compatible with vans, SUVs, crossovers, and pickup trucks. Hitch-mounted exterior lifts require a properly rated tow receiver — typically Class II for power chairs and Class III for heavier scooters. Interior platform lifts require sufficient cargo height and a flat load floor. Sedans generally cannot accept a platform lift but may work with a swing-arm trunk lift. We provide a free vehicle compatibility check before quoting.",
  },
  {
    question: "How much weight can a vehicle lift carry?",
    answer:
      "Standard hitch-mounted exterior lifts typically support 350–400 lbs, which covers most travel scooters and folding power chairs. Heavy-duty platform lifts support 400–600 lbs for full-size power wheelchairs. Interior platform lifts often have higher capacities but require more vehicle modification. We match the lift to the heaviest mobility device you plan to transport.",
  },
  {
    question: "How much does a vehicle lift cost installed?",
    answer:
      "Hitch-mounted exterior platform lifts typically run $1,800–$3,500 installed. Interior platform lifts for vans and SUVs range from $2,500–$5,000 depending on the vehicle and lift model. Swing-arm trunk lifts for sedans are usually $1,200–$2,200. Final cost depends on the lift brand, weight capacity, and any electrical work the vehicle requires.",
  },
  {
    question: "How long does vehicle lift installation take?",
    answer:
      "Most exterior hitch-mounted lifts can be installed in 1–2 hours. Interior platform lifts typically take 3–5 hours because they require electrical wiring and floor mounting. We can often do same-day installation once the lift is on hand and the vehicle's hitch or wiring is verified.",
  },
];

const pageConfig: PageEngineConfig = {
  title: "Vehicle Lift Installation Florida",
  description: "Wheelchair and mobility scooter vehicle lift installation across South and Southwest Florida.",
  canonicalPath: "/services/vehicle-lifts",
  schemas: [
    ServiceSchema({
      name: "Vehicle Lift Installation",
      description:
        "Wheelchair and mobility scooter vehicle lift installation for vans, SUVs, and trucks across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
      url: "/services/vehicle-lifts",
    }),
    FAQPageSchema(faqs),
    BreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/vehicle-lifts" },
      { name: "Vehicle Lifts", url: "/services/vehicle-lifts" },
    ]),
  ],
  sections: [
    {
      type: "hero",
      headline: "Wheelchair & Scooter Vehicle Lift Installation in Florida",
      subheadline:
        "Hitch-mounted exterior, interior platform, and swing-arm lifts from Harmar and Bruno. Vans, SUVs, and trucks — fast install, free compatibility check.",
      ctaText: "Book Free Compatibility Check",
      ctaHref: "/book-assessment",
      secondaryCtaText: `Call ${siteConfig.phone}`,
      secondaryCtaHref: `tel:${siteConfig.phoneRaw}`,
      badge: "Harmar & Bruno · Licensed Mobility Installers",
    },
    {
      type: "trust-strip",
      items: [
        "Vans · SUVs · Trucks",
        "Wheelchair & Scooter Lifts",
        "Harmar & Bruno",
        "Same-Day Install (Most Models)",
        "Free Compatibility Check",
      ],
    },
    {
      type: "direct-answer",
      question: "Will a vehicle lift work for my mobility device and my car?",
      answer:
        "It depends on three things: the weight and dimensions of the chair or scooter, the vehicle's tow receiver class or cargo space, and how often you plan to load and unload. Power wheelchairs and full-size scooters typically need a Class III hitch and a heavy-duty platform lift; travel scooters and folding chairs work with lighter Class II setups. Interior lifts need a van or SUV with enough cargo height. Our free compatibility check measures your chair, inspects your vehicle, and confirms which lift works before you commit to a purchase.",
    },
    {
      type: "comparison",
      heading: "Vehicle Lift Types",
      colA: "Exterior Hitch-Mounted",
      colB: "Interior Platform",
      rows: [
        { label: "Best For", a: "Sedans, SUVs, trucks", b: "Vans, large SUVs" },
        { label: "Mobility Device", a: "Scooters, folding chairs", b: "Power chairs, scooters" },
        { label: "Typical Cost Installed", a: "$1,800–$3,500", b: "$2,500–$5,000" },
        { label: "Install Time", a: "1–2 hours", b: "3–5 hours" },
        { label: "Vehicle Modification", a: "Hitch + wiring", b: "Floor mounts + wiring" },
        { label: "Weight Capacity", a: "350–400 lbs typical", b: "400–600 lbs typical" },
      ],
    },
    {
      type: "process",
      heading: "Our Vehicle Lift Installation Process",
      steps: [
        {
          step: 1,
          title: "Free Compatibility Check",
          description:
            "We measure your mobility device, inspect your vehicle's hitch class or cargo space, and confirm which lift configurations work safely.",
        },
        {
          step: 2,
          title: "Lift Selection & Quote",
          description:
            "Pick the right Harmar or Bruno model for your chair, vehicle, and frequency of use — we provide a transparent installed quote.",
        },
        {
          step: 3,
          title: "Hitch & Wiring Verification",
          description:
            "If your vehicle needs a tow hitch or trailer wiring upgrade, we coordinate that work before the lift install day.",
        },
        {
          step: 4,
          title: "Installation Day",
          description:
            "Our licensed mobility installers mount the lift, wire the controls, and test load with your actual chair or scooter.",
        },
        {
          step: 5,
          title: "Hands-On Training",
          description:
            "We walk you through loading, unloading, securing, and emergency manual operation — and provide warranty documentation.",
        },
      ],
    },
    {
      type: "service-area",
      heading: "Vehicle Lift Service Areas",
      areas: siteConfig.serviceAreas,
      note: `We install vehicle lifts across ${siteConfig.serviceAreaStatement}`,
    },
    {
      type: "faq",
      heading: "Vehicle Lift FAQ",
      faqs,
    },
    {
      type: "cta",
      heading: "Get a Free Vehicle Lift Compatibility Check",
      subtext: "Bring your chair, scooter, and vehicle — we'll match you to the right lift and quote it on the spot.",
      ctaText: "Book Free Compatibility Check",
      ctaHref: "/book-assessment",
      secondaryText: "Call/Text Us",
      secondaryHref: `tel:${siteConfig.phoneRaw}`,
    },
    {
      type: "internal-links",
      heading: "Related Pages",
      links: [
        { label: "Stair Lift Installation", href: "/services/stair-lifts" },
        { label: "Vertical Platform Lift Installation", href: "/services/vertical-platform-lifts" },
        { label: "ADA Wheelchair Ramp Installation", href: "/services/ada-ramps" },
        { label: "Mobile Home Accessibility", href: "/services/mobile-home-accessibility" },
        { label: "Book a Free Assessment", href: "/book-assessment" },
      ],
    },
    {
      type: "bottom-cta",
      heading: "Ready to Add a Vehicle Lift?",
      subtext: "Free compatibility check covers your chair, your scooter, and your vehicle — no obligation.",
      ctaText: "Book Free Compatibility Check",
      ctaHref: "/book-assessment",
    },
  ],
};

export default function VehicleLiftsPage() {
  return <RenderPage config={pageConfig} />;
}
