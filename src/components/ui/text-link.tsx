import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  /** Nav item: small mono, muted, accent on hover. */
  nav: "font-mono text-[13px] uppercase tracking-[0.03em] text-muted transition-colors hover:text-accent",
  /** Nav CTA: mono, underlined. */
  navCta:
    "font-mono text-[13px] uppercase tracking-[0.03em] border-b-[1.5px] border-ink pb-0.75 transition-colors hover:text-accent hover:border-accent",
  /** Primary hero-style action: bold, ink, arrow, accent on hover. */
  big: "inline-flex items-center gap-2.5 font-semibold text-ink transition-colors hover:text-accent",
  /**
   * Prominent filled button: coral background, ink text (5.9:1 contrast —
   * passes WCAG AA; cream/white text on this coral only reaches ~3:1, which
   * fails, so text stays ink). Hover inverts to ink/cream for clear feedback.
   */
  button:
    "inline-flex items-center gap-2.5 rounded-pill bg-accent px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream",
  /** Same shape as `button`, inverted for use on the accent-colored CTA banner (ink fill, cream text). */
  buttonInverse:
    "inline-flex items-center gap-2.5 rounded-pill bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-white hover:text-ink",
  /** Same as `big` but for dark backgrounds. */
  bigLight:
    "inline-flex items-center gap-2.5 font-semibold text-cream transition-opacity hover:opacity-65",
  /** Secondary action: underlined text. */
  underline:
    "border-b-[1.5px] border-ink pb-0.5 font-semibold text-ink transition-colors hover:text-accent hover:border-accent",
  /** Used on the accent-colored CTA banner. */
  ctaLink:
    "border-b-2 border-ink pb-0.75 font-bold text-ink transition-opacity hover:opacity-65",
  /** Secondary/quieter link on the accent-colored CTA banner (e.g. an email fallback below the primary button). */
  ctaLinkSecondary:
    "border-b border-accent-soft/60 pb-0.5 text-sm text-accent-soft transition-colors hover:text-cream hover:border-cream sm:text-base",
  /** Footer link on the dark footer. */
  footer: "text-[#D8D3C6] text-sm transition-colors hover:text-cream",
} as const;

type Variant = keyof typeof variants;

type TextLinkProps = ComponentProps<typeof Link> & {
  variant: Variant;
};

export function TextLink({ variant, className = "", ...props }: TextLinkProps) {
  return <Link className={`${variants[variant]} ${className}`} {...props} />;
}
