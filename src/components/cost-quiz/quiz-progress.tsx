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

export type Testimonial = { quote: string; name?: string | null; company?: string | null };

/** Drops an invisible 1px marker just below the screen. Returns a cleanup. */
function watchBelowScreen(distance: number, onReached: () => void) {
  const marker = document.createElement("div");
  marker.setAttribute("aria-hidden", "true");
  Object.assign(marker.style, {
    position: "absolute",
    left: "0",
    top: `${window.scrollY + window.innerHeight + distance}px`,
    width: "1px",
    height: "1px",
    pointerEvents: "none",
  });
  document.body.appendChild(marker);
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) onReached();
  });
  observer.observe(marker);
  return () => {
    observer.disconnect();
    marker.remove();
  };
}

/**
 * Client quotes that stay out of the way during the questions. Once the result shows, the first slides
 * in when the visitor scrolls a little (about 80px), so it arrives as they move down to the quote form.
 * Someone who never needs to scroll still sees it after 6 seconds. If they keep scrolling (another
 * 260px or so) the second slides in below it, and that one only ever comes from scrolling.
 * Desktop shows them under the byline; phones show them after the quiz so the first question is never
 * pushed down.
 *
 * "Scrolled a little" is watched with an invisible marker placed just below the screen once the result's
 * own scroll has settled, so there is no scroll listener: the marker coming into view is the signal.
 */
export function ResultTestimonials({ items, show }: { items: Testimonial[]; show: "desktop" | "mobile" }) {
  const { onResult } = useQuizProgress();
  const [shown, setShown] = useState(0);

  // The first quote: a small scroll after the result, or 6 seconds if the visitor never needs to scroll.
  useEffect(() => {
    if (!onResult) return;
    let stopWatching: (() => void) | undefined;
    const reveal = () => setShown((count) => Math.max(count, 1));
    // The result scrolls itself into view on a phone, so wait for that before measuring.
    const arm = window.setTimeout(() => {
      stopWatching = watchBelowScreen(80, reveal);
    }, 1200);
    const fallback = window.setTimeout(reveal, 6000);
    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(fallback);
      stopWatching?.();
      // Leaving the result (Start again) puts them away until the next result.
      setShown(0);
    };
  }, [onResult]);

  // The second quote: only if they keep scrolling once the first is showing.
  useEffect(() => {
    if (shown !== 1 || items.length < 2) return;
    return watchBelowScreen(260, () => setShown(2));
  }, [shown, items.length]);

  if (!onResult || shown === 0) return null;

  return (
    <div className={`${show === "desktop" ? "hidden lg:flex" : "flex lg:hidden"} w-full max-w-130 flex-col gap-6`}>
      {items.slice(0, shown).map((item) => (
        <figure
          key={item.quote}
          className="quiz-proof flex flex-col gap-4 rounded-card border border-border-tan bg-paper p-6 shadow-[0_12px_32px_rgba(23,23,26,0.07)]"
        >
          <Stars size={14} />
          <blockquote className="flex flex-col gap-3 text-pretty text-[17px] leading-relaxed text-ink">
            {item.quote
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index, all) => (
                <p key={paragraph}>
                  {index === 0 && "\u201C"}
                  {paragraph}
                  {index === all.length - 1 && "\u201D"}
                </p>
              ))}
          </blockquote>
          <Signature name={item.name} company={item.company} />
        </figure>
      ))}
    </div>
  );
}
