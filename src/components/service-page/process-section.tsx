import { ProcessSteps } from "@/components/service-page/process-steps";
import { TextLink } from "@/components/ui/text-link";

type Step = { title: string; description: string };

/**
 * The "How it works" band, laid out like the free review's: heading, intro and
 * the Start a project button in a left column that stays in view, the steps on
 * the right. On phones it stacks, with the button after the steps.
 */
export function ProcessSection({
  intro,
  steps,
  tone,
}: {
  intro?: string;
  steps: Step[];
  tone: "tan" | "cream";
}) {
  const button = (
    <TextLink variant="button" href="/contact">
      Start a project <span aria-hidden="true">→</span>
    </TextLink>
  );

  return (
    <div
      className={`flex flex-col gap-10 border-t border-border-tan ${tone === "tan" ? "bg-tan" : "bg-cream"} px-6 py-14 sm:px-10 lg:flex-row lg:items-start lg:gap-26 lg:px-35 lg:py-25`}
    >
      <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:flex-1 lg:gap-5">
        <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">How it works</h2>
        {intro && <p className="max-w-110 text-base leading-relaxed text-muted-strong lg:text-lg">{intro}</p>}
        <div className="mt-3 hidden lg:block">{button}</div>
      </div>
      <div className="lg:flex-[1.3]">
        <ProcessSteps steps={steps} />
        <div className="mt-10 lg:hidden">{button}</div>
      </div>
    </div>
  );
}
