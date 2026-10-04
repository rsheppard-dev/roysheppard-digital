import { Nav } from "@/components/sections/nav";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";

/** Shared chrome for retained standalone pages — same Nav/CTA/Footer as the homepage. */
export function PageShell({
  children,
  cta,
}: {
  children: React.ReactNode;
  /** Optional copy overrides for the closing CTA banner, or `false` to leave it off (a page whose own form is the call to action). */
  cta?: React.ComponentProps<typeof CtaBanner> | false;
}) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>
      <main>
        {children}
        {cta !== false && <CtaBanner {...cta} />}
      </main>
      <Footer />
    </>
  );
}
