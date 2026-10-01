"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STATIC_SRC = "/images/hero-desk-sketch-v2.webp";
const LOOP_SRC = "/images/hero-desk-sketch-loop-v2.webp";

/**
 * Static by default; swaps to the looping typing animation while the page
 * is actively being scrolled, then settles back a moment after scrolling stops.
 * The static image is the loop's first frame, so the swap doesn't jump.
 * Touch screens hold it longer: a swipe is over in a moment, so a short
 * settle would only ever show the first few frames.
 */
export function HeroIllustration() {
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warm the browser cache for the animated frame so the first scroll swap is instant.
  // Waits for the load event so the ~900KB file never competes with the LCP image.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function preloadLoop() {
      const preload = new window.Image();
      preload.src = LOOP_SRC;
    }
    if (document.readyState === "complete") {
      preloadLoop();
      return;
    }
    window.addEventListener("load", preloadLoop, { once: true });
    return () => window.removeEventListener("load", preloadLoop);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const settleMs = window.matchMedia("(pointer: coarse)").matches ? 2500 : 500;
    function handleScroll() {
      setScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setScrolling(false), settleMs);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Image
      src={scrolling ? LOOP_SRC : STATIC_SRC}
      alt="Illustration of Roy Sheppard working at his desk"
      width={800}
      height={588}
      // The static frame goes through the image optimizer (AVIF/WebP, right-sized);
      // the animated loop must be served as-is or it would be flattened.
      unoptimized={scrolling}
      sizes="(min-width: 1024px) 640px, 420px"
      fetchPriority="high"
      className="h-auto w-full max-w-105 lg:max-w-160"
    />
  );
}
