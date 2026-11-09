import { brand, imageSlots, type ImageSlotId } from "@/content/site";
import { ImageSlot } from "../image-slot";
import { ArrowRight, InstagramIcon } from "../icons";

const tiles: ImageSlotId[] = ["G1", "G2", "G3", "G4", "G5", "G6"];

export function InstagramGallery() {
  return (
    <section aria-labelledby="instagram-title" className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-[clamp(1rem,4vw,4rem)] py-24 md:py-32">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="instagram-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.5rem)] text-forest">
            New batches, first on Instagram
          </h2>
          <a
            data-reveal
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line group inline-flex min-h-11 items-center gap-2 text-forest decoration-gold"
          >
            <InstagramIcon /> {brand.instagramHandle}
            <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-2 md:gap-3 lg:grid-cols-6">
          {tiles.map((id) => (
            <li key={id} data-reveal>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden"
                aria-label={`${imageSlots[id].label}: open ${brand.instagramHandle} on Instagram`}
              >
                <div className="transition-transform duration-700 ease-[var(--ease-out)] hover:scale-[1.04]">
                  <ImageSlot id={id} aspect="aspect-square" sizes="(min-width: 1024px) 16vw, 33vw" compact />
                </div>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-sage-deep">
          From the range. Every tile opens {brand.instagramHandle} on Instagram.
        </p>
      </div>
    </section>
  );
}
