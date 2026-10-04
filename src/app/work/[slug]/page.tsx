import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Story } from "@/components/case-study/story";
import { Showcase } from "@/components/case-study/showcase";
import {
  ClientQuote,
  Features,
  NextProject,
  Outcome,
  TechnologyList,
} from "@/components/case-study/details";
import { sanityFetch } from "@/sanity/lib/live";
import { caseStudyQuery, caseStudySlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: caseStudySlugsQuery,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
}

async function getCaseStudy(slug: string) {
  const { data } = await sanityFetch({ query: caseStudyQuery, params: { slug } });
  return data;
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy?.name) return {};

  return buildPageMetadata({
    title: `${caseStudy.name} case study | Roy Sheppard`,
    description:
      caseStudy.tagline ??
      `How Roy Sheppard designed and built the ${caseStudy.name} website.`,
    path: `/work/${slug}`,
    // Full-page screenshots are tall, so crop from the top to show the homepage hero.
    image: caseStudy.image
      ? urlFor(caseStudy.image).width(1200).height(630).fit("crop").crop("top").url()
      : undefined,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy?.name) notFound();

  const {
    name,
    url,
    tagline,
    industry,
    projectType,
    services,
    image,
    imageDimensions,
    technologies,
    testimonial,
    next,
  } = caseStudy;

  const techNames = (technologies ?? []).flatMap((item) => (item.name ? [item.name] : []));

  return (
    <PageShell
      cta={{
        heading: "Have a project in mind?",
        body: "Whether it's something like this or something completely different, tell me what you need. No obligation, just an honest conversation about what would work for your business.",
        buttonLabel: "Start a project",
      }}
    >
      <PageModifiedJsonLd path={`/work/${slug}`} name={`${name} case study`} source="shared" slug={slug} />
      <Breadcrumbs label={`${name} case study`} path={`/work/${slug}`} />
      <CaseStudyHero
        name={name}
        tagline={tagline}
        url={url}
        facts={[
          { label: "Industry", value: industry },
          { label: "Project", value: projectType },
          { label: "Services", value: services?.join(", ") },
          { label: "Built with", value: techNames.slice(0, 3).join(", ") },
        ]}
        screenshotSrc={image?.asset ? urlFor(image).width(2400).url() : undefined}
        screenshotDimensions={
          imageDimensions?.width != null && imageDimensions?.height != null
            ? { width: imageDimensions.width, height: imageDimensions.height }
            : undefined
        }
      />
      <Story
        chapters={[
          { title: "The client", text: caseStudy.client },
          { title: "The challenge", text: caseStudy.challenge, lead: true },
          { title: "The solution", text: caseStudy.solution, lead: true },
        ]}
      />
      <Showcase blocks={caseStudy.showcase ?? []} />
      <Features items={caseStudy.features ?? []} />
      <TechnologyList items={technologies ?? []} />
      <Outcome items={caseStudy.results ?? []} />
      {testimonial?.quote && (
        <ClientQuote quote={testimonial.quote} name={testimonial.name} company={testimonial.company} />
      )}
      {next?.slug && next.name && next.slug !== slug && (
        <NextProject name={next.name} meta={next.meta} slug={next.slug} />
      )}
    </PageShell>
  );
}
