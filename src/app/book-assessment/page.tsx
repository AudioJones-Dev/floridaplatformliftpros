import { Suspense } from "react";
import { siteConfig } from "@/lib/seo/metadata";
import { pageMetadata } from "@/lib/seo/page-metadata";
import BookAssessmentForm from "./BookAssessmentForm";

export const metadata = pageMetadata({
  title: `Book a Free Accessibility Assessment | ${siteConfig.name}`,
  description:
    "Schedule your free, no-obligation on-site accessibility assessment across Miami-Dade, Broward, Palm Beach, Lee, and Collier counties.",
  path: "/book-assessment",
});

export default function BookAssessmentPage() {
  return (
    <Suspense fallback={null}>
      <BookAssessmentForm />
    </Suspense>
  );
}
