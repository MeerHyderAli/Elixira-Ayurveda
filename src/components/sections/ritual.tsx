import { ImageSlot } from "../image-slot";

// Steps are the owner's published directions for the Herbal Hair Pack (Instagram, 6 Nov 2026), unchanged in substance.
const steps = [
  { title: "Mix", text: "Stir one spoon of Herbal Hair Pack into curd until it becomes a smooth paste." },
  { title: "Apply", text: "Work it over the scalp and along the length of the hair. Leave it on for 30 minutes." },
  { title: "Rinse", text: "Wash it out with water. Repeat once a week." },
];

export function Ritual() {
  return (
    <section id="ritual" aria-labelledby="ritual-title" className="bg-beige">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-[clamp(1rem,4vw,4rem)] py-24 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <h2 id="ritual-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.5rem)] text-forest">
            A weekly hair ritual
          </h2>
          <p data-reveal className="measure mt-6 text-ink/80">
            Thirty minutes, once a week, with the Herbal Hair Pack: bhringraj, amla, reetha,
            shikakai, aloe vera, jatamansi, methi, neem and more.
          </p>
          <div data-reveal-image className="mt-12 hidden lg:block">
            <ImageSlot id="R1" aspect="aspect-[4/3]" parallax sizes="40vw" />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              className="grid grid-cols-[4rem_minmax(0,1fr)] gap-6 border-t border-gold/50 py-10 sm:grid-cols-[6rem_minmax(0,1fr)]"
            >
              <span className="font-sans tabular text-[3.5rem] leading-none font-extralight text-gold-ink sm:text-[4.5rem]" aria-hidden>
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[2rem] leading-tight text-forest">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="measure mt-3 text-[1.0625rem] text-ink/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
