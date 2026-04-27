import Link from "next/link";
import type { ServiceGridSection } from "../types";

export default function ServiceGridBlock({ heading, services }: ServiceGridSection) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href}
              className="block border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <span className="inline-block mt-4 text-blue-600 text-sm font-medium">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
