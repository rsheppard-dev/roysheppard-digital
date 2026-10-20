import { sanityFetch } from "@/sanity/lib/live";
import {
  contactPageQuery,
  freeReviewPageQuery,
  notFoundPageQuery,
  privacyPolicyQuery,
  workIndexPageQuery,
} from "@/sanity/lib/queries";

/** Throws if the document is missing, like `getServicePage`: these pages have no copy in code. */
function required<T>(data: T | null, type: string): T {
  if (!data) throw new Error(`Missing ${type} document in Sanity`);
  return data;
}

export async function getPrivacyPolicy() {
  const { data } = await sanityFetch({ query: privacyPolicyQuery });
  const page = required(data, "privacyPolicy");
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    socialImage: page.socialImage ?? null,
    heading: page.heading ?? "",
    /** The date the policy itself last changed (a manual field), shown as "Last updated". */
    policyUpdated: page.policyUpdated ?? "",
    sections: (page.sections ?? []).map((s) => ({
      key: s._key,
      heading: s.heading ?? "",
      paragraphs: s.paragraphs ?? [],
      list: s.list ?? [],
    })),
  };
}

export async function getFreeReviewPage() {
  const { data } = await sanityFetch({ query: freeReviewPageQuery });
  const page = required(data, "freeReviewPage");
  const titled = (items: { title: string | null; description: string | null }[] | null) =>
    (items ?? []).map((i) => ({ title: i.title ?? "", description: i.description ?? "" }));
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    socialImage: page.socialImage ?? null,
    eyebrow: page.eyebrow ?? "",
    heading: page.heading ?? "",
    intro: page.intro ?? "",
    areasHeading: page.areasHeading ?? "",
    areasIntro: page.areasIntro ?? "",
    areas: titled(page.areas),
    stepsHeading: page.stepsHeading ?? "",
    stepsIntro: page.stepsIntro ?? "",
    steps: titled(page.steps),
    faqHeading: page.faqHeading ?? "",
    faqs: (page.faqs ?? []).map((f) => ({ question: f.question ?? "", answer: f.answer ?? "" })),
  };
}

export async function getContactPage() {
  const { data } = await sanityFetch({ query: contactPageQuery });
  const page = required(data, "contactPage");
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    socialImage: page.socialImage ?? null,
    heading: page.heading ?? "",
    intro: page.intro ?? "",
    stepsHeading: page.stepsHeading ?? "",
    steps: page.steps ?? [],
    directHeading: page.directHeading ?? "",
  };
}

export async function getNotFoundPage() {
  const { data } = await sanityFetch({ query: notFoundPageQuery });
  const page = required(data, "notFoundPage");
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    heading: page.heading ?? "",
    body: page.body ?? "",
    primaryButton: page.primaryButton ?? "",
    secondaryLink: page.secondaryLink ?? "",
  };
}

export async function getWorkIndexPage() {
  const { data } = await sanityFetch({ query: workIndexPageQuery });
  const page = required(data, "workIndexPage");
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    socialImage: page.socialImage ?? null,
    eyebrow: page.eyebrow ?? "",
    heading: page.heading ?? "",
    intro: page.intro ?? "",
  };
}
