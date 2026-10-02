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
/**
 * dataLayer event pushed once per page when consent is granted (on Accept, or
 * on load for a returning visitor who accepted before). Non-Google tags in GTM,
 * like the Meta Pixel, trigger on this instead of "All Pages" so they can't
 * fire without consent.
 */
export const CONSENT_GRANTED_EVENT = "cookie_consent_granted";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // Google only treats an Arguments object as a gtag command. A plain array is
  // silently ignored, which left the consent update unread until the next page load.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Updates Consent Mode state and remembers the choice for future visits. */
export function applyConsent(choice: ConsentChoice) {
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  const alreadyGranted = window.dataLayer?.some(
    (entry) => (entry as { event?: string } | null)?.event === CONSENT_GRANTED_EVENT,
  );
  if (choice === "granted" && !alreadyGranted) {
    window.dataLayer!.push({ event: CONSENT_GRANTED_EVENT });
  }
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Ignore storage failures — the in-memory consent update above still applies this visit.
  }
}
