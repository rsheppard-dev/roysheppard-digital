import { TextLink } from "@/components/ui/text-link";

export function RelatedLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-14 sm:px-10 lg:gap-5 lg:px-35 lg:py-25">
      <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
        Related services
      </span>
      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <TextLink key={item.href} variant="underline" href={item.href}>
            {item.label}
          </TextLink>
        ))}
        <TextLink variant="underline" href="/#services">
          All services
        </TextLink>
      </div>
    </div>
  );
}
