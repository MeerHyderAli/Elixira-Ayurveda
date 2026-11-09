import Image from "next/image";
import { brand, collections, whatsappUrl } from "@/content/site";

// Prerendered and cached (cacheComponents forbids an uncached clock during prerender).
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-forest pb-24 text-ivory xl:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-[clamp(1rem,4vw,4rem)] pt-20 pb-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <Image
            src="/brand/elixira-badge.png"
            alt="Dr. Tanzeel's Elixira Ayurveda logo"
            width={128}
            height={128}
            quality={85}
            className="h-32 w-32"
          />
          <p className="font-display mt-6 text-3xl leading-tight text-gold-light italic">{brand.tagline}</p>
        </div>

        <nav aria-label="Collections" className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-sm text-ivory/65">Collections</h2>
          <ul className="mt-4 space-y-2">
            {collections.map((c) => (
              <li key={c.id}>
                <a href="#collections" className="hover:underline hover:underline-offset-4">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="text-sm text-ivory/65">Visit</h2>
          <address className="mt-4 not-italic">
            {brand.address.line}
            <br />
            {brand.address.city}, {brand.address.region}
          </address>
          <p className="tabular mt-3">{brand.hours}</p>
          <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block decoration-gold-light">
            Get directions
          </a>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm text-ivory/65">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={whatsappUrl("Hello Elixira Ayurveda.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${brand.phoneE164}`} className="tabular hover:underline hover:underline-offset-4">
                {brand.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <p className="border-t border-gold/30 pt-8 text-sm text-ivory/65 lg:col-span-12">
          © <CopyrightYear /> {brand.name}. Homemade in {brand.address.city}.
        </p>
      </div>
    </footer>
  );
}
