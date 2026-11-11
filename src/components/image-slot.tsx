import Image from "next/image";
import { imageSlots, type ImageSlotId } from "@/content/site";
import { LeafIcon } from "./icons";

type Props = {
  id: ImageSlotId;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". Omit when the parent sizes the slot (fill). */
  aspect?: string;
  sizes: string;
  tone?: "light" | "dark";
  preload?: boolean;
  /** Small slots show only the mark and image id. */
  compact?: boolean;
  /** "contain" shows the whole photo (no edge crop) when shapes vary; the frame keeps its aspect. */
  fit?: "cover" | "contain";
  /** Slow scroll drift on the real photograph (placeholders stay still so their frame is never cropped). */
  parallax?: boolean;
  className?: string;
};

/**
 * Renders the owner's photograph when `imageSlots[id].src` is set; until then, a labelled
 * placeholder so nobody mistakes it for real packaging. Briefs: docs/IMAGE_ASSET_PLAN.md.
 */
export function ImageSlot({ id, aspect, sizes, tone = "light", preload, compact, parallax, fit = "cover", className = "" }: Props) {
  const slot = imageSlots[id];
  const box = `relative overflow-hidden ${aspect ?? "h-full w-full"} ${className}`;

  if (slot.src) {
    const img = (
      <Image
        src={slot.src}
        alt={slot.alt ?? slot.label}
        fill
        sizes={sizes}
        preload={preload}
        quality={85}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    );
    return (
      <div className={box}>
        {parallax ? (
          <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
            {img}
          </div>
        ) : (
          img
        )}
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      className={`${box} ${dark ? "bg-forest-deep text-gold-light" : "bg-beige text-sage-deep"}`}
      role="img"
      aria-label={`Photograph to come: ${slot.label}`}
    >
      <div
        className={`absolute inset-3 border ${dark ? "border-gold/35" : "border-gold/45"}`}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <LeafIcon className={dark ? "text-gold/70" : "text-gold"} />
        {compact ? (
          <p className="text-xs opacity-80">{id}</p>
        ) : (
          <>
            <p className="font-display text-lg leading-tight italic">{slot.label}</p>
            <p className="text-xs opacity-80">Image {id}, photograph to come</p>
          </>
        )}
      </div>
    </div>
  );
}
