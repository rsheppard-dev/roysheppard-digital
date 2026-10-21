"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav, serviceLinks } from "@/content/site";
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

/** A small chevron drawn with borders, like the menu icon, that turns over when its menu is open. */
function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-1.75 w-1.75 border-b-[1.5px] border-r-[1.5px] border-current transition-transform duration-200 ease-out-strong ${
        open ? "-translate-y-px rotate-[225deg]" : "-translate-y-0.5 rotate-45"
      }`}
    />
  );
}

/** Services nav item for desktop: the link goes to the services page, the dropdown goes straight to each service. */
function ServicesMenu({ label, href }: { label: string; href: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // A press anywhere outside closes a menu that was opened by click or keyboard.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short grace period so the pointer can cross from the link to the panel without it closing.
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center self-stretch"
      onPointerEnter={(event) => event.pointerType === "mouse" && show()}
      onPointerLeave={(event) => event.pointerType === "mouse" && hideSoon()}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <TextLink variant="nav" href={href} onClick={() => setOpen(false)}>
        {label}
      </TextLink>
      <button
        type="button"
        aria-label={`${label} menu`}
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={(event) => {
          // A mouse has already opened the menu by hovering, so its click must not close it again.
          // Keyboard (detail 0) and touch have no hover, so they toggle.
          const hovered = event.detail > 0 && window.matchMedia("(hover: hover)").matches;
          setOpen((v) => (hovered ? true : !v));
        }}
        className="tap-area -ml-1 flex h-11 w-7 items-center justify-center text-muted transition-colors hover:text-accent-text"
      >
        <Chevron open={open} />
      </button>

      {/* The outer box reaches the header edge, so the pointer never crosses a gap on the way down. */}
      <div
        id="services-menu"
        data-open={open}
        className="invisible absolute left-1/2 top-full z-50 w-108 -translate-x-1/2 -translate-y-1 pt-2 opacity-0 transition-[opacity,translate,visibility] duration-150 ease-out-strong data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100 motion-reduce:transition-none"
      >
        <div className="rounded-xl border border-border-tan bg-paper p-2 shadow-[0_18px_32px_-18px_rgb(23_23_26/0.35)]">
          <ul className="flex flex-col">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-tan focus-visible:bg-tan"
                >
                  <Image
                    src={`/images/focus/${service.image}.webp`}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[15px] font-bold leading-snug text-ink">{service.title}</span>
                    <span className="text-[13px] leading-snug text-muted-strong">{service.summary}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:text-accent-text"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-lg border-t border-border-tan px-3 pb-2 pt-3.5 font-mono text-[13px] uppercase tracking-[0.03em] text-muted-strong transition-colors hover:text-accent-text"
          >
            All services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeAll = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <div
      className="relative border-b border-border"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        closeAll();
        // Hand focus back to whatever opened a desktop dropdown, so Escape never strands keyboard users.
        const expanded = event.currentTarget.querySelector<HTMLElement>('[aria-controls="services-menu"][aria-expanded="true"]');
        expanded?.focus();
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
        <div className="hidden items-center gap-10 self-stretch lg:flex">
          {nav.map((item) =>
            item.menu ? (
              <ServicesMenu key={item.href} label={item.label} href={item.href} />
            ) : (
              <TextLink key={item.href} variant="nav" href={item.href} className={item.highlight ? "text-accent-text!" : ""}>
                {item.label}
              </TextLink>
            ),
          )}
          <TextLink variant="navCta" href="/contact">
            Let&apos;s talk
          </TextLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => {
            if (open) closeAll();
            else setOpen(true);
          }}
          className="-mr-0.5 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile panel: overlays the page below the header rather than pushing it down */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 flex flex-col gap-1 border-b border-t border-border bg-cream px-6 pb-6 pt-2 shadow-[0_14px_24px_-14px_rgb(26_23_20/0.2)] sm:px-10 lg:hidden">
          {nav.map((item) => {
            const linkClass = `py-3 font-mono text-sm uppercase tracking-[0.03em] ${
              item.highlight ? "text-accent-text" : "text-muted"
            }`;

            if (!item.menu) {
              return (
                <Link key={item.href} href={item.href} onClick={closeAll} className={`border-b border-border ${linkClass}`}>
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="border-b border-border">
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={closeAll} className={`flex-1 ${linkClass}`}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${item.label} menu`}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="-mr-3 flex h-11 w-11 items-center justify-center text-muted"
                  >
                    <Chevron open={mobileServicesOpen} />
                  </button>
                </div>
                {/* Grid rows animate the height without measuring it */}
                <div
                  id="mobile-services"
                  className={`grid transition-[grid-template-rows] duration-250 ease-out-strong motion-reduce:transition-none ${
                    mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="invisible flex min-h-0 flex-col overflow-hidden data-[open=true]:visible" data-open={mobileServicesOpen}>
                    {serviceLinks.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          onClick={closeAll}
                          className="block py-3 pl-4 font-mono text-sm uppercase tracking-[0.03em] text-muted-strong"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="block pb-4 pl-4 pt-3 font-mono text-sm uppercase tracking-[0.03em] text-accent-text"
                      >
                        All services
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
          <Link
            href="/contact"
            onClick={closeAll}
            className="tap-area mt-3 w-fit border-b-[1.5px] border-ink pb-0.75 font-mono text-sm uppercase tracking-[0.03em] text-ink"
          >
            Let&apos;s talk
          </Link>
        </div>
      )}
    </div>
  );
}
