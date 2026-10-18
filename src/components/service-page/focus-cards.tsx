import Image from "next/image";

type Item = { title: string; description: string };

/** Drawn spot illustrations, matched to a point by words in its title. First match wins. */
const SPOTS: { match: RegExp; src: string }[] = [
  { match: /platform/i, src: "platform" },
  { match: /product page/i, src: "product-pages" },
  { match: /payment/i, src: "payments" },
  { match: /grow|scale/i, src: "grow" },
  { match: /brand/i, src: "brand" },
  { match: /content you can|manage|edit/i, src: "manage" },
  { match: /content/i, src: "content" },
  { match: /next step|action/i, src: "next-step" },
  { match: /mobile/i, src: "mobile" },
  { match: /requirement/i, src: "requirements" },
  { match: /performance|speed|fast/i, src: "performance" },
  { match: /looked after|support|maintain/i, src: "looked-after" },
];

/**
 * The points a service covers, as cards that each lead with a drawn illustration.
 * The points have no order, so they carry no numbers. `tone` is the band the
 * cards sit on; the cards take the other shade so they lift off it.
 */
export function FocusCards({ items, tone }: { items: Item[]; tone: "tan" | "cream" }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
      {items.map((item) => {
        const spot = SPOTS.find((entry) => entry.match.test(item.title))?.src;
        return (
          <li
            key={item.title}
            className={`flex flex-col gap-6 rounded-2xl border border-border-tan p-6 lg:p-8 ${
              tone === "tan" ? "bg-cream" : "bg-white"
            }`}
          >
            {spot && (
              <Image
                src={`/images/focus/${spot}.webp`}
                alt=""
                width={400}
                height={400}
                sizes="(min-width: 1024px) 160px, 128px"
                className="h-32 w-auto self-start lg:h-40"
              />
            )}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xl font-bold leading-snug lg:text-2xl">{item.title}</h3>
              <p className="max-w-110 text-[15px] leading-relaxed text-muted-strong lg:text-base">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
