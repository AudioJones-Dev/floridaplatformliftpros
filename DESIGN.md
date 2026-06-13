# Florida Platform Lift Pros Design System

## 1. Brand Direction

Florida Platform Lift Pros should feel practical, established, and field-ready. The logo is the visual source of truth: heavy navy lettering, teal emphasis on "Lift," gold emphasis on "Pros," and a strong horizontal gold rule. The website should translate that into a professional accessibility-contractor interface, not a generic medical site or black-and-white document theme.

The experience should feel:
- Reliable and local
- ADA-aware and safety-focused
- Industrial, clean, and easy to scan
- Warm enough for homeowners and caregivers
- Direct enough for property managers, contractors, and commercial buyers

## 2. Color Palette

### Core Brand

| Role | Token | Hex | Use |
|---|---:|---:|---|
| Deep Navy | `brand-900` | `#061F3D` | Headers, hero backgrounds, footer, primary text on light surfaces |
| Navy | `brand-800` | `#082A4F` | Secondary dark sections and hover states |
| Steel Navy | `brand-700` | `#0B3B66` | Borders, badges, navigation accents |
| Lift Teal | `lift-500` | `#1FAE9A` | Service highlights, proof points, secondary accents |
| Teal Dark | `lift-700` | `#13786D` | Text accents and hover states |
| Pros Gold | `accent-500` | `#E4A51C` | Primary CTA backgrounds, underline rules, urgent highlights |
| Gold Dark | `accent-700` | `#9B6B08` | Gold text on light backgrounds, border emphasis |

### Neutrals

| Role | Hex | Use |
|---|---:|---|
| Ink | `#17202A` | Body text |
| Muted Ink | `#596675` | Secondary copy |
| Line | `#D7E0EA` | Borders and dividers |
| Cool Surface | `#F5F8FB` | Light section backgrounds |
| White | `#FFFFFF` | Page and card surfaces |

## 3. Typography

Use the existing Geist sans-serif setup from the app. It fits the logo better than a traditional serif because the mark is bold, geometric, and contractor-oriented.

| Role | Size | Weight | Line Height | Notes |
|---|---:|---:|---:|---|
| Hero H1 | 44-56px desktop, 34-40px mobile | 800 | 1.05 | Short, high-confidence service language |
| Page H1 | 40-48px desktop, 32-36px mobile | 800 | 1.1 | SEO page titles |
| H2 | 28-36px | 750 | 1.15 | Section headers |
| H3 | 20-24px | 700 | 1.25 | Cards and subsections |
| Body | 16-18px | 400 | 1.6 | Main content |
| Small | 14px | 500 | 1.45 | Labels, metadata, helper text |

Rules:
- Keep letter spacing at `0`.
- Avoid thin type over navy backgrounds.
- Use uppercase sparingly for badges, not paragraphs.
- Keep line lengths short on service pages so visitors can scan quickly.

## 4. Components

### Primary CTA

- Background: Pros Gold `#E4A51C`
- Text: Deep Navy `#061F3D`
- Hover: lighter gold `#F0BE45`
- Radius: `8px`
- Weight: `800`
- Minimum height: `48px`

Use for "Book Free Assessment" and other conversion actions.

### Secondary CTA

- Background: transparent or white
- Text: Deep Navy on light surfaces, white on dark surfaces
- Border: `2px solid currentColor`
- Hover: filled state that preserves contrast

Use for phone, cost guide, and supporting paths.

### Header

- White background with a light cool border.
- Logo image should be the primary brand mark.
- Navigation links use muted navy/ink and shift to Deep Navy on hover.
- The assessment CTA uses gold.

### Hero

- Deep navy background.
- Gold badge and CTA.
- Teal can be used as a small accent rule or supporting badge, not as the entire section background.
- Hero should communicate the service area and phone option immediately.

### Cards

- White or Cool Surface background.
- `1px` Line border.
- `8px` radius.
- Shadows should be subtle and functional, not decorative.
- Use a gold or teal top border only when a card needs emphasis.

### Forms

- White fields with Line borders.
- Focus ring should use Lift Teal.
- Submit button should use Pros Gold.
- Error states should remain direct and accessible.

## 5. Layout Principles

- Preserve the page-engine structure and CTA requirements.
- Keep commercial pages conversion-led: CTA above the fold and shared bottom CTA at the end.
- Use full-width navy/gold sections intentionally; avoid stacking many dark blocks.
- Keep content dense enough for service buyers but broken into clear sections for homeowners.
- Avoid purely decorative graphics that compete with the logo.

## 6. Logo Usage

Primary site logo:

`/brand/florida-platform-lift-pros-logo.png`

Tagline logo:

`/brand/florida-platform-lift-pros-logo-tagline.png`

Rules:
- Use the no-tagline logo in the header.
- Use the tagline logo only where there is enough vertical room.
- Do not place the dark navy logo over a dark navy background unless it is inside a white container.
- Keep clear space around the logo. Do not crowd it with CTA buttons or service badges.

## 7. Favicon And App Icons

The public favicon set is installed at:

- `/apple-touch-icon.png`
- `/favicon-32x32.png`
- `/favicon-16x16.png`
- `/favicon.ico`
- `/site.webmanifest`
- `/android-chrome-192x192.png`
- `/android-chrome-512x512.png`

The layout metadata should keep explicit icon links so browser tabs, saved mobile shortcuts, and crawlers use the same brand assets.

## 8. Do

- Use navy as the trust foundation.
- Use gold for conversion and visual priority.
- Use teal for "Lift" moments, service highlights, and focus states.
- Keep CTAs visible and consistent.
- Preserve JSON-LD, metadata, canonical URLs, and page-engine schemas.
- Keep the phone number and email sourced from `siteConfig`.

## 9. Don't

- Do not use a black-and-white serif document theme.
- Do not introduce rainbow gradients or generic SaaS blue styling.
- Do not use coral/orange as the primary accent; gold is the brand CTA color.
- Do not remove schema scripts, canonical metadata, or required CTAs.
- Do not hard-code alternate phone numbers or email addresses.
