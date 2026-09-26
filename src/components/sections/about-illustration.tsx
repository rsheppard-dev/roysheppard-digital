"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Position/size of the browser icon as a % of the base illustration's
// 1792x2400 canvas, matching where it was cropped out of the source art.
const ICON_BOX = {
  left: (1131 / 1792) * 100,
  top: (513 / 2400) * 100,
  width: (349 / 1792) * 100,
};

/**
 * Renders the about illustration as two layers — the figure, and the
 * browser icon floating beside it — so the icon can drift independently
 * as the page scrolls, instead of being locked to the flat artwork.
 */
export function AboutIllustration() {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;

    function update() {
      rafId = 0;
      const el = iconRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const offset = Math.max(-14, Math.min(14, distance * 0.05));

      el.style.transform = `translateY(${offset}px)`;
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full">
      <Image
        src="/images/about-illustration-figure.png"
        alt="Illustration of Roy Sheppard"
        width={1792}
        height={2400}
        sizes="(min-width: 1024px) 300px, 220px"
        className="h-auto w-full"
      />
      <div
        ref={iconRef}
        className="absolute transition-transform duration-500 ease-out"
        style={{ left: `${ICON_BOX.left}%`, top: `${ICON_BOX.top}%`, width: `${ICON_BOX.width}%` }}
      >
        <Image
          src="/images/about-browser-icon.png"
          alt=""
          aria-hidden
          width={349}
          height={340}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
