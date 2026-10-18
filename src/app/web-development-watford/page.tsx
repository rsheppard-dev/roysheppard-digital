import type { Metadata } from "next";
import { getServicePage } from "@/lib/service-page";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { CapabilityList } from "@/components/service-page/capability-list";
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

const SLUG = "web-development-watford";
const PATH = `/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage(SLUG);
  return buildPageMetadata({ title: page.title, description: page.description, path: PATH });
}

export default async function WebDevelopmentPage() {
  const webDevelopment = await getServicePage(SLUG);
  return (
    <PageShell
      cta={{
        heading: "What do you need your website to do?",
        body: "Tell me about an idea, or a business process you'd like to make easier. No obligation, just a chat.",
      }}
    >
      <PageModifiedJsonLd path={PATH} name={webDevelopment.title} source="service" />
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

      <div className="flex flex-col gap-8 border-t border-border-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px]">What your website can do for your business</h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Beyond pages and content, I build the working parts of a website. These are the kinds of things I can
            build around how your business runs.
          </p>
        </div>
        <CapabilityList items={webDevelopment.capabilities} />
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What the build includes</h2>
        <NumberedList items={webDevelopment.focusAreas} />
      </div>

      <ProjectEvidence {...webDevelopment.caseStudy} />

      <div className="flex flex-col gap-10 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-14 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold lg:text-[42px]">How it works</h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            {webDevelopment.processIntro}
          </p>
        </div>
        <ProcessSteps steps={webDevelopment.process} />
        <p className="text-base leading-relaxed text-muted-strong lg:text-lg">
          <TextLink variant="underline" href="/contact">
            Start a project
          </TextLink>{" "}
          to talk through the problem or idea you have in mind.
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
