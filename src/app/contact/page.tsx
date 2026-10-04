import type { Metadata } from "next";
import { footer as fallbackFooter, cta as fallbackCta } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { CONTACT_UPDATED } from "@/lib/page-dates";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";

const PATH = "/contact";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact | Roy Sheppard",
  description:
    "Get in touch with Roy Sheppard about a web design or development project in Watford or beyond. Send a few details and get a reply within a day.",
  path: PATH,
});

export default function ContactPage() {
  const email = fallbackFooter.email || fallbackCta.email;
  const phone = fallbackFooter.phone;

  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>

      <main>
      <PageModifiedJsonLd path={PATH} name="Contact" source="shared" codeUpdated={CONTACT_UPDATED} />
      <Breadcrumbs label="Contact" path={PATH} />

      <div className="flex flex-col gap-10 px-6 py-14 sm:px-10 lg:flex-row lg:gap-20 lg:px-35 lg:py-25">
        <div className="flex flex-1 flex-col gap-5 lg:max-w-105">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl">
            Let&apos;s talk about your project
          </h1>
          <p className="text-base leading-relaxed text-muted-strong lg:text-lg">
            Send a few details about what you&apos;re looking to build, and I&apos;ll reply with
            some thoughts and next steps, usually within a day.
          </p>
          <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
              What happens next
            </h2>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted-strong marker:font-mono marker:text-xs marker:text-muted">
              <li>I&apos;ll get back to you with a few questions and some first thoughts.</li>
              <li>
                We talk it through however suits you: email, a phone call, a video call, or in
                person if you&apos;re local.
              </li>
              <li>You get a clear quote for the work we&apos;ve agreed before anything starts.</li>
            </ol>
          </div>
          <div className="flex flex-col border-t border-border pt-5">
            <span className="mb-0.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
              Prefer email or phone?
            </span>
            <a href={`mailto:${email}`} className="w-fit py-2 text-[15px] text-ink underline decoration-border-tan underline-offset-4 transition-colors hover:text-accent-text">
              {email}
            </a>
            {phone && (
              <a href={`tel:${phone}`} className="w-fit py-2 text-[15px] text-ink underline decoration-border-tan underline-offset-4 transition-colors hover:text-accent-text">
                {phone}
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
