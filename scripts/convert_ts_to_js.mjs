import fs from "node:fs";
import path from "node:path";
import { transform } from "esbuild";

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

async function convertFile(filePath) {
  const ext = path.extname(filePath);
  if (ext !== ".ts" && ext !== ".tsx") return null;

  // Vite TS env stub isn’t needed for JS projects
  if (filePath.endsWith(`${path.sep}vite-env.d.ts`)) {
    fs.unlinkSync(filePath);
    return { from: filePath, to: null };
  }

  const loader = ext === ".tsx" ? "tsx" : "ts";
  const outExt = ext === ".tsx" ? ".jsx" : ".js";
  const outPath = filePath.slice(0, -ext.length) + outExt;

  const code = fs.readFileSync(filePath, "utf8");
  const result = await transform(code, {
    loader,
    format: "esm",
    target: "es2020",
    jsx: "preserve",
    sourcemap: false,
  });

  fs.writeFileSync(outPath, result.code, "utf8");
  fs.unlinkSync(filePath);

  return { from: filePath, to: outPath };
}

if (!fs.existsSync(srcDir)) {
  console.error("No src/ directory found.");
  process.exit(1);
}

const files = walk(srcDir);
const converted = [];
for (const f of files) {
  // eslint-disable-next-line no-await-in-loop
  const res = await convertFile(f);
  if (res) converted.push(res);
}

console.log(`Converted ${converted.length} TypeScript files.`);
