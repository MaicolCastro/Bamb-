/**
 * Procesa imágenes a 16:9 en alta resolución.
 * Uso: node scripts/image-to-16-9.mjs public/images/mi-foto.jpg
 * Salida: sobrescribe el archivo (backup .bak) o --out ruta
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, copyFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const TARGET_W = 2560;
const TARGET_H = 1440;
const TARGET_ASPECT = 16 / 9;
const VERTICAL_THRESHOLD = 0.65;

const input = process.argv[2];
const outArg = process.argv.indexOf("--out");
const output = outArg !== -1 ? process.argv[outArg + 1] : input;

if (!input || !existsSync(input)) {
  console.error("Uso: node scripts/image-to-16-9.mjs <ruta-imagen> [--out salida.jpg]");
  process.exit(1);
}

const image = sharp(input);
const meta = await image.metadata();
const w = meta.width ?? 0;
const h = meta.height ?? 0;
const aspect = w / h;

let pipeline;

if (aspect < VERTICAL_THRESHOLD) {
  const fg = await sharp(input)
    .resize({ height: TARGET_H, fit: "inside", withoutEnlargement: false })
    .toBuffer();

  const fgMeta = await sharp(fg).metadata();
  const blurBg = await sharp(input)
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: "entropy" })
    .blur(28)
    .modulate({ brightness: 0.85 })
    .toBuffer();

  const left = Math.round((TARGET_W - (fgMeta.width ?? TARGET_W)) / 2);
  const top = Math.round((TARGET_H - (fgMeta.height ?? TARGET_H)) / 2);

  pipeline = sharp(blurBg).composite([{ input: fg, left, top }]);
} else {
  pipeline = sharp(input).resize(TARGET_W, TARGET_H, {
    fit: "cover",
    position: "entropy",
  });
}

const buffer = await pipeline
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

if (output === input) {
  copyFileSync(input, `${input}.bak`);
}

writeFileSync(output, buffer);
console.log(`OK: ${output} (${TARGET_W}x${TARGET_H}, 16:9)`);
