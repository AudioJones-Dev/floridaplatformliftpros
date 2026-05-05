"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { siteConfig } from "@/lib/seo/metadata";

export default function BookAssessmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceNeeded: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload = {
        ...formData,
        leadSourcePage: pathname,
        utmSource: searchParams.get("utm_source"),
        utmMedium: searchParams.get("utm_medium"),
        utmCampaign: searchParams.get("utm_campaign"),
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Book Your Free Accessibility Assessment</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          We&apos;ll visit your property, evaluate your accessibility needs, and recommend the best solution — no obligation.
        </p>
        <p className="mt-4 text-blue-200 text-sm">
          Or call/text us directly:{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-yellow-300 font-bold underline">
            {siteConfig.phone}
          </a>
        </p>
      </section>

      {/* Form */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Your Free Assessment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                placeholder="(555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
              <select
                required
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a service...</option>
                <option value="vertical-platform-lift">Vertical Platform Lift</option>
                <option value="stair-lift">Stair Lift</option>
                <option value="vehicle-lift">Vehicle Lift</option>
                <option value="ada-ramp">ADA Wheelchair Ramp</option>
                <option value="mobile-home">Mobile Home Accessibility</option>
                <option value="modular-building">Modular Building ADA Access</option>
                <option value="assessment-only">Accessibility Assessment Only</option>
                <option value="other">Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                placeholder="Tell us about your property and accessibility needs..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg text-lg hover:bg-blue-800 disabled:opacity-50 transition"
            >
              {status === "loading" ? "Submitting..." : "Request Free Assessment"}
            </button>
            {status === "error" && (
              <p className="text-red-600 text-sm text-center">
                Something went wrong. Please call us at{" "}
                <a href={`tel:${siteConfig.phoneRaw}`} className="underline">
                  {siteConfig.phone}
                </a>
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
