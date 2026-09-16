"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { LoaderGate } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { SoundProvider } from "@/components/sound-provider"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Disciplines } from "@/components/sections/disciplines"
import { Gallery } from "@/components/sections/gallery"
import { Quote } from "@/components/sections/quote"
import { FinalCta } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"

export function Experience() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

  return (
    <SoundProvider>
      <LoaderGate show={loading} onDone={() => setLoading(false)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Navbar />
        <main>
          <Hero ready={!loading} />
          <About />
          <Disciplines />
          <Quote>The mind sees only what it is guided to believe.</Quote>
          <Gallery />
          <FinalCta />
          <Footer />
        </main>
      </motion.div>
    </SoundProvider>
  )
}
