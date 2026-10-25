import type { Metadata } from "next";
import { getServicePage } from "@/lib/service-page";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { FocusCards } from "@/components/service-page/focus-cards";
import { ProcessSection } from "@/components/service-page/process-section";
import { WorkScreens } from "@/components/service-page/work-screens";
import { ProjectEvidence } from "@/components/service-page/project-evidence";
import { RelatedLinks } from "@/components/service-page/related-links";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { ServiceJsonLd } from "@/components/service-page/service-jsonld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { ReviewPromo } from "@/components/sections/review-promo";

const SLUG = "web-design-watford";
const PATH = `/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage(SLUG);
  return buildPageMetadata({ title: page.title, description: page.description, path: PATH, image: page.socialImage });
}

export default async function WebDesignPage() {
  const webDesign = await getServicePage(SLUG);
  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={webDesign.title} source="service" portrait />
      <ServiceJsonLd
        path={PATH}
        name="Web Design"
        serviceType="Web design"
        description={webDesign.description}
      />
      <Breadcrumbs label="Web Design" path={PATH} parents={[{ label: "Services", path: "/services" }]} />
      <ServiceHeader
        eyebrow={webDesign.eyebrow}
        heading={webDesign.heading}
        intro={webDesign.intro}
        aside={<WorkScreens />}
      />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What that can include</h2>
        <FocusCards tone="tan" items={webDesign.focusAreas} />
      </div>

      <ProjectEvidence {...webDesign.caseStudy} />

      <ProcessSection tone="tan" intro={webDesign.processIntro} steps={webDesign.process} />

      <ReviewPromo />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <FaqJsonLd faqs={webDesign.faqs} />
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">Web design questions</h2>
        <Accordion items={webDesign.faqs} />
      </div>

      <RelatedLinks items={webDesign.related} tone="cream" />
    </PageShell>
  );
}
