import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logoPath = path.join(root, "public", "logo.png");
const outPath = path.join(root, "public", "og-image.png");

const logoBuf = await sharp(logoPath)
  .resize(720, 420, {
    fit: "inside",
    background: { r: 243, g: 237, b: 228, alpha: 1 },
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 243, g: 237, b: 228 },
  },
})
  .composite([{ input: logoBuf, gravity: "center" }])
  .png()
  .toFile(outPath);

console.log("Generated", outPath);
