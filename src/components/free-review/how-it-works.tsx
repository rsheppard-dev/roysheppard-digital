type Step = { title: string; description: string };

/** A paper sheet drawn as an outline with placeholder lines, so the deliverable is visible without inventing any findings. */
function ReviewSheet() {
  const lines = [
    ["w-[86%]", "w-[52%]"],
    ["w-[78%]", "w-[60%]"],
    ["w-[82%]", "w-[46%]"],
  ];
  return (
    <div
      aria-hidden="true"
      className="mt-9 w-full max-w-90 -rotate-[1.5deg] rounded-[14px] border-2 border-ink bg-paper px-6 pb-7.5 pt-6 drop-shadow-[0_18px_20px_rgba(23,23,26,0.10)]"
    >
      <div className="font-hand text-[32px] font-semibold leading-none text-accent-text">Your review</div>
      <div className="my-4.5 h-px bg-border-tan" />
      <div className="flex flex-col gap-2.25">
        <div className="h-2 w-[92%] rounded-full bg-border" />
        <div className="h-2 w-[74%] rounded-full bg-border" />
      </div>
      <div className="mt-6.5 flex flex-col gap-4.5">
        {lines.map(([first, second], index) => (
          <div key={index} className="flex items-center gap-3.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-medium">
              {index + 1}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <div className={`h-2 rounded-full bg-border-tan ${first}`} />
              <div className={`h-2 rounded-full bg-border ${second}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Three connected steps beside a drawn "Your review" sheet. The last step's circle is filled: it is the deliverable. */
export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col gap-16 px-6 py-16 sm:px-10 lg:flex-row lg:items-start lg:gap-26 lg:px-35 lg:py-26">
      <div className="flex max-w-110 flex-col gap-3.5 lg:flex-1">
        <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">How it works</h2>
        <p className="max-w-95 text-[17px] leading-relaxed text-muted-strong">
          A few minutes from you. The rest is on me.
        </p>
        <ReviewSheet />
      </div>

      <ol className="flex max-w-160 flex-col lg:flex-[1.3] lg:pt-2">
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
    </div>
  );
}
