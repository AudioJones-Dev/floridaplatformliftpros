import type { PageEngineConfig, PageSection } from "./types";
import HeroBlock from "./sections/HeroBlock";
import TrustStripBlock from "./sections/TrustStripBlock";
import DirectAnswerBlock from "./sections/DirectAnswerBlock";
import ServiceGridBlock from "./sections/ServiceGridBlock";
import ComparisonBlock from "./sections/ComparisonBlock";
import CostBlock from "./sections/CostBlock";
import ProcessBlock from "./sections/ProcessBlock";
import ServiceAreaBlock from "./sections/ServiceAreaBlock";
import FAQBlock from "./sections/FAQBlock";
import CTABlock from "./sections/CTABlock";
import BottomCTABlock from "./sections/BottomCTABlock";
import InternalLinksBlock from "./sections/InternalLinksBlock";

function renderSection(section: PageSection, idx: number) {
  switch (section.type) {
    case "hero":
      return <HeroBlock key={idx} {...section} />;
    case "trust-strip":
      return <TrustStripBlock key={idx} {...section} />;
    case "direct-answer":
      return <DirectAnswerBlock key={idx} {...section} />;
    case "service-grid":
      return <ServiceGridBlock key={idx} {...section} />;
    case "comparison":
      return <ComparisonBlock key={idx} {...section} />;
    case "cost":
      return <CostBlock key={idx} {...section} />;
    case "process":
      return <ProcessBlock key={idx} {...section} />;
    case "service-area":
      return <ServiceAreaBlock key={idx} {...section} />;
    case "faq":
      return <FAQBlock key={idx} {...section} />;
    case "cta":
      return <CTABlock key={idx} {...section} />;
    case "bottom-cta":
      return <BottomCTABlock key={idx} {...section} />;
    case "internal-links":
      return <InternalLinksBlock key={idx} {...section} />;
    default:
      return null;
  }
}

export default function RenderPage({ config }: { config: PageEngineConfig }) {
  return (
    <>
      {config.schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="min-h-screen">
        {config.sections.map((section, idx) => renderSection(section, idx))}
      </main>
    </>
  );
}
