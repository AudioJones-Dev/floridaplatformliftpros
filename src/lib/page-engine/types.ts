export interface HeroSection {
  type: "hero";
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badge?: string;
}

export interface TrustStripSection {
  type: "trust-strip";
  items: string[];
}

export interface DirectAnswerBlock {
  type: "direct-answer";
  question: string;
  answer: string;
}

export interface ServiceCardData {
  title: string;
  description: string;
  href: string;
}

export interface ServiceGridSection {
  type: "service-grid";
  heading: string;
  services: ServiceCardData[];
}

export interface ComparisonSection {
  type: "comparison";
  heading: string;
  rows: { label: string; a: string; b: string }[];
  colA: string;
  colB: string;
}

export interface CostSection {
  type: "cost";
  heading: string;
  items: { label: string; range: string; note?: string }[];
  disclaimer?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ProcessSection {
  type: "process";
  heading: string;
  steps: ProcessStep[];
}

export interface ServiceAreaSection {
  type: "service-area";
  heading: string;
  areas: string[];
  note?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  type: "faq";
  heading: string;
  faqs: FAQItem[];
}

export interface CTASection {
  type: "cta";
  heading: string;
  subtext?: string;
  ctaText: string;
  ctaHref: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export interface BottomCTASection {
  type: "bottom-cta";
  heading: string;
  subtext?: string;
  ctaText: string;
  ctaHref: string;
}

export interface InternalLinksSection {
  type: "internal-links";
  heading: string;
  links: { label: string; href: string }[];
}

export type PageSection =
  | HeroSection
  | TrustStripSection
  | DirectAnswerBlock
  | ServiceGridSection
  | ComparisonSection
  | CostSection
  | ProcessSection
  | ServiceAreaSection
  | FAQSection
  | CTASection
  | BottomCTASection
  | InternalLinksSection;

export interface JsonLdSchema {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface PageEngineConfig {
  title: string;
  description: string;
  canonicalPath: string;
  sections: PageSection[];
  schemas: JsonLdSchema[];
}
