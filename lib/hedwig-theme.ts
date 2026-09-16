/**
 * Web Audio API synthesizer that plays the iconic "Hedwig's Theme" (Harry Potter)
 * in an enchanting celestial bell / music-box tone.
 * 100% client-side, zero network dependencies, runs for free on Vercel without audio host limits.
 */

// Note frequencies in Hz
const NOTES: Record<string, number> = {
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  Ds5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Fs5: 739.99,
  G5: 783.99,
  Gs5: 830.61,
  A5: 880.0,
  As5: 932.33,
  B5: 987.77,
  C6: 1046.5,
  Cs6: 1108.73,
  D6: 1174.66,
  E6: 1318.51,
  REST: 0,
}

// Melody sequence: [Note, duration in beats]
// Hedwig's Theme iconic phrase (3/8 time signature feel)
const HEDWIG_MELODY: [string, number][] = [
  // Phrase 1
  ["B4", 1.0],
  ["E5", 1.5],
  ["G5", 0.5],
  ["Fs5", 1.0],
  ["E5", 2.0],
  ["B5", 1.0],
  ["A5", 2.8],
  ["Fs5", 2.8],

  // Phrase 2
  ["E5", 1.5],
  ["G5", 0.5],
  ["Fs5", 1.0],
  ["Ds5", 2.0],
  ["F5", 1.0],
  ["B4", 3.0],

  // Phrase 3
  ["B4", 1.0],
  ["E5", 1.5],
  ["G5", 0.5],
  ["Fs5", 1.0],
  ["E5", 2.0],
  ["B5", 1.0],
  ["D6", 1.5],
  ["Cs6", 0.5],
  ["C6", 1.0],
  ["Gs5", 2.2],

  // Phrase 4
  ["C6", 1.5],
  ["B5", 0.5],
  ["As5", 1.0],
  ["As5", 0.5],
  ["B4", 1.5],
  ["G5", 1.0],
  ["E5", 3.2],
  ["REST", 1.5],
]

export class HedwigThemePlayer {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private isPlaying = false
  private timerId: number | null = null
  private noteIndex = 0
  private tempoBpm = 118 // Magical gentle tempo

  private initContext() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AudioCtx()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)

    // Reverb simulation: gentle delay feedback loop
    const delay = this.ctx.createDelay()
    delay.delayTime.value = 0.32
    const feedback = this.ctx.createGain()
    feedback.gain.value = 0.35
    const delayFilter = this.ctx.createBiquadFilter()
    delayFilter.type = "lowpass"
    delayFilter.frequency.value = 2400

    this.masterGain.connect(this.ctx.destination)
    this.masterGain.connect(delay)
    delay.connect(delayFilter)
    delayFilter.connect(feedback)
    feedback.connect(delay)
    delayFilter.connect(this.ctx.destination)
  }

  // Play a single celestial bell/music-box chime note
  private playBell(freq: number, durationSec: number) {
    if (!this.ctx || !this.masterGain || freq <= 0) return

    const now = this.ctx.currentTime

    // 1. Primary pure sine tone (body of the bell)
    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.type = "sine"
    osc1.frequency.setValueAtTime(freq, now)

    // 2. High harmonic chime overtone (characteristic of celesta metal tines)
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(freq * 2.756, now) // Non-harmonic metal chime ratio

    // 3. Subtle shimmer detune
    const osc3 = this.ctx.createOscillator()
    const gain3 = this.ctx.createGain()
    osc3.type = "sine"
    osc3.frequency.setValueAtTime(freq + 1.2, now)

    // Envelopes: instantaneous magical strike, long lingering resonant decay
    const strike = 0.006
    const decay = Math.max(0.9, durationSec * 1.4)

    // Gain 1: Main fundamental
    gain1.gain.setValueAtTime(0.0001, now)
    gain1.gain.exponentialRampToValueAtTime(0.18, now + strike)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + decay)

    // Gain 2: Metal chime sparkle
    gain2.gain.setValueAtTime(0.0001, now)
    gain2.gain.exponentialRampToValueAtTime(0.06, now + strike)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.45)

    // Gain 3: Subtle shimmer
    gain3.gain.setValueAtTime(0.0001, now)
    gain3.gain.exponentialRampToValueAtTime(0.05, now + strike * 2)
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.8)

    // Connect voices
    osc1.connect(gain1)
    gain1.connect(this.masterGain)

    osc2.connect(gain2)
    gain2.connect(this.masterGain)

    osc3.connect(gain3)
    gain3.connect(this.masterGain)

    osc1.start(now)
    osc2.start(now)
    osc3.start(now)

    const stopTime = now + decay + 0.1
    osc1.stop(stopTime)
    osc2.stop(stopTime)
    osc3.stop(stopTime)
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return

    const [noteName, beats] = HEDWIG_MELODY[this.noteIndex]
    const freq = NOTES[noteName] || 0
    const beatDuration = 60 / this.tempoBpm
    const durationSec = beats * beatDuration

    if (freq > 0) {
      this.playBell(freq, durationSec)
    }

    this.noteIndex = (this.noteIndex + 1) % HEDWIG_MELODY.length

    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote()
    }, durationSec * 1000)
  }

  public async start(volume = 0.35) {
    this.initContext()
    if (!this.ctx || !this.masterGain) return

    if (this.ctx.state === "suspended") {
      await this.ctx.resume()
    }

    if (this.isPlaying) return
    this.isPlaying = true

    // Smooth volume fade in
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.0001, now)
    this.masterGain.gain.exponentialRampToValueAtTime(volume, now + 1.2)

    this.scheduleNextNote()
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return
    this.isPlaying = false

    if (this.timerId !== null) {
      clearTimeout(this.timerId)
      this.timerId = null
    }

    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.0001, now)
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
  }

  public toggle(volume = 0.35): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.start(volume)
      return true
    }
  }

  public get running(): boolean {
    return this.isPlaying
  }
}

// Shared singleton instance for the app
export const hedwigTheme = typeof window !== "undefined" ? new HedwigThemePlayer() : null
