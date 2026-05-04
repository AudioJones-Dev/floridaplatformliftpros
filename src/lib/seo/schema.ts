import { siteConfig } from "./metadata";

export function LocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: siteConfig.openingHours,
    priceRange: siteConfig.priceRange,
    areaServed: [
      ...siteConfig.serviceCounties.map((county) => ({
        "@type": "AdministrativeArea",
        name: county,
      })),
      ...siteConfig.serviceCities.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
  };
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = siteConfig.name,
}: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.domain}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: provider,
      telephone: siteConfig.phone,
      url: siteConfig.domain,
    },
    areaServed: [
      ...siteConfig.serviceCounties.map((county) => ({
        "@type": "AdministrativeArea",
        name: county,
      })),
      ...siteConfig.serviceCities.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
  };
}

export function FAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = siteConfig.name,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.domain}${url}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: authorName },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
  };
}

export function BreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.url}`,
    })),
  };
}

export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s) => ({ "@type": "HowToStep", name: s.name, text: s.text })),
  };
}

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    sameAs: [],
  };
}
