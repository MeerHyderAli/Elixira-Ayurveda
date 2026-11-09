"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// Phones show/hide the address bar while scrolling; re-measuring every pinned chapter on that
// resize causes visible jumps. Only real width/orientation changes trigger a refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * The page's one motion system. Content is visible by default (server HTML); GSAP only
 * animates it in on the client, and only when the visitor allows motion.
 *   [data-reveal]        text and blocks rise 24px and fade in, once, as they enter
 *   [data-reveal-image]  images open from an 8% inset clip
 *   [data-parallax]      a slow drift (max ~8%) while the section scrolls past
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hide only once JS is running, then reveal on entry (no flash of a visible-then-hidden element).
        gsap.set("[data-reveal]", { y: 24, autoAlpha: 0 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
              clearProps: "transform,opacity,visibility",
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(8% 8% 8% 8%)",
            duration: 1.1,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
