"use client"

import Image from "next/image"
import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { usePointerParallax } from "@/components/hero/use-parallax"
import { TarotCard, type CardVariant } from "@/components/hero/card"
import { contact } from "@/lib/assets"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Carefully configured cards for mobile & desktop:
 * - On mobile (< 640px): Only 2 cards in top peripheral corners, preventing any overlap with text/subject.
 * - On tablet & desktop: 4 cards floating in 3D around him at distinct depths.
 */
const FLOATING_CARDS: {
  variant: CardVariant
  className: string
  cardClass: string
  rotateZ: number
  depthZ: number
  drift: number
  duration: number
  delay: number
}[] = [
  {
    variant: "sun",
    // Top-left corner: stays high up away from text & face
    className: "left-[2%] top-[12%] sm:left-[6%] sm:top-[16%] md:left-[8%] md:top-[18%]",
    cardClass: "w-14 sm:w-22 md:w-28 lg:w-34",
    rotateZ: -14,
    depthZ: 85,
    drift: 10,
    duration: 8,
    delay: 0.2,
  },
  {
    variant: "venus",
    // Top-right corner: stays high up away from text & face
    className: "right-[2%] top-[14%] sm:right-[6%] sm:top-[18%] md:right-[8%] md:top-[20%]",
    cardClass: "w-14 sm:w-22 md:w-28 lg:w-34",
    rotateZ: 14,
    depthZ: 90,
    drift: 12,
    duration: 8.8,
    delay: 0.4,
  },
  {
    variant: "moon",
    // Mid-left: visible only on tablet/desktop so it never covers mobile text
    className: "hidden sm:block sm:left-[4%] sm:top-[46%] md:left-[6%] md:top-[44%]",
    cardClass: "sm:w-22 md:w-28 lg:w-36",
    rotateZ: 9,
    depthZ: 110,
    drift: 11,
    duration: 9.5,
    delay: 0.6,
  },
  {
    variant: "saturn",
    // Mid-right: visible only on tablet/desktop so it never covers mobile text
    className: "hidden sm:block sm:right-[4%] sm:top-[48%] md:right-[6%] md:top-[46%]",
    cardClass: "sm:w-22 md:w-28 lg:w-36",
    rotateZ: -11,
    depthZ: 105,
    drift: 10,
    duration: 9,
    delay: 0.8,
  },
]

const STARDUST = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 49 + 11) % 96,
  top: (i * 39 + 7) % 92,
  size: (i % 3) + 2,
  delay: (i % 8) * 0.4,
  duration: 4.5 + (i % 5),
  opacity: 0.3 + ((i % 5) * 0.12),
}))

const DIAL_TICKS = [
  { cx: 660, cy: 400, x1: 648, y1: 400, x2: 672, y2: 400 },
  { cx: 625.17, cy: 530, x1: 614.77, y1: 524, x2: 635.56, y2: 536 },
  { cx: 530, cy: 625.17, x1: 524, y1: 614.77, x2: 536, y2: 635.56 },
  { cx: 400, cy: 660, x1: 400, y1: 648, x2: 400, y2: 672 },
  { cx: 270, cy: 625.17, x1: 276, y1: 614.77, x2: 264, y2: 635.56 },
  { cx: 174.83, cy: 530, x1: 185.23, y1: 524, x2: 164.44, y2: 536 },
  { cx: 140, cy: 400, x1: 152, y1: 400, x2: 128, y2: 400 },
  { cx: 174.83, cy: 270, x1: 185.23, y1: 276, x2: 164.44, y2: 264 },
  { cx: 270, cy: 174.83, x1: 276, y1: 185.23, x2: 264, y2: 164.44 },
  { cx: 400, cy: 140, x1: 400, y1: 152, x2: 400, y2: 128 },
  { cx: 530, cy: 174.83, x1: 524, y1: 185.23, x2: 536, y2: 164.44 },
  { cx: 625.17, cy: 270, x1: 614.77, y1: 276, x2: 635.56, y2: 264 },
] as const

