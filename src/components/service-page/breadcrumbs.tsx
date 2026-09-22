import Link from "next/link";

const SITE_URL = "https://www.roysheppard.digital";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data (mirrors what's on screen). */
export function Breadcrumbs({ label, path }: { label: string; path: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="px-6 pt-8 sm:px-10 lg:px-35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ol className="flex items-center gap-2 font-mono text-xs text-muted-soft">
        <li>
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-muted-strong">
          {label}
        </li>
      </ol>
    </nav>
  );
}
