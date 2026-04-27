import type { ProcessSection } from "../types";

export default function ProcessBlock({ heading, steps }: ProcessSection) {
  return (
    <section className="py-16 px-6 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">{heading}</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.step} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.step}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
