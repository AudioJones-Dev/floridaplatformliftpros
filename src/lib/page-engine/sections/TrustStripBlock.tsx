import type { TrustStripSection } from "../types";

export default function TrustStripBlock({ items }: TrustStripSection) {
  return (
    <section className="bg-blue-800 text-white py-4 px-6">
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-yellow-400">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
