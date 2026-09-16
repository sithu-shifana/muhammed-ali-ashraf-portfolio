"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Reveal } from "@/components/reveal"
import { GoldStar } from "@/components/decor/glyphs"

const DISCIPLINES = [
  {
    word: "Mentalism",
    sub: "Reading the unspoken",
    desc: "Unlocking private thoughts, predicting decisions before they are made, and navigating the subconscious mind.",
  },
  {
    word: "Hypnotism",
    sub: "Altering perception",
    desc: "Bypassing the conscious filter to suspend disbelief and reshape subjective reality in real time.",
  },
  {
    word: "Magic",
    sub: "The visible impossible",
    desc: "Deft sleight of hand with cards, time, and physical objects that challenge the laws of physics.",
  },
]

export function Disciplines() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section id="disciplines" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <Reveal>
        <span className="mb-10 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
          // DISCIPLINES
        </span>
      </Reveal>

      <ul className="flex flex-col gap-6 md:gap-8">
        {DISCIPLINES.map((d, i) => {
          const isActive = active === i
          return (
            <Reveal as="li" key={d.word} delay={i * 0.08}>
              <div
                onClick={() => setActive(isActive ? null : i)}
                onMouseEnter={() => setActive(i)}
                className="group relative cursor-pointer border-b border-[var(--border)] pb-6 transition-all duration-300"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <motion.span
                      animate={{ x: isActive ? 12 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="font-serif text-4xl font-light leading-none transition-colors duration-300 sm:text-6xl md:text-7xl"
                      style={{
                        color: isActive ? "#ffffff" : "var(--mist-dim)",
                        textShadow: isActive ? "0 0 30px rgba(212,175,55,0.4)" : "none",
                      }}
                    >
                      {d.word}
                    </motion.span>

                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--gold-soft)]"
                    >
                      <GoldStar size={20} />
                    </motion.span>
                  </div>

                  <span className="font-display text-sm italic tracking-wider text-[var(--gold)]">
                    {d.sub}
                  </span>
                </div>

                {/* Expanding brief description */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? 12 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl text-base text-[var(--mist-dim)] sm:text-lg">
                    {d.desc}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
