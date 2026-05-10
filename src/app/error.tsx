"use client";
import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center py-16">
        <div className="text-sm font-bold uppercase tracking-wide text-blue-900 mb-3">
          Something went wrong
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sorry — that didn&apos;t work.
        </h1>
        <p className="text-gray-700 mb-8">
          The fastest way to reach us is by phone. Call or text{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-blue-900 font-bold underline">
            {siteConfig.phone}
          </a>{" "}
          and we&apos;ll get back to you the same business day.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <button
            onClick={reset}
            className="bg-blue-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border-2 border-blue-900 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
