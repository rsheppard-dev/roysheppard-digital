import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { CaseStudyQueryResult } from "@/sanity/types";
import { PopoutStage } from "./popout-stage";

type Block = NonNullable<NonNullable<CaseStudyQueryResult>["showcase"]>[number];
export type PopoutBlock = Extract<Block, { _type: "showcasePopout" }>;

const STAGE_SIZES = "(min-width: 1024px) calc(100vw - 280px), 92vw";
/** Longest edge requested from Sanity; the source is a 2x capture, so this stays sharp on retina screens. */
const MAX_REQUEST = 2400;

const pct = (value: number) => `${Math.round(value * 10000) / 100}%`;

/**
 * A full screenshot as a calm page, with a few parts of it lifted off: each piece is cut from
 * the same screenshot (Sanity's rect crop), so it is pin-sharp and needs no upload of its own.
 * Everything is positioned in the screenshot's own pixels, so the composition scales as one.
 */
export function Popout({ block }: { block: PopoutBlock }) {
  const { image, view, pieces } = block;
  if (!image?.asset || view?.x == null || view.y == null || !view.width || !view.height) return null;

  const source = { asset: image.asset };
  const { x: vx, y: vy, width: vw, height: vh } = { x: view.x, y: view.y, width: view.width, height: view.height };
  const baseWidth = Math.min(vw, MAX_REQUEST);

  return (
    <PopoutStage className="popout @container relative" style={{ aspectRatio: `${vw} / ${vh}` }}>
      <div className="absolute inset-0 overflow-hidden rounded-[10px] bg-white shadow-[0_2px_6px_rgba(23,23,26,0.05),0_24px_56px_rgba(23,23,26,0.08)] lg:rounded-[14px]">
        <Image
          src={urlFor(source).rect(vx, vy, vw, vh).width(baseWidth).url()}
          alt={image.alt ?? ""}
          fill
          sizes={STAGE_SIZES}
          className="object-cover"
        />
        {/* A light wash so the lifted pieces carry the eye, without hiding the page they came from. */}
        <div className="popout-wash absolute inset-0 bg-cream" aria-hidden="true" />
      </div>

      {(pieces ?? []).map((piece, index) => {
        const { source: crop, place } = piece;
        if (!piece.label || crop?.x == null || crop.y == null || !crop.width || !crop.height || place?.x == null || place.y == null) {
          return null;
        }
        const scale = piece.scale ?? 1;
        const widthShare = (crop.width * scale) / vw;

        return (
          <div
            key={piece._key}
            className="absolute"
            style={{
              left: pct((place.x - vx) / vw),
              top: pct((place.y - vy) / vh),
              width: pct(widthShare),
            }}
          >
            <div
              className="popout-piece overflow-hidden rounded-md"
              style={
                {
                  "--rot": `${piece.rotate ?? 0}deg`,
                  "--i": index,
                  // Where the piece sits on the page it was cut from, so it can start there and lift away.
                  // Container-width units, because the whole stage scales as one.
                  "--from-x": `${((crop.x - place.x) / vw) * 100}cqw`,
                  "--from-y": `${((crop.y - place.y) / vw) * 100}cqw`,
                  "--from-s": 1 / scale,
                } as React.CSSProperties
              }
            >
              <Image
                src={urlFor(source)
                  .rect(crop.x, crop.y, crop.width, crop.height)
                  .width(Math.min(crop.width, MAX_REQUEST))
                  .url()}
                alt={piece.label}
                width={crop.width}
                height={crop.height}
                sizes={`(min-width: 1024px) calc((100vw - 280px) * ${widthShare.toFixed(3)}), ${Math.round(widthShare * 92)}vw`}
                className="block h-auto w-full"
              />
            </div>
          </div>
        );
      })}
    </PopoutStage>
  );
}
