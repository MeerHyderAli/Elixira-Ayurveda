import { brand } from "@/content/site";

// Only facts the brand has published. No ratings, counts or testimonials until real ones exist.
const facts = [
  { title: "Formulated by a physician", text: `${brand.founder}, ${brand.qualifications}.` },
  { title: "Homemade in small batches", text: "Each new batch is announced when it is ready." },
  { title: "Straight from the practice", text: "Order on WhatsApp, by phone, or in person in Bidar." },
  { title: "Ask before you buy", text: "Questions go to the doctor's own practice, not a call centre." },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="on-dark bg-forest-deep text-ivory">
      <div className="mx-auto max-w-[1440px] px-[clamp(1rem,4vw,4rem)] py-20 md:py-24">
        <h2 id="trust-title" className="sr-only">
          Why people trust Elixira
        </h2>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {facts.map((f) => (
            <li key={f.title} data-reveal className="lg:border-l lg:border-gold/30 lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <h3 className="font-display text-[1.75rem] leading-tight text-gold-light">{f.title}</h3>
              <p className="mt-3 text-base text-ivory/80">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
