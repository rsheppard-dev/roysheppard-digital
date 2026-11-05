"use client";

import { useEffect } from "react";

/**
 * Pushes `phone_click` / `email_click` to the dataLayer when a visitor clicks a
 * tel: or mailto: link anywhere on the site. One delegated listener covers every
 * link, including ones rendered from Sanity content. GTM picks these up with
 * Custom Event triggers and forwards them to GA4.
 */
export function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      const href = link?.getAttribute("href")?.toLowerCase();
      if (!href) return;

      let event: "phone_click" | "email_click" | null = null;
      if (href.startsWith("tel:")) event = "phone_click";
      else if (href.startsWith("mailto:")) event = "email_click";
      if (!event) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, link_location: window.location.pathname });
    }

    // Capture phase so a link's own handler can't stop it before we see it.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
