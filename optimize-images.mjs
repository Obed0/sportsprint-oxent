import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = './src/imports';
const backupDir = './src/imports_backup';

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function processDirectory(dir, backupSubdir) {
  const files = fs.readdirSync(dir);
  
  if (!fs.existsSync(backupSubdir)) {
    fs.mkdirSync(backupSubdir, { recursive: true });
  }

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath, path.join(backupSubdir, file));
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const baseName = path.basename(file, ext);
      const outputFileName = `${baseName}.webp`;
      const outputPath = path.join(dir, outputFileName);
      
      console.log(`Processing: ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      
      // Determine resize width depending on the usage
      let resizeWidth = 1200; // Default gallery width
      if (file.includes('h21rm5h21rm5h21r') || file.includes('ir2xj0') || file.includes('yf9pyryf9pyryf9p')) {
        resizeWidth = 1920; // High quality hero / large photos
      } else if (file.includes('Playera_clean') || file.includes('Morral_clean') || file.includes('Medalla_clean') || file.includes('Kit_clean') || file.includes('logo_')) {
        resizeWidth = 800; // Product / logo images
      }
      
      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        let pipeline = image;
        if (metadata.width && metadata.width > resizeWidth) {
          pipeline = pipeline.resize({ width: resizeWidth, withoutEnlargement: true });
        }
        
        // Convert to WebP with 82% quality (excellent quality-to-size balance)
        await pipeline
          .webp({ quality: 82 })
          .toFile(outputPath);
          
        const outStat = fs.statSync(outputPath);
        console.log(`  -> Converted to WebP: ${outputFileName} (${(outStat.size / 1024).toFixed(2)} KB) - Reduced by ${((1 - outStat.size / stat.size) * 100).toFixed(1)}%`);
        
        // Move original to backup directory
        const backupFilePath = path.join(backupSubdir, file);
        fs.renameSync(filePath, backupFilePath);
        console.log(`  -> Moved original to backup: ${backupFilePath}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  await processDirectory(srcDir, backupDir);
  console.log('Image optimization finished successfully!');
}

run();
