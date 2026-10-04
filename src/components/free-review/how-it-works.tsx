import Image from "next/image";

type Step = { title: string; description: string };

/** Three connected steps beside a drawing of the finished notes. The last step's circle is filled: it is the deliverable. */
export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col gap-16 px-6 py-16 sm:px-10 lg:flex-row lg:items-start lg:gap-26 lg:px-35 lg:py-26">
      <div className="flex max-w-110 flex-col gap-3.5 lg:flex-1">
        <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">How it works</h2>
        <p className="max-w-95 text-[17px] leading-relaxed text-muted-strong">
          A few minutes from you. The rest is on me.
        </p>
        <Image
          src="/images/free-review-desk.webp"
          alt="An open notebook with three ticked notes, a pencil, a magnifying glass, a mug and a plant"
          width={1168}
          height={880}
          sizes="(min-width: 1024px) 480px, 92vw"
          className="mt-7 h-auto w-full max-w-120"
        />
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
