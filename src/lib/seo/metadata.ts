const serviceCounties = [
  "Miami-Dade County",
  "Broward County",
  "Palm Beach County",
  "Lee County",
  "Collier County",
];

const serviceCities = [
  "Fort Myers",
  "Naples",
  "Cape Coral",
  "Bonita Springs",
  "Estero",
  "Lehigh Acres",
  "North Fort Myers",
];

// Strip a trailing slash so callers can do `${siteConfig.domain}${path}` safely.
const rawDomain = process.env.NEXT_PUBLIC_SITE_URL ?? "https://floridaplatformliftpros.com";
const domain = rawDomain.replace(/\/+$/, "");

export const siteConfig = {
  name: "Florida Platform Lift Pros",
  domain,
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "954-613-9330",
  phoneRaw: "9546139330",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "contact@floridaplatformliftpros.com",
  address: {
    streetAddress: "", // intentionally omitted — service-area business with no fixed public storefront
    addressLocality: "Fort Lauderdale",
    addressRegion: "FL",
    postalCode: "33301",
    addressCountry: "US",
  },
  geo: { latitude: 26.1224, longitude: -80.1373 },
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
  serviceCounties,
  serviceCities,
  // Combined county + city list for components that render flat lists
  // (footer, ServiceAreaBlock grid). JSON-LD helpers split by type.
  serviceAreas: [...serviceCounties, ...serviceCities],
  // Verbatim service-area statement — use where a single-paragraph description
  // is appropriate (footer, hero subhead, About-style trust block).
  serviceAreaStatement:
    "Miami-Dade, Broward, Palm Beach, Lee, and Collier counties, including Fort Myers, Naples, Cape Coral, Bonita Springs, Estero, and surrounding Southwest Florida communities.",
  services: [
    "Vertical Platform Lift Installation",
    "Stair Lift Installation",
    "Vehicle Lift Installation",
    "ADA Wheelchair Ramp Installation",
    "Mobile Home Accessibility",
    "Modular Building ADA Access",
    "Accessibility Site Assessments",
  ],
};
