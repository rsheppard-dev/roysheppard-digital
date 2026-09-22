import type { Metadata } from "next";
import { webDevelopment } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { NumberedList } from "@/components/service-page/numbered-list";
import { ProjectEvidence } from "@/components/service-page/project-evidence";
import { RelatedLinks } from "@/components/service-page/related-links";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
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
      <Breadcrumbs label="Web Development" path={PATH} />
      <ServiceHeader
        eyebrow={webDevelopment.eyebrow}
        heading={webDevelopment.heading}
        intro={webDevelopment.intro}
      />

      <div className="flex flex-col gap-8 px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What the build includes</h2>
        <NumberedList items={webDevelopment.focusAreas} />
      </div>

      <ProjectEvidence {...webDevelopment.caseStudy} />

      <div className="flex flex-col gap-5 px-6 pb-14 sm:px-10 lg:px-35 lg:pb-25">
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          {webDevelopment.howItWorks}
        </p>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          <TextLink variant="underline" href="/contact">
            Get in touch
          </TextLink>{" "}
          to talk through what your project needs.
        </p>
      </div>

      <div className="flex flex-col gap-8 px-6 pb-14 sm:px-10 lg:gap-10 lg:px-35 lg:pb-25">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">Web development questions</h2>
        <Accordion items={webDevelopment.faqs} />
      </div>

      <RelatedLinks items={webDevelopment.related} />
    </PageShell>
  );
}
