/**
 * Regenerate the 1200 × 630 social image from the repository's Geist font.
 * Build-only dependencies: sharp 0.35.4; Python fonttools 4.61.1 and brotli 1.2.0.
 * Set SHARP_MODULE to an installed sharp package directory if not in node_modules.
 * Set PYTHON to the Python executable and PYTHONPATH for isolated Python packages.
 * Run: node scripts/prepare-social-image.mjs
 * Neither Python nor Sharp is needed to serve or deploy the static site.
 */
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const root = new URL('../', import.meta.url);
const svgPath = new URL('assets/reference/og-fgbuzon.svg', root);
const pngPath = new URL('dist/assets/og-fgbuzon.png', root);
const svg = execFileSync(
  process.env.PYTHON || 'python',
  [fileURLToPath(new URL('prepare-social-image.py', import.meta.url))],
  { maxBuffer: 4 * 1024 * 1024 },
);

await mkdir(new URL('assets/reference/', root), { recursive: true });
await writeFile(svgPath, svg);
await sharp(svg, { density: 72 })
  .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
  .toFile(fileURLToPath(pngPath));

const metadata = await sharp(fileURLToPath(pngPath)).metadata();
if (metadata.width !== 1200 || metadata.height !== 630 || metadata.format !== 'png') {
  throw new Error('Invalid social image: expected a 1200 × 630 PNG.');
}
console.log(`Created ${fileURLToPath(pngPath)} (1200 × 630, ${(await stat(pngPath)).size} bytes)`);
