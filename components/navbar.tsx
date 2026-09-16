"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useSound } from "@/components/sound-provider"
import { contact } from "@/lib/assets"

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Disciplines", href: "#disciplines" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const { enabled, toggle, available } = useSound()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Background glass blur */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          opacity: scrolled || open ? 1 : 0,
          background: "linear-gradient(180deg, rgba(5,4,9,0.96) 0%, rgba(5,4,9,0.85) 100%)",
          backdropFilter: scrolled || open ? "blur(16px)" : "none",
          borderBottom: scrolled || open ? "1px solid rgba(212,175,55,0.2)" : "none",
        }}
      />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5 md:px-12">
        {/* Brand */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 transition-colors hover:text-[var(--gold-soft)]"
        >
          <span className="sm:hidden font-display text-base tracking-[0.2em] text-[#f4f2f9]">
            M · A · A
          </span>
          <span className="hidden sm:inline font-display text-sm tracking-[0.2em] text-[#f4f2f9] md:text-base">
            MUHAMMED ALI ASHRAF
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium tracking-wider text-[var(--mist-dim)] transition-colors hover:text-[#ffffff]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Controls & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Sound Toggle */}
          {available && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[#120f24]/70 px-3 py-1.5 text-xs tracking-wider text-[var(--mist)] backdrop-blur-sm transition-all hover:border-[var(--gold)] hover:text-[var(--gold-soft)] sm:px-3.5"
              title="Toggle Harry Potter Theme Music"
            >
              {enabled ? (
                <span className="flex items-center gap-0.5">
                  <span className="inline-block h-3 w-0.5 animate-pulse bg-[var(--gold-soft)]" />
                  <span className="inline-block h-2 w-0.5 animate-bounce bg-[var(--gold)]" />
                  <span className="inline-block h-3.5 w-0.5 animate-pulse bg-[var(--gold-soft)]" />
                </span>
              ) : (
                <span className="inline-block h-2 w-2 rounded-full border border-[var(--mist-dim)]" />
              )}
              <span className="text-[11px] sm:text-xs">Music: {enabled ? "On" : "Off"}</span>
            </button>
          )}

          {/* Desktop WhatsApp CTA */}
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--gold)]/80 bg-[var(--gold)]/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-[var(--gold-soft)] shadow-[0_0_15px_rgba(201,163,92,0.2)] transition-all hover:bg-[var(--gold)] hover:text-[#050409] sm:flex"
          >
            Book WhatsApp
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[#120f24]/80 p-2 text-[var(--mist)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-soft)] lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  open ? "translate-y-1.5 rotate-45 text-[var(--gold-soft)]" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45 text-[var(--gold-soft)]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100svh - 68px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between overflow-y-auto border-b border-[var(--border)] px-6 py-8 lg:hidden"
            style={{
              background: "rgba(5, 4, 9, 0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Nav links */}
            <ul className="flex flex-col gap-6 pt-2">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between font-serif text-3xl font-light text-[var(--mist)] transition-colors hover:text-[var(--gold-soft)]"
                  >
                    <span>{l.label}</span>
                    <span className="font-display text-xs text-[var(--gold)]">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Actions Bottom */}
            <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 rounded-full border border-[var(--gold)] bg-[var(--gold)]/20 py-3.5 text-center font-display text-sm font-semibold tracking-widest text-[#f5e1a4] shadow-[0_0_20px_rgba(201,163,92,0.3)] transition-all hover:bg-[var(--gold)] hover:text-[#050409]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.564 5.714 5.86-1.537c1.705.93 3.66 1.463 5.736 1.463 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
                BOOK ON WHATSAPP
              </a>

              <div className="flex items-center justify-between text-xs text-[var(--mist-dim)] pt-2">
                <span>Bangalore, India</span>
                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--gold-soft)]"
                >
                  {contact.instagram}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
