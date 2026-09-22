import { Card } from "@/components/ui/card";
import { TextLink } from "@/components/ui/text-link";

type ProjectEvidenceProps = {
  eyebrow: string;
  name: string;
  meta: string;
  url: string;
  contribution: string[];
  quote: string;
  quoteName: string;
  quoteCompany: string;
};

/**
 * Pairs a real project (name, meta, contribution, live link) with a
 * separately-attributed client testimonial. The two aren't always the same
 * client — the label on each half keeps that distinction clear rather than
 * implying the quote is about the project shown.
 */
export function ProjectEvidence({
  eyebrow,
  name,
  meta,
  url,
  contribution,
  quote,
  quoteName,
  quoteCompany,
}: ProjectEvidenceProps) {
  return (
    <div className="px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
      <Card className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
            {eyebrow}
          </span>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-sm text-muted-soft">{meta}</p>
          <ul className="mt-1 flex flex-col gap-1.5 text-[15px] leading-relaxed text-muted">
            {contribution.map((line) => (
              <li key={line}>— {line}</li>
            ))}
          </ul>
          <TextLink
            variant="underline"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-fit text-sm"
          >
            Visit the live site →
          </TextLink>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 border-t border-border-tan pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
            What clients say
          </span>
          <span className="text-base tracking-[2px] text-accent" aria-hidden="true">
            ★★★★★
          </span>
          <p className="text-[17px] font-medium leading-relaxed text-[#33312A]">
            &ldquo;{quote}&rdquo;
          </p>
          <span className="font-mono text-[13px] text-muted">
            {quoteName}, {quoteCompany}
          </span>
        </div>
      </Card>
    </div>
  );
}
