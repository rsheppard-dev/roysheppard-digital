"use client";

import { useEffect, useRef } from "react";

/** Scrolled distance (px) below which the header is always shown. */
const ALWAYS_SHOW_ABOVE = 400;
/** Ignore tiny scroll movements so touch jitter doesn't flick the header. */
const MIN_DELTA = 6;

/**
 * Sticky header that slides out of view while scrolling down and returns on any
 * scroll up. It stays put at the top of the page and while the mobile menu is open.
 * Direction is tracked in a ref and written to a data attribute, so scrolling
 * never triggers a React re-render.
 */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      if (y < ALWAYS_SHOW_ABOVE || el.querySelector('[aria-expanded="true"]')) {
        el.dataset.hidden = "false";
        lastY = y;
        return;
      }
      if (Math.abs(delta) < MIN_DELTA) return;

      el.dataset.hidden = delta > 0 ? "true" : "false";
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    // Keyboard users tabbing into a hidden header should see where focus is.
    const onFocusIn = () => {
      el.dataset.hidden = "false";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("focusin", onFocusIn);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-hidden="false"
      className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm transition-[translate,opacity] duration-300 ease-out-strong data-[hidden=true]:-translate-y-full data-[hidden=true]:opacity-0 data-[hidden=true]:duration-500 data-[hidden=true]:ease-in-out motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
