import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Florida Platform Lift Pros",
  description: "Thank you for requesting a free accessibility assessment. We'll be in touch soon.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You — We&apos;ll Be in Touch Soon!
        </h1>
        <p className="text-gray-600 mb-6">
          Your free accessibility assessment request has been received. A member of our team will contact you within 1 business day.
        </p>
        <p className="text-gray-600 mb-8">
          Need immediate assistance? Call or text us at{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-blue-900 font-bold underline">
            {siteConfig.phone}
          </a>
          {" "}or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-blue-900 underline">
            {siteConfig.email}
          </a>
          .
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
