"use client"

import { AnimatePresence, motion } from "motion/react"
import { GoldStar } from "@/components/decor/glyphs"
import { useSound } from "@/components/sound-provider"
import { useState } from "react"

function Card({
  delay,
  rotate,
  z,
}: {
  delay: number
  rotate: number
  z: number
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ zIndex: z }}
      initial={{ opacity: 0, x: "-50%", y: "-50%", rotate: rotate - 8, scale: 0.9 }}
      animate={{ opacity: 1, rotate, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
        <rect x="2" y="2" width="96" height="146" rx="10" fill="#0d0a1a" stroke="var(--gold)" strokeWidth="1" />
        <rect x="8" y="8" width="84" height="134" rx="7" stroke="var(--gold-soft)" strokeWidth="0.5" opacity="0.6" />
        <circle cx="50" cy="75" r="22" stroke="var(--gold)" strokeWidth="0.8" opacity="0.7" />
        <circle cx="50" cy="75" r="8" fill="var(--gold-soft)" opacity="0.3" />
        <path d="M50 58 L52 73 L67 75 L52 77 L50 92 L48 77 L33 75 L48 73 Z" fill="var(--gold)" />
      </svg>
    </motion.div>
  )
}

export function Loader({ onDone }: { onDone: () => void }) {
  const { start } = useSound()
  const [readyToEnter, setReadyToEnter] = useState(false)

  const handleEnter = () => {
    try {
      start()
    } catch {
      // ignore
    }
    onDone()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050409]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="relative flex h-48 w-48 items-center justify-center">
        <motion.div
          className="relative h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <Card delay={0.05} rotate={12} z={2} />
          <Card delay={0.25} rotate={-10} z={1} />
        </motion.div>

        <motion.div
          className="absolute text-[var(--gold-soft)] drop-shadow-[0_0_16px_rgba(224,183,110,0.8)]"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          onAnimationComplete={() => {
            setReadyToEnter(true)
            // If visitor doesn't click after 2.8s, automatically enter
            setTimeout(() => {
              handleEnter()
            }, 2800)
          }}
        >
          <GoldStar size={34} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 flex flex-col items-center gap-3 text-center"
      >
        <span className="font-display text-sm tracking-widest text-[var(--gold)]">
          MUHAMMED ALI ASHRAF
        </span>

        {readyToEnter && (
          <motion.button
            type="button"
            onClick={handleEnter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-3 cursor-pointer rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/10 px-7 py-2.5 font-display text-xs tracking-widest text-[var(--gold-soft)] shadow-[0_0_20px_rgba(201,163,92,0.25)] backdrop-blur-md transition-all hover:bg-[var(--gold)] hover:text-[#050409]"
          >
            ENTER REALM ✦
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

export function LoaderGate({ show, onDone }: { show: boolean; onDone: () => void }) {
  return <AnimatePresence>{show && <Loader key="loader" onDone={onDone} />}</AnimatePresence>
}
