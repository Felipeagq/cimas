// Regenera src/content/image-manifest.json con el ancho/alto de cada imagen de public/images.
// Next.js necesita las dimensiones para reservar espacio y evitar saltos de layout.
// Lee los encabezados de JPG, PNG y WebP (sin dependencias). Uso: npm run images:manifest
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public", "images");
const outFile = path.join(root, "src", "content", "image-manifest.json");

function jpegSize(buf) {
  let o = 2;
  while (o < buf.length - 9) {
    if (buf[o] !== 0xff) { o++; continue; }
    const marker = buf[o + 1];
    if (marker === 0xff) { o++; continue; }
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: buf.readUInt16BE(o + 7), height: buf.readUInt16BE(o + 5) };
    }
    o += 2 + buf.readUInt16BE(o + 2);
  }
  throw new Error("no se encontró el marcador SOF");
}

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function webpSize(buf) {
  const chunk = buf.subarray(12, 16).toString("latin1");
  if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  throw new Error(`chunk WebP desconocido: ${chunk}`);
}

const readers = { ".jpg": jpegSize, ".jpeg": jpegSize, ".png": pngSize, ".webp": webpSize };
const manifest = {};
for (const name of fs.readdirSync(imagesDir).sort()) {
  const reader = readers[path.extname(name).toLowerCase()];
  if (!reader) continue;
  try {
    manifest[`/images/${name}`] = reader(fs.readFileSync(path.join(imagesDir, name)));
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    process.exitCode = 1;
  }
}

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 1) + "\n");
console.log(`✓ ${Object.keys(manifest).length} imágenes registradas en ${path.relative(root, outFile)}`);
