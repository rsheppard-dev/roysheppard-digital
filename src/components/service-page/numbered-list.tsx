type Item = { title: string; description: string };

/**
 * Numbered feature/benefit list. Open rows on a hairline rule rather than boxed cards,
 * so the section reads as a considered list instead of a grid of equal tiles.
 */
export function NumberedList({ items }: { items: Item[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-16 sm:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-border-tan py-7 lg:gap-x-7 lg:py-9"
        >
          <span className="row-span-2 font-mono text-sm font-semibold text-accent-text lg:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold lg:text-xl">{item.title}</h3>
          <p className="max-w-110 text-[15px] leading-relaxed text-muted-strong">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
