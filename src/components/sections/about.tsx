import Image from "next/image";
import { about as fallbackAbout } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { AboutIllustration } from "@/components/sections/about-illustration";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const DEFAULT_ILLUSTRATION_ASSET_REF =
  "image-0e4e9b6d1b6123dfa018ceebd070b027b97aa670-1792x2400-png";

export async function About() {
  const { data } = await sanityFetch({ query: aboutQuery });
  const about = data ?? null;

  const eyebrow = about?.eyebrow || fallbackAbout.eyebrow;
  const statement = about?.statement || fallbackAbout.statement;
  const tags = about?.tags && about.tags.length > 0 ? about.tags : fallbackAbout.tags;

  // The floating browser icon is a separate layer cropped from the default
  // illustration, so it only lines up when that exact asset is in use.
  const isDefaultIllustration =
    !about?.image?.asset?._ref ||
    about.image.asset._ref === DEFAULT_ILLUSTRATION_ASSET_REF;
  const cmsImageSrc =
    about?.image && !isDefaultIllustration
      ? urlFor(about.image).width(600).height(800).fit("max").url()
      : null;

  return (
    <div
      id="about"
      className="flex flex-col items-center gap-10 px-6 py-14 sm:px-10 lg:flex-row lg:gap-16 lg:px-[140px] lg:py-[100px]"
    >
      <div className="flex flex-1 flex-col gap-5 lg:gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-[580px] text-xl font-medium leading-relaxed lg:text-[28px]">
          {statement}
        </h2>
        <div className="mt-1 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-[220px] shrink-0 items-center justify-center lg:w-[300px] lg:max-w-[300px]">
        {isDefaultIllustration ? (
          <AboutIllustration />
        ) : (
          <Image
            src={cmsImageSrc!}
            alt="Illustration of Roy Sheppard"
            width={1792}
            height={2400}
            className="h-auto w-full"
          />
        )}
      </div>
    </div>
  );
}
