export function Eyebrow({
  children,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Render as a heading (e.g. "h2") when this label is the section's only heading-level text. */
  as?: "div" | "h2";
}) {
  return (
    <Tag className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-accent">
      {children}
    </Tag>
  );
}
