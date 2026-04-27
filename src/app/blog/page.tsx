import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";

export const metadata: Metadata = {
  title: "Accessibility & ADA Compliance Blog",
  description:
    "Expert guides on vertical platform lifts, ADA compliance, Medicaid funding, and accessibility solutions for Florida homeowners and businesses.",
  alternates: { canonical: "https://floridaplatformliftpros.com/blog" },
};

export default function BlogPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gray-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Accessibility Resources & Guides
          </h1>
          <p className="mt-5 text-xl text-gray-400 max-w-2xl">
            Expert articles on ADA compliance, vertical platform lifts, funding options,
            and accessibility best practices for Florida homeowners and businesses.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-gray-900 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readingTime} min read</span>
                  </div>
                  <h2 className="text-lg font-semibold text-white leading-snug mb-3 group-hover:text-amber-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-gray-500"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Read article
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Expert Advice for Your Project?"
        subtitle="Our team is happy to answer any questions. Schedule a free consultation today."
      />
    </>
  );
}
