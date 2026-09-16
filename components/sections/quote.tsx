"use client"

import { Reveal } from "@/components/reveal"

export function Quote({ children }: { children: string }) {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-24 md:py-36">
      <Reveal amount={0.6}>
        <p className="text-center font-serif text-xl italic text-[var(--mist-dim)] md:text-3xl">
          {children}
        </p>
      </Reveal>
    </div>
  )
}
