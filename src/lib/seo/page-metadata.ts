import type { Metadata } from "next";
import { siteConfig } from "./metadata";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.domain}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
