"use client"

import { Reveal } from "@/components/reveal"
import { MediaCard } from "@/components/media-card"
import { assets, contact } from "@/lib/assets"

export function Performances() {
  const [a, b, c] = assets.performances

  return (
    <section id="performances" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <Reveal>
        <span className="mb-6 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
          // THE SPECTACLE
        </span>
      </Reveal>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal delay={0.1}>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.1] text-[var(--mist)] sm:text-5xl md:text-6xl">
            Moments etched in
            <br />
            <span className="italic text-gradient-gold">pure disbelief.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/80 bg-[var(--gold)]/10 px-6 py-2.5 text-xs font-semibold tracking-wider text-[var(--gold-soft)] transition-all hover:bg-[var(--gold)] hover:text-[#050409] sm:text-sm"
          >
            Inquire for Private Show →
          </a>
        </Reveal>
      </div>

      {/* Editorial composition */}
      <div className="relative mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12 md:gap-8">
        {a && (
          <div className="md:col-span-7">
            <MediaCard image={a} className="aspect-[4/5] w-full rounded-xl overflow-hidden" sizes="(max-width:768px) 100vw, 55vw" priority />
          </div>
        )}
        {b && (
          <div className="md:col-span-5 md:mt-16">
            <MediaCard image={b} className="aspect-[4/3] w-full rounded-xl overflow-hidden" sizes="(max-width:768px) 100vw, 40vw" />
          </div>
        )}
        {c && (
          <div className="md:col-span-6 md:col-start-4 md:-mt-12">
            <MediaCard image={c} className="aspect-[16/9] w-full rounded-xl overflow-hidden" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        )}
      </div>
    </section>
  )
}
