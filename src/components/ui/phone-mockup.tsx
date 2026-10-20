import Image from "next/image";

/**
 * A slim phone around a mobile screenshot: a light bezel with a hairline edge, a small camera
 * pill and a soft layered shadow, matching BrowserMockup. Every size is in container units so the
 * frame keeps its proportions at any width, and the screen's lower corners are the body's radius
 * minus the side bezel, so the two curves stay parallel.
 */
export function PhoneMockup({
  screenshotSrc,
  screenshotAlt,
  sizes = "(min-width: 1024px) 300px, 30vw",
  className = "",
  loading,
}: {
  screenshotSrc: string;
  screenshotAlt: string;
  sizes?: string;
  className?: string;
  /** Pass "eager" when the phone sits above the fold, so the screenshot isn't lazy-loaded. */
  loading?: "eager" | "lazy";
}) {
  return (
    <div className={`@container ${className}`}>
      <div className="relative rounded-[14cqw] bg-white px-[3cqw] pb-[3cqw] pt-[8cqw] shadow-[0_2px_6px_rgba(23,23,26,0.06),0_18px_40px_rgba(23,23,26,0.14)] ring-1 ring-ink/10">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[3cqw] h-[2.6cqw] w-[14cqw] -translate-x-1/2 rounded-full bg-ink/80"
        />
        <div
          className="relative w-full overflow-hidden rounded-[3cqw_3cqw_11cqw_11cqw] bg-tan"
          style={{ aspectRatio: "390 / 844" }}
        >
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            // Explicit size (the screen's 390 x 844 ratio) instead of `fill`, so the
            // lazy-loaded screenshot reserves its box before it arrives.
            width={390}
            height={844}
            sizes={sizes}
            loading={loading}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
