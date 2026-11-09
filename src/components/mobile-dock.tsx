import { whatsappUrl } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/**
 * Phone-first action dock: Shop and WhatsApp always under the thumb (hidden from 1280px, where the
 * header carries them). Both actions are outlined: the dock is a utility, so the one filled primary
 * on screen always belongs to the section in view (hero CTA, chapter order button).
 */
export function MobileDock() {
  const action =
    "flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-ivory/60 text-[0.8125rem] font-semibold tracking-[0.08em] text-ivory uppercase transition-colors duration-200 hover:border-ivory hover:bg-ivory/10";

  return (
    <nav
      aria-label="Quick actions"
      className="on-dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-gold/30 bg-forest-deep px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] xl:hidden"
    >
      <a href="#collections" className={action}>
        Shop
      </a>
      <a
        href={whatsappUrl("Hello Elixira Ayurveda, I would like to place an order.")}
        target="_blank"
        rel="noopener noreferrer"
        className={action}
      >
        <WhatsAppIcon /> WhatsApp
      </a>
    </nav>
  );
}
