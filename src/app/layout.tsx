import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { siteConfig } from "@/lib/seo/metadata";

const siteDescription =
  "ADA-compliant vertical platform lifts, wheelchair ramps, and accessibility solutions across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteDescription,
    url: siteConfig.domain,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased pb-20 md:pb-0`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
