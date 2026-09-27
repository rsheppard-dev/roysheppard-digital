import Image from "next/image";

/** A simple phone frame around a mobile screenshot, styled to match BrowserMockup (paper bezel, tan border, soft shadow). */
export function PhoneMockup({
  screenshotSrc,
  screenshotAlt,
  sizes = "(min-width: 1024px) 300px, 30vw",
  className = "",
}: {
  screenshotSrc: string;
  screenshotAlt: string;
  sizes?: string;
  className?: string;
}) {
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
