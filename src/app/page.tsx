import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Testimonials } from "@/components/sections/testimonials";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>
      <Hero />
      <Services />
      <About />
      <Work />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <Footer />
    </>
  );
}
