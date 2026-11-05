"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
 * A client's words that stay out of the way during the questions. Once the result shows, it slides in
 * when the visitor scrolls a little (about 80px), so it arrives as they move down to the quote form.
 * Someone who never needs to scroll still sees it after 6 seconds. Desktop shows it under the byline;
 * phones show it after the quiz so the first question is never pushed down.
 *
 * "Scrolled a little" is watched with an invisible marker placed just below the screen once the result's
 * own scroll has settled, so there is no scroll listener: the marker coming into view is the signal.
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
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!onResult) return;

    let observer: IntersectionObserver | undefined;
    let marker: HTMLDivElement | undefined;
    const reveal = () => setRevealed(true);

    // The result scrolls itself into view on a phone, so wait for that before measuring.
    const arm = window.setTimeout(() => {
      marker = document.createElement("div");
      marker.setAttribute("aria-hidden", "true");
      Object.assign(marker.style, {
        position: "absolute",
        left: "0",
        top: `${window.scrollY + window.innerHeight + 80}px`,
        width: "1px",
        height: "1px",
        pointerEvents: "none",
      });
      document.body.appendChild(marker);
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      });
      observer.observe(marker);
    }, 1200);

    const fallback = window.setTimeout(reveal, 6000);

    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(fallback);
      observer?.disconnect();
      marker?.remove();
      // Leaving the result (Start again) puts it away until the next result.
      setRevealed(false);
    };
  }, [onResult]);

  if (!onResult || !revealed) return null;

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
