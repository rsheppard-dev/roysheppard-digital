import Link from "next/link";

export function RelatedLinks({
  items,
  tone = "tan",
  costQuiz = true,
}: {
  items: { label: string; href: string }[];
  /** Band colour, so it can alternate with whichever section sits above it. */
  tone?: "tan" | "cream";
  /** Adds the website cost quiz to the list. Off on the quiz page itself. */
  costQuiz?: boolean;
}) {
  const links = [
    ...items,
    ...(costQuiz ? [{ label: "Website Cost Quiz", href: "/website-cost" }] : []),
    { label: "All Services", href: "/services" },
  ];

  return (
    <div className={`flex flex-col gap-6 border-t border-border-tan ${tone === "cream" ? "bg-cream" : "bg-tan"} px-6 py-14 sm:px-10 lg:gap-8 lg:px-35 lg:py-20`}>
      <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
        Related services
      </span>
      <ul className={`flex flex-col ${links.length > 3 ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : "sm:flex-row sm:gap-10"}`}>
        {links.map((item) => (
          <li key={item.href} className="border-t border-border-tan sm:flex-1">
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4 py-5 text-2xl font-semibold text-ink transition-colors hover:text-accent-text lg:text-[28px]"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
