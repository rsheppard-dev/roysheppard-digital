export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-pill border border-border bg-white px-4 py-2 font-mono text-[13px] text-muted-strong">
      {children}
    </span>
  );
}
