import Image from "next/image";

/** The about illustration: Roy sitting on a stool, in the sketch style shared with the hero. */
export function AboutIllustration() {
  return (
    <Image
      src="/images/about-sketch-v2.webp"
      alt="Illustration of Roy Sheppard"
      width={800}
      height={1602}
      sizes="(min-width: 1024px) 240px, 180px"
      className="h-auto w-full"
    />
  );
}
