const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const logoPath = path.join(__dirname, 'src', 'imports', 'Logo3.png');
  const publicDir = path.join(__dirname, 'public');

  // 1. Get trimmed bounding box of logo
  const logoBuffer = await sharp(logoPath).trim().toBuffer();
  const logoMeta = await sharp(logoBuffer).metadata();

  console.log(`Trimmed logo dimensions: ${logoMeta.width}x${logoMeta.height}`);

  const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];

  for (const size of sizes) {
    // Add 15% padding so the logo fits inside Google's circular mask
    const padding = Math.round(size * 0.15);
    const targetSize = size - padding * 2;

    const resizedLogo = await sharp(logoBuffer)
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    const finalImage = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 10, g: 10, b: 10, alpha: 1 } // Solid #0A0A0A dark background
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

  console.log('Successfully generated dark-background favicons!');
}

generateFavicons().catch(console.error);
