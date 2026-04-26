export function TrustIndicators() {
  const indicators = [
    {
      value: "15+",
      label: "Years in Business",
      description: "Serving South Florida since 2008",
    },
    {
      value: "1,200+",
      label: "Installations Completed",
      description: "Residential and commercial projects",
    },
    {
      value: "100%",
      label: "Permitted & Inspected",
      description: "Every installation meets code",
    },
    {
      value: "5★",
      label: "Average Rating",
      description: "Google & Yelp verified reviews",
    },
  ];

  const badges = [
    "Licensed Contractor",
    "Fully Insured",
    "ADA Certified",
    "ASME A18.1 Compliant",
    "Free Estimates",
  ];

  return (
    <section className="py-16 bg-gray-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {indicators.map((item) => (
            <div key={item.value} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-amber-400">
                {item.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-white">{item.label}</div>
              <div className="mt-1 text-xs text-gray-500">{item.description}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300"
            >
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
