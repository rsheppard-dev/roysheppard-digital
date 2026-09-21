import Image from "next/image";
import { trustLabel as fallbackLabel, trustLogos as fallbackLogos } from "@/content/site";
import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery, trustLogosQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function TrustStrip() {
  const [{ data: settings }, { data: logos }] = await Promise.all([
    sanityFetch({ query: siteSettingsQuery }),
    sanityFetch({ query: trustLogosQuery }),
  ]);

  const trustLabel = settings?.trustLabel || fallbackLabel;
  const hasSanityLogos = logos && logos.length > 0;

  return (
    <div className="flex flex-col gap-4 bg-tan px-6 py-8 sm:flex-row sm:items-center sm:gap-8 sm:px-10 lg:gap-12 lg:px-[140px] lg:py-10">
      <span className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
        {trustLabel}
      </span>
      <div className="flex flex-wrap items-center gap-8 sm:gap-10 lg:gap-12">
        {hasSanityLogos
          ? logos.map((logo) => {
              const dims = logo.logoDimensions;
              // Requesting height only (no width) avoids Sanity's image API
              // auto-cropping to a square — it only crops when both are set.
              const displayHeight = 120;
              const displayWidth = dims
                ? Math.round((displayHeight * dims.width) / dims.height)
                : displayHeight;
              return (
                <div key={logo.name} className="flex h-9 items-center justify-center sm:h-10">
                  {logo.logo && (
                    <Image
                      src={urlFor(logo.logo).height(displayHeight).url()}
                      alt={logo.name ?? ""}
                      width={displayWidth}
                      height={displayHeight}
                      className="h-full w-auto max-w-[110px] object-contain grayscale opacity-70 transition duration-200 hover:grayscale-0 hover:opacity-100 sm:max-w-[130px]"
                    />
                  )}
                </div>
              );
            })
          : fallbackLogos.map((logo) => (
              <div key={logo.name} className="flex h-9 items-center justify-center sm:h-10">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-full w-auto max-w-[110px] object-contain grayscale opacity-70 transition duration-200 hover:grayscale-0 hover:opacity-100 sm:max-w-[130px]"
                />
              </div>
            ))}
      </div>
    </div>
  );
}
