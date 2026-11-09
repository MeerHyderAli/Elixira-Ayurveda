"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters, collections, imageSlots, OPEN_COLLECTION_EVENT, whatsappUrl } from "@/content/site";
import { FilmStill } from "../film-still";
import { ArrowRight, WhatsAppIcon } from "../icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const collectionName = (id: string) => collections.find((c) => c.id === id)?.name ?? "";

function openCollection(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_COLLECTION_EVENT, { detail: id }));
}

/**
 * Herb to Bottle: five full-screen chapters. With motion allowed, each chapter pins and the herb
 * still scrubs into the product still, which develops upward out of it. Without motion (or JS),
 * the herb screen and the product screen simply stack, so every word and action stays reachable.
 */
/** Photographic scrim: from below on phones; on desktop split layouts, a soft edge where the still meets the copy. */
function Scrim({ split, rgb }: { split: boolean; rgb: string }) {
  return (
    <>
      <div
        className={`absolute inset-x-0 bottom-0 h-3/4 ${split ? "lg:hidden" : ""}`}
        style={{ background: `linear-gradient(to top, rgb(${rgb}) 0%, rgb(${rgb} / 0.75) 45%, transparent 100%)` }}
        aria-hidden
      />
      {split && (
        <div
          className="absolute inset-y-0 left-[45%] hidden w-[22%] lg:block"
          style={{ background: `linear-gradient(90deg, rgb(${rgb}) 0%, transparent 100%)` }}
          aria-hidden
        />
      )}
    </>
  );
}

/**
 * Until a herb photograph exists, the herb screen is a typographic plate: the botanical name set
 * large in gold italic, like the heading of a herbarium sheet. Decorative (the readable name is in the copy).
 */
function HerbPlate({ latin }: { latin: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-deep" aria-hidden>
      <p className="font-display absolute left-6 right-16 top-[calc(var(--header-h)+3.5rem)] text-[clamp(3.75rem,17vw,11rem)] leading-[0.92] font-light text-gold/25 italic lg:left-12 lg:right-24 lg:top-[18%]">
        {latin.split(" · ")[0].split(" ").map((w) => (
          <span key={w} className="block">
            {w}
          </span>
        ))}
      </p>
      <span className="absolute inset-x-6 bottom-[46%] h-px bg-gold/25 lg:inset-x-12 lg:bottom-[40%]" />
    </div>
  );
}

