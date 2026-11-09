"use client";

import { useEffect, useRef, useState } from "react";
import { collections, OPEN_COLLECTION_EVENT, productCount, whatsappUrl } from "@/content/site";
import { ImageSlot } from "../image-slot";
import { ArrowRight } from "../icons";

export function Collections() {
  const [active, setActive] = useState(0);

  // "All Face Serums" etc. in the film chapters open the matching tab.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = collections.findIndex((c) => c.id === (e as CustomEvent<string>).detail);
      if (i >= 0) setActive(i);
    };
    window.addEventListener(OPEN_COLLECTION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COLLECTION_EVENT, onOpen);
  }, []);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = collections[active];

  // Roving focus for the tablist (Arrow keys, Home, End), per the WAI-ARIA tabs pattern.
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = collections.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-beige">
      <div className="mx-auto max-w-[1440px] px-[clamp(1rem,4vw,4rem)] py-24 md:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="collections-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.5rem)] text-forest">
            The collections
          </h2>
          <p data-reveal className="max-w-[26rem] text-ink/80">
            {productCount} products across {collections.length} collections. Choose one to see everything
            in it, then ask for anything on WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div
            role="tablist"
            aria-label="Collections"
            aria-orientation="vertical"
            className="-mx-[clamp(1rem,4vw,4rem)] flex snap-x scroll-px-[clamp(1rem,4vw,4rem)] gap-2 overflow-x-auto px-[clamp(1rem,4vw,4rem)] pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {collections.map((c, i) => {
              const selected = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group flex shrink-0 snap-start items-baseline justify-between gap-6 border px-4 py-2.5 text-left transition-colors duration-200 lg:border-0 lg:border-b lg:border-gold/40 lg:px-0 lg:py-5 ${
                    selected
                      ? "border-forest bg-forest text-ivory lg:bg-transparent lg:text-forest"
                      : "border-forest/25 text-forest/75 hover:text-forest"
                  }`}
                >
                  <span className="font-display text-xl leading-none whitespace-nowrap lg:text-[2rem]">
                    {c.name}
                  </span>
                  <span className="tabular hidden text-sm lg:inline">
                    {c.products.length}
                    <span className="sr-only"> products</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:col-span-8 lg:col-start-5 lg:gap-10"
          >
            <ImageSlot
              key={current.imageSlot}
              id={current.imageSlot}
              aspect="aspect-[16/9] md:aspect-[4/5]"
              sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 100vw"
            />
            <div className="flex flex-col">
              <h3 className="font-display text-3xl text-forest">{current.name}</h3>
              <p className="mt-2 text-ink/80">{current.note}</p>
              <ul className="mt-8 border-t border-gold/40">
                {current.products.map((p) => (
                  <li key={p.name} className="border-b border-gold/40">
                    <a
                      href={whatsappUrl(`Hello Elixira Ayurveda, I would like to order the ${p.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-14 items-center justify-between gap-4 py-3 text-forest"
                    >
                      <span>
                        <span className="text-[1.0625rem] font-medium">{p.name}</span>
                        {p.sizes && (
                          <span className="tabular ml-3 text-sm text-sage-deep">{p.sizes.join(" / ")}</span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-sm text-sage-deep transition-colors duration-200 group-hover:text-forest">
                        <span className="hidden sm:inline">Ask on WhatsApp</span>
                        <span className="sr-only sm:hidden">Ask about {p.name} on WhatsApp</span>
                        <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
