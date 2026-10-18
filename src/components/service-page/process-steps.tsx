type Step = { title: string; description: string };

/**
 * How a project runs, as a vertical sequence joined by a dashed rule, matching
 * the free review's steps. The last step's circle is filled: it is the deliverable.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex max-w-160 flex-col">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="flex gap-6 sm:gap-7">
            <div className="flex shrink-0 flex-col items-center">
              <span
                className={`flex size-12 items-center justify-center rounded-full border-2 border-ink font-mono text-[15px] font-medium ${
                  last ? "bg-accent" : "bg-cream"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {!last && <span aria-hidden="true" className="my-2 min-h-9 flex-1 border-l-2 border-dashed border-muted-soft/60" />}
            </div>
            <div className={`flex flex-col gap-2 pt-2 ${last ? "" : "pb-10"}`}>
              <h3 className="text-xl font-semibold leading-tight sm:text-2xl">{step.title}</h3>
              <p className="max-w-115 text-base leading-relaxed text-muted-strong">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