export function Formulas() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-film");
        ScrollTrigger.refresh();

        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((ch) => {
          const q = gsap.utils.selector(ch);
          const tl = gsap.timeline({
            scrollTrigger: { trigger: ch, start: "top top", end: "bottom bottom", scrub: 0.6 },
          });
          tl.fromTo(q("[data-herb-still]"), { scale: 1.12 }, { scale: 1, ease: "none", duration: 1 }, 0)
            .to(q("[data-herb-text]"), { autoAlpha: 0, y: -40, duration: 0.25, ease: "power1.in" }, 0.35)
            // Develop wipe as a transform-only mask (GPU-composited, no per-frame repaint): the layer
            // rises from below while its contents counter-move, so the picture stays put and its top
            // edge, carrying the gold line, sweeps up. The product copy needs no fade: the edge uncovers it.
            .fromTo(q("[data-product-layer]"), { yPercent: 100 }, { yPercent: 0, duration: 0.42, ease: "power2.inOut" }, 0.3)
            .fromTo(q("[data-product-inner]"), { yPercent: -100 }, { yPercent: 0, duration: 0.42, ease: "power2.inOut" }, 0.3)
            .fromTo(q("[data-develop-line]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, 0.3)
            .to(q("[data-develop-line]"), { autoAlpha: 0, duration: 0.06 }, 0.72)
            .fromTo(q("[data-product-still]"), { scale: 1.1 }, { scale: 1, duration: 0.6, ease: "none" }, 0.3);
        });

        return () => el.classList.remove("is-film");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="formulas" aria-labelledby="formulas-title" className="film on-dark bg-forest-deep text-ivory">
      <div className="mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-end px-[clamp(1rem,4vw,4rem)] pt-24 pb-16 lg:min-h-[80svh] lg:pb-24">
        <h2 id="formulas-title" data-reveal className="display max-w-[12ch] text-[clamp(3rem,7vw,6rem)]">
          From the herb to the bottle.
        </h2>
        <p data-reveal className="measure mt-6 max-w-[34rem] text-[1.0625rem] text-ivory/80">
          Five formulas from the range, two for the face, two for the hair and one for the body,
          each followed from the plant it is named for.
        </p>
      </div>

      {chapters.map((ch, i) => {
        const titleId = `chapter-${i}`;
        // Portrait-only stills sit in the right 55% on desktop; a supplied 16:9 file goes full-bleed.
        const split = !imageSlots[ch.herbSlot].srcDesktop;
        const stillBox = `absolute inset-0 ${split ? "lg:left-[45%]" : ""}`;
        // Phones: the product photo fills the top two-thirds and fades into forest, so the label in
        // the photo never collides with the product heading (square shots especially).
        const productBox = `absolute inset-x-0 top-0 bottom-[34%] lg:bottom-0 ${split ? "lg:left-[45%]" : "lg:inset-0"}`;
        const textBox = `absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-[clamp(1rem,4vw,4rem)] pb-28 lg:pb-20 ${split ? "lg:pr-[58%]" : ""}`;
        return (
          <article key={ch.product} data-chapter aria-labelledby={titleId} className="chapter">
            <div className="chapter-stage relative">
              {/* Herb */}
              <div className="layer">
                <div data-herb-still className={stillBox}>
                  {imageSlots[ch.herbSlot].src ? (
                    <FilmStill id={ch.herbSlot} alt={`${ch.herb} (${ch.latin})`} caption="high" sizes={split ? "(min-width: 1024px) 55vw, 100vw" : "100vw"} />
                  ) : (
                    <HerbPlate latin={ch.latin} />
                  )}
                </div>
                <Scrim split={split} rgb="27 43 34" />
                <div data-herb-text className={textBox}>
                  <p className="display text-[clamp(3.5rem,11vw,7rem)]" aria-hidden>
                    {ch.herb}
                  </p>
                  <p className="font-display mt-3 text-xl text-ivory/85 italic">{ch.latin}</p>
                  <p className="measure mt-4 max-w-[30rem] text-[1.0625rem] text-ivory/90">{ch.note}</p>
                  <p className="mt-6 flex items-center gap-3 text-sm text-gold-light">
                    <span className="h-px w-10 bg-gold-light/70" aria-hidden />
                    becomes the {ch.product}
                  </p>
                </div>
              </div>

              {/* Product */}
              <div data-product-layer className="layer bg-forest">
                <span data-develop-line className="pointer-events-none invisible absolute inset-x-0 top-0 z-10 h-px bg-gold-light" aria-hidden />
                <div data-product-inner className="absolute inset-0">
                <div className={productBox}>
                  <div data-product-still className="absolute inset-0">
                    <FilmStill id={ch.productSlot} alt={`${ch.product}`} tone="forest" caption="low" sizes={split ? "(min-width: 1024px) 55vw, 100vw" : "100vw"} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgb(38_60_48)_0%,rgb(38_60_48/0.85)_35%,transparent_100%)] lg:hidden" aria-hidden />
                </div>
                <Scrim split={split} rgb="38 60 48" />
                <div data-product-text className={textBox}>
                  <h3 id={titleId} className="display max-w-[14ch] text-[clamp(2.75rem,8vw,5.5rem)]">
                    {ch.product}
                  </h3>
                  <p className="tabular mt-3 text-base text-ivory/80">
                    {collectionName(ch.collectionId)}
                    {ch.sizes && `, ${ch.sizes.join(" / ")}`}
                  </p>
                  {ch.fact && <p className="mt-2 text-base text-ivory/80">{ch.fact}</p>}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <a
                      href={whatsappUrl(`Hello Elixira Ayurveda, I would like to order the ${ch.product}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-ivory px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-forest uppercase transition-colors duration-200 hover:bg-beige"
                    >
                      <WhatsAppIcon /> Order on WhatsApp
                    </a>
                    <a
                      href="#collections"
                      onClick={() => openCollection(ch.collectionId)}
                      className="link-line group inline-flex min-h-12 items-center justify-center gap-2 text-base text-ivory decoration-gold-light"
                    >
                      All {collectionName(ch.collectionId)}
                      <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
                </div>
              </div>

              {/* Progress rail: which chapter of five, and whether it is face, hair or body. */}
              <div className="pointer-events-none absolute top-[calc(var(--header-h)+1.5rem)] right-8 flex lg:right-[clamp(2rem,4vw,4rem)] flex-col items-end gap-3" aria-hidden>
                <span className="tabular rounded-[2px] bg-forest-deep/70 px-2 py-0.5 text-xs text-ivory">
                  {ch.area} · {i + 1}/{chapters.length}
                </span>
                <span className="flex flex-col gap-1.5">
                  {chapters.map((_, j) => (
                    <span key={j} className={`h-5 w-px ${j === i ? "bg-gold-light" : "bg-ivory/30"}`} />
                  ))}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
