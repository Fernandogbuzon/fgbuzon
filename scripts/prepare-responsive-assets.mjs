import { stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Use a local installation of sharp, or point SHARP_MODULE at an existing copy.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const assetsDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/assets');
const screenshots = [
  { name: 'adesa80-desktop', widths: [480, 768, 1080] },
  { name: 'adesa80-mobile', widths: [160, 260] },
];

const results = [];
for (const { name, widths } of screenshots) {
  const source = resolve(assetsDirectory, `${name}.webp`);
  const original = await sharp(source).metadata();
  const originalBytes = (await stat(source)).size;

  for (const width of widths) {
    if (width >= original.width) {
      throw new Error(`${name}: derivative width must be smaller than the original.`);
    }

    const filename = `${name}-${width}.webp`;
    const destination = resolve(assetsDirectory, filename);
    await sharp(source)
      .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ quality: 80, effort: 6, smartSubsample: true })
      .toFile(destination);

    const output = await sharp(destination).metadata();
    if (output.width !== width || output.format !== 'webp') {
      throw new Error(`${filename}: unexpected generated image dimensions or format.`);
    }

    const bytes = (await stat(destination)).size;
    results.push({
      filename,
      width: output.width,
      height: output.height,
      bytes,
      originalBytes,
      savingsPercent: Math.round((1 - bytes / originalBytes) * 100),
    });
  }
}

process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
