import type { Metadata } from "next";
import Image from "next/image";
import { freeReview } from "@/content/free-review";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { ReviewForm } from "@/components/free-review/review-form";
import { HowItWorks } from "@/components/free-review/how-it-works";

const PATH = "/free-website-review";

export const metadata: Metadata = buildPageMetadata({
  title: freeReview.title,
  description: freeReview.description,
  path: PATH,
});

export default function FreeWebsiteReviewPage() {
  return (
    // The form is the page's call to action, so no closing banner repeats it.
    <PageShell cta={false}>
      <PageModifiedJsonLd path={PATH} name={freeReview.title} source="shared" codeUpdated={freeReview.lastUpdated} />
      <Breadcrumbs label="Free website review" path={PATH} />

      {/* On a phone the order is text, form, picture so the form is never pushed down; from lg the picture sits under the text. */}
      <div className="grid grid-cols-1 gap-x-18 gap-y-10 px-6 pb-20 pt-10 sm:px-10 lg:grid-cols-2 lg:gap-y-6 lg:px-35 lg:pb-24">
        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          <Eyebrow>Free website review</Eyebrow>
          <h1 className="max-w-150 text-4xl font-medium leading-[1.06] tracking-[-0.015em] sm:text-5xl lg:text-[60px]">
            Find out what your website could be doing better
          </h1>
          <p className="max-w-130 text-lg leading-relaxed text-muted-strong lg:text-[19px]">
            I&apos;ll look at your site the way a customer does and send back a short, personal review with three clear
            improvements.
          </p>
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ReviewForm />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <Image
            src="/images/free-review-notes-v2.webp"
            alt="Roy at his desk, writing review notes in a notebook"
            width={1168}
            height={880}
            sizes="(min-width: 1024px) 540px, 92vw"
            loading="eager"
            className="h-auto w-full max-w-135"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 border-t border-border-tan bg-tan px-6 py-16 sm:px-10 lg:gap-14 lg:px-35 lg:py-24">
        <div className="flex max-w-160 flex-col gap-3.5">
          <h2 className="text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">What I look at</h2>
          <p className="text-[17px] leading-relaxed text-muted-strong">
            Six things that decide whether a website brings in work.
          </p>
        </div>
        <ul className="grid gap-x-18 gap-y-12 sm:grid-cols-2">
          {freeReview.areas.map((area) => (
            <li key={area.title} className="flex flex-col gap-2.5 border-t-2 border-ink pt-5.5">
              <h3 className="text-xl font-semibold sm:text-[22px]">{area.title}</h3>
              <p className="max-w-110 text-base leading-relaxed text-muted-strong">{area.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <HowItWorks steps={freeReview.steps} />

      <div
        id="faq"
        className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25"
      >
        <FaqJsonLd faqs={freeReview.faqs} />
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">Common questions</h2>
        <Accordion items={freeReview.faqs} />
      </div>
    </PageShell>
  );
}
