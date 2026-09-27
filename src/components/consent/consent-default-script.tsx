import Script from "next/script";
import { CONSENT_GRANTED_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

/**
 * Must render before <GoogleTagManager> in the tree. Sets Consent Mode v2
 * defaults to "denied" before GTM's own script runs, so nothing that reads
 * these signals can set a cookie ahead of an actual visitor choice — unless
 * a previous visit already stored one, in which case that choice is applied
 * immediately instead of flashing "denied" first.
 */
export function ConsentDefaultScript() {
  const storageKey = JSON.stringify(CONSENT_STORAGE_KEY);
  const grantedEvent = JSON.stringify(CONSENT_GRANTED_EVENT);

  return (
    // This rule only recognises the Pages Router's pages/_document.js. For the App Router,
    // Next's own docs place beforeInteractive scripts exactly here, in the root layout:
    // https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  var stored = null;
  try { stored = window.localStorage.getItem(${storageKey}); } catch (e) {}
  var state = stored === 'granted' ? 'granted' : 'denied';
  gtag('consent', 'default', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    wait_for_update: 500
  });
  if (state === 'granted') window.dataLayer.push({ event: ${grantedEvent} });
})();`,
      }}
    />
  );
}
