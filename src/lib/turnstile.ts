import { isProduction } from "@/lib/is-production";

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
};

/**
 * ok: the visitor passed (or Turnstile is not set up outside production).
 * failed: no token, a rejected token, or a token issued for a different form.
 * unavailable: the secret key is missing in production, or Cloudflare could not be reached.
 */
export type TurnstileResult = "ok" | "failed" | "unavailable";

/**
 * Checks the invisible Turnstile token the form sent. Without this call the widget
 * protects nothing, so every form route runs it before sending any email.
 */
export async function verifyTurnstile(
  token: unknown,
  { action, request }: { action: string; request: Request },
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (isProduction) {
      console.error(`[turnstile] TURNSTILE_SECRET_KEY is not set, refusing the "${action}" submission.`);
      return "unavailable";
    }
    console.warn(`[turnstile] TURNSTILE_SECRET_KEY is not set, skipping the check for "${action}" (not production).`);
    return "ok";
  }

  if (typeof token !== "string" || !token) {
    console.warn(`[turnstile] No token sent with the "${action}" submission.`);
    return "failed";
  }

  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result: SiteverifyResponse = await response.json();

    if (!result.success) {
      console.warn(`[turnstile] Rejected the "${action}" token:`, result["error-codes"]);
      return "failed";
    }
    if (result.action && result.action !== action) {
      console.warn(`[turnstile] Token was issued for "${result.action}", not "${action}".`);
      return "failed";
    }
    return "ok";
  } catch (error) {
    console.error("[turnstile] Could not reach Cloudflare to verify the token:", error);
    return "unavailable";
  }
}
