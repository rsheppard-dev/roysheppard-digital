"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

export type TurnstileHandle = {
  /** Resolves with a fresh token, or undefined if Turnstile is not set up or did not respond in time. */
  getToken: () => Promise<string | undefined>;
  /** Tokens are single use: call after every submit so the next one gets a new challenge. */
  reset: () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_WAIT_MS = 10000;

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Invisible Cloudflare Turnstile check. Renders nothing visible (the widget mode is
 * set to Invisible in the Cloudflare dashboard); the form asks for a token on submit.
 * `action` must match what the matching API route passes to verifyTurnstile.
 */
export function TurnstileWidget({ action, ref }: { action: string; ref: Ref<TurnstileHandle> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | undefined>(undefined);
  const waitersRef = useRef<Array<(token: string | undefined) => void>>([]);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    const container = containerRef.current;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled) return;
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          action,
          callback: (token) => {
            tokenRef.current = token;
            waitersRef.current.splice(0).forEach((resolve) => resolve(token));
          },
          "expired-callback": () => {
            tokenRef.current = undefined;
          },
          "error-callback": () => {
            tokenRef.current = undefined;
            waitersRef.current.splice(0).forEach((resolve) => resolve(undefined));
          },
        });
      })
      .catch(() => {
        waitersRef.current.splice(0).forEach((resolve) => resolve(undefined));
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      tokenRef.current = undefined;
    };
  }, [siteKey, action]);

  useImperativeHandle(ref, () => ({
    getToken() {
      if (!siteKey) return Promise.resolve(undefined);
      if (tokenRef.current) return Promise.resolve(tokenRef.current);
      return new Promise<string | undefined>((resolve) => {
        const timer = setTimeout(() => resolve(undefined), TOKEN_WAIT_MS);
        waitersRef.current.push((token) => {
          clearTimeout(timer);
          resolve(token);
        });
      });
    },
    reset() {
      tokenRef.current = undefined;
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    },
  }));

  return <div ref={containerRef} aria-hidden="true" />;
}
