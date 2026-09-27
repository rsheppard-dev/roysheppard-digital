import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { NumberedList } from "@/components/service-page/numbered-list";

type Feature = { _key: string; title: string | null; description: string | null };
type Technology = { _key: string; name: string | null; reason: string | null };
type Result = { _key: string; figure: string | null; title: string | null; description: string | null };

export function Features({ items }: { items: Feature[] }) {
  const shown = items.filter((item) => item.title);
  if (shown.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
      <h2 className="text-3xl font-semibold lg:text-[42px]">Key features</h2>
      <NumberedList
        items={shown.map((item) => ({ title: item.title!, description: item.description ?? "" }))}
      />
    </div>
  );
}

/** The stack, kept deliberately quiet: each tool is listed with what it does for the client, not as a badge wall. */
export function TechnologyList({ items }: { items: Technology[] }) {
  const shown = items.filter((item) => item.name);
  if (shown.length === 0) return null;

  return (
    <div className="grid gap-6 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:px-35 lg:py-25">
      <div className="flex flex-col gap-3">
        <Eyebrow as="h2">Built with</Eyebrow>
        <p className="max-w-75 text-[15px] leading-relaxed text-muted">
          Chosen for what they do for the business, not for the sake of the latest tools.
        </p>
      </div>
      <ul className="flex max-w-170 flex-col">
        {shown.map((item, index) => (
          <li
            key={item._key}
            className={`flex flex-col gap-1 border-t border-border-tan py-5 sm:flex-row sm:items-baseline sm:gap-8 ${
              index === shown.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="shrink-0 text-lg font-bold sm:w-48">{item.name}</span>
            {item.reason && (
              <span className="text-[15px] leading-relaxed text-muted">{item.reason}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Outcomes: a figure is only ever shown when the editor has entered a real one; otherwise the outcome is described in words. */
export function Outcome({ items }: { items: Result[] }) {
  const shown = items.filter((item) => item.title);
  if (shown.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
      <h2 className="text-3xl font-semibold lg:text-[42px]">The outcome</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <Card key={item._key} className="flex flex-col gap-3">
            {item.figure ? (
              <span className="text-[42px] font-semibold leading-none text-accent-text lg:text-[54px]">
                {item.figure}
              </span>
            ) : (
              <span className="text-lg text-accent" aria-hidden="true">
                ✦
              </span>
            )}
            <h3 className="text-lg font-bold">{item.title}</h3>
            {item.description && (
              <p className="text-[15px] leading-relaxed text-muted">{item.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ClientQuote({
  quote,
  name,
  company,
}: {
  quote: string;
  name?: string | null;
  company?: string | null;
}) {
  const attribution = [name?.trim(), company].filter(Boolean).join(", ");

  return (
    <div className="border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
      <figure className="flex flex-col gap-6 rounded-card bg-ink px-7 py-10 sm:px-12 lg:gap-8 lg:px-20 lg:py-18">
        <span className="text-base tracking-[2px] text-accent" aria-hidden="true">
          ★★★★★
        </span>
        <blockquote className="flex max-w-220 flex-col gap-4 text-xl font-medium leading-relaxed text-cream lg:text-[28px] lg:leading-[1.45]">
          {quote
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index, all) => (
              <p key={paragraph}>
                {index === 0 && "“"}
                {paragraph.trim()}
                {index === all.length - 1 && "”"}
              </p>
            ))}
        </blockquote>
        {attribution && (
          <figcaption className="font-mono text-xs text-[#d8d4c6] lg:text-[13px]">{attribution}</figcaption>
        )}
      </figure>
    </div>
  );
}

export function NextProject({ name, meta, slug }: { name: string; meta?: string | null; slug: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-border-tan bg-tan px-6 py-12 sm:px-10 lg:px-35 lg:py-16">
      <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
        Next case study
      </span>
      <TextLink variant="big" href={`/work/${slug}`} className="w-fit text-3xl lg:text-[42px]">
        {name} <span>→</span>
      </TextLink>
      {meta && <p className="text-sm text-muted-soft">{meta}</p>}
    </div>
  );
}
