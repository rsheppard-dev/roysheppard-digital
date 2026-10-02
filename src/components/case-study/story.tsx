import { Eyebrow } from "@/components/ui/eyebrow";

type Chapter = {
  title: string;
  text?: string | null;
  /** Show the first paragraph as a larger lead-in (used for the challenge and solution). */
  lead?: boolean;
};

/** Splits a plain-text Studio field into paragraphs on blank lines. */
function toParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/** The written case study (client, challenge, solution) as editorial rows: label on the left, copy on the right. */
export function Story({ chapters }: { chapters: Chapter[] }) {
  const shown = chapters.filter((chapter) => chapter.text);
  if (shown.length === 0) return null;

  return (
    <div className="flex flex-col bg-tan px-6 pb-4 pt-14 sm:px-10 lg:px-35 lg:pb-10 lg:pt-25">
      {shown.map((chapter, index) => {
        const paragraphs = toParagraphs(chapter.text!);
        return (
          <section
            key={chapter.title}
            className={`grid gap-4 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:py-14 ${
              index > 0 ? "border-t border-border-tan" : "pt-0 lg:pt-0"
            }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[13px] font-medium text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Eyebrow as="h2">{chapter.title}</Eyebrow>
            </div>
            <div className="flex max-w-170 flex-col gap-5">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph}
                  className={
                    chapter.lead && paragraphIndex === 0
                      ? "text-xl font-medium leading-relaxed lg:text-[26px] lg:leading-[1.45]"
                      : "text-base leading-relaxed text-muted-strong lg:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
