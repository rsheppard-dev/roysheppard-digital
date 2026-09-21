import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

/**
 * Custom desk structure: singleton content sections pinned at the top
 * (each editing one fixed document), repeatable content types below.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("About")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("CTA Banner")
        .child(S.document().schemaType("cta").documentId("cta")),
      S.listItem()
        .title("Footer")
        .child(S.document().schemaType("footer").documentId("footer")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ""),
      ),
    ]);
