import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/book-assessment", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/vertical-platform-lifts", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/stair-lifts", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/vehicle-lifts", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/ada-ramps", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/mobile-home-accessibility", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services/modular-trailer-ada-access", changeFrequency: "monthly", priority: 0.8 },
    { path: "/resources/vertical-platform-lift-cost-florida", changeFrequency: "monthly", priority: 0.7 },
  ];

  return routes.map((r) => ({
    url: `${siteConfig.domain}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
