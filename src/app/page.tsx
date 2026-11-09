import { brand, whatsappUrl } from "@/content/site";
import { MotionRoot } from "@/components/motion-root";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Formulas } from "@/components/sections/formulas";
import { Collections } from "@/components/sections/collections";
import { Ritual } from "@/components/sections/ritual";
import { Founder } from "@/components/sections/founder";
import { Trust } from "@/components/sections/trust";
import { InstagramGallery } from "@/components/sections/instagram";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <MotionRoot>
      <p className="on-dark bg-forest-deep px-4 py-2.5 text-center text-[0.8125rem] text-ivory/85">
        Homemade in small batches in {brand.address.city}.{" "}
        <a
          href={whatsappUrl("Hello Elixira Ayurveda, I would like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line text-ivory decoration-gold-light"
        >
          Order on WhatsApp
        </a>
      </p>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Philosophy />
        <Formulas />
        <Collections />
        <Ritual />
        <Founder />
        <Trust />
        <InstagramGallery />
        <Newsletter />
      </main>
      <SiteFooter />
      <MobileDock />
    </MotionRoot>
  );
}
