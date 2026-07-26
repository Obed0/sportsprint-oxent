const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const logoPath = path.join(__dirname, 'src', 'imports', 'Logo3.png');
  const publicDir = path.join(__dirname, 'public');

  // 1. Crop runner symbol (left side of Logo3.png: 0 to 560px)
  const runnerBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 14, width: 560, height: 1107 })
    .toBuffer();

  // 2. Full logo trimmed
  const fullLogoBuffer = await sharp(logoPath).trim().toBuffer();

  const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];

  for (const size of sizes) {
    // For favicons (16, 32, 48, 64, 128, 180, 192, 256, 512), use the iconic Black Runner symbol centered on white background
    const padding = Math.round(size * 0.14);
    const targetSize = size - padding * 2;

    // Use runner symbol for max legibility in small favicons, full logo for larger 512px
    const sourceBuffer = size >= 512 ? fullLogoBuffer : runnerBuffer;

    const resizedLogo = await sharp(sourceBuffer)
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toBuffer();

    const finalImage = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid clean #FFFFFF background
      }
    })
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .png()
    .toBuffer();

    if (size === 180) {
      await fs.promises.writeFile(path.join(publicDir, 'apple-touch-icon.png'), finalImage);
    }
    await fs.promises.writeFile(path.join(publicDir, `favicon-${size}x${size}.png`), finalImage);
    if (size === 512) {
      await fs.promises.writeFile(path.join(publicDir, 'favicon.png'), finalImage);
    }
  }

  // Also update SVG favicon with black runner / SP icon on white background
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#FFFFFF"/>
  <path d="M12 6 C13 6 14 7 14 8 C14 9 13 10 12 10 C11 10 10 9 10 8 C10 7 11 6 12 6 Z M18 10 L15 14 L12 12 L8 16 L10 18 L13 14 L15 17 L12 26 L15 26 L18 18 L22 22 L24 20 L19 15 L21 11 Z" fill="#000000"/>
</svg>`;
  await fs.promises.writeFile(path.join(publicDir, 'favicon.svg'), svgContent);

  console.log('Successfully generated black-on-white favicons!');
}

generateFavicons().catch(console.error);
