import type { Metadata } from "next";
import { webDevelopment } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { NumberedList } from "@/components/service-page/numbered-list";
import { ProcessSteps } from "@/components/service-page/process-steps";
import { WorkScreens } from "@/components/service-page/work-screens";
import { ProjectEvidence } from "@/components/service-page/project-evidence";
import { RelatedLinks } from "@/components/service-page/related-links";
import { ServiceJsonLd } from "@/components/service-page/service-jsonld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { TextLink } from "@/components/ui/text-link";

const PATH = "/web-development-watford";

export const metadata: Metadata = buildPageMetadata({
  title: webDevelopment.title,
  description: webDevelopment.description,
  path: PATH,
});

export default function WebDevelopmentPage() {
  return (
    <PageShell>
      <ServiceJsonLd
        path={PATH}
        name="Web Development"
        serviceType="Web development"
        description={webDevelopment.description}
      />
      <Breadcrumbs label="Web Development" path={PATH} />
      <ServiceHeader
        eyebrow={webDevelopment.eyebrow}
        heading={webDevelopment.heading}
        intro={webDevelopment.intro}
        aside={<WorkScreens slug="kingsley-estates" />}
      />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What the build includes</h2>
        <NumberedList items={webDevelopment.focusAreas} />
      </div>

      <ProjectEvidence {...webDevelopment.caseStudy} />

      <div className="flex flex-col gap-10 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-14 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">How it works</h2>
        <ProcessSteps steps={webDevelopment.process} />
        <p className="text-base leading-relaxed text-muted-strong lg:text-lg">
          <TextLink variant="underline" href="/contact">
            Start a project
          </TextLink>{" "}
          to talk through what your project needs.
        </p>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <FaqJsonLd faqs={webDevelopment.faqs} />
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">Web development questions</h2>
        <Accordion items={webDevelopment.faqs} />
      </div>

      <RelatedLinks items={webDevelopment.related} />
    </PageShell>
  );
}
