import type { Metadata } from "next";
import { privacyPolicy } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";

const PATH = "/privacy-policy";

export const metadata: Metadata = buildPageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: PATH,
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <Breadcrumbs label="Privacy Policy" path={PATH} />

      <div className="flex flex-col gap-6 px-6 pb-4 pt-8 sm:px-10 lg:px-35 lg:pb-6 lg:pt-10">
        <h1 className="text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
          {privacyPolicy.heading}
        </h1>
        <span className="font-mono text-xs text-muted-soft">
          Last updated: {privacyPolicy.lastUpdated}
        </span>
      </div>

      <div className="flex flex-col gap-10 px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
        {privacyPolicy.sections.map((section) => (
          <div key={section.heading} className="flex max-w-190 flex-col gap-3">
            <h2 className="text-xl font-bold">{section.heading}</h2>
            {section.paragraphs?.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="flex flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-muted">
                {section.list.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
