import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * Screen boundary measured directly from the source illustration (1448x1086,
 * border line center), as a % of the full frame image. The frame PNG
 * (ipad-mockup-white-bezel.png) has its screen area cut transparent along
 * this same boundary and everything outside the device silhouette cut
 * transparent too — only the device body (filled white) and outline stay
 * opaque, so it sits directly on the section background with no card behind
 * it, and its bezel always masks the screenshot's edges regardless of any
 * sub-pixel rounding difference here.
 */
const SCREEN = {
  top: "12.34%",
  left: "9.53%",
  width: "80.94%",
  height: "75.14%",
};

// Aspect ratio (height/width) of the screen box itself — derived from the
// same pixel measurement as SCREEN above (1172 x 816 at native scale).
const SCREEN_ASPECT = 816 / 1172;
const PREVIEW_WIDTH = 900;
const IMAGE_SIZES = "(min-width: 1024px) 380px, (min-width: 768px) 320px, 85vw";

/** How far (as % of the image's own height) a tall screenshot must pan
 * upward on hover so its bottom edge reaches the screen's bottom edge. */
function getRevealPercent(dimensions?: { width: number; height: number } | null) {
  if (!dimensions) return 0;
  const imageAspect = dimensions.height / dimensions.width;
  if (imageAspect <= SCREEN_ASPECT) return 0;
  return ((imageAspect - SCREEN_ASPECT) / imageAspect) * 100;
}

export function IPadMockup({
  screenshotSrc,
  screenshotAlt,
  screenshotDimensions,
  className = "",
}: {
  /** Optional — omit to show a neutral placeholder until a screenshot is available. */
  screenshotSrc?: string;
  screenshotAlt: string;
  /** Natural pixel dimensions of the screenshot, used to compute the hover pan distance. */
  screenshotDimensions?: { width: number; height: number } | null;
  className?: string;
}) {
  const revealPercent = getRevealPercent(screenshotDimensions);
  const previewHeight = screenshotDimensions
    ? Math.round((PREVIEW_WIDTH * screenshotDimensions.height) / screenshotDimensions.width)
    : Math.round(PREVIEW_WIDTH * SCREEN_ASPECT);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "1448 / 1086" }}
    >
      <div
        className="absolute overflow-hidden rounded-[2%] bg-tan"
        style={{
          top: SCREEN.top,
          left: SCREEN.left,
          width: SCREEN.width,
          height: SCREEN.height,
        }}
      >
        {screenshotSrc ? (
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            sizes={IMAGE_SIZES}
            style={{ "--reveal": `${revealPercent}%` } as CSSProperties}
            className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-2500 ease-in-out group-hover:-translate-y-(--reveal)"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted-soft">
            [Project screenshot]
          </div>
        )}
      </div>
      <Image
        src="/images/mockups/ipad-mockup-white-bezel.png"
        alt=""
        fill
        sizes={IMAGE_SIZES}
        className="pointer-events-none select-none"
      />
    </div>
  );
}
