"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { applyConsent, getStoredConsent, CONSENT_REOPEN_EVENT, type ConsentChoice } from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage isn't available during SSR, so this can only be checked
    // after mount — there's no way to know the stored choice (or lack of
    // one) without it, and there's no server-safe initial value that
    // wouldn't risk a hydration mismatch either way.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getStoredConsent()) setVisible(true);

    function handleReopen() {
      setVisible(true);
    }
    window.addEventListener(CONSENT_REOPEN_EVENT, handleReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, handleReopen);
  }, []);

  function choose(choice: ConsentChoice) {
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-60 border-t border-border bg-cream px-6 py-5 sm:px-10 lg:px-35"
    >
      <div className="mx-auto flex max-w-290 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="cookie-consent-description" className="max-w-140 text-sm leading-relaxed text-muted-strong">
          This site uses cookies for analytics. I only set them if you say it&apos;s OK — see the{" "}
          <Link href="/privacy-policy" className="underline decoration-border-tan underline-offset-4 hover:text-accent">
            privacy policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-pill border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
