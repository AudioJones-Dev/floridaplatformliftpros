export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export const globalFaqs: FAQ[] = [
  {
    question: "What is a vertical platform lift?",
    answer:
      "A vertical platform lift (VPL) is a mechanical device that raises or lowers a person in a wheelchair or with limited mobility between two levels — typically between a ground floor and a porch, deck, or second floor. Unlike elevators, VPLs do not require a pit or machine room and are ADA-compliant for rises up to 14 feet.",
    category: "General",
  },
  {
    question: "Are vertical platform lifts covered by insurance or Medicaid?",
    answer:
      "In many cases, yes. Florida Medicaid waiver programs (such as the iBudget Waiver) may cover accessibility equipment including platform lifts when medically necessary. Veterans may qualify through VA Home Improvement grants. We can provide documentation to support your insurance or benefits claim.",
    category: "Financing",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential vertical platform lift installations are completed in one to two days. ADA ramp installations typically take four to eight hours. Commercial or multi-unit projects may take two to five days. We provide a detailed timeline during your free site assessment.",
    category: "Installation",
  },
  {
    question: "Do you pull permits for lift and ramp installations?",
    answer:
      "Yes. We handle all permit applications and coordinate inspections with the relevant county or city building department as part of every installation. Permitted work protects your property and ensures code compliance.",
    category: "Installation",
  },
  {
    question: "What brands of vertical platform lifts do you install?",
    answer:
      "We install and service all major brands including Savaria, Bruno, AmeriGlide, Harmar, and custom commercial platforms. We recommend the best fit for your space, budget, and usage requirements.",
    category: "Products",
  },
  {
    question: "Do vertical platform lifts work outdoors?",
    answer:
      "Yes. Outdoor-rated vertical platform lifts are designed with weather-resistant materials, sealed motors, and UV-resistant finishes. We install outdoor lifts on porches, decks, pool areas, and commercial entryways throughout Florida.",
    category: "Products",
  },
  {
    question: "How much does a vertical platform lift cost in Florida?",
    answer:
      "Residential vertical platform lifts typically range from $8,000 to $20,000 installed, depending on height, model, and site conditions. ADA ramps range from $2,000 to $10,000 installed. We provide free, no-obligation quotes with exact pricing for your project.",
    category: "Pricing",
  },
  {
    question: "What ADA requirements apply to platform lifts?",
    answer:
      "Under ADA Section 4.11 and ASME A18.1, platform lifts used in new construction or alterations must provide a minimum platform size of 30 x 48 inches, have self-leveling capability, and meet specific door and ramp requirements. Florida Building Code Section 407 also applies. Our installations are always fully compliant.",
    category: "Compliance",
  },
  {
    question: "Do you offer maintenance and repair services?",
    answer:
      "Yes. We offer annual maintenance agreements, emergency repair service, and warranty support for all installed equipment. We also service lifts installed by other contractors.",
    category: "Service",
  },
  {
    question: "Which counties in Florida do you serve?",
    answer:
      "We primarily serve Miami-Dade, Broward, and Palm Beach counties. We also serve Collier, Monroe, and Martin counties. Contact us to confirm availability in your area.",
    category: "Service Area",
  },
];
