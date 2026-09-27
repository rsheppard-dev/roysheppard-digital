import { Nav } from "@/components/sections/nav";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";

/** Shared chrome for retained standalone pages — same Nav/CTA/Footer as the homepage. */
export function PageShell({
  children,
  cta,
}: {
  children: React.ReactNode;
  /** Optional copy overrides for the closing CTA banner. */
  cta?: React.ComponentProps<typeof CtaBanner>;
}) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>
      <main>
        {children}
        <CtaBanner {...cta} />
      </main>
      <Footer />
    </>
  );
}
