"use client";

import { useId, useState } from "react";

type AccordionItemData = {
  question: string;
  answer: string;
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative h-5.5 w-5.5 shrink-0 transition-transform duration-200 ease-out-strong"
      style={{ transform: `rotate(${open ? 45 : 0}deg)` }}
    >
      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-ink" />
      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-ink" />
    </span>
  );
}

/** A simple, single-purpose FAQ accordion. First item starts open. */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex max-w-205 flex-col">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            key={item.question}
            className={`border-t border-border-tan ${
              index === items.length - 1 ? "border-b" : ""
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                className="flex w-full items-center justify-between gap-8 py-6.5 text-left font-display text-lg font-bold text-ink"
              >
                <span>{item.question}</span>
                <PlusIcon open={open} />
              </button>
            </h3>
            {open && (
              <p id={panelId} className="mb-6.5 max-w-160 text-[15px] leading-relaxed text-muted">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
