/** Puts a marker-pen highlight behind one phrase of a heading, when the heading includes it. */
export function HighlightedHeading({
  text,
  highlight = "Watford",
}: {
  text: string;
  highlight?: string;
}) {
  const index = text.lastIndexOf(highlight);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="relative z-0 inline-block">
        {highlight}
        <span
          aria-hidden="true"
          className="absolute -left-1.5 -right-2 bottom-[0.08em] -z-10 h-[0.42em] rotate-[-1.5deg] skew-x-[-10deg] rounded-[3px_12px_5px_14px] bg-highlight"
        />
      </span>
      {text.slice(index + highlight.length)}
    </>
  );
}
