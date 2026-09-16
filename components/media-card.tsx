"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { GoldStar } from "@/components/decor/glyphs"
import type { GalleryImage } from "@/lib/assets"

export function MediaCard({
  image,
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
}: {
  image: GalleryImage
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-sm ${className ?? ""}`}
    >
      <div className="absolute inset-0 z-10 border border-[var(--border)]" />
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      {/* Hover darkening + gold detail */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--ink)]/0 transition-colors duration-700 group-hover:bg-[var(--ink)]/35" />
      <span className="pointer-events-none absolute right-4 top-4 text-[var(--gold-soft)] opacity-0 transition-all duration-700 group-hover:opacity-100">
        <GoldStar size={16} />
      </span>
    </motion.figure>
  )
}
