import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { hero } from "./hero";
import { about } from "./about";
import { cta } from "./cta";
import { footer } from "./footer";
import { service } from "./service";
import { workItem } from "./workItem";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { trustLogo } from "./trustLogo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    hero,
    about,
    cta,
    footer,
    service,
    workItem,
    testimonial,
    faq,
    trustLogo,
  ],
};

/** Document types that should only ever have a single instance. */
export const singletonTypes = new Set([
  "siteSettings",
  "hero",
  "about",
  "cta",
  "footer",
]);
