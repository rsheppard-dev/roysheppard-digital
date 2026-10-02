"use client";

import { useEffect, useRef } from "react";

const STAGGER_MS = 70;

/**
 * Flags each `.reveal-item` child once as it scrolls into view, staggering items
 * that arrive together, so its star rating can fill in. Items already on screen at
 * hydration are left alone so nothing flashes, and without JS everything simply renders
 * visible. Motion lives in globals.css.
 */
export function RevealGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>(".reveal-item") ?? []).filter(
      (item) => item.getBoundingClientRect().top > window.innerHeight,
    );
    if (items.length === 0) return;

    items.forEach((item) => item.setAttribute("data-pending", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, batchIndex) => {
            const item = entry.target as HTMLElement;
            item.style.setProperty("--reveal-delay", `${batchIndex * STAGGER_MS}ms`);
            item.removeAttribute("data-pending");
            item.setAttribute("data-visible", "");
            observer.unobserve(item);
          });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
