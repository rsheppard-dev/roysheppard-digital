type Item = { title: string; description: string };

/**
 * Feature list. Open rows on a hairline rule rather than boxed cards, so the section
 * reads as a considered list instead of a grid of equal tiles. The points have no
 * order, so they carry no numbers.
 */
export function FeatureList({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-16 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-2.5 border-t border-border-tan py-7 lg:py-9">
          <h3 className="text-xl font-bold leading-snug lg:text-2xl">{item.title}</h3>
          <p className="max-w-110 text-[15px] leading-relaxed text-muted-strong lg:text-base">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
