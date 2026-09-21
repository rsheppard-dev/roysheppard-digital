export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-border bg-white p-9 ${className}`}
    >
      {children}
    </div>
  );
}
