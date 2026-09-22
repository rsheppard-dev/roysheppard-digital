"use client";

import { CONSENT_REOPEN_EVENT } from "@/lib/consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
