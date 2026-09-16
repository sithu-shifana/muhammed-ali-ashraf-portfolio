/**
 * Centralized media configuration.
 * All image, audio, and contact information is managed here.
 */

export type GalleryImage = {
  src: string
  alt: string
  ratio?: "portrait" | "landscape" | "square"
}

export const assets = {
  /** Real portrait of Muhammed Ali Ashraf */
  hero: {
    src: "/images/hero.png",
    alt: "Muhammed Ali Ashraf holding a fan of cards before a glowing moon",
  },

  /** Layered 3D hero scene */
  heroScene: {
    bg: { src: "/images/hero-bg-moon.png", alt: "Glowing moon and cosmic sky" },
    subject: {
      src: "/images/hero-bust-cutout.png",
      alt: "Muhammed Ali Ashraf holding cards in a black suit",
    },
  },

  /** Studio portrait of Muhammed Ali Ashraf */
  portraitStudio: {
    src: "/images/portrait-studio.png",
    alt: "Studio portrait of Muhammed Ali Ashraf in a black suit",
  },

  /** Atmospheric still-life imagery */
  atmosphere: {
    cards: { src: "/images/atmosphere-cards.png", alt: "A fan of ornate cards on dark velvet" },
    moon: { src: "/images/atmosphere-moon.png", alt: "A glowing crescent moon behind drifting smoke" },
    candle: { src: "/images/atmosphere-candle.png", alt: "A single lit candle in darkness" },
  },

  /** Portrait gallery */
  portraits: [
    { src: "/images/hero.png", alt: "Cosmic portrait holding cards", ratio: "landscape" },
    { src: "/images/portrait-studio.png", alt: "Studio portrait, seated", ratio: "portrait" },
  ] as GalleryImage[],

  /** Performance gallery */
  performances: [
    { src: "/images/atmosphere-cards.png", alt: "Tarot deck in mystical light", ratio: "portrait" },
    { src: "/images/atmosphere-moon.png", alt: "Celestial lunar radiance", ratio: "landscape" },
    { src: "/images/atmosphere-candle.png", alt: "Candle in mystery", ratio: "portrait" },
  ] as GalleryImage[],

  /** Audio fallback */
  audio: {
    ambient: "/audio/hedwig.mp3",
  },
} as const

export const contact = {
  phone: "+91 9605028128",
  phoneHref: "tel:+919605028128",
  whatsappHref:
    "https://wa.me/919605028128?text=Hi%20Muhammed%20Ali%20Ashraf,%20I%20would%20like%20to%20book%20an%20appointment",
  instagram: "@_muhammed_ali_ashraf",
  instagramHref: "https://instagram.com/_muhammed_ali_ashraf",
} as const
