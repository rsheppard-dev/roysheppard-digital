import Image from "next/image";

type Capability = { title: string; description: string; benefit: string };

/** Drawn icons, matched to a capability by words in its title. Order matters: first match wins. */
const ICONS: { match: RegExp; src: string }[] = [
  { match: /book|appointment|schedul/i, src: "/images/capabilities/booking.webp" },
  { match: /account|portal|login|member/i, src: "/images/capabilities/accounts.webp" },
  { match: /quote|calculat|form|enquir/i, src: "/images/capabilities/quotes.webp" },
  { match: /connect|integrat|software|system|api/i, src: "/images/capabilities/connections.webp" },
  { match: /tool|workflow|admin|automat/i, src: "/images/capabilities/tools.webp" },
];

const FALLBACK = "/images/capabilities/tools.webp";

function CapabilityIcon({ title }: { title: string }) {
  const src = ICONS.find((entry) => entry.match.test(title))?.src ?? FALLBACK;
  return (
    <Image
      src={src}
      alt=""
      width={360}
      height={360}
      sizes="(min-width: 1024px) 96px, 72px"
      className="size-18 shrink-0 lg:size-24"
    />
  );
}

/**
 * What the site can do, as open rows on a hairline rule. A drawn icon and the
 * title sit left; the description and its practical benefit sit right, with the
 * benefit picked out in a card so each row can be skimmed.
 */
export function CapabilityList({ items }: { items: Capability[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.title}
          className="grid grid-cols-1 gap-5 border-t border-border-tan py-7 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-9"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <CapabilityIcon title={item.title} />
            <h3 className="text-xl font-bold leading-snug lg:text-2xl">{item.title}</h3>
          </div>
          <div className="flex max-w-130 flex-col gap-4">
            <p className="text-[15px] leading-relaxed text-muted-strong lg:text-base">{item.description}</p>
            <p className="flex items-start gap-3 rounded-xl border border-border-tan bg-cream px-4 py-3 text-[15px] font-medium leading-relaxed text-ink lg:text-base">
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-accent-text"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8.5l3.2 3L13 4.5" />
              </svg>
              {item.benefit}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
