import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Homepage band promoting the free website review. A plain GET form: it takes
 * the visitor to /free-website-review with their address pre-filled (`?site=`),
 * so the request itself, its validation and its spam checks live on that page.
 */
export function ReviewPromo() {
  return (
    <div id="free-review" className="border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:px-35 lg:py-22">
      <div className="flex flex-col gap-10 rounded-card border border-border-tan bg-paper p-6 shadow-[0_12px_32px_rgba(23,23,26,0.07)] sm:p-10 lg:flex-row lg:items-center lg:gap-16 lg:p-14">
        <div className="flex flex-col gap-5 lg:flex-1">
          <Eyebrow>Free website review</Eyebrow>
          <h2 className="max-w-130 text-3xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-4xl lg:text-[46px]">
            Not sure your website is pulling its weight?
          </h2>
          <p className="max-w-115 text-[17px] leading-relaxed text-muted-strong">
            Send me the address and I&apos;ll send back a short, personal review with three clear improvements.
          </p>
          <form action="/free-website-review" method="get" className="mt-1 flex max-w-130 flex-col gap-3 sm:flex-row">
            <label htmlFor="promo-site" className="sr-only">
              Your website address
            </label>
            <input
              id="promo-site"
              name="site"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="yourbusiness.co.uk"
              className="min-h-13 min-w-0 flex-1 rounded-pill border-[1.5px] border-muted-soft bg-white px-5.5 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-3 focus:ring-accent/35 transition-[border-color,box-shadow] duration-160"
            />
            <button
              type="submit"
              className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-pill bg-accent px-6.5 text-[17px] font-semibold text-ink transition-[color,background-color,scale] ease-out-strong hover:bg-ink hover:text-cream active:scale-[0.97]"
            >
              Request my review <span aria-hidden="true" className="text-[19px]">→</span>
            </button>
          </form>
          <p className="text-[13px] text-muted-strong">Free, with no obligation to hire me.</p>
        </div>
        <div className="flex justify-center lg:w-[42%] lg:shrink-0">
          <Image
            src="/images/free-review-notes.webp"
            alt="Roy at his desk, writing review notes in a notebook"
            width={1168}
            height={880}
            sizes="(min-width: 1024px) 460px, 92vw"
            className="h-auto w-full max-w-115"
          />
        </div>
      </div>
    </div>
  );
}
