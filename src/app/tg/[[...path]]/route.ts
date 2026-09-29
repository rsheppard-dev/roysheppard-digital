// Google tag gateway (manual setup): serves GTM and its GA/Ads hits from our own
// domain under /tg/, so blockers that match googletagmanager.com or
// google-analytics.com don't drop them. Consent Mode still applies as before.
// https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=manual
//
// Google wants the visitor's location forwarded in headers. Railway doesn't add
// geo headers itself, so we pass Cloudflare's through when the domain is proxied
// by it and otherwise send none (Google then falls back to IP-based lookup).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GATEWAY_ORIGIN = "https://GTM-PTDWD92.fps.goog";

// Node's fetch transparently decompresses, so these no longer describe the body.
const STRIPPED_RESPONSE_HEADERS = ["content-encoding", "content-length", "transfer-encoding", "connection"];

async function proxy(request: Request) {
  const url = new URL(request.url);
  // Next strips the trailing slash from /tg/, but the gateway serves gtm.js at /tg/.
  const pathname = url.pathname === "/tg" ? "/tg/" : url.pathname;
  const target = new URL(pathname + url.search, GATEWAY_ORIGIN);

  const headers = new Headers(request.headers);
  // fetch() sets Host from the target URL, which Google requires to be the fps.goog origin.
  headers.delete("host");
  const country = request.headers.get("cf-ipcountry");
  const region = request.headers.get("cf-region-code");
  if (country && country !== "XX") headers.set("X-Forwarded-Country", country);
  if (region) headers.set("X-Forwarded-Region", region);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
    // Required by Node when streaming a request body.
    ...(hasBody && { duplex: "half" }),
  } as RequestInit);

  const responseHeaders = new Headers(upstream.headers);
  for (const name of STRIPPED_RESPONSE_HEADERS) responseHeaders.delete(name);

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export { proxy as GET, proxy as POST, proxy as HEAD, proxy as OPTIONS };
