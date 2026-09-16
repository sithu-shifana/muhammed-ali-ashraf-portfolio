import { GoldLine } from "@/components/decor/glyphs"
import { contact } from "@/lib/assets"

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-16 md:px-12">
      <GoldLine className="mx-auto h-px w-full max-w-xs opacity-50" />
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="font-display text-base tracking-[0.2em] text-[var(--mist)]">
          MUHAMMED ALI ASHRAF
        </p>
        <p className="font-display text-xs tracking-[0.25em] text-[var(--gold)]">
          MENTALIST · HYPNOTIST · MAGICIAN
        </p>
        <div className="mt-2 flex items-center gap-4 text-xs text-[var(--mist-dim)]">
          <span>Bangalore, India</span>
          <span>•</span>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--gold-soft)] hover:underline"
          >
            Direct WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-[var(--mist-dim)]/60">
          © {new Date().getFullYear()} All Rights Reserved. Crafted with mystery.
        </p>
      </div>
    </footer>
  )
}
