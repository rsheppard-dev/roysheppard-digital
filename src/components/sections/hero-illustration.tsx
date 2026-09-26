"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Static by default; swaps to the looping typing animation while the page
 * is actively being scrolled, then settles back a moment after scrolling stops.
 */
export function HeroIllustration() {
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warm the browser cache for the animated frame so the first scroll swap is instant.
  // Waits for the load event so the ~1MB file never competes with the LCP image.
  useEffect(() => {
    function preloadLoop() {
      const preload = new window.Image();
      preload.src = "/images/hero-desk-loop.webp";
    }
    if (document.readyState === "complete") {
      preloadLoop();
      return;
    }
    window.addEventListener("load", preloadLoop, { once: true });
    return () => window.removeEventListener("load", preloadLoop);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setScrolling(false), 500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Image
      src={scrolling ? "/images/hero-desk-loop.webp" : "/images/hero-desk-static.png"}
      alt="Illustration of Roy Sheppard working at his desk"
      width={1112}
      height={834}
      // The static frame goes through the image optimizer (AVIF/WebP, right-sized);
      // the animated loop must be served as-is or it would be flattened.
      unoptimized={scrolling}
      sizes="(min-width: 1024px) 640px, 420px"
      fetchPriority="high"
      className="h-auto w-full max-w-105 lg:max-w-160"
    />
  );
}
