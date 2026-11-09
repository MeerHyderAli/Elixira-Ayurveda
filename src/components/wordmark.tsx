// Compact header lock-up that follows the logo's own wordmark (gold "ELIXIRA" over green "AYURVEDA").
// shortcut: typeset interim; replace with the vector wordmark once the owner supplies one (docs/BRAND_ASSET_INVENTORY.md).
export function Wordmark({ tone }: { tone: "light" | "dark" }) {
  return (
    <span className="flex flex-col items-center leading-none select-none" aria-hidden>
      <span
        className={`font-display text-[1.65rem] font-semibold tracking-[0.14em] sm:text-[1.85rem] ${
          tone === "dark" ? "text-gold-light" : "text-gold-ink"
        }`}
      >
        ELIXIRA
      </span>
      <span
        className={`mt-1 text-[0.5625rem] font-bold tracking-[0.42em] ${
          tone === "dark" ? "text-ivory/85" : "text-forest"
        }`}
      >
        AYURVEDA
      </span>
    </span>
  );
}
