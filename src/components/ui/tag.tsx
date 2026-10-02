// On phones each tag stretches so every row of the list is flush on both sides,
// whatever the tag lengths; from sm up tags keep their natural width.
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex-auto rounded-pill border border-dashed border-muted px-3 py-2 text-center font-mono text-[12px] text-muted-strong sm:flex-none sm:px-4 sm:text-[13px]">
      {children}
    </li>
  );
}
