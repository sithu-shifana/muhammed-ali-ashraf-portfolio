"use client"

import { Reveal } from "@/components/reveal"
import { CelestialRing } from "@/components/decor/glyphs"
import { contact } from "@/lib/assets"

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--gold)] opacity-25"
      >
        <CelestialRing size={560} className="hidden md:block" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <span className="mb-4 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
            // EXPERIENCE THE UNEXPLAINED
          </span>
          <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--mist)] sm:text-6xl md:text-7xl">
            Ready to
            <br />
            <span className="italic text-gradient-gold">question reality?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-lg text-base text-[var(--mist-dim)] sm:text-lg">
            Available for luxury corporate events, private galas, and bespoke VIP mentalism sessions worldwide.
          </p>

          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--gold)] bg-[var(--gold)]/15 px-9 py-4 text-sm font-semibold tracking-widest text-[#f5e1a4] shadow-[0_0_30px_rgba(201,163,92,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[var(--gold)] hover:text-[#050409]"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.564 5.714 5.86-1.537c1.705.93 3.66 1.463 5.736 1.463 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>BOOK APPOINTMENT VIA WHATSAPP</span>
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--mist-dim)] sm:gap-10 sm:text-base">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--gold-soft)]"
            >
              <span>WhatsApp:</span>
              <span className="text-[#ffffff]">{contact.phone}</span>
            </a>
            <a
              href={contact.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--gold-soft)]"
            >
              <span>Instagram:</span>
              <span className="text-[#ffffff]">{contact.instagram}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
