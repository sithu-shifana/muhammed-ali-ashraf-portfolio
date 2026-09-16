"use client"

import { motion } from "motion/react"
import { Reveal } from "@/components/reveal"

const STAGES = [
  { name: "Taj Luxury Hotels", city: "Bangalore" },
  { name: "The Leela Palace", city: "Bangalore" },
  { name: "Four Seasons", city: "Bangalore" },
  { name: "Elite Private Galas", city: "Pan-India" },
  { name: "Intimate Close-Up & Street Illusions", city: "Bangalore" },
]

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <Reveal>
        <span className="mb-6 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
          // PROVEN STAGES
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.15] text-[var(--mist)] sm:text-4xl md:text-6xl">
          From five-star ballrooms
          <br />
          to intimate <span className="italic text-gradient-gold">private gatherings.</span>
        </h2>
      </Reveal>

      <ol className="relative mt-14 md:mt-20">
        {/* Connecting vertical gold line */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1 top-2 hidden h-[calc(100%-1rem)] w-px origin-top md:block"
          style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }}
        />

        {STAGES.map((stage, i) => (
          <Reveal as="li" key={stage.name} delay={i * 0.1} className="relative md:pl-12">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--gold)] md:block"
              style={{ boxShadow: "0 0 10px var(--gold-soft)" }}
            />
            <div className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--border)] py-6">
              <span className="font-serif text-2xl font-light text-[var(--mist)] transition-colors duration-300 group-hover:text-[var(--gold-soft)] sm:text-3xl md:text-4xl">
                {stage.name}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[var(--mist-dim)]">{stage.city}</span>
                <span className="font-display text-sm tracking-widest text-[var(--gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
