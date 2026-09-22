import { Eyebrow } from "@/components/ui/eyebrow";

export function ServiceHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
}) {
  return (
    <div className="flex flex-col gap-5 px-6 pb-4 pt-8 sm:px-10 lg:gap-6 lg:px-35 lg:pb-6 lg:pt-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-190 text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
        {heading}
      </h1>
      <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
        {intro}
      </p>
    </div>
  );
}
