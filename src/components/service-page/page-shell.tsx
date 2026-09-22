import { Nav } from "@/components/sections/nav";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";

/** Shared chrome for retained standalone pages — same Nav/CTA/Footer as the homepage. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>
      {children}
      <CtaBanner />
      <Footer />
    </>
  );
}
