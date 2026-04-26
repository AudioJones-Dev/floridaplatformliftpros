"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/seo/metadata";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 font-bold text-xl tracking-tight">
              FL Platform Lift Pros
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-sm text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-gray-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-amber-400 font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-gray-300 font-medium hover:text-amber-400 transition-colors"
            >
              {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-xl bg-amber-500 text-gray-950 font-semibold px-5 py-3 text-sm text-center"
              onClick={() => setOpen(false)}
            >
              Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
