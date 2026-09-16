"use client"

import { motion } from "motion/react"

/** A tiny four-point gold star / celestial sparkle. */
export function GoldStar({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Thin celestial ring with a small orbiting dot. */
export function CelestialRing({ size = 120, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 120 120" className={className} fill="none">
      <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="0.4" opacity="0.3" strokeDasharray="2 6" />
      <circle cx="60" cy="2" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** A slowly floating, minimal playing-card outline used as a rare micro-detail. */
export function FloatingCard({
  className,
  delay = 0,
  rotate = -12,
}: {
  className?: string
  delay?: number
  rotate?: number
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      animate={{ y: [0, -14, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{
        opacity: { duration: 2, delay },
        y: { duration: 11, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 11, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <svg width="88" height="128" viewBox="0 0 88 128" fill="none">
        <rect
          x="1"
          y="1"
          width="86"
          height="126"
          rx="8"
          stroke="var(--gold)"
          strokeWidth="0.75"
          fill="rgba(10,10,24,0.5)"
        />
        <rect x="8" y="8" width="72" height="112" rx="5" stroke="var(--gold)" strokeWidth="0.4" opacity="0.5" />
        <g stroke="var(--gold)" strokeWidth="0.5" opacity="0.8">
          <circle cx="44" cy="64" r="14" />
          <path d="M44 46c.4 4 3.6 7.6 8 8-4.4.4-7.6 4-8 8-.4-4-3.6-7.6-8-8 4.4-.4 7.6-4 8-8Z" fill="var(--gold)" stroke="none" />
        </g>
      </svg>
    </motion.div>
  )
}

/** A hairline gold rule that draws itself in on scroll. */
export function GoldLine({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        background: "linear-gradient(var(--dir), transparent, var(--gold), transparent)",
        // @ts-expect-error custom prop for gradient direction
        "--dir": vertical ? "180deg" : "90deg",
      }}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, opacity: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 0.7 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
