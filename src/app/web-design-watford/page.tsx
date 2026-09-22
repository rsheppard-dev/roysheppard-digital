import type { Metadata } from "next";
import { webDesign } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { NumberedList } from "@/components/service-page/numbered-list";
import { ProjectEvidence } from "@/components/service-page/project-evidence";
import { RelatedLinks } from "@/components/service-page/related-links";
import { ServiceJsonLd } from "@/components/service-page/service-jsonld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { TextLink } from "@/components/ui/text-link";

const PATH = "/web-design-watford";

export const metadata: Metadata = buildPageMetadata({
  title: webDesign.title,
  description: webDesign.description,
  path: PATH,
});

export default function WebDesignPage() {
  return (
    <PageShell>
      <ServiceJsonLd
        path={PATH}
        name="Web Design"
        serviceType="Web design"
        description={webDesign.description}
      />
      <Breadcrumbs label="Web Design" path={PATH} />
      <ServiceHeader
        eyebrow={webDesign.eyebrow}
        heading={webDesign.heading}
        intro={webDesign.intro}
      />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What that can include</h2>
        <NumberedList items={webDesign.focusAreas} />
      </div>

      <ProjectEvidence {...webDesign.caseStudy} />

      <div className="flex flex-col gap-5 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          {webDesign.howItWorks}
        </p>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          <TextLink variant="underline" href="/contact">
            Get in touch
          </TextLink>{" "}
          to talk through your project.
        </p>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <FaqJsonLd faqs={webDesign.faqs} />
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">Web design questions</h2>
        <Accordion items={webDesign.faqs} />
      </div>

      <RelatedLinks items={webDesign.related} />
    </PageShell>
  );
}
