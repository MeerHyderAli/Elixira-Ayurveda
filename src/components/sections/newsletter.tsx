"use client";

import { useId, useState } from "react";
import { whatsappUrl } from "@/content/site";
import { WhatsAppIcon } from "../icons";

/**
 * No email provider is connected yet, so the sign-up goes to the practice's WhatsApp with the
 * visitor's address in the message. Nothing is stored on this site.
 * shortcut: WhatsApp hand-off; replace with a real list (e.g. Resend/Mailchimp) when the shop launches.
 */
export function Newsletter() {
  const inputId = useId();
  const errorId = useId();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = input.value.trim();
    if (!input.checkValidity() || !email) {
      setError("Enter an email address like name@example.com.");
      input.focus();
      return;
    }
    setError(null);
    window.open(
      whatsappUrl(`Hello Elixira Ayurveda, please tell me when a new batch is ready. My email is ${email}.`),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section aria-labelledby="newsletter-title" className="bg-beige">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-[clamp(1rem,4vw,4rem)] py-24 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2 id="newsletter-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.5rem)] text-forest lg:col-span-6">
          Hear when a new batch is ready.
        </h2>

        <form data-reveal noValidate onSubmit={onSubmit} className="lg:col-span-5 lg:col-start-8">
          <label htmlFor={inputId} className="text-sm font-medium text-forest">
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id={inputId}
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              placeholder="name@example.com"
              className="min-h-12 flex-1 rounded-[2px] border border-forest/30 bg-ivory px-4 text-ink placeholder:text-sage-deep focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-forest px-7 text-[0.8125rem] font-semibold tracking-[0.08em] text-ivory uppercase transition-colors duration-200 hover:bg-forest-deep"
            >
              <WhatsAppIcon /> Notify me
            </button>
          </div>
          {error && (
            <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
              {error}
            </p>
          )}
          <p className="mt-3 text-sm text-ink/75">
            Email updates start with our online shop. Until then, this sends your request to the
            practice on WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}
