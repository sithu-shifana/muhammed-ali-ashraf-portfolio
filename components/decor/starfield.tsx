"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  baseA: number
  twinkle: number
  drift: number
}

/**
 * Lightweight canvas starfield. Caps star count, uses a single rAF loop and slow
 * drift so it stays smooth on mobile. Falls back to a static field when the user
 * prefers reduced motion.
 */
export function Starfield({ density = 0.00008, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars: Star[] = []
    let raf = 0
    let running = true

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.max(28, Math.floor(w * h * density)))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        baseA: Math.random() * 0.5 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.02 + 0.004,
      }))
    }

    const draw = (t: number) => {
      const { innerWidth: w, innerHeight: h } = window
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = reduced ? s.baseA : s.baseA + Math.sin(t * 0.001 + s.twinkle) * 0.25
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(227, 200, 138, ${Math.max(0, a)})`
        ctx.fill()
        if (!reduced) {
          s.y -= s.drift
          if (s.y < -2) s.y = h + 2
        }
      }
      if (running && !reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }
    window.addEventListener("resize", resize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
