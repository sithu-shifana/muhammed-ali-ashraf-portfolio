"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Reveal } from "@/components/reveal"
import { MediaCard } from "@/components/media-card"
import { assets } from "@/lib/assets"

const TABS = ["Portraits", "Atmosphere"] as const
type Tab = (typeof TABS)[number]

export function Gallery() {
  const [tab, setTab] = useState<Tab>("Portraits")
  const images = tab === "Portraits" ? assets.portraits : assets.performances

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <span className="mb-4 block font-display text-xs tracking-[0.25em] text-[var(--gold)]">
            // VISUAL REALMS
          </span>
          <h2 className="font-serif text-4xl font-light leading-none text-[var(--mist)] sm:text-5xl md:text-6xl">
            A closer look.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className="group relative text-sm font-medium tracking-wider transition-colors"
                style={{ color: tab === t ? "#ffffff" : "var(--mist-dim)" }}
              >
                {t}
                <span
                  className="absolute -bottom-1.5 left-0 h-0.5 bg-[var(--gold)] transition-all duration-300"
                  style={{ width: tab === t ? "100%" : "0%" }}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:grid-cols-2"
        >
          {images.map((img, i) => (
            <MediaCard
              key={img.src + i}
              image={img}
              className={`w-full overflow-hidden rounded-xl ${
                img.ratio === "landscape" ? "aspect-[16/10]" : "aspect-[4/5]"
              }`}
              sizes="(max-width:640px) 100vw, 50vw"
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
