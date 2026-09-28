const STAR_PATH =
  "M8 .9l2.1 4.43 4.86.6-3.58 3.36.93 4.81L8 11.73 3.69 14.1l.93-4.81L1.04 5.93l4.86-.6z";

/** Five-star rating row. Drawn as SVG so every star renders identically regardless of font. */
export function Stars({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.75 text-accent ${className}`}>
      <span className="sr-only">Rated 5 out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}
