import { Card } from "@/components/ui/card";

type Item = { title: string; description: string };

/** Numbered feature/benefit grid, matching the homepage Services section's visual pattern. */
export function NumberedList({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {items.map((item, index) => (
        <Card key={item.title} className="flex flex-col gap-3">
          <span className="font-mono text-sm font-semibold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
