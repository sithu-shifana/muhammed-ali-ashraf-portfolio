"use client"

import { motion, type Variants } from "motion/react"
import type { ReactNode } from "react"

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Fraction of element visible before triggering */
  amount?: number
  as?: "div" | "section" | "span" | "li" | "p"
}

export function Reveal({ children, className, delay = 0, amount = 0.3, as = "div" }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
