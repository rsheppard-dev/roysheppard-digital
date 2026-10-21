import type { Metadata } from "next";
import { footer as fallbackFooter, cta as fallbackCta } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Nav } from "@/components/sections/nav";
import { StickyHeader } from "@/components/sections/sticky-header";
import { Footer } from "@/components/sections/footer";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { getContactPage } from "@/lib/site-pages";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { formatUkPhone, telHref } from "@/lib/phone";

const PATH = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return buildPageMetadata({ title: page.title, description: page.description, path: PATH, image: page.socialImage });
}

export default async function ContactPage() {
  const page = await getContactPage();
  const email = fallbackFooter.email || fallbackCta.email;
  const phone = fallbackFooter.phone;

  return (
    <>
      <StickyHeader>
        <Nav />
      </StickyHeader>

      <main>
      <PageModifiedJsonLd path={PATH} name="Contact" source="contact" />
      <Breadcrumbs label="Contact" path={PATH} />

      <div className="flex flex-col gap-10 px-6 py-14 sm:px-10 lg:flex-row lg:gap-20 lg:px-35 lg:py-25">
        <div className="flex flex-1 flex-col gap-5 lg:max-w-105">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl">
            {page.heading}
          </h1>
          <p className="text-base leading-relaxed text-muted-strong lg:text-lg">
            {page.intro}
          </p>
          <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
              {page.stepsHeading}
            </h2>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted-strong marker:font-mono marker:text-xs marker:text-muted">
              {page.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col border-t border-border pt-5">
            <span className="mb-0.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
              {page.directHeading}
            </span>
            <a href={`mailto:${email}`} className="w-fit py-2 text-[15px] text-ink underline decoration-border-tan underline-offset-4 transition-colors hover:text-accent-text">
              {email}
            </a>
            {phone && (
              <a href={telHref(phone)} className="w-fit py-2 text-[15px] text-ink underline decoration-border-tan underline-offset-4 transition-colors hover:text-accent-text">
                {formatUkPhone(phone)}
              </a>
            )}
          </div>
        </div>

        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
      </main>

      <Footer />
    </>
  );
}
