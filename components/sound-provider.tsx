"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { HedwigThemePlayer } from "@/lib/hedwig-theme"

type SoundContextValue = {
  enabled: boolean
  toggle: () => void
  start: () => void
  available: boolean
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<HedwigThemePlayer | null>(null)
  const [enabled, setEnabled] = useState(false)
  const hasInteractedRef = useRef(false)

  useEffect(() => {
    playerRef.current = new HedwigThemePlayer()

    // Auto-listen for first user interaction (click/tap/keypress) to unlock and start audio
    const handleFirstGesture = () => {
      if (hasInteractedRef.current) return
      hasInteractedRef.current = true
      // Remove listeners once captured
      window.removeEventListener("click", handleFirstGesture)
      window.removeEventListener("touchstart", handleFirstGesture)
      window.removeEventListener("keydown", handleFirstGesture)
    }

    window.addEventListener("click", handleFirstGesture, { passive: true })
    window.addEventListener("touchstart", handleFirstGesture, { passive: true })
    window.addEventListener("keydown", handleFirstGesture, { passive: true })

    return () => {
      window.removeEventListener("click", handleFirstGesture)
      window.removeEventListener("touchstart", handleFirstGesture)
      window.removeEventListener("keydown", handleFirstGesture)
      playerRef.current?.stop()
    }
  }, [])

  const start = useCallback(() => {
    if (!playerRef.current) return
    playerRef.current.start(0.3)
    setEnabled(true)
  }, [])

  const toggle = useCallback(() => {
    if (!playerRef.current) return
    const isNowPlaying = playerRef.current.toggle(0.3)
    setEnabled(isNowPlaying)
  }, [])

  return (
    <SoundContext.Provider value={{ enabled, toggle, start, available: true }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error("useSound must be used within SoundProvider")
  return ctx
}
