import type { ServiceAreaSection } from "../types";

const defaultMapEmbedUrl =
  "https://www.google.com/maps?q=Miami-Dade%20Broward%20Palm%20Beach%20Lee%20Collier%20Monroe%20Charlotte%20Hendry%20County%20Florida&output=embed";

export default function ServiceAreaBlock({ heading, areas, note, mapEmbedUrl }: ServiceAreaSection) {
  const googleMapUrl = mapEmbedUrl || process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || defaultMapEmbedUrl;

  return (
    <section className="bg-surface-50 px-6 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-ink-100 bg-white shadow-xl shadow-brand-900/10">
          <iframe
            src={googleMapUrl}
            title="Florida Platform Lift Pros service area on Google Maps"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div>
          <h2 className="mb-4 text-3xl font-extrabold text-brand-900">{heading}</h2>
          {note && <p className="mb-6 max-w-2xl text-base leading-7 text-ink-500">{note}</p>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <div
                key={area}
                className="rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm font-bold text-brand-800 shadow-sm"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
