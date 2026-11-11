"use client";

import { useRef } from "react";
import { chapters, collections, OPEN_COLLECTION_EVENT, whatsappUrl } from "@/content/site";
import { ImageSlot } from "../image-slot";
import { ArrowRight, WhatsAppIcon } from "../icons";

const collectionName = (id: string) => collections.find((c) => c.id === id)?.name ?? "";

function openCollection(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_COLLECTION_EVENT, { detail: id }));
}

/**
 * Formulas shelf: a centred, swipeable carousel (image first, name below). The card in the middle
 * sits full size; neighbours shrink and dim via a CSS scroll-driven animation (.shelf-card in
 * globals.css), so there is no scroll JS at all. Arrows step one card; swipe and keyboard scroll work natively.
 */
export function Formulas() {
  const track = useRef<HTMLUListElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <section id="formulas" aria-labelledby="formulas-title" className="on-dark overflow-hidden bg-forest-deep py-24 text-ivory md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-[clamp(1rem,4vw,4rem)] md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="formulas-title" data-reveal className="display max-w-[12ch] text-[clamp(2.75rem,6vw,5rem)]">
            From the herb to the bottle.
          </h2>
          <p data-reveal className="measure mt-5 max-w-[30rem] text-[1.0625rem] text-ivory/80">
            Five formulas, two for the face, two for the hair and one for the body. Swipe to meet each.
          </p>
        </div>
        <div className="hidden gap-3 md:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={d === -1 ? "Previous formula" : "Next formula"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-colors duration-200 hover:border-ivory hover:bg-ivory/10"
            >
              <ArrowRight className={d === -1 ? "rotate-180" : undefined} />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        aria-label="Formulas"
        tabIndex={0}
        className="shelf mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14vw] pb-4 [scrollbar-width:none] md:mt-16 md:px-[calc(50vw-12rem)]"
      >
        {chapters.map((ch) => (
          <li key={ch.product} className="shelf-card w-[72vw] max-w-[22rem] shrink-0 snap-center md:w-[24rem] md:max-w-none">
            <article aria-labelledby={`f-${ch.productSlot}`}>
              <ImageSlot id={ch.productSlot} aspect="aspect-[3/4]" fit="contain" sizes="(min-width: 768px) 24rem, 72vw" />
              <p className="mt-5 text-sm text-gold-light">
                {ch.area}, {collectionName(ch.collectionId)}
              </p>
              <h3 id={`f-${ch.productSlot}`} className="font-display mt-1 text-[2rem] leading-tight">
                {ch.product}
              </h3>
              <p className="mt-2 text-sm text-ivory/75">
                <span className="font-display text-base italic">{ch.latin}</span> · {ch.note}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={whatsappUrl(`Hello Elixira Ayurveda, I would like to order the ${ch.product}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-ivory px-5 text-[0.8125rem] font-semibold tracking-[0.08em] text-forest uppercase transition-colors duration-200 hover:bg-beige"
                >
                  <WhatsAppIcon /> Order
                </a>
                <a
                  href="#collections"
                  onClick={() => openCollection(ch.collectionId)}
                  className="link-line inline-flex min-h-11 items-center text-sm text-ivory decoration-gold-light"
                >
                  All {collectionName(ch.collectionId)}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
