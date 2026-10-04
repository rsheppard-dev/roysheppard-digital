import type { Metadata } from "next";
import { webDesign } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { NumberedList } from "@/components/service-page/numbered-list";
import { ProcessSteps } from "@/components/service-page/process-steps";
import { WorkScreens } from "@/components/service-page/work-screens";
import { ProjectEvidence } from "@/components/service-page/project-evidence";
import { RelatedLinks } from "@/components/service-page/related-links";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
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
      <PageModifiedJsonLd path={PATH} name={webDesign.title} source="work" codeUpdated={webDesign.lastUpdated} />
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
        aside={<WorkScreens />}
      />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What that can include</h2>
        <NumberedList items={webDesign.focusAreas} />
      </div>

      <ProjectEvidence {...webDesign.caseStudy} />

      <div className="flex flex-col gap-10 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-14 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">How it works</h2>
        <ProcessSteps steps={webDesign.process} />
        <p className="text-base leading-relaxed text-muted-strong lg:text-lg">
          <TextLink variant="underline" href="/contact">
            Start a project
          </TextLink>{" "}
          to talk through yours.
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
