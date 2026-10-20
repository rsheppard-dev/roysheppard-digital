import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { hero } from "./hero";
import { about } from "./about";
import { cta } from "./cta";
import { footer } from "./footer";
import { service } from "./service";
import { servicePage } from "./servicePage";
import { workItem } from "./workItem";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { privacyPolicy } from "./privacyPolicy";
import { freeReviewPage } from "./freeReviewPage";
import { contactPage } from "./contactPage";
import { notFoundPage } from "./notFoundPage";
import { workIndexPage } from "./workIndexPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    hero,
    about,
    cta,
    footer,
    service,
    servicePage,
    workItem,
    testimonial,
    faq,
    privacyPolicy,
    freeReviewPage,
    contactPage,
    notFoundPage,
    workIndexPage,
  ],
};

/** Document types that should only ever have a single instance. */
export const singletonTypes = new Set([
  "siteSettings",
  "hero",
  "about",
  "cta",
  "footer",
  "privacyPolicy",
  "freeReviewPage",
  "contactPage",
  "notFoundPage",
  "workIndexPage",
]);
