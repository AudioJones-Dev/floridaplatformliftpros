export interface Location {
  city: string;
  slug: string;
  county: string;
  state: string;
  description: string;
  population: string;
  zip: string;
  lat: number;
  lng: number;
  landmarks: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const locations: Location[] = [
  {
    city: "Miami",
    slug: "miami",
    county: "Miami-Dade",
    state: "FL",
    description:
      "Florida Platform Lift Pros serves Miami and the greater Miami-Dade metro area with professional vertical platform lift installation and ADA ramp solutions. We work with homeowners, businesses, hotels, and healthcare facilities throughout Miami.",
    population: "442,241",
    zip: "33101",
    lat: 25.7617,
    lng: -80.1918,
    landmarks: [
      "Brickell City Centre",
      "Wynwood Arts District",
      "Little Havana",
      "Coral Gables",
    ],
    faqs: [
      {
        question: "Do you install vertical platform lifts in Miami condos?",
        answer:
          "Yes, we install vertical platform lifts in Miami condominiums, single-family homes, and commercial buildings. We handle HOA paperwork and obtain all required Miami-Dade permits.",
      },
      {
        question: "How long does a lift installation take in Miami?",
        answer:
          "Most residential installations in Miami are completed in one to two days. Commercial projects may take two to four days depending on scope. We coordinate all inspections with Miami-Dade Building Department.",
      },
    ],
  },
  {
    city: "Fort Lauderdale",
    slug: "fort-lauderdale",
    county: "Broward",
    state: "FL",
    description:
      "Serving Fort Lauderdale and Broward County with top-rated accessibility solutions. From waterfront homes to downtown businesses, our team delivers ADA-compliant platform lifts and ramps throughout Fort Lauderdale.",
    population: "182,437",
    zip: "33301",
    lat: 26.1224,
    lng: -80.1373,
    landmarks: [
      "Las Olas Boulevard",
      "Fort Lauderdale Beach",
      "Port Everglades",
      "Wilton Manors",
    ],
    faqs: [
      {
        question: "Can you install ADA ramps on Fort Lauderdale commercial properties?",
        answer:
          "Absolutely. We install ADA-compliant ramps for restaurants, retail stores, medical offices, and all commercial properties in Fort Lauderdale. We pull all necessary Broward County permits.",
      },
      {
        question:
          "Do Fort Lauderdale waterfront homes require special lift installations?",
        answer:
          "Waterfront properties may need corrosion-resistant lift models and special foundation anchoring. We assess every site before recommending a solution and use marine-grade materials when appropriate.",
      },
    ],
  },
  {
    city: "Hialeah",
    slug: "hialeah",
    county: "Miami-Dade",
    state: "FL",
    description:
      "Hialeah residents and businesses trust Florida Platform Lift Pros for fast, affordable accessibility installations. We serve all of Hialeah including Hialeah Gardens and surrounding communities.",
    population: "233,339",
    zip: "33010",
    lat: 25.8576,
    lng: -80.2781,
    landmarks: ["Hialeah Park Racing", "Westland Mall", "Milander Park"],
    faqs: [
      {
        question: "Are vertical platform lifts affordable for Hialeah homeowners?",
        answer:
          "Yes. We offer flexible financing options for Hialeah homeowners. Many customers also qualify for Medicaid waiver funding or veterans' benefits that cover accessibility equipment.",
      },
      {
        question: "Do you service existing lifts in Hialeah?",
        answer:
          "Yes, we provide maintenance and repair services for all major vertical platform lift brands throughout Hialeah and Miami-Dade County.",
      },
    ],
  },
  {
    city: "Hollywood",
    slug: "hollywood",
    county: "Broward",
    state: "FL",
    description:
      "Florida Platform Lift Pros installs and services accessibility solutions in Hollywood, FL. From Young Circle to the Hollywood Broadwalk, we help homes and businesses become fully accessible.",
    population: "153,627",
    zip: "33020",
    lat: 26.0112,
    lng: -80.1495,
    landmarks: ["Hollywood Beach Broadwalk", "Young Circle", "Hard Rock Stadium area"],
    faqs: [
      {
        question: "Do you install lifts in Hollywood FL beach-adjacent properties?",
        answer:
          "Yes, we install lifts throughout Hollywood including beachside properties. We use corrosion-resistant materials suitable for coastal environments.",
      },
      {
        question: "How do I get a free quote for a lift in Hollywood FL?",
        answer:
          "Call us or fill out our online form to schedule a free on-site assessment in Hollywood. We typically respond within one business day.",
      },
    ],
  },
  {
    city: "Pembroke Pines",
    slug: "pembroke-pines",
    county: "Broward",
    state: "FL",
    description:
      "Pembroke Pines families and businesses rely on Florida Platform Lift Pros for safe, reliable accessibility solutions. We serve all Pembroke Pines neighborhoods and surrounding Broward communities.",
    population: "171,178",
    zip: "33024",
    lat: 26.0126,
    lng: -80.2965,
    landmarks: ["CB Smith Park", "Pines City Center", "Silver Lakes"],
    faqs: [
      {
        question: "What types of lifts are best for Pembroke Pines homes?",
        answer:
          "For most Pembroke Pines single-family homes, a vertical platform lift with a compact footprint works well. We assess your specific layout and recommend the right model.",
      },
      {
        question: "Do you handle permits in Pembroke Pines?",
        answer:
          "Yes, we handle all permit applications and inspections with the City of Pembroke Pines Building Department as part of our installation service.",
      },
    ],
  },
  {
    city: "Coral Springs",
    slug: "coral-springs",
    county: "Broward",
    state: "FL",
    description:
      "Coral Springs residents choose Florida Platform Lift Pros for expert accessibility installations. From residential lifts to commercial ADA ramps, we serve Coral Springs and northwest Broward County.",
    population: "134,394",
    zip: "33065",
    lat: 26.2709,
    lng: -80.2706,
    landmarks: ["Coral Square Mall", "Cypress Park", "City Hall"],
    faqs: [
      {
        question: "Can I get a vertical platform lift installed in my Coral Springs garage?",
        answer:
          "Yes, garage-to-living-area platform lifts are one of our most common installations in Coral Springs. We assess the garage structure and recommend the safest, most code-compliant solution.",
      },
      {
        question: "How do vertical platform lifts improve home resale value in Coral Springs?",
        answer:
          "Accessibility features appeal to a wider buyer pool and can increase marketability. Many buyers, especially retirees and multigenerational families, actively seek accessible homes.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
