export type CardVariant = "sun" | "moon" | "venus" | "saturn" | "soulra"

export function TarotCard({
  variant = "sun",
  className = "",
}: {
  variant?: CardVariant
  className?: string
}) {
  const cardId = `astro-card-${variant}`

  return (
    <svg
      viewBox="0 0 120 190"
      className={`drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* Dark celestial velvet card body */}
        <linearGradient id={`${cardId}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141126" />
          <stop offset="50%" stopColor="#0a0815" />
          <stop offset="100%" stopColor="#04030a" />
        </linearGradient>

        {/* Shimmering antique gold foil */}
        <linearGradient id={`${cardId}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5e1a4" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#aa8222" />
          <stop offset="100%" stopColor="#e8c76b" />
        </linearGradient>

        {/* Soft nebula glow inside card */}
        <radialGradient id={`${cardId}-nebula`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={variant === "sun" ? "rgba(224,170,62,0.25)" : variant === "venus" ? "rgba(168,85,247,0.25)" : variant === "saturn" ? "rgba(59,130,246,0.22)" : "rgba(200,180,240,0.2)"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Card Base */}
      <rect
        x="2"
        y="2"
        width="116"
        height="186"
        rx="12"
        fill={`url(#${cardId}-bg)`}
        stroke={`url(#${cardId}-gold)`}
        strokeWidth="1.6"
      />

      {/* Inner double border with ornate corners */}
      <rect
        x="7"
        y="7"
        width="106"
        height="176"
        rx="9"
        fill="none"
        stroke={`url(#${cardId}-gold)`}
        strokeWidth="0.75"
        strokeOpacity="0.5"
      />
      <rect
        x="12"
        y="12"
        width="96"
        height="166"
        rx="6"
        fill="none"
        stroke={`url(#${cardId}-gold)`}
        strokeWidth="0.4"
        strokeDasharray="2 4"
        strokeOpacity="0.6"
      />

      {/* Nebula radial glow */}
      <circle cx="60" cy="95" r="46" fill={`url(#${cardId}-nebula)`} />

      {/* Card Top Title */}
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="#e5d095"
        fontSize="8"
        fontFamily="Cinzel, serif"
        letterSpacing="2.5"
        fontWeight="500"
      >
        {variant === "sun" ? "SOLIS" : variant === "moon" ? "LUNA" : variant === "venus" ? "VENUS" : variant === "saturn" ? "SATURN" : "SOULRA"}
      </text>

      {/* Top and Bottom Astrological Star Accents */}
      <path d="M60 30 L61 33 L64 34 L61 35 L60 38 L59 35 L56 34 L59 33 Z" fill="#d4af37" opacity="0.8" />
      <path d="M60 162 L61 165 L64 166 L61 167 L60 170 L59 167 L56 166 L59 165 Z" fill="#d4af37" opacity="0.8" />

      {/* Variant Specific Celestial Center Artwork */}
      {variant === "sun" && (
        <g transform="translate(60, 95)">
          {/* Solar rays */}
          {Array.from({ length: 16 }).map((_, idx) => (
            <line
              key={idx}
              x1="0"
              y1="0"
              x2="0"
              y2={idx % 2 === 0 ? "34" : "26"}
              stroke="#d4af37"
              strokeWidth={idx % 2 === 0 ? "1.2" : "0.75"}
              strokeOpacity="0.7"
              transform={`rotate(${idx * 22.5})`}
            />
          ))}
          {/* Outer ray halo */}
          <circle cx="0" cy="0" r="18" fill="none" stroke="#f5e1a4" strokeWidth="0.8" strokeDasharray="1 3" />
          <circle cx="0" cy="0" r="13" fill="#d4af37" fillOpacity="0.25" stroke="#f5e1a4" strokeWidth="1.2" />
          {/* Central sun face */}
          <circle cx="0" cy="0" r="9" fill="#aa8222" />
          <circle cx="0" cy="0" r="6" fill="#f5e1a4" />
        </g>
      )}

      {variant === "moon" && (
        <g transform="translate(60, 95)">
          {/* Orbit circles */}
          <circle cx="0" cy="0" r="28" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.6" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#f5e1a4" strokeWidth="0.8" opacity="0.8" />
          {/* Luminous crescent */}
          <path
            d="M -2 -18 A 18 18 0 1 0 14 14 A 14 14 0 1 1 -2 -18 Z"
            fill="url(#astro-card-moon-gold)"
            opacity="0.95"
          />
          {/* Little orbit stars */}
          <circle cx="16" cy="-14" r="1.5" fill="#f5e1a4" />
          <circle cx="-18" cy="10" r="1.2" fill="#f5e1a4" />
          <circle cx="22" cy="6" r="1" fill="#f5e1a4" />
        </g>
      )}

      {variant === "venus" && (
        <g transform="translate(60, 95)">
          {/* Sacred geometry circles */}
          <circle cx="0" cy="-6" r="17" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.9" />
          <circle cx="0" cy="-6" r="24" fill="none" stroke="#f5e1a4" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          {/* Venus cross */}
          <line x1="0" y1="11" x2="0" y2="27" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="-8" y1="19" x2="8" y2="19" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" />
          {/* Internal Venus star */}
          <path d="M0 -14 L2 -8 L8 -6 L2 -4 L0 2 L-2 -4 L-8 -6 L-2 -8 Z" fill="#f5e1a4" />
        </g>
      )}

      {variant === "saturn" && (
        <g transform="translate(60, 95)">
          {/* Central planet sphere */}
          <circle cx="0" cy="0" r="14" fill="#aa8222" stroke="#f5e1a4" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="10" fill="#201a35" />
          {/* Planetary rings */}
          <ellipse cx="0" cy="0" rx="34" ry="11" fill="none" stroke="#d4af37" strokeWidth="1.6" transform="rotate(-24)" opacity="0.95" />
          <ellipse cx="0" cy="0" rx="38" ry="13" fill="none" stroke="#f5e1a4" strokeWidth="0.6" strokeDasharray="2 3" transform="rotate(-24)" opacity="0.6" />
          {/* Saturn celestial symbol ♄ */}
          <path
            d="M -3 -6 L -3 10 M -6 -2 L 1 -2 M -3 2 C 2 2 5 5 5 8 C 5 11 2 13 -2 13"
            fill="none"
            stroke="#f5e1a4"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      )}

      {variant === "soulra" && (
        <g transform="translate(60, 95)">
          {/* 8-pointed star of mystery */}
          <circle cx="0" cy="0" r="26" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
          <circle cx="0" cy="0" r="18" fill="none" stroke="#f5e1a4" strokeWidth="0.8" opacity="0.8" />
          <path
            d="M 0 -24 L 5 -7 L 22 -7 L 8 4 L 14 20 L 0 10 L -14 20 L -8 4 L -22 -7 L -5 -7 Z"
            fill="#d4af37"
            opacity="0.85"
          />
          <circle cx="0" cy="0" r="5" fill="#f5e1a4" />
        </g>
      )}

      {/* Constellation star specks */}
      <circle cx="28" cy="48" r="0.8" fill="#f5e1a4" opacity="0.7" />
      <circle cx="92" cy="52" r="1" fill="#f5e1a4" opacity="0.8" />
      <circle cx="22" cy="142" r="1" fill="#f5e1a4" opacity="0.8" />
      <circle cx="96" cy="138" r="0.8" fill="#f5e1a4" opacity="0.7" />

      {/* Bottom Subtitle */}
      <text
        x="60"
        y="178"
        textAnchor="middle"
        fill="#aa8222"
        fontSize="6"
        fontFamily="Cinzel, serif"
        letterSpacing="2"
        fontWeight="400"
      >
        ORACULUM
      </text>
    </svg>
  )
}
