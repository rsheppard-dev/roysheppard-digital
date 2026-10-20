import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { WorkIndex, type WorkIndexItem } from "@/components/sections/work-index";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getWorkIndexPage } from "@/lib/site-pages";
import { sanityFetch } from "@/sanity/lib/live";
import { workIndexQuery } from "@/sanity/lib/queries";

const PATH = "/work";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWorkIndexPage();
  return buildPageMetadata({ title: page.title, description: page.description, path: PATH, image: page.socialImage });
}

export default async function WorkIndexPage() {
  const page = await getWorkIndexPage();
  const { data } = (await sanityFetch({ query: workIndexQuery })) as { data: WorkIndexItem[] | null };

  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name="Client Projects" source="work" />
      <Breadcrumbs label="Work" path={PATH} />
      <div className="flex flex-col gap-5 px-6 pb-12 pt-8 sm:px-10 lg:gap-6 lg:px-35 lg:pb-16 lg:pt-10">
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <h1 className="max-w-190 text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
          {page.heading}
        </h1>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          {page.intro}
        </p>
      </div>
      <div className="border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
        <WorkIndex items={data ?? []} />
      </div>
    </PageShell>
  );
}
