import type { CostSection } from "../types";

export default function CostBlock({ heading, items, disclaimer }: CostSection) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{heading}</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between border border-gray-200 rounded-lg p-4">
              <span className="font-medium text-gray-800">{item.label}</span>
              <span className="text-blue-900 font-bold">{item.range}</span>
              {item.note && <span className="text-gray-500 text-sm mt-1 sm:mt-0">{item.note}</span>}
            </div>
          ))}
        </div>
        {disclaimer && (
          <p className="mt-6 text-sm text-gray-500 text-center">{disclaimer}</p>
        )}
      </div>
    </section>
  );
}
