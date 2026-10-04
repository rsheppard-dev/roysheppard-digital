import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightedHeading } from "@/components/ui/highlighted-heading";
import { TextLink } from "@/components/ui/text-link";

export function ServiceHeader({
  eyebrow,
  heading,
  highlight,
  intro,
  aside,
}: {
  eyebrow: string;
  heading: string;
  /** Phrase in the heading to mark with the highlighter. Defaults to the town name. */
  highlight?: string;
  intro: string;
  /** Optional visual shown beside the copy on desktop and below it on mobile. */
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 px-6 pb-12 pt-8 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-35 lg:pb-20 lg:pt-10">
      <div className="flex flex-col gap-5 lg:flex-1 lg:gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-190 text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
          <HighlightedHeading text={heading} highlight={highlight} />
        </h1>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          {intro}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
          <TextLink variant="button" href="/contact">
            Start a project <span aria-hidden="true">→</span>
          </TextLink>
          <TextLink variant="underline" href="/#work">
            See my projects
          </TextLink>
        </div>
      </div>
      {aside && <div className="lg:w-[42%] lg:shrink-0">{aside}</div>}
    </div>
  );
}
