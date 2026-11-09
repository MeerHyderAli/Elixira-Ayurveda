"use client";

import { useRef } from "react";
import Image from "next/image";
import { FilmStill } from "../film-still";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { brand, imageSlots, whatsappUrl } from "@/content/site";
import { ArrowRight, WhatsAppIcon } from "../icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = imageSlots.H1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-line]", { yPercent: 105, duration: 1.4, stagger: 0.12 })
          // From a visible default: the primary action is never invisible.
          .from("[data-hero-fade]", { opacity: 0.6, y: 16, duration: 1, stagger: 0.08 }, "-=1.1");

        const scrollAway = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        if (photo.src) {
          // The campaign still settles in, then drifts slowly as the hero scrolls away.
          tl.from("[data-hero-photo]", { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0);
          gsap.to("[data-hero-photo]", { yPercent: 6, ease: "none", scrollTrigger: scrollAway });
        } else {
          tl.from("[data-hero-ring]", { scale: 0.9, autoAlpha: 0, duration: 1.8, stagger: 0.15 }, 0.1)
            .from("[data-hero-seal]", { scale: 1.06, autoAlpha: 0, duration: 1.6 }, 0.2);
          gsap.to("[data-hero-stage]", { yPercent: -8, ease: "none", scrollTrigger: scrollAway });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-forest text-ivory"
    >
      {photo.src && (
        <>
          {/* Phones: full-bleed portrait still. Desktop: the still owns the right 58%, copy sits on forest. */}
          <div className="absolute inset-x-0 top-0 bottom-[32%] -z-20 overflow-hidden lg:bottom-0 lg:left-[42%]">
            <div data-hero-photo className="absolute inset-0">
              <FilmStill id="H1" alt="Elixira Ayurveda campaign still" preload sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
            {/* Phones: the still fades into forest so the headline always sits on a calm ground. */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(to_top,rgb(38_60_48)_0%,rgb(38_60_48/0.92)_30%,rgb(38_60_48/0.55)_58%,transparent_100%)] lg:hidden" aria-hidden />
          </div>
          <div className="absolute inset-y-0 left-[42%] -z-10 hidden w-[24%] bg-[linear-gradient(90deg,rgb(38_60_48)_0%,transparent_100%)] lg:block" aria-hidden />
        </>
      )}

      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h)-2.5rem)] max-w-[1440px] grid-cols-1 items-end gap-6 px-[clamp(1rem,4vw,4rem)] pt-6 pb-28 md:pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-16 lg:pb-24">
        {!photo.src && (
          <div
            className="relative order-first mx-auto w-[min(52vw,13rem)] sm:w-[min(60vw,20rem)] lg:order-last lg:col-span-5 lg:col-start-8 lg:w-full lg:max-w-[30rem] lg:self-center"
          >
            <div data-hero-stage className="relative aspect-square">
              <span
                data-hero-ring
                className="absolute inset-[-14%] rounded-full border border-gold/30"
                aria-hidden
              />
              <span
                data-hero-ring
                className="absolute inset-[-30%] rounded-full border border-gold/15"
                aria-hidden
              />
              <div data-hero-seal className="relative h-full w-full">
                <Image
                  src="/brand/elixira-badge.png"
                  alt="Dr. Tanzeel's Elixira Ayurveda seal: Glow Naturally, Heal Deeply"
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 1024px) 30rem, 72vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-7 lg:row-start-1">
          <h1 id="hero-title" className="display text-[clamp(3.25rem,7.4vw,6rem)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                Glow naturally.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block italic text-gold-light">
                Heal deeply.
              </span>
            </span>
          </h1>

          <p data-hero-fade className="measure mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ivory/85 md:text-lg">
            Ayurvedic care for face, hair and body, homemade in small batches by {brand.founder},{" "}
            {brand.qualifications}, at her practice in {brand.address.city}.
          </p>

          <div data-hero-fade className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              id="hero-shop"
              href="#collections"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] bg-ivory px-7 text-[0.8125rem] font-semibold tracking-[0.08em] text-forest uppercase transition-colors duration-200 hover:bg-beige"
            >
              Shop the collection
              <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappUrl("Hello Elixira Ayurveda, I would like to know more about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line hidden min-h-12 sm:inline-flex items-center justify-center gap-2 text-base text-ivory/90 decoration-gold-light hover:text-ivory"
            >
              <WhatsAppIcon /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {!photo.src && (
        <p className="absolute right-[clamp(1rem,4vw,4rem)] bottom-4 hidden text-sm text-ivory/55 lg:block">
          Campaign photograph H1 to come
        </p>
      )}
    </section>
  );
}
