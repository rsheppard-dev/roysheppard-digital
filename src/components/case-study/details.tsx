import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { NumberedList } from "@/components/service-page/numbered-list";
import { Signature } from "@/components/ui/signature";
import { Stars } from "@/components/ui/stars";

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

/**
 * Desktop span for each outcome on a 6-column grid so every row is full: rows of
 * three, switching to rows of two where a lone card would otherwise be left over
 * (4 reads as 2×2, 5 as 3 + 2). On tablet an odd last card stretches full width.
 */
function outcomeSpan(count: number, index: number) {
  const tablet = count % 2 === 1 && index === count - 1 ? "sm:col-span-2 " : "";
  if (count === 1) return `${tablet}lg:col-span-6`;
  const pairs = count % 3 === 0 ? 0 : count % 3 === 2 ? 1 : 2;
  return `${tablet}${count - index <= pairs * 2 ? "lg:col-span-3" : "lg:col-span-2"}`;
}

/** Outcomes: a figure is only ever shown when the editor has entered a real one; otherwise the outcome is described in words. */
export function Outcome({ items }: { items: Result[] }) {
  const shown = items.filter((item) => item.title);
  if (shown.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
      <h2 className="text-3xl font-semibold lg:text-[42px]">The outcome</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {shown.map((item, index) => (
          <Card
            key={item._key}
            className={`flex flex-col gap-3 ${outcomeSpan(shown.length, index)}`}
          >
            {item.figure ? (
              <span className="text-[42px] font-semibold leading-none text-accent-text lg:text-[54px]">
                {item.figure}
              </span>
            ) : (
              <span className="mb-1 h-0.75 w-8 rounded-pill bg-accent" aria-hidden="true" />
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
  return (
    <div className="border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
      <figure className="flex flex-col gap-6 rounded-card bg-ink px-7 py-10 sm:px-12 lg:gap-8 lg:px-20 lg:py-18">
        <div className="flex items-start justify-between gap-6">
          <span aria-hidden="true" className="-mb-8 -mt-2 text-[96px] font-semibold leading-none text-accent">
            &ldquo;
          </span>
          <Stars size={16} className="mt-2" />
        </div>
        <blockquote className="flex max-w-220 flex-col gap-4 text-xl font-medium leading-relaxed text-cream lg:text-[28px] lg:leading-[1.45]">
          {quote
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index, all) => (
              <p key={paragraph}>
                {paragraph.trim()}
                {index === all.length - 1 && "”"}
              </p>
            ))}
        </blockquote>
        <Signature name={name} company={company} onDark />
      </figure>
    </div>
  );
}

export function NextProject({ name, meta, slug }: { name: string; meta?: string | null; slug: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-border-tan bg-tan px-6 py-12 sm:px-10 lg:px-35 lg:py-16">
      <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
        Next case study
      </span>
      <TextLink variant="big" href={`/work/${slug}`} className="group w-fit text-3xl lg:text-[42px]">
        {name}{" "}
        <span aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1.5">
          →
        </span>
      </TextLink>
      {meta && <p className="text-sm text-muted">{meta}</p>}
    </div>
  );
}
