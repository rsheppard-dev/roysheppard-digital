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
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Work page")
                .child(S.document().schemaType("workIndexPage").documentId("workIndexPage")),
              S.listItem()
                .title("Free website review")
                .child(S.document().schemaType("freeReviewPage").documentId("freeReviewPage")),
              S.listItem()
                .title("Contact")
                .child(S.document().schemaType("contactPage").documentId("contactPage")),
              S.listItem()
                .title("Privacy policy")
                .child(S.document().schemaType("privacyPolicy").documentId("privacyPolicy")),
              S.listItem()
                .title("Page not found (404)")
                .child(S.document().schemaType("notFoundPage").documentId("notFoundPage")),
              S.divider(),
              S.documentTypeListItem("servicePage").title("Service pages"),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !singletonTypes.has(item.getId() ?? "") && item.getId() !== "servicePage",
      ),
    ]);
