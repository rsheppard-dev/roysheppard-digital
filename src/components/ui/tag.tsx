import Link from "next/link";

// On phones each tag stretches so every row of the list is flush on both sides,
// whatever the tag lengths; from sm up tags keep their natural width.
// With an href the tag is a link, since visitors tap these expecting them to go somewhere.
export function Tag({ children, href }: { children: React.ReactNode; href?: string }) {
  const box =
    "rounded-pill border border-dashed border-muted px-3 py-2 text-center font-mono text-[12px] text-muted-strong sm:px-4 sm:text-[13px]";

  if (!href) return <li className={`flex-auto sm:flex-none ${box}`}>{children}</li>;

  return (
    <li className="flex flex-auto sm:flex-none">
      <Link
        href={href}
        className={`${box} flex-auto transition-colors duration-150 hover:border-solid hover:border-ink hover:text-ink`}
      >
        {children}
      </Link>
    </li>
  );
}
