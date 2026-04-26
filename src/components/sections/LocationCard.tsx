import Link from "next/link";
import { Location } from "@/data/locations";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex flex-col bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-gray-900/80 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
            {location.city}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {location.county} County, {location.state}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">
        {location.description}
      </p>
      <div className="mt-4 pt-4 border-t border-white/5">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
          View local services →
        </span>
      </div>
    </Link>
  );
}
