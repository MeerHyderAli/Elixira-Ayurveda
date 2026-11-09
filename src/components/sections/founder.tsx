import { brand, whatsappUrl } from "@/content/site";
import { ImageSlot } from "../image-slot";
import { ArrowRight, WhatsAppIcon } from "../icons";

export function Founder() {
  return (
    <section id="practice" aria-labelledby="founder-title" className="bg-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-[clamp(1rem,4vw,4rem)] py-24 md:py-32 lg:grid-cols-12 lg:gap-6 lg:py-40">
        <div className="lg:col-span-5" data-reveal-image>
          <ImageSlot id="E1" aspect="aspect-[4/5]" parallax sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <h2 id="founder-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.75rem)] text-forest">
            {brand.founder}
          </h2>
          <p data-reveal className="mt-4 font-display text-2xl text-gold-ink italic">
            {brand.qualifications}
          </p>
          <div className="mt-8 space-y-5 text-[1.0625rem] text-ink/85">
            <p data-reveal className="measure">
              Elixira is the doctor&rsquo;s own range: her name is on the seal, and every
              product is homemade in small batches.
            </p>
            <p data-reveal className="measure">
              Not sure what to choose? Message her directly. Orders and consultations are both
              handled by the practice.
            </p>
          </div>

          <dl data-reveal className="mt-10 grid gap-6 border-t border-gold/50 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-sage-deep">The practice</dt>
              <dd className="mt-1 text-forest">
                {brand.address.line}, {brand.address.city}, {brand.address.region}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-sage-deep">Hours</dt>
              <dd className="tabular mt-1 text-forest">{brand.hours}</dd>
            </div>
          </dl>

          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={whatsappUrl("Hello Dr. Tanzeel, I would like a consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-forest px-7 text-[0.8125rem] font-semibold tracking-[0.08em] text-ivory uppercase transition-colors duration-200 hover:bg-forest-deep"
            >
              <WhatsAppIcon /> Ask for a consultation
            </a>
            <a
              href={brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line group inline-flex min-h-12 items-center justify-center gap-2 text-forest decoration-gold"
            >
              Get directions
              <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
