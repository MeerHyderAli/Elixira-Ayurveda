"use client";

import { useEffect, useRef, useState } from "react";
import { brand, navLinks, whatsappUrl } from "@/content/site";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerTop, setDrawerTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const skipFocusReturn = useRef(false);

  // Hides while reading down (the film gets the whole screen), returns on any upward scroll.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    // At most one state update per animation frame, however fast the scroll events arrive.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Drawer: lock scroll, close on Escape, keep focus inside, return focus to the button.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = drawer.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel) {
        const items = panel.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const button = menuButton.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      if (skipFocusReturn.current) skipFocusReturn.current = false;
      else button?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  // Close first, then jump: scrolling while the body is locked (or while focus returns to the
  // menu button) would cancel the anchor scroll.
  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    skipFocusReturn.current = true;
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      target?.scrollIntoView();
      history.replaceState(null, "", href);
      // Move keyboard focus with the jump (the section, since its heading may still be hidden pre-reveal).
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    });
  }

  function toggle() {
    // The drawer opens directly under the header, wherever the header currently sits.
    setDrawerTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    setOpen((o) => !o);
  }

  return (
    <>
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out)] focus-within:translate-y-0 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "bg-ivory text-forest shadow-[0_1px_0_rgb(176_141_87/0.35)]" : "on-dark bg-forest text-ivory"}`}
    >
      <div className="mx-auto grid h-[var(--header-h)] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(1rem,4vw,4rem)]">
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex gap-8 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="whitespace-nowrap py-2 underline-offset-8 decoration-1 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="-ml-2 flex min-h-11 items-center gap-2 px-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggle}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>

        <a href="#top" className="justify-self-center" aria-label={`${brand.name}, back to top`}>
          <Wordmark tone={solid ? "light" : "dark"} />
        </a>

        <div className="flex justify-end">
          <a
            href={whatsappUrl("Hello Elixira Ayurveda, I would like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 rounded-[2px] border px-3 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 sm:px-4 ${
              solid
                ? "border-forest text-forest hover:bg-forest hover:text-ivory"
                : "border-ivory/60 text-ivory hover:bg-ivory hover:text-forest"
            }`}
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">Order</span>
            <span className="sr-only sm:hidden">Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      {open && (
        <div
          id="mobile-menu"
          ref={drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{ top: drawerTop }}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-ivory px-6 pt-10 pb-8 text-forest xl:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="font-display block py-2 text-[2.5rem] leading-tight font-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-4 border-t border-gold/40 pt-6 text-sm">
            <p>
              {brand.address.line}, {brand.address.city}
              <br />
              {brand.hours}
            </p>
            <a
              href={whatsappUrl("Hello Elixira Ayurveda, I would like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-forest px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-ivory uppercase"
            >
              <WhatsAppIcon /> Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
