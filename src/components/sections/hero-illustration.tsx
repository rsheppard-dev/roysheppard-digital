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
  useEffect(() => {
    const preload = new window.Image();
    preload.src = "/images/hero-desk-loop.webp";
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
      unoptimized
      priority
      className="h-auto w-full max-w-[420px] lg:max-w-[640px]"
    />
  );
}
