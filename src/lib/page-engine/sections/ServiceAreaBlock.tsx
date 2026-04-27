import type { ServiceAreaSection } from "../types";

export default function ServiceAreaBlock({ heading, areas, note }: ServiceAreaSection) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{heading}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {areas.map((area) => (
            <div key={area} className="bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700">
              {area}
            </div>
          ))}
        </div>
        {note && <p className="text-gray-500 text-sm">{note}</p>}
      </div>
    </section>
  );
}
