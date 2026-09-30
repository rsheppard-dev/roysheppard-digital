import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { TextLink } from "@/components/ui/text-link";

export const metadata: Metadata = {
  title: "Page not found | Roy Sheppard",
  description: "The page you're looking for doesn't exist, got moved, or maybe never did.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
        <Nav />
      </div>

      <main className="flex flex-col items-center gap-10 px-6 py-16 sm:px-10 md:py-20 lg:flex-row lg:justify-between lg:gap-14 lg:px-35 lg:py-24">
        <div className="flex flex-1 flex-col gap-5 lg:max-w-115">
          <div className="flex w-fit items-center gap-2 rounded-pill bg-tan px-4 py-2">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-xs font-medium tracking-[0.02em] text-muted-strong">
              Error 404: page not found
            </span>
          </div>
          <h1 className="text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[52px]">
            What are you doing here?
          </h1>
          <p className="max-w-115 text-base leading-relaxed text-muted-strong lg:text-lg">
            This page doesn&apos;t exist. A little privacy, please.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-6">
            <TextLink variant="buttonInverse" href="/" className="text-base lg:text-lg">
              Back to home
            </TextLink>
            <TextLink variant="underline" href="/contact" className="text-sm lg:text-[15px]">
              Get in touch
            </TextLink>
          </div>
        </div>

        <div className="flex w-full flex-1 items-center justify-center">
          <Image
            src="/images/404-illustration.png"
            alt="Illustration of Roy Sheppard sitting in a bubble bath, looking shocked to have been caught, with a large 404 watermark behind him"
            width={2048}
            height={1360}
            priority
            className="h-auto w-full max-w-125 lg:max-w-160"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
