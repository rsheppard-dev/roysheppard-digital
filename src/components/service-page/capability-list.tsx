type Capability = { title: string; description: string; benefit: string };

/**
 * What the site can do, as open rows on a hairline rule. The title sits left and the
 * description plus its practical benefit sit right, so it reads as a menu of
 * capabilities rather than the numbered list used for the build notes below it.
 */
export function CapabilityList({ items }: { items: Capability[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.title}
          className="grid grid-cols-1 gap-3 border-t border-border-tan py-7 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-9"
        >
          <h3 className="text-xl font-bold leading-snug lg:text-2xl">{item.title}</h3>
          <div className="flex max-w-130 flex-col gap-2">
            <p className="text-[15px] leading-relaxed text-muted-strong lg:text-base">{item.description}</p>
            <p className="text-[15px] font-medium leading-relaxed text-ink lg:text-base">{item.benefit}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
