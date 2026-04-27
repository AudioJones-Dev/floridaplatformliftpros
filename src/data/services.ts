export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "vertical-platform-lifts",
    title: "Vertical Platform Lifts",
    slug: "vertical-platform-lifts",
    shortDescription:
      "ADA-compliant vertical platform lifts for residential and commercial properties across Florida.",
    fullDescription:
      "Our vertical platform lifts provide safe, reliable, and code-compliant accessibility solutions for homes, businesses, and public spaces. Designed for indoor and outdoor use, these lifts accommodate wheelchairs, scooters, and mobility devices with ease. We handle the full installation from site assessment through final inspection.",
    features: [
      "Indoor & outdoor rated models",
      "Weight capacity up to 750 lbs",
      "Travel height up to 14 feet",
      "Battery backup included",
      "Meets ASME A18.1 safety standards",
      "Custom finishes available",
    ],
    benefits: [
      "Eliminate barriers between floor levels",
      "Increase property value and marketability",
      "Comply with ADA and Florida Building Code",
      "Low maintenance and long-lasting",
    ],
    icon: "lift",
  },
  {
    id: "ada-ramps",
    title: "ADA Ramps",
    slug: "ada-ramps",
    shortDescription:
      "Custom-built ADA-compliant ramps for entrances, stages, and multi-level spaces throughout Florida.",
    fullDescription:
      "We design and install permanent and modular ADA ramps that meet all slope, width, and handrail requirements. Whether you need a residential entry ramp, a commercial loading ramp, or a temporary event ramp, our certified installers deliver safe and aesthetically clean solutions.",
    features: [
      "Slope ratios meet ADA 1:12 standard",
      "Aluminum, steel, and wood options",
      "Non-slip surface treatment",
      "Handrails and edge protection included",
      "Modular or custom-built",
      "Permitted and inspected",
    ],
    benefits: [
      "Immediate ADA compliance",
      "Durable all-weather construction",
      "Minimal footprint",
      "Fast installation timeline",
    ],
    icon: "ramp",
  },
  {
    id: "accessibility-installations",
    title: "Accessibility Installations",
    slug: "accessibility-installations",
    shortDescription:
      "Complete accessibility upgrades including grab bars, stair lifts, threshold ramps, and door widening.",
    fullDescription:
      "Beyond lifts and ramps, we offer comprehensive accessibility retrofits for homes and businesses. Our team assesses your space and recommends the most practical modifications to improve mobility, safety, and independence — from grab bar installations to door widening and zero-threshold shower conversions.",
    features: [
      "Grab bar and handrail installation",
      "Stair lift installation and service",
      "Threshold and transition ramps",
      "Doorway widening",
      "Bathroom accessibility upgrades",
      "Free on-site assessment",
    ],
    benefits: [
      "Improve safety and independence",
      "Reduce fall risk",
      "Support aging-in-place goals",
      "Tax credits may apply",
    ],
    icon: "accessibility",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
