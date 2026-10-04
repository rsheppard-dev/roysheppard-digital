import { Fragment } from "react";
import Link from "next/link";

const SITE_URL = "https://www.roysheppard.digital";

type Crumb = { label: string; path: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data (mirrors what's on screen).
 * `parents` are the pages between Home and this one, e.g. Work for a case study.
 */
export function Breadcrumbs({
  label,
  path,
  parents = [],
}: {
  label: string;
  path: string;
  parents?: Crumb[];
}) {
  const trail: Crumb[] = [{ label: "Home", path: "/" }, ...parents, { label, path }];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="px-6 pt-8 sm:px-10 lg:px-35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ol className="flex items-center gap-2 font-mono text-xs text-muted">
        {trail.slice(0, -1).map((crumb) => (
          <Fragment key={crumb.path}>
            <li>
              <Link href={crumb.path} className="tap-area transition-colors hover:text-accent-text">
                {crumb.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
          </Fragment>
        ))}
        <li aria-current="page" className="text-muted-strong">
          {label}
        </li>
      </ol>
    </nav>
  );
}
