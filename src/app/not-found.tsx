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
          <h1 className="text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[52px]">
            <span className="sr-only">Page not found. </span>
            What are you doing here?
          </h1>
          <p className="max-w-115 text-base leading-relaxed text-muted-strong lg:text-lg">
            This page doesn&apos;t exist. A little privacy, please.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-6">
            <TextLink variant="buttonInverse" href="/" className="text-base lg:text-lg">
              Back to home
            </TextLink>
            <TextLink variant="underline" href="/work" className="text-sm lg:text-[15px]">
              See my work
            </TextLink>
          </div>
        </div>

        <div className="flex w-full flex-1 items-center justify-center">
          {/* The 404 is real text sized in container units, so it keeps the same
              place behind the drawing (head in front of the 0, foam over the base)
              at every width. */}
          <div className="@container relative aspect-1280/850 w-full max-w-125 lg:max-w-160">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-[-1cqw] select-none text-center text-[47cqw] font-bold leading-none tracking-[-0.04em] text-[#e6dfcd]"
            >
              404
            </span>
            <Image
              src="/images/404-bath-sketch.webp"
              alt="Illustration of Roy Sheppard in a bubble bath, looking surprised to have been caught"
              width={1280}
              height={850}
              priority
              className="relative h-auto w-full"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
