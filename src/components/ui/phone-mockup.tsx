import Image from "next/image";

/**
 * A simple phone frame around a mobile screenshot. `clean` matches BrowserMockup's paper
 * card; `illustrated` draws it as ink line art (outline, white bezel, outlined screen,
 * camera dot) to match the homepage's hand-drawn iPad.
 */
export function PhoneMockup({
  screenshotSrc,
  screenshotAlt,
  sizes = "(min-width: 1024px) 300px, 30vw",
  className = "",
  variant = "clean",
}: {
  screenshotSrc: string;
  screenshotAlt: string;
  sizes?: string;
  className?: string;
  variant?: "clean" | "illustrated";
}) {
  if (variant === "illustrated") {
    // Bezel sizes use container units so they scale with the phone, not its parent.
    return (
      <div
        className={`@container relative rounded-[22px] border-2 border-ink bg-white drop-shadow-[0_16px_18px_rgba(23,23,26,0.10)] sm:rounded-[32px] lg:rounded-[40px] ${className}`}
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[3.2cqw] size-[2.6cqw] -translate-x-1/2 rounded-full bg-ink"
        />
        <div className="px-[4cqw] pb-[6cqw] pt-[9cqw]">
          <div
            className="relative w-full overflow-hidden rounded-[3.5cqw] border-[1.5px] border-ink bg-tan"
            style={{ aspectRatio: "390 / 844" }}
          >
            <Image src={screenshotSrc} alt={screenshotAlt} fill sizes={sizes} className="object-cover object-top" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-[18px] border border-border-tan bg-paper p-1 shadow-[0_12px_32px_rgba(23,23,26,0.08)] sm:rounded-[28px] sm:p-1.5 lg:rounded-[36px] lg:p-2 ${className}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-[14px] bg-tan sm:rounded-[22px] lg:rounded-[28px]"
        style={{ aspectRatio: "390 / 844" }}
      >
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
