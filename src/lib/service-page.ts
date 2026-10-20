import { sanityFetch } from "@/sanity/lib/live";
import { servicePageQuery } from "@/sanity/lib/queries";

/** Fetch a service page's content from Sanity by its URL slug (for example "web-design-watford"). */
export async function getServicePage(slug: string) {
  const { data } = await sanityFetch({ query: servicePageQuery, params: { slug } });
  if (!data) {
    throw new Error(`Missing servicePage document for "${slug}" in Sanity`);
  }

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    socialImage: data.socialImage ?? null,
    eyebrow: data.eyebrow ?? "",
    heading: data.heading ?? "",
    highlight: data.highlight ?? undefined,
    intro: data.intro ?? "",
    capabilities: (data.capabilities ?? []).map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      benefit: c.benefit ?? "",
    })),
    focusAreas: (data.focusAreas ?? []).map((f) => ({
      title: f.title ?? "",
      description: f.description ?? "",
    })),
    caseStudy: {
      eyebrow: data.caseStudy?.eyebrow ?? "Showcase",
      name: data.caseStudy?.name ?? "",
      meta: data.caseStudy?.meta ?? "",
      url: data.caseStudy?.url ?? "",
      contribution: data.caseStudy?.contribution ?? [],
      quote: data.caseStudy?.quote ?? "",
      quoteName: data.caseStudy?.quoteName ?? "",
      quoteCompany: data.caseStudy?.quoteCompany ?? "",
    },
    processIntro: data.processIntro ?? "",
    process: (data.process ?? []).map((s) => ({
      title: s.title ?? "",
      description: s.description ?? "",
    })),
    faqs: (data.faqs ?? []).map((f) => ({
      question: f.question ?? "",
      answer: f.answer ?? "",
    })),
    related: (data.related ?? []).map((r) => ({ label: r.label ?? "", href: r.href ?? "" })),
  };
}