export function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const { x, y, rotateX, rotateY } = usePointerParallax()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Scroll parallax dampening
  const sceneScrollY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const moonScrollY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const subjectScrollY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // Responsive 3D Parallax offsets
  const bgX = useTransform(x, (v) => v * -14)
  const bgY = useTransform(y, (v) => v * -14)

  const moonX = useTransform(x, (v) => v * -10)
  const moonY = useTransform(y, (v) => v * -10)

  const ringsX = useTransform(x, (v) => v * 8)
  const ringsY = useTransform(y, (v) => v * 8)

  const subjectX = useTransform(x, (v) => v * 22)
  const subjectY = useTransform(y, (v) => v * 18)

  const cardsTiltX = useTransform(rotateX, (v) => v * 1.1)
  const cardsTiltY = useTransform(rotateY, (v) => v * 1.1)

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050409]"
      style={{ perspective: "1200px" }}
    >
      {/* 3D SPATIAL WORLD WRAPPER */}
      <motion.div
        className="relative flex h-full min-h-[100svh] w-full flex-col justify-end"
        style={{
          y: sceneScrollY,
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ================= LAYER 0: DEEP COSMOS & NEBULA ================= */}
        <motion.div
          style={{ x: bgX, y: bgY, transform: "translateZ(-160px) scale(1.2)" }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 34%, rgba(60, 35, 95, 0.55), rgba(20, 15, 40, 0.75) 55%, #050409 100%)",
            }}
          />
          <div
            className="absolute -left-[10%] top-[15%] h-[60vh] w-[60vh] rounded-full blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(147, 51, 234, 0.18), transparent 70%)" }}
          />
          <div
            className="absolute -right-[10%] top-[25%] h-[60vh] w-[60vh] rounded-full blur-[90px]"
            style={{ background: "radial-gradient(circle, rgba(201, 163, 92, 0.16), transparent 70%)" }}
          />
        </motion.div>

        {/* ================= LAYER 1: LUMINOUS GOLDEN MOON ================= */}
        <motion.div
          style={{
            x: moonX,
            y: moonY,
            translateY: moonScrollY,
            transform: "translateZ(-90px)",
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-12 sm:-translate-y-8"
        >
          {/* Moon Glow Aura */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.75, 0.95, 0.75],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[42vh] w-[42vh] max-h-[460px] max-w-[460px] rounded-full blur-[35px]"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 225, 164, 0.42) 0%, rgba(212, 175, 55, 0.25) 45%, rgba(138, 90, 20, 0.08) 70%, transparent 85%)",
            }}
          />

          {/* Luminous Moon Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.2, ease: EASE }}
            className="relative h-[34vh] w-[34vh] sm:h-[44vh] sm:w-[44vh] max-h-[420px] max-w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 45% 42%, #fff5d6 0%, #ecd08c 28%, #b88628 58%, #4a320d 88%, #1f1406 100%)",
              boxShadow:
                "0 0 60px rgba(245, 225, 164, 0.35), inset -16px -16px 40px rgba(0,0,0,0.6), inset 12px 12px 30px rgba(255,255,255,0.4)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full mix-blend-multiply opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 35% 30%, transparent 15%, #593d14 25%, transparent 35%), radial-gradient(circle at 65% 55%, transparent 20%, #40290c 35%, transparent 45%), radial-gradient(circle at 40% 70%, transparent 10%, #4a320d 22%, transparent 32%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ================= LAYER 2: ASTROLOGICAL SACRED GEOMETRY ================= */}
        <motion.div
          style={{
            x: ringsX,
            y: ringsY,
            transform: "translateZ(-40px)",
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-12 sm:-translate-y-8"
        >
          <motion.svg
            viewBox="0 0 800 800"
            className="h-[65vh] w-[65vh] sm:h-[78vh] sm:w-[78vh] max-h-[750px] max-w-[750px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 0.65 } : {}}
            transition={{ duration: 2.4, delay: 0.3 }}
            aria-hidden="true"
            suppressHydrationWarning
          >
            <circle cx="400" cy="400" r="210" fill="none" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3 7" opacity="0.6" />
            <circle cx="400" cy="400" r="260" fill="none" stroke="#f5e1a4" strokeWidth="1" opacity="0.5" />
            <circle cx="400" cy="400" r="310" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="2 12" opacity="0.4" />
            <circle cx="400" cy="400" r="360" fill="none" stroke="#aa8222" strokeWidth="0.8" opacity="0.35" />

            <motion.g
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "400px 400px" }}
            >
              <circle cx="400" cy="400" r="285" fill="none" stroke="#f5e1a4" strokeWidth="0.5" strokeDasharray="1 10" />
              {DIAL_TICKS.map((tick, idx) => (
                <g key={idx}>
                  <circle cx={tick.cx} cy={tick.cy} r="3" fill="#f5e1a4" />
                  <line
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="#d4af37"
                    strokeWidth="0.8"
                  />
                </g>
              ))}
            </motion.g>

            <motion.g
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "400px 400px" }}
            >
              <circle cx="400" cy="190" r="4" fill="#f5e1a4" />
              <circle cx="400" cy="610" r="3" fill="#f5e1a4" />
              <circle cx="190" cy="400" r="3.5" fill="#f5e1a4" />
              <circle cx="610" cy="400" r="2.5" fill="#f5e1a4" />
            </motion.g>
          </motion.svg>
        </motion.div>

        {/* ================= LAYER 3: SUBJECT (MUHAMMED ALI ASHRAF) ================= */}
        <motion.div
          style={{
            x: subjectX,
            y: subjectY,
            translateY: subjectScrollY,
            transform: "translateZ(35px)",
          }}
          className="pointer-events-none absolute inset-x-0 bottom-16 sm:bottom-20 md:bottom-24 flex h-[50vh] sm:h-[65vh] md:h-[72vh] items-end justify-center"
        >
          <motion.div
            animate={
              reduced
                ? {}
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-full w-full items-end justify-center"
          >
            {/* Soft contact glow & silhouette shadow */}
            <div
              className="absolute bottom-2 left-1/2 h-16 w-[60vw] max-w-md -translate-x-1/2 rounded-[50%] blur-xl"
              style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, rgba(0,0,0,0.85) 70%, transparent 100%)" }}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
              animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
              className="relative h-full w-auto"
            >
              <Image
                src="/images/hero-bust-cutout.png"
                alt="Muhammed Ali Ashraf holding tarot cards"
                width={860}
                height={781}
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 620px"
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ================= LAYER 4: 3D FLOATING ASTRO ORACLE CARDS ================= */}
        {/* Floating cards at distinct non-overlapping peripheral coordinates */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
        >
          {FLOATING_CARDS.map((card, idx) => (
            <motion.div
              key={card.variant + idx}
              className={`absolute ${card.className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.7 + card.delay, ease: EASE }}
              style={{
                transform: `translateZ(${card.depthZ}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={
                  reduced
                    ? { rotateZ: card.rotateZ }
                    : {
                        y: [0, -card.drift, 0],
                        rotateZ: [card.rotateZ - 3, card.rotateZ + 3, card.rotateZ - 3],
                        rotateX: [-3, 5, -3],
                        rotateY: [3, -5, 3],
                      }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: card.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: card.delay,
                      }
                }
                style={{
                  rotateX: cardsTiltX,
                  rotateY: cardsTiltY,
                }}
              >
                <TarotCard variant={card.variant} className={card.cardClass} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ================= LAYER 5: GOLDEN STARDUST ================= */}
        <div
          className="pointer-events-none absolute inset-0 z-25"
          style={{ transform: "translateZ(100px)" }}
        >
          {STARDUST.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                backgroundColor: "#f5e1a4",
                boxShadow: "0 0 6px #d4af37, 0 0 12px rgba(245, 225, 164, 0.7)",
              }}
              animate={
                reduced
                  ? { opacity: s.opacity }
                  : {
                      opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4],
                      y: [0, -12, 0],
                      scale: [0.9, 1.2, 0.9],
                    }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: s.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: s.delay,
                    }
              }
            />
          ))}
        </div>

        {/* Cinematic bottom gradient fade to guarantee text readability */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-56 sm:h-64"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5, 4, 9, 0.4) 30%, rgba(5, 4, 9, 0.92) 75%, var(--background) 100%)",
          }}
        />

        {/* ================= LAYER 6: HERO TYPOGRAPHY & DIRECT BOOKING CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 1 }}
          style={{ opacity: heroOpacity, transform: "translateZ(120px)" }}
          className="relative z-40 mx-auto flex w-full max-w-xl flex-col items-center px-4 pb-6 pt-2 text-center sm:px-6 sm:pb-10"
        >
          <h1 className="font-display text-xl font-normal tracking-[0.2em] text-[#f4f2f9] sm:text-3xl md:text-4xl">
            MUHAMMED ALI ASHRAF
          </h1>

          <p className="mt-1.5 font-display text-[11px] tracking-[0.25em] text-[var(--gold)] sm:mt-2 sm:text-xs sm:tracking-[0.28em] md:text-sm">
            MENTALIST · HYPNOTIST · MAGICIAN
          </p>

          <p className="mt-1.5 text-xs text-[var(--mist-dim)] sm:mt-2 sm:text-sm md:text-base">
            Where perception blurs and the impossible becomes real.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-5 sm:gap-4">
            {/* Direct WhatsApp CTA */}
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--gold)]/20 px-5 py-2 text-xs font-semibold tracking-wider text-[#f5e1a4] shadow-[0_0_20px_rgba(201,163,92,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[var(--gold)] hover:text-[#050409] sm:px-6 sm:py-2.5 sm:text-sm"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.564 5.714 5.86-1.537c1.705.93 3.66 1.463 5.736 1.463 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
              </svg>
              BOOK ON WHATSAPP
            </a>

            {/* Scroll Down link */}
            <a
              href="#about"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs tracking-wider text-[var(--mist)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-soft)] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              EXPLORE ↓
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
