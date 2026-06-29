import fs from 'fs';
import sharp from 'sharp';

async function cropKit() {
  const inputPath = 'src/imports_backup/Kit_clean.png';
  const outputPath = 'src/imports/Kit_clean.webp';
  
  console.log(`Analyzing original image: ${inputPath}`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  console.log(`Dimensions: ${width}x${height}`);
  
  // Get raw pixel buffer
  const rawBuffer = await image.raw().toBuffer();
  const channels = metadata.channels; // usually 3 for RGB
  
  // Scan from bottom to top in the middle column range (e.g., width*0.4 to width*0.6)
  // to find where the black pants (dark pixels) end and the shadow/white space begins.
  let pantsBottomY = height - 1;
  const scanWidthStart = Math.floor(width * 0.45);
  const scanWidthEnd = Math.floor(width * 0.55);
  
  // A pixel is considered "pants" if it is dark (e.g. RGB < 45)
  // We scan upwards
  let foundPants = false;
  for (let y = height - 1; y >= 0; y--) {
    let darkPixelsInRow = 0;
    for (let x = scanWidthStart; x < scanWidthEnd; x++) {
      const idx = (y * width + x) * channels;
      const r = rawBuffer[idx];
      const g = rawBuffer[idx + 1];
      const b = rawBuffer[idx + 2];
      
      // Black pants are very dark
      if (r < 45 && g < 45 && b < 45) {
        darkPixelsInRow++;
      }
    }
    
    // If we find a row in the middle with significant dark pixels, that's the bottom of the pants
    if (darkPixelsInRow > 5) {
      pantsBottomY = y;
      foundPants = true;
      break;
    }
  }
  
  if (foundPants) {
    console.log(`Pants bottom detected at Y: ${pantsBottomY} (out of ${height})`);
    
    // Crop the image to pantsBottomY (leaving a tiny safety margin of 2px)
    const cropHeight = Math.min(pantsBottomY + 2, height);
    
    // Crop and convert to webp (width limit 800px)
    await sharp(inputPath)
      .extract({ left: 0, top: 0, width: width, height: cropHeight })
      .resize({ width: 800 })
      .webp({ quality: 82 })
      .toFile(outputPath);
      
    console.log(`Successfully cropped and saved to ${outputPath}. New dimensions: 800 x ${Math.round(800 * cropHeight / width)}`);
  } else {
    console.log('Could not automatically detect pants bottom. Using fallback crop.');
    // Fallback: Crop bottom 20%
    const cropHeight = Math.round(height * 0.81);
    await sharp(inputPath)
      .extract({ left: 0, top: 0, width: width, height: cropHeight })
      .resize({ width: 800 })
      .webp({ quality: 82 })
      .toFile(outputPath);
    console.log(`Cropped using fallback height ${cropHeight} and saved.`);
  }
}

cropKit().catch(console.error);
