import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const sourceImages = [
  { name: 'cap_01_product.png', path: 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/cap_product_cube_1788754775420.jpg' },
  { name: 'cap_02_ai.png', path: 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/cap_ai_sphere_1788754795664.jpg' },
  { name: 'cap_03_system.png', path: 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/cap_cloud_plates_1788754812437.jpg' },
  { name: 'cap_04_automation.png', path: 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/cap_automation_lenses_1788754956651.jpg' },
  { name: 'cap_05_reengineering.png', path: 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/cap_faceted_polyhedron_1788754974547.jpg' }
];

async function processImages() {
  const destDir = 'public/assets/images/capabilities';
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  for (const item of sourceImages) {
    const imgData = fs.readFileSync(item.path).toString('base64');
    const resultPng = await page.evaluate(async (imgBase64) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const data = imgData.data;

          // Corner sample for background color
          const r0 = data[0], g0 = data[1], b0 = data[2];

          // We want to turn background into transparent while preserving soft shadows
          // For pixels that are close to (r0, g0, b0), compute distance
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            // Delta from background
            const diff = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2);
            
            // If very close to background color, fade alpha
            if (diff < 8) {
              data[i + 3] = 0;
            } else if (diff < 32) {
              const alphaRatio = (diff - 8) / (32 - 8);
              data[i + 3] = Math.floor(data[i + 3] * alphaRatio);
            }
          }

          ctx.putImageData(imgData, 0, 0);

          // Now crop to bounding box of content with some padding
          // Find non-transparent bounds
          let minX = c.width, maxX = 0, minY = c.height, maxY = 0;
          for (let y = 0; y < c.height; y++) {
            for (let x = 0; x < c.width; x++) {
              const a = data[(y * c.width + x) * 4 + 3];
              if (a > 15) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }

          const pad = 30;
          minX = Math.max(0, minX - pad);
          minY = Math.max(0, minY - pad);
          maxX = Math.min(c.width - 1, maxX + pad);
          maxY = Math.min(c.height - 1, maxY + pad);

          const cropW = maxX - minX;
          const cropH = maxY - minY;

          const cropCanvas = document.createElement('canvas');
          // Make square
          const size = Math.max(cropW, cropH);
          cropCanvas.width = size;
          cropCanvas.height = size;
          const cropCtx = cropCanvas.getContext('2d');

          const offsetX = Math.floor((size - cropW) / 2);
          const offsetY = Math.floor((size - cropH) / 2);

          cropCtx.drawImage(c, minX, minY, cropW, cropH, offsetX, offsetY, cropW, cropH);

          resolve(cropCanvas.toDataURL('image/png'));
        };
        img.src = 'data:image/jpeg;base64,' + imgBase64;
      });
    }, imgData);

    const base64Data = resultPng.replace(/^data:image\/png;base64,/, '');
    const outPath = path.join(destDir, item.name);
    fs.writeFileSync(outPath, base64Data, 'base64');
    console.log(`Saved transparent cropped PNG: ${outPath}`);
  }

  await browser.close();
}

processImages().catch(console.error);
