import sharp from "sharp"
import path from "node:path"

const SRC = path.resolve("public/images/portrait-studio.png")
const OUT = path.resolve("public/images/hero-subject.png")

const img = sharp(SRC)
const { width, height } = await img.metadata()
const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const n = width * height

// A pixel is a "background candidate" if it is bright and near-neutral (grey/white):
// this matches both the studio backdrop and the light-grey cube, but NOT the
// colour-saturated skin. We stay generous here and rely on connectivity below.
const candidate = new Uint8Array(n)
for (let p = 0; p < n; p++) {
  const i = p * 4
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const sat = Math.max(r, g, b) - Math.min(r, g, b)
  const bright = (r + g + b) / 3
  candidate[p] = sat <= 42 && bright >= 150 ? 1 : 0
}

// Flood fill from the borders through candidate pixels. Only background that is
// actually connected to the edge is removed, so bright skin highlights that sit
// INSIDE the subject silhouette are always preserved.
const bg = new Uint8Array(n)
const stack = []
const pushIf = (p) => {
  if (p >= 0 && p < n && candidate[p] && !bg[p]) {
    bg[p] = 1
    stack.push(p)
  }
}
for (let x = 0; x < width; x++) {
  pushIf(x)
  pushIf((height - 1) * width + x)
}
for (let y = 0; y < height; y++) {
  pushIf(y * width)
  pushIf(y * width + width - 1)
}
while (stack.length) {
  const p = stack.pop()
  const x = p % width
  if (x > 0) pushIf(p - 1)
  if (x < width - 1) pushIf(p + 1)
  pushIf(p - width)
  pushIf(p + width)
}

// Base alpha: 0 where background, 255 where subject.
const alpha = new Float32Array(n)
for (let p = 0; p < n; p++) alpha[p] = bg[p] ? 0 : 255

// Feather the mask edge with a small separable box blur so the silhouette
// composites softly against the dark scene (no hard white fringe).
const R = 2
const tmp = new Float32Array(n)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let sum = 0
    let cnt = 0
    for (let k = -R; k <= R; k++) {
      const xx = x + k
      if (xx >= 0 && xx < width) {
        sum += alpha[y * width + xx]
        cnt++
      }
    }
    tmp[y * width + x] = sum / cnt
  }
}
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    let sum = 0
    let cnt = 0
    for (let k = -R; k <= R; k++) {
      const yy = y + k
      if (yy >= 0 && yy < height) {
        sum += tmp[yy * width + x]
        cnt++
      }
    }
    data[(y * width + x) * 4 + 3] = Math.round(sum / cnt)
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(OUT)

console.log(`[v0] cutout written: ${OUT} (${width}x${height})`)
