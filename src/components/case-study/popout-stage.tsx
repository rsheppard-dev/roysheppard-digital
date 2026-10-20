"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a pop-out composition so its pieces lift off the page once, as it reaches mid-screen.
 * A stage already on screen at hydration is left alone so nothing flashes, and without JS the
 * pieces simply render in their final position. Motion lives in globals.css.
 */
export function PopoutStage({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || stage.getBoundingClientRect().top < window.innerHeight * 0.5) return;

    stage.setAttribute("data-pending", "");

    // The bottom margin shrinks the viewport to its top half, so this fires as the stage's top edge crosses mid-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stage.removeAttribute("data-pending");
        stage.setAttribute("data-visible", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
