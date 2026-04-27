import Link from "next/link";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, React.ReactNode> = {
  lift: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18M9 21V11h6v10" />
    </svg>
  ),
  ramp: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l18-12M3 17h18M3 17V7" />
    </svg>
  ),
  accessibility: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="1.5" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v3m-3 3l-2 4m8-4l2 4m-5-4v5" />
    </svg>
  ),
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative bg-gray-900 border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 hover:bg-gray-900/80 transition-all duration-300">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 mb-6">
        {iconMap[service.icon] ?? iconMap.lift}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {service.shortDescription}
      </p>
      <ul className="space-y-2 mb-8">
        {service.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
            <svg
              className="w-4 h-4 text-amber-400 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors gap-1"
      >
        Learn more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
