import type { ComparisonSection } from "../types";

export default function ComparisonBlock({ heading, colA, colB, rows }: ComparisonSection) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{heading}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 bg-blue-900 text-white rounded-tl-lg">Feature</th>
                <th className="text-center py-3 px-4 bg-blue-900 text-white">{colA}</th>
                <th className="text-center py-3 px-4 bg-blue-900 text-white rounded-tr-lg">{colB}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 font-medium text-gray-800">{row.label}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{row.a}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
