import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata({
  title: "Thank You | Florida Platform Lift Pros",
  description: "Thank you for requesting a free accessibility assessment. We'll be in touch soon.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center py-16">
        <div className="mb-4 flex justify-center">
          <span
            aria-hidden
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 text-green-700"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You — We&apos;ll Be in Touch Soon!
        </h1>
        <p className="text-gray-700 mb-8">
          Your free accessibility assessment request has been received. A member of our team will contact you within 1 business day.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">What Happens Next</h2>
          <ol className="space-y-3 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center">1</span>
              <span>
                <strong>Review.</strong> We review your request and the property details you provided to match you with the right specialist.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center">2</span>
              <span>
                <strong>Contact.</strong> We&apos;ll call or text you within 1 business day to confirm details and answer any initial questions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center">3</span>
              <span>
                <strong>Schedule.</strong> We schedule your free on-site assessment at a time that works for you. No obligation, no pressure.
              </span>
            </li>
          </ol>
        </div>

        <p className="text-gray-700 mb-2">
          Need immediate assistance? Call or text us at{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-blue-900 font-bold underline">
            {siteConfig.phone}
          </a>
        </p>
        <p className="text-gray-700 mb-8">
          Or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-blue-900 underline">
            {siteConfig.email}
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-blue-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition">
            Return Home
          </Link>
          <Link href="/services/vertical-platform-lifts" className="border border-blue-900 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            Learn About Our Services
          </Link>
        </div>
      </div>
    </main>
  );
}
