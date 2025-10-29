import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

const INPUT_FILE = path.join(__dirname, '../src/app/favicon.png');
const OUTPUT_DIR = path.join(__dirname, '../src/app');

interface IconConfig {
  name: string;
  size: number;
}

const ICON_SIZES: IconConfig[] = [
  { name: 'icon.png', size: 32 },
  { name: 'apple-icon.png', size: 180 },
];

async function generateFavicons(): Promise<void> {
  console.log('[*] Generating favicons from:', INPUT_FILE);

  if (!fs.existsSync(INPUT_FILE)) {
    console.error('[!] Error: Input file not found at', INPUT_FILE);
    process.exit(1);
  }

  try {
    for (const { name, size } of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, name);
      await sharp(INPUT_FILE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`[+] Generated: ${name} (${size}x${size})`);
    }

    const faviconIcoPath = path.join(OUTPUT_DIR, 'favicon.ico');
    const tempPng = await sharp(INPUT_FILE)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    fs.writeFileSync(faviconIcoPath, tempPng);
    console.log(`[+] Generated: favicon.ico (32x32)`);

    console.log('\n[✓] All favicons generated successfully!');
    console.log('[>] Output directory:', OUTPUT_DIR);
  } catch (error) {
    console.error('[!] Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
