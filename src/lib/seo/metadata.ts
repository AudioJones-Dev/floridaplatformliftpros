import type { Metadata } from "next";

const siteConfig = {
  name: "Florida Platform Lift Pros",
  tagline: "ADA Accessibility Solutions in South Florida",
  url: "https://floridaplatformliftpros.com",
  description:
    "Florida Platform Lift Pros specializes in vertical platform lift installation, ADA ramps, and accessibility solutions across Miami-Dade, Broward, and Palm Beach counties. Licensed, insured, and fully permitted.",
  phone: "(305) 555-0187",
  email: "info@floridaplatformliftpros.com",
  address: {
    street: "8250 NW 27th St",
    city: "Doral",
    state: "FL",
    zip: "33122",
  },
  social: {
    facebook: "https://facebook.com/floridaplatformliftpros",
    instagram: "https://instagram.com/floridaplatformliftpros",
  },
  licenseNumber: "CGC1234567",
};

export { siteConfig };

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata(options: GenerateMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "/",
    image,
    noIndex = false,
  } = options;

  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
