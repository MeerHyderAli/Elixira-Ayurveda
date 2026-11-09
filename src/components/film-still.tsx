import { getImageProps } from "next/image";
import { imageSlots, type ImageSlotId } from "@/content/site";
import { LeafIcon } from "./icons";

type Props = {
  id: ImageSlotId;
  /** Accessible description of what the still shows (owner photos may also set slot.alt). */
  alt: string;
  preload?: boolean;
  /** Placeholder ground: chapter herb screens use the deeper forest, product screens the brand forest. */
  tone?: "deep" | "forest";
  /** Placeholder caption height: product screens put it low so the rising develop edge uncovers it first. */
  caption?: "high" | "low";
  /** Rendered width hint for the browser's srcset choice (defaults to full width). */
  sizes?: string;
  className?: string;
};

/**
 * A full-bleed cinematic still that fills its positioned parent. Phone-first: `src` is the portrait
 * file; `srcDesktop` (optional) is art-directed in at ≥1024px. Until the owner supplies a file, a
 * labelled dark placeholder fills the frame so nothing passes for real photography.
 */
export function FilmStill({ id, alt, preload, tone = "deep", caption = "high", sizes = "100vw", className = "" }: Props) {
  const slot = imageSlots[id];
  const label = slot.alt ?? alt;

  if (!slot.src) {
    return (
      <div
        role="img"
        aria-label={`Photograph to come: ${slot.label}`}
        className={`absolute inset-0 ${tone === "deep" ? "bg-forest-deep" : "bg-forest"} text-gold-light ${className}`}
      >
        <div className="absolute inset-4 border border-gold/25" aria-hidden />
        <div className={`absolute inset-x-0 flex flex-col items-center gap-2 text-center ${caption === "high" ? "top-[16%]" : "top-[30%]"}`}>
          <LeafIcon className="text-gold/60" />
          <p className="font-display text-lg italic text-gold-light">{slot.label}</p>
          <p className="text-sm text-ivory/80">Image {id}, photograph to come</p>
        </div>
      </div>
    );
  }

  const common = { alt: label, fill: true, quality: 85, preload } as const;
  const mobile = getImageProps({ ...common, src: slot.src, sizes }).props;

  if (!slot.srcDesktop) {
    // eslint-disable-next-line @next/next/no-img-element -- props come from getImageProps (optimised)
    return <img {...mobile} alt={label} className={`object-cover object-[50%_35%] ${className}`} />;
  }

  const desktop = getImageProps({ ...common, src: slot.srcDesktop, sizes }).props;
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img {...mobile} alt={label} className={`object-cover object-[50%_35%] ${className}`} />
    </picture>
  );
}
