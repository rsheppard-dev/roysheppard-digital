// Google tag gateway (manual setup): serves GTM and its GA/Ads hits from our own
// domain under /tg/, so blockers that match googletagmanager.com or
// google-analytics.com don't drop them. Consent Mode still applies as before.
// https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=manual
//
// Runs as a Netlify Edge Function rather than a redirect because Google needs the
// visitor's location forwarded in headers, which a static proxy rule can't add.

const GATEWAY_ORIGIN = "https://GTM-PTDWD92.fps.goog";

type Geo = { country?: { code?: string }; subdivision?: { code?: string } };

export default async function tagGateway(request: Request, context: { geo: Geo }) {
  const url = new URL(request.url);
  const target = new URL(url.pathname + url.search, GATEWAY_ORIGIN);

  const headers = new Headers(request.headers);
  // fetch() sets Host from the target URL, which Google requires to be the fps.goog origin.
  headers.delete("host");
  const country = context.geo.country?.code;
  const region = context.geo.subdivision?.code;
  if (country) headers.set("X-Forwarded-Country", country);
  if (region) headers.set("X-Forwarded-Region", region);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  return fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
  });
}

export const config = { path: "/tg/*" };
