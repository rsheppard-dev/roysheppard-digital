"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav } from "@/content/site";
import { TextLink } from "@/components/ui/text-link";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-200 ${
          open ? "translate-y-1.75 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-ink transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-transform duration-200 ${
          open ? "-translate-y-1.75 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-border"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex h-18 items-center justify-between px-6 sm:px-10 lg:h-22 lg:px-20">
        <Link href="/" aria-label="Roy Sheppard, home" className="flex h-11 items-center">
          <Image
            src="/images/logo.png"
            alt="Roy Sheppard"
            width={373}
            height={32}
            loading="eager"
            className="h-2.5 w-auto sm:h-3 lg:h-3.5"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <TextLink key={item.href} variant="nav" href={item.href}>
              {item.label}
            </TextLink>
          ))}
          <TextLink variant="navCta" href="/contact">
            Let&apos;s talk
          </TextLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-0.5 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-6 pb-6 pt-2 sm:px-10 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 font-mono text-sm uppercase tracking-[0.03em] text-muted"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="tap-area mt-3 w-fit border-b-[1.5px] border-ink pb-0.75 font-mono text-sm uppercase tracking-[0.03em] text-ink"
          >
            Let&apos;s talk
          </Link>
        </div>
      )}
    </div>
  );
}
