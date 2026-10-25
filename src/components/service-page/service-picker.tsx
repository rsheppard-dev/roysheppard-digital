"use client";

import { useId, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { TextLink } from "@/components/ui/text-link";

export type PickerChoice = {
  /** What the visitor says about their situation, shown on the button. */
  label: string;
  /** Small label under it, naming the service. */
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  bullets?: string[];
  steps?: { label: string; text: string }[];
};

/** Static class names so Tailwind can see them. Buttons stack in column one, one row each. */
const BUTTON_ROWS = ["xl:row-start-1", "xl:row-start-2", "xl:row-start-3", "xl:row-start-4"];

/**
 * "Which of these sounds like you?" The answer for every choice is rendered into the page
 * and the closed ones are only `hidden`, so search engines read all of them. One copy of each
 * answer: on a phone it opens directly under its button, on desktop it sits in a second column.
 */
export function ServicePicker({ choices }: { choices: PickerChoice[] }) {
  // Nothing is picked until the visitor taps. Two columns on desktop leave the answer side empty,
  // so there the first choice shows by default (in CSS, so it is right before the page hydrates).
  const [picked, setPicked] = useState<number | null>(null);
  const isDesktop = useIsDesktop();
  const baseId = useId();
  const active = picked ?? (isDesktop ? 0 : null);

  return (
    <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:grid-rows-[repeat(4,auto)_1fr] xl:gap-x-10">
      {choices.map((choice, index) => {
        const open = active === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <PickerItem
            key={choice.title}
            choice={choice}
            open={open}
            desktopDefault={picked === null && index === 0}
            panelId={panelId}
            rowClass={BUTTON_ROWS[index] ?? ""}
            // On a phone, tapping the open choice closes it again.
            onPick={() => setPicked(open && !isDesktop ? null : index)}
          />
        );
      })}
    </div>
  );
}

const DESKTOP_QUERY = "(min-width: 1280px)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True at the width where the picker switches to two columns (Tailwind's `xl`). False while rendering on the server. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

function PickerItem({
  choice,
  open,
  desktopDefault,
  panelId,
  rowClass,
  onPick,
}: {
  choice: PickerChoice;
  open: boolean;
  /** Nothing is picked yet: this choice shows as open on desktop only. */
  desktopDefault: boolean;
  panelId: string;
  rowClass: string;
  onPick: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onPick}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex min-h-11 w-full flex-col items-start gap-2 rounded-2xl border-[1.5px] px-6 py-5.5 text-left transition-[background-color,color,border-color,scale] duration-150 ease-out-strong active:scale-[0.98] xl:col-start-1 ${rowClass} ${
          open
            ? "border-ink bg-ink text-cream"
            : `border-border-tan text-ink hover:border-ink ${
                desktopDefault ? "xl:border-ink xl:bg-ink xl:text-cream" : ""
              }`
        }`}
      >
        <span className="text-xl font-medium leading-tight lg:text-2xl">{choice.label}</span>
        <span
          className={`font-mono text-[13px] uppercase tracking-[0.06em] ${
            open ? "text-highlight" : `text-muted-strong ${desktopDefault ? "xl:text-highlight" : ""}`
          }`}
        >
          {choice.tag}
        </span>
      </button>

      <div
        id={panelId}
        className={`${
          open ? "flex" : desktopDefault ? "hidden xl:flex" : "hidden"
        } flex-col gap-5 rounded-3xl border border-border-tan bg-paper p-6 shadow-[0_1px_0_rgba(81,78,68,0.08),0_28px_48px_-30px_rgba(81,78,68,0.35)] sm:p-8 lg:p-10 xl:col-start-2 xl:row-span-5 xl:row-start-1`}
      >
        <Image
          src={choice.image}
          alt=""
          width={400}
          height={400}
          sizes="(min-width: 1024px) 144px, 96px"
          className="h-24 w-24 shrink-0 self-start object-contain lg:h-36 lg:w-36"
        />
        <div className="flex flex-col gap-4 lg:gap-5">
          <h3 className="text-3xl font-semibold leading-tight tracking-[-0.01em] lg:text-4xl lg:leading-[1.08]">
            {choice.title}
          </h3>
          <p className="max-w-130 text-base leading-relaxed text-muted-strong lg:text-lg">{choice.description}</p>

          {choice.steps && (
            <ul className="flex max-w-130 flex-col text-[15px] lg:text-base">
              {choice.steps.map((step) => (
                <li key={step.label} className="flex gap-4 border-t border-border py-3 lg:gap-5">
                  <span className="w-22 shrink-0 pt-0.5 font-mono text-xs uppercase tracking-[0.06em] text-accent-text lg:w-24 lg:text-[13px]">
                    {step.label}
                  </span>
                  <span className="text-muted-strong">{step.text}</span>
                </li>
              ))}
            </ul>
          )}

          {choice.bullets && (
            <ul className="flex flex-col gap-2 text-[15px] text-muted-strong lg:gap-2.5 lg:text-base">
              {choice.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span aria-hidden="true" className="text-accent-text">
                    +
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <TextLink variant="button" href={choice.href} className="mt-1 w-fit max-sm:w-full max-sm:justify-center">
            {choice.cta} <span aria-hidden="true">→</span>
          </TextLink>
        </div>
      </div>
    </>
  );
}
