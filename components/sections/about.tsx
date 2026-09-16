"use client"

import { Reveal } from "@/components/reveal"
import { FloatingCard } from "@/components/decor/glyphs"
import { contact } from "@/lib/assets"

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <FloatingCard
        className="pointer-events-none absolute -right-4 top-8 hidden opacity-70 md:block lg:-right-10"
        delay={0.4}
        rotate={10}
      />

      <Reveal>
        <span className="mb-6 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
          // THE ILLUSIONIST
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.1] text-[var(--mist)] sm:text-5xl md:text-6xl lg:text-7xl">
          The boundary between
          <br />
          reality and illusion is
          <br />
          <span className="text-gradient-gold italic">only a thought.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 flex max-w-2xl flex-col gap-6 text-base leading-relaxed text-[var(--mist-dim)] sm:text-lg">
          <p>
            Based in Bangalore, Muhammed Ali Ashraf weaves deep psychological suggestion, mentalism,
            and sleight of hand into experiences that defy rational explanation.
          </p>
          <p>
            No camera tricks. No mirrors. Just the uncharted depths of human perception unfolding
            inches before your eyes.
          </p>
        </div>

        <div className="mt-8">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[var(--gold-soft)] underline underline-offset-8 transition-colors hover:text-[#ffffff]"
          >
            CONNECT DIRECTLY ON WHATSAPP →
          </a>
        </div>
      </Reveal>
    </section>
  )
}
