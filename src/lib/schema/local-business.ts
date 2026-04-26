import { siteConfig } from "@/lib/seo/metadata";

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-default.jpg`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.8198,
      longitude: -80.3295,
    },
    areaServed: [
      { "@type": "City", name: "Miami", containedIn: "Miami-Dade County, FL" },
      { "@type": "City", name: "Fort Lauderdale", containedIn: "Broward County, FL" },
      { "@type": "City", name: "Hialeah", containedIn: "Miami-Dade County, FL" },
      { "@type": "City", name: "Hollywood", containedIn: "Broward County, FL" },
      { "@type": "City", name: "Pembroke Pines", containedIn: "Broward County, FL" },
      { "@type": "City", name: "Coral Springs", containedIn: "Broward County, FL" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accessibility Solutions",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vertical Platform Lift Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "ADA Ramp Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Accessibility Installations" } },
      ],
    },
  };
}
