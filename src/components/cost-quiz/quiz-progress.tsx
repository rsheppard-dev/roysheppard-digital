"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Signature } from "@/components/ui/signature";
import { Stars } from "@/components/ui/stars";

type QuizProgress = { onResult: boolean; setOnResult: (value: boolean) => void };

const QuizProgressContext = createContext<QuizProgress>({ onResult: false, setOnResult: () => {} });

/** Lets the quiz tell the rest of the page when it has reached the result. */
export function QuizProgressProvider({ children }: { children: ReactNode }) {
  const [onResult, setOnResult] = useState(false);
  const value = useMemo(() => ({ onResult, setOnResult }), [onResult]);
  return <QuizProgressContext.Provider value={value}>{children}</QuizProgressContext.Provider>;
}

export function useQuizProgress() {
  return useContext(QuizProgressContext);
}

/**
 * A client's words that stay out of the way during the questions and come in a couple of seconds
 * after the result appears, once the slider and price have played. Desktop shows it under the
 * byline; phones show it after the quiz so the first question is never pushed down.
 */
export function ResultTestimonial({
  quote,
  name,
  company,
  show,
}: {
  quote: string;
  name?: string | null;
  company?: string | null;
  show: "desktop" | "mobile";
}) {
  const { onResult } = useQuizProgress();
  if (!onResult) return null;

  return (
    <figure
      className={`quiz-proof ${show === "desktop" ? "hidden lg:flex" : "flex lg:hidden"} w-full max-w-130 flex-col gap-4 rounded-card bg-ink px-7 py-7`}
    >
      <div className="flex items-start justify-between gap-6">
        <span aria-hidden="true" className="-mb-5 -mt-1 text-[56px] font-semibold leading-none text-accent">
          &ldquo;
        </span>
        <Stars size={14} className="mt-1" />
      </div>
      <blockquote className="text-pretty text-base font-medium leading-relaxed text-cream lg:text-[17px]">
        <p>{quote}&rdquo;</p>
      </blockquote>
      <Signature name={name} company={company} onDark />
    </figure>
  );
}
