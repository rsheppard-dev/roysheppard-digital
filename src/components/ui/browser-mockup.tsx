import type { CSSProperties } from "react";
import Image from "next/image";

const SCREEN_ASPECT = 10 / 16;
const PREVIEW_WIDTH = 1200;

/** How far (as % of the image's own height) a tall screenshot must pan
 * upward on hover so its bottom edge reaches the bottom of the viewport. */
function getRevealPercent(dimensions?: { width: number; height: number } | null) {
  if (!dimensions) return 0;
  const imageAspect = dimensions.height / dimensions.width;
  if (imageAspect <= SCREEN_ASPECT) return 0;
  return ((imageAspect - SCREEN_ASPECT) / imageAspect) * 100;
}

/**
 * A simple browser window (traffic-light dots, no address bar) around a website screenshot.
 * `clean` is the paper-card frame; `illustrated` draws it as ink line art to match the
 * homepage's hand-drawn iPad. `fit="natural"` shows the whole screenshot at its own
 * aspect ratio instead of a 16:10 viewport that pans on hover.
 */
export function BrowserMockup({
  screenshotSrc,
  screenshotAlt,
  screenshotDimensions,
  sizes = "(min-width: 1024px) 560px, 90vw",
  className = "",
  variant = "clean",
  fit = "viewport",
  pan = true,
}: {
  /** Optional — omit to show a neutral placeholder until a screenshot is available. */
  screenshotSrc?: string;
  screenshotAlt: string;
  /** Natural pixel dimensions of the screenshot, used to compute the hover pan distance. */
  screenshotDimensions?: { width: number; height: number } | null;
  sizes?: string;
  className?: string;
  variant?: "clean" | "illustrated";
  fit?: "viewport" | "natural";
  /** Scroll a tall screenshot on hover of a `group` ancestor (viewport fit only). */
  pan?: boolean;
}) {
  const illustrated = variant === "illustrated";
  const natural = fit === "natural" && screenshotDimensions;
  const revealPercent = getRevealPercent(screenshotDimensions);
  const previewHeight = screenshotDimensions
    ? Math.round((PREVIEW_WIDTH * screenshotDimensions.height) / screenshotDimensions.width)
    : Math.round(PREVIEW_WIDTH * SCREEN_ASPECT);

  return (
    <div
      className={`flex w-full flex-col overflow-hidden ${
        illustrated
          ? "rounded-[14px] border-2 border-ink bg-white drop-shadow-[0_18px_20px_rgba(23,23,26,0.10)] lg:rounded-[18px]"
          : "rounded-card border border-border-tan bg-paper shadow-[0_12px_32px_rgba(23,23,26,0.08)]"
      } ${className}`}
    >
      {illustrated ? (
        <div className="flex h-9 shrink-0 items-center gap-1.5 border-b-2 border-ink bg-white px-3.5 lg:h-11 lg:gap-2 lg:px-5">
          <span className="size-2.5 rounded-full border-[1.5px] border-ink lg:size-3" aria-hidden="true" />
          <span className="size-2.5 rounded-full border-[1.5px] border-ink lg:size-3" aria-hidden="true" />
          <span className="size-2.5 rounded-full border-[1.5px] border-ink lg:size-3" aria-hidden="true" />
        </div>
      ) : (
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border-tan bg-paper px-4">
          <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
        </div>
      )}
      <div
        className="relative w-full overflow-hidden bg-tan"
        style={{
          aspectRatio: natural
            ? `${screenshotDimensions.width} / ${screenshotDimensions.height}`
            : "16 / 10",
        }}
      >
        {screenshotSrc ? (
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            sizes={sizes}
            style={
              {
                "--reveal": `${revealPercent}%`,
                // Stated in CSS too: with `h-auto`, Chrome doesn't count the width/height
                // attributes alone as reserving space for a lazy image.
                aspectRatio: `${PREVIEW_WIDTH} / ${previewHeight}`,
              } as CSSProperties
            }
            className={`absolute inset-x-0 top-0 h-auto w-full ${
              natural || !pan ? "" : "transition-transform duration-2500 ease-in-out group-hover:-translate-y-(--reveal) motion-reduce:transition-none"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted">
            [Project screenshot]
          </div>
        )}
      </div>
    </div>
  );
}
