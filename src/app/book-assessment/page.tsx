import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/seo/metadata";
import BookAssessmentForm from "./BookAssessmentForm";

export const metadata: Metadata = {
  title: `Book an Accessibility Assessment | ${siteConfig.name}`,
  description:
    "Schedule an on-site accessibility assessment. We evaluate your property and recommend the right platform lift, ADA ramp, or wheelchair lift solution for your needs.",
  openGraph: {
    title: `Book an Accessibility Assessment | ${siteConfig.name}`,
    description:
      "Schedule an on-site accessibility assessment across South and Southwest Florida.",
    url: `${siteConfig.domain}/book-assessment`,
    siteName: siteConfig.name,
    type: "website",
  },
  alternates: { canonical: `${siteConfig.domain}/book-assessment` },
};

export default function BookAssessmentPage() {
  return (
    <Suspense fallback={null}>
      <BookAssessmentForm />
    </Suspense>
  );
}
