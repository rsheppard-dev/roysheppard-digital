/** Testimonial attribution: the client's name handwritten like a sign-off, company underneath. */
export function Signature({
  name,
  company,
  onDark = false,
}: {
  name?: string | null;
  company?: string | null;
  onDark?: boolean;
}) {
  if (!name?.trim() && !company) return null;

  return (
    <figcaption className="flex flex-col gap-1">
      {name?.trim() && (
        <span className={`font-hand text-2xl leading-none ${onDark ? "text-cream" : "text-ink"}`}>
          {name.trim()}
        </span>
      )}
      {company && (
        <span className={`font-mono text-[12px] ${onDark ? "text-[#d8d4c6]" : "text-muted"}`}>{company}</span>
      )}
    </figcaption>
  );
}
