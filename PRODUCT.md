# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of small businesses in Watford and nearby towns (Bushey, St Albans, Rickmansworth and similar), with national UK work as a secondary market. So far: trades, estate agency, barbering, property maintenance, B2B suppliers, corporate clothing. Mostly not technical. They are deciding whether to hire one person to design and build their website, and they are afraid of ending up with a template site that looks like everyone else's, a slow site that breaks on mobile, being stuck calling the developer for every change, unclear costs, and being left alone after launch.

## Product Purpose

The personal site of Roy Sheppard, a solo freelance web designer and developer based in Watford. It exists to win new clients: show the work, explain the three services (web design, web development, e-commerce), and get a visitor to start a project, ask for the free website review, or call. Success is roughly one new client a month.

## Positioning

One person from first call to support after launch, who designs the site around the business (never a template) and specialises in the bespoke functionality it needs, with content the client can edit themselves.

## Operating Context

Content is edited in Sanity Studio and rendered by a Next.js site. Pages are shared chrome (nav, closing CTA, footer) plus a service or index body. Local SEO matters: service pages are named by town, the sitemap and structured data follow Sanity edit dates, and `site-brief.md` at the repo root is the source for audience, proof limits and voice.

## Capabilities and Constraints

- Services: web design, web development, e-commerce (online shops that sell, on Shopify or a custom build). Lead with selling online, not trade catalogues. SEO work is offered but not led with.
- Home address is never published anywhere.
- Never promise page 1 of Google or invent results, percentages or a count of sites built.
- No certifications, awards or memberships to claim.
- Page copy lives in Sanity, with code fallbacks only where a page must build before its document exists.
- Platform is a Next.js version with breaking changes; read `node_modules/next/dist/docs/` before writing code (see AGENTS.md).

## Brand Commitments

- Voice: no long dashes, and never "cheap", "affordable", "agency", "guru", "game-changer", "full-stack", or hype superlatives ("best", "#1", "world class", "leading"). Never say Roy works with or for agencies.
- Say "custom-built" or "built around your business". Never "hand-coded", "from scratch" or similar, and no mentions of AI or development tools in marketing copy.
- Roy is shown as one illustrated character, drawn only from the master character sheet; the rules are in CLAUDE.md.
- Visual identity is the existing paper-and-ink look with the orange accent and lime highlighter; extend it rather than replace it.

## Evidence on Hand

- Live case studies at /work: Kingsley Estates, LH Plumbing & Heating, Product Zone (a B2B catalogue, not e-commerce), Go 2 Maintenance. Flame Corporate Clothing is drafted, not published.
- Named 5 out of 5 testimonials on the homepage.
- Google Business Profile with 6 reviews; reviews are the largest local gap.
- Absent, do not fabricate: measurable results, a baseline to compare against, an exact number of sites built.

## Product Principles

- Show proof from real client work before making claims.
- Plain, specific language for non-technical owners; lead with the benefit, name the stack only where it helps.
- Every page ends on one clear next step: start a project, or the free review.
- Local first: be unmistakably a Watford freelancer, without exposing where Roy lives.
- Accuracy over polish: nothing on the site that Roy hasn't confirmed.

## Accessibility & Inclusion

Aim for WCAG AA: text contrast, visible focus, keyboard-operable menus, reduced-motion respected, comfortable tap targets on phones.
