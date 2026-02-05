const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  'public/images/team',
  'public/images/cases',
  'public/images/office',
  'public/images/testimonials',
  'public/images/hero',
];

const SIZES = {
  thumbnail: 400,
  medium: 800,
  large: 1200,
  hero: 1920,
};

async function optimizeImages() {
  console.log('🖼️  Optimizing legal website images...\n');

  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Skipping ${dir} (not found)`);
      continue;
    }

    const files = fs.readdirSync(dir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of files) {
      const inputPath = path.join(dir, file);
      const filename = path.parse(file).name;
      const ext = 'webp';

      for (const [sizeName, width] of Object.entries(SIZES)) {
        const outputPath = path.join(dir, `${filename}-${sizeName}.${ext}`);
        
        try {
          await sharp(inputPath)
            .resize(width, null, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 90 })
            .toFile(outputPath);

          console.log(`✅ Created: ${outputPath}`);
        } catch (error) {
          console.error(`❌ Error processing ${inputPath}:`, error.message);
        }
      }
    }
  }
}

optimizeImages().then(() => {
  console.log('\n🎉 Image optimization complete!');
  console.log('💡 Remember to update image src attributes to use WebP format');
}).catch(error => {
  console.error('Error during optimization:', error);
  process.exit(1);
});
