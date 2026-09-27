import { createHash, randomUUID } from "node:crypto";

/**
 * Meta Conversions API: reports a Lead to Meta server-to-server, so it's
 * recorded even when a blocker stops the browser pixel (fbevents.js).
 * The pixel in GTM only sends PageView, so there's no browser Lead event to
 * deduplicate against.
 * https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const PIXEL_ID = "676375356787650";
const GRAPH_API_VERSION = "v26.0";
const TIMEOUT_MS = 3000;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Meta wants names lowercased with punctuation stripped before hashing. */
function normaliseName(value: string): string {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function readCookie(request: Request, name: string): string | undefined {
  const match = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1];
}

function clientIp(request: Request): string | undefined {
  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

type Lead = { name: string; email: string; sourceUrl?: string };

/**
 * Never throws: a Meta outage or missing token must not fail the enquiry.
 * Callers are responsible for only calling this when the visitor has granted consent.
 */
export async function sendMetaLead(request: Request, lead: Lead): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("[meta-capi] META_CAPI_ACCESS_TOKEN is not set — Lead event not sent.");
    return;
  }

  const nameParts = lead.name.trim().split(/\s+/).map(normaliseName).filter(Boolean);
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined;

  const userData = {
    em: [sha256(lead.email.trim().toLowerCase())],
    ...(firstName && { fn: [sha256(firstName)] }),
    ...(lastName && { ln: [sha256(lastName)] }),
    client_ip_address: clientIp(request),
    client_user_agent: request.headers.get("user-agent") ?? undefined,
    fbp: readCookie(request, "_fbp"),
    fbc: readCookie(request, "_fbc"),
  };

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: randomUUID(),
        action_source: "website",
        event_source_url: lead.sourceUrl ?? request.headers.get("referer") ?? undefined,
        user_data: userData,
      },
    ],
    // Set temporarily to see events in Events Manager > Test events.
    ...(process.env.META_CAPI_TEST_EVENT_CODE && { test_event_code: process.env.META_CAPI_TEST_EVENT_CODE }),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    );
    if (!response.ok) {
      console.error("[meta-capi] Meta rejected the Lead event:", response.status, await response.text());
    }
  } catch (error) {
    console.error("[meta-capi] Failed to send the Lead event:", error);
  }
}
