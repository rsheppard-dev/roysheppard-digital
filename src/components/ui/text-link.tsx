import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  /** Nav item: small mono, muted, accent on hover. */
  nav: "tap-area font-mono text-[13px] uppercase tracking-[0.03em] text-muted transition-colors hover:text-accent-text",
  /** Nav CTA: mono, underlined. */
  navCta:
    "tap-area font-mono text-[13px] uppercase tracking-[0.03em] border-b-[1.5px] border-ink pb-0.75 transition-colors hover:text-accent-text hover:border-accent-text",
  /** Primary hero-style action: bold, ink, arrow, accent on hover. */
  big: "tap-area inline-flex items-center gap-2.5 font-semibold text-ink transition-colors hover:text-accent-text",
  /**
   * Prominent filled button: coral background, ink text (5.9:1 contrast —
   * passes WCAG AA; cream/white text on this coral only reaches ~3:1, which
   * fails, so text stays ink). Hover inverts to ink/cream for clear feedback.
   */
  button:
    "inline-flex items-center gap-2.5 rounded-pill bg-accent px-7 py-3.5 font-semibold text-ink transition-[color,background-color,scale] ease-out-strong hover:bg-ink hover:text-cream active:scale-[0.97]",
  /** Same shape as `button`, inverted for use on the accent-colored CTA banner (ink fill, cream text). */
  buttonInverse:
    "inline-flex items-center gap-2.5 rounded-pill bg-ink px-7 py-3.5 font-semibold text-cream transition-[color,background-color,scale] ease-out-strong hover:bg-white hover:text-ink active:scale-[0.97]",
  /** Ink button for cream pages: hovers to the brand coral, with ink text for contrast. */
  buttonDark:
    "inline-flex items-center gap-2.5 rounded-pill bg-ink px-7 py-3.5 font-semibold text-cream transition-[color,background-color,scale] ease-out-strong hover:bg-accent hover:text-ink active:scale-[0.97]",
  /** Same as `big` but for dark backgrounds. */
  bigLight:
    "tap-area inline-flex items-center gap-2.5 font-semibold text-cream transition-opacity hover:opacity-65",
  /** Secondary action: underlined text. */
  underline:
    "tap-area border-b-[1.5px] border-ink pb-0.5 font-semibold text-ink transition-colors hover:text-accent-text hover:border-accent-text",
  /** Used on the accent-colored CTA banner. */
  ctaLink:
    "tap-area border-b-2 border-ink pb-0.75 font-bold text-ink transition-opacity hover:opacity-65",
  /** Secondary/quieter link on the accent-colored CTA banner (e.g. an email fallback below the primary button). Ink, like all text on the coral. */
  ctaLinkSecondary:
    "tap-area border-b border-ink/40 pb-0.5 text-sm text-ink transition-colors hover:border-ink sm:text-base",
  /** Footer link on the dark footer. Padded so each row is a comfortable tap on a phone. */
  footer: "py-3 text-[#D8D3C6] text-sm transition-colors hover:text-cream lg:py-1.5",
} as const;

type Variant = keyof typeof variants;

type TextLinkProps = ComponentProps<typeof Link> & {
  variant: Variant;
};

export function TextLink({ variant, className = "", ...props }: TextLinkProps) {
  return <Link className={`${variants[variant]} ${className}`} {...props} />;
}
