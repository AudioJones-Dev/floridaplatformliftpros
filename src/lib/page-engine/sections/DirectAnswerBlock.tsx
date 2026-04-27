import type { DirectAnswerBlock as DirectAnswerBlockType } from "../types";

export default function DirectAnswerBlock({ question, answer }: DirectAnswerBlockType) {
  return (
    <section className="bg-yellow-50 border-l-4 border-yellow-400 py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-3">{question}</h2>
        <p className="text-gray-700 text-base leading-relaxed">{answer}</p>
      </div>
    </section>
  );
}
