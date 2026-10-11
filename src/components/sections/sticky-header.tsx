"use client";

import { useEffect, useRef } from "react";

/** Ignore tiny scroll movements so touch jitter doesn't flick the header. */
const MIN_DELTA = 6;

/**
 * Header that sits in the normal page flow and scrolls away with the page. Once it
 * is out of view it waits above the viewport, and slides back in, pinned to the top,
 * as soon as the visitor scrolls up. Scrolling down again slides it out; reaching the
 * top of the page hands it back to the flow.
 *
 * Direction is tracked in a ref and written to data attributes, so scrolling never
 * triggers a React re-render. A placeholder keeps the header's height in the flow
 * while it is pinned, so the page doesn't jump.
 */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = ref.current;
    if (!wrap || !el) return;

    let lastY = window.scrollY;
    let frame = 0;

    /** Change mode without animating, so the swap never flashes the header on screen. */
    const setMode = (mode: "static" | "fixed", hidden: boolean) => {
      el.style.transition = "none";
      if (mode === "fixed") wrap.style.height = `${el.offsetHeight}px`;
      else wrap.style.height = "";
      el.dataset.mode = mode;
      el.dataset.hidden = String(hidden);
      void el.offsetHeight;
      el.style.transition = "";
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      if (el.dataset.mode === "static") {
        // Fully scrolled out of view: park it above the viewport, ready to return.
        if (y > el.offsetHeight) setMode("fixed", true);
        lastY = y;
        return;
      }

      if (y <= 0) {
        setMode("static", false);
        lastY = y;
        return;
      }
      if (el.querySelector('[aria-expanded="true"]')) {
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

    // Keyboard users tabbing into a parked header should see where focus is.
    const onFocusIn = () => {
      if (el.dataset.mode === "fixed") el.dataset.hidden = "false";
    };

    // Keep the placeholder in step if the header's height changes while pinned.
    const observer = new ResizeObserver(() => {
      if (el.dataset.mode === "fixed") wrap.style.height = `${el.offsetHeight}px`;
    });
    observer.observe(el);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("focusin", onFocusIn);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <div
        ref={ref}
        data-mode="static"
        data-hidden="false"
        className="relative z-50 bg-cream/95 backdrop-blur-sm data-[mode=fixed]:fixed data-[mode=fixed]:inset-x-0 data-[mode=fixed]:top-0 data-[mode=fixed]:transition-[translate,opacity] data-[mode=fixed]:duration-300 data-[mode=fixed]:ease-out-strong data-[hidden=true]:-translate-y-full data-[hidden=true]:opacity-0 data-[hidden=true]:duration-500 data-[hidden=true]:ease-in-out motion-reduce:transition-none"
      >
        {children}
      </div>
    </div>
  );
}
