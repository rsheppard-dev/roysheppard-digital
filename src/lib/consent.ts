/**
 * Google Consent Mode v2 helpers. GTM (layout.tsx) is always loaded, but its
 * default consent state (set in consent-default-script.tsx, before GTM's own
 * script runs) denies analytics/ad storage until the visitor actively
 * accepts. Google-served tags (GA4, Google Ads) read these signals
 * automatically; any other, non-Google tag in the GTM container needs its
 * own consent-based trigger configured in the GTM dashboard to honour this —
 * that part isn't controlled by this codebase.
 */

export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_REOPEN_EVENT = "open-cookie-settings";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private browsing / blocked storage: treat as no stored preference.
    return null;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Updates Consent Mode state and remembers the choice for future visits. */
export function applyConsent(choice: ConsentChoice) {
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Ignore storage failures — the in-memory consent update above still applies this visit.
  }
}
