// Verifica la integridad del contenido y de los assets antes de publicar:
//   1. Todo archivo local referenciado (imágenes, PDFs, ZIPs) existe en /public.
//   2. Ningún archivo está truncado (JPG/PNG/WebP/PDF/ZIP terminan como deben).
//   3. Toda imagen de /public/images está registrada en el manifiesto de dimensiones.
//   4. Todo enlace interno (/slug/) apunta a una página que existe.
// Uso: npm run check:content   (sale con código 1 si encuentra problemas)
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const contentDir = path.join(root, "src", "content");
const errors = [];
const fail = (msg) => errors.push(msg);

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

// ---- 1 & 4: referencias en el contenido y en el código ----
const sources = [
  ...walk(contentDir).filter((f) => /\.(json|ts)$/.test(f)),
  ...walk(path.join(root, "src", "app")).filter((f) => /\.(tsx|ts)$/.test(f)),
  ...walk(path.join(root, "src", "components")).filter((f) => /\.tsx$/.test(f)),
].filter((f) => !f.endsWith("image-manifest.json"));

const articleSlugs = new Set(
  fs.readdirSync(path.join(contentDir, "articles")).map((f) => f.replace(/\.json$/, "")),
);
const routes = new Set(["/"]);
for (const dir of fs.readdirSync(path.join(root, "src", "app"), { withFileTypes: true })) {
  if (dir.isDirectory() && !dir.name.startsWith("[") && fs.existsSync(path.join(root, "src", "app", dir.name, "page.tsx"))) {
    routes.add(`/${dir.name}/`);
  }
}
for (const slug of articleSlugs) routes.add(`/${slug}/`);

const fileRef = /["'(=]\s*(\/(?:images|documentos)\/[^"'\s)<>\\]+)/g;
const pageRef = /(?:href=\\?"|href: ")(\/[a-z0-9-]*\/?)(?:\\?"|")/g;
for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  for (const [, ref] of text.matchAll(fileRef)) {
    if (!fs.existsSync(path.join(pub, ref))) fail(`${rel}: falta el archivo ${ref}`);
  }
  for (const [, ref] of text.matchAll(pageRef)) {
    if (ref.startsWith("/images") || ref.startsWith("/documentos")) continue;
    const normalized = ref.endsWith("/") ? ref : `${ref}/`;
    if (!routes.has(normalized)) fail(`${rel}: enlace interno a una página inexistente ${ref}`);
  }
}

// ---- 2: archivos completos ----
const endsWith = (buf, bytes) => buf.length >= bytes.length && buf.subarray(buf.length - bytes.length).equals(Buffer.from(bytes));
for (const file of walk(pub)) {
  const rel = path.relative(pub, file);
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(file);
  if (buf.length === 0) fail(`public/${rel}: archivo vacío`);
  else if ([".jpg", ".jpeg"].includes(ext) && !(buf[0] === 0xff && buf[1] === 0xd8 && endsWith(buf, [0xff, 0xd9]))) fail(`public/${rel}: JPEG truncado o corrupto`);
  else if (ext === ".webp" && !(buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP" && buf.readUInt32LE(4) + 8 === buf.length)) fail(`public/${rel}: WebP truncado o corrupto`);
  else if (ext === ".png" && !buf.subarray(-12).toString("latin1").includes("IEND")) fail(`public/${rel}: PNG truncado`);
  else if (ext === ".pdf" && !buf.subarray(-1024).toString("latin1").includes("%%EOF")) fail(`public/${rel}: PDF truncado (sin %%EOF)`);
  else if (ext === ".zip" && !buf.subarray(-70000).includes(Buffer.from([0x50, 0x4b, 0x05, 0x06]))) fail(`public/${rel}: ZIP truncado (sin directorio central)`);
}

// ---- 3: manifiesto de dimensiones ----
const manifest = JSON.parse(fs.readFileSync(path.join(contentDir, "image-manifest.json"), "utf8"));
for (const file of walk(path.join(pub, "images"))) {
  const key = `/images/${path.relative(path.join(pub, "images"), file)}`;
  if (!manifest[key]) fail(`${key}: no está en src/content/image-manifest.json`);
}
for (const key of Object.keys(manifest)) {
  if (!fs.existsSync(path.join(pub, key))) fail(`image-manifest.json: ${key} no existe en public/`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s) de contenido:\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Contenido OK: ${sources.length} fuentes, ${walk(pub).length} archivos en public/, ${routes.size} rutas.`);
