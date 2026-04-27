import { siteConfig } from "@/lib/seo/metadata";

interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
}

export function buildServiceSchema({ name, description, url }: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
    },
    areaServed: {
      "@type": "State",
      name: "Florida",
    },
    serviceType: "Accessibility Installation",
  };
}
