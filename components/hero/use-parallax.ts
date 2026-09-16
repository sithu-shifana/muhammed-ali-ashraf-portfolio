"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from "motion/react"

export type Pointer3D = {
  /** Normalized pointer offset from centre, roughly -1.0 … 1.0, spring-smoothed. */
  x: MotionValue<number>
  y: MotionValue<number>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}

/**
 * Spatial 3D Parallax hook inspired by Apple iOS 3D Depth Wallpaper.
 * Responsive to:
 * 1. Fine mouse cursor on desktop
 * 2. Touch movement on mobile
 * 3. DeviceOrientation (gyroscope) on iPhones / smartphones
 * 4. Gentle autonomous floating drift when idle
 */
export function usePointerParallax(): Pointer3D {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const reduced = useReducedMotion()

  // Smooth springs for luxurious weight and fluidity
  const x = useSpring(rawX, { stiffness: 45, damping: 18, mass: 0.8 })
  const y = useSpring(rawY, { stiffness: 45, damping: 18, mass: 0.8 })

  // 3D rotation angles (degrees)
  const rawRotX = useMotionValue(0)
  const rawRotY = useMotionValue(0)
  const rotateX = useSpring(rawRotX, { stiffness: 50, damping: 20, mass: 0.7 })
  const rotateY = useSpring(rawRotY, { stiffness: 50, damping: 20, mass: 0.7 })

  useEffect(() => {
    if (reduced || typeof window === "undefined") return

    let lastInteraction = Date.now()
    let animId: number | null = null

    // Idle floating wave animation (autonomous gentle 3D drift)
    const runIdleDrift = () => {
      const now = Date.now()
      if (now - lastInteraction > 2500) {
        const t = now * 0.001
        // Smooth sine oscillations for natural breathing
        const driftX = Math.sin(t * 0.7) * 0.15
        const driftY = Math.cos(t * 0.9) * 0.12
        rawX.set(driftX)
        rawY.set(driftY)
        rawRotX.set(-driftY * 12)
        rawRotY.set(driftX * 14)
      }
      animId = requestAnimationFrame(runIdleDrift)
    }
    animId = requestAnimationFrame(runIdleDrift)

    // Pointer / Mouse move
    let frame = 0
    const onPointerMove = (e: PointerEvent) => {
      lastInteraction = Date.now()
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const nx = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
        const ny = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
        rawX.set(nx)
        rawY.set(ny)
        // 3D Tilt: tilting up pitches forward (negative rotateX), tilting right yaws right (positive rotateY)
        rawRotX.set(-ny * 14)
        rawRotY.set(nx * 16)
      })
    }

    // Touch move for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastInteraction = Date.now()
        const touch = e.touches[0]
        const nx = (touch.clientX / window.innerWidth - 0.5) * 2
        const ny = (touch.clientY / window.innerHeight - 0.5) * 2
        rawX.set(nx)
        rawY.set(ny)
        rawRotX.set(-ny * 12)
        rawRotY.set(nx * 14)
      }
    }

    // Device orientation (iPhone / Android Gyroscope)
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        lastInteraction = Date.now()
        // gamma: left-to-right (-90 to 90)
        // beta: front-to-back (-180 to 180, normal holding angle ~45deg)
        const clampGamma = Math.max(-45, Math.min(45, e.gamma))
        const clampBeta = Math.max(0, Math.min(90, e.beta - 40)) // normalized around 40deg portrait hold

        const nx = clampGamma / 45
        const ny = (clampBeta - 25) / 25

        rawX.set(nx)
        rawY.set(ny)
        rawRotX.set(-ny * 15)
        rawRotY.set(nx * 15)
      }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true })
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("touchmove", onTouchMove)
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", onDeviceOrientation)
      }
      if (frame) cancelAnimationFrame(frame)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [rawX, rawY, rawRotX, rawRotY, reduced])

  return { x, y, rotateX, rotateY }
}
