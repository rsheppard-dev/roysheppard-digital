type Step = { title: string; description: string };

/**
 * How a project runs, as a short sequence joined by a dashed rule on desktop.
 * The markers are plain numbered circles so the sequence reads at a glance.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-10">
      <span
        aria-hidden="true"
        className="absolute left-5 right-5 top-5 hidden border-t-[1.5px] border-dashed border-muted-soft/60 sm:block"
      />
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-5 sm:flex-col sm:gap-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-pill border-[1.5px] border-ink bg-tan font-mono text-sm font-semibold">
            {index + 1}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold lg:text-xl">{step.title}</h3>
            <p className="max-w-80 text-[15px] leading-relaxed text-muted-strong">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
