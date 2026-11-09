import { brand } from "@/content/site";
import { ImageSlot } from "../image-slot";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="overflow-hidden bg-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-[clamp(1rem,4vw,4rem)] pt-24 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-0">
        <div className="lg:col-span-6 lg:py-32">
          <h2
            id="philosophy-title"
            data-reveal
            className="display text-[clamp(2.25rem,4.6vw,4.25rem)] text-forest"
          >
            A physician&rsquo;s apothecary, made by hand, one small batch at a time.
          </h2>
          <div className="mt-10 grid gap-6 text-[1.0625rem] text-ink/85 sm:grid-cols-2 lg:mt-14 lg:grid-cols-1 xl:grid-cols-2">
            <p data-reveal className="measure">
              Every Elixira formula comes from {brand.founderShort}, an Ayurvedic physician
              ({brand.qualifications}). Oils are prepared with herbs, powders are blended for packs,
              and everything is homemade in small batches.
            </p>
            <p data-reveal className="measure">
              New batches are announced as they are ready, and orders come straight to the
              practice: on WhatsApp, by phone, or in person in {brand.address.city}.
            </p>
          </div>
        </div>
        {/* The still runs edge to edge on phones and bleeds to the page edge on desktop. */}
        <div
          data-reveal-image
          className="-mx-[clamp(1rem,4vw,4rem)] lg:col-span-6 lg:mx-0 lg:-mr-[clamp(1rem,4vw,4rem)] lg:self-stretch"
        >
          <ImageSlot
            id="E2"
            aspect="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[44rem]"
            parallax
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
