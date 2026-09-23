import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateCleanHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const imagePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/9cdf68de-58c4-46d6-ae67-527c884471b8/.user_uploaded/media_1788710424971.png';
  const imgBase64 = fs.readFileSync(imagePath).toString('base64');
  const dataUri = `data:image/png;base64,${imgBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>body { margin: 0; background: #000; overflow: hidden; }</style>
    </head>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.src = "${dataUri}";
        img.onload = () => {
          const c = document.getElementById('c');
          const w = img.naturalWidth;
          const h = img.naturalHeight;
          
          // Upscale 3x for crisp rendering
          const scale = 3;
          c.width = w * scale;
          c.height = h * scale;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, c.width, c.height);

          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const data = imgData.data;

          // Define regions where UI text and buttons exist
          // [x1, y1, x2, y2] in original coordinates (0..361, 0..487)
          const textZones = [
            // Top navigation: REDITUS, Home, What We Build, Approach, Industries, Let's Build ->
            { x1: 5, y1: 5, x2: 355, y2: 38, maxBgLum: 50 },
            // Eyebrow & Main Headline & Subtitle
            { x1: 10, y1: 65, x2: 180, y2: 222, maxBgLum: 70 },
            // White CTA button + Play button
            { x1: 10, y1: 222, x2: 185, y2: 255, isButtonZone: true },
            // Right Pillar Text: RETURN. REIMAGINE. REALIZE.
            { x1: 285, y1: 225, x2: 350, y2: 295, maxBgLum: 45 },
            // Bottom Right: SAME PROBLEMS. HIGHER POSSIBILITIES.
            { x1: 260, y1: 415, x2: 355, y2: 445, maxBgLum: 50 },
            // Bottom Left: 01 SCROLL and vertical tick line
            { x1: 10, y1: 405, x2: 60, y2: 465, maxBgLum: 40 }
          ];

          // 1. Inpaint the white CTA button rectangle smoothly
          const btnX1 = Math.round(13 * scale);
          const btnY1 = Math.round(224 * scale);
          const btnX2 = Math.round(100 * scale);
          const btnY2 = Math.round(248 * scale);
          const btnW = btnX2 - btnX1;
          const btnH = btnY2 - btnY1;

          for (let y = btnY1; y <= btnY2; y++) {
            for (let x = btnX1; x <= btnX2; x++) {
              const u = (x - btnX1) / btnW;
              const v = (y - btnY1) / btnH;

              // Sample background from above and below the button
              const topY = btnY1 - Math.round(5 * scale);
              const botY = btnY2 + Math.round(6 * scale);

              const topIdx = (topY * c.width + x) * 4;
              const botIdx = (botY * c.width + x) * 4;

              const r = (1 - v) * data[topIdx] + v * data[botIdx];
              const g = (1 - v) * data[topIdx + 1] + v * data[botIdx + 1];
              const b = (1 - v) * data[topIdx + 2] + v * data[botIdx + 2];

              const idx = (y * c.width + x) * 4;
              const noise = (Math.random() - 0.5) * 4;
              data[idx] = Math.max(0, Math.min(255, r + noise));
              data[idx + 1] = Math.max(0, Math.min(255, g + noise));
              data[idx + 2] = Math.max(0, Math.min(255, b + noise));
            }
          }

          // 2. Pixel-level inpainter for text strokes
          // For every pixel inside textZones:
          // Estimate local background luminance in a 9-pixel radius.
          // If the pixel is significantly brighter than the local dark background,
          // replace it with the average of dark surrounding pixels!
          for (const zone of textZones) {
            const zX1 = Math.round(zone.x1 * scale);
            const zY1 = Math.round(zone.y1 * scale);
            const zX2 = Math.round(zone.x2 * scale);
            const zY2 = Math.round(zone.y2 * scale);

            for (let y = zY1; y <= zY2; y++) {
              for (let x = zX1; x <= zX2; x++) {
                // If it's already the inpainted button rectangle, skip
                if (x >= btnX1 && x <= btnX2 && y >= btnY1 && y <= btnY2) continue;

                const idx = (y * c.width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                const lum = r * 0.299 + g * 0.587 + b * 0.114;

                // Sample 8 neighbors at radius 6 to find dark background level
                const rad = Math.round(5 * scale / 3);
                let darkSumR = 0, darkSumG = 0, darkSumB = 0, darkCount = 0;
                let minLum = 255;

                for (let dy = -rad; dy <= rad; dy += rad) {
                  for (let dx = -rad; dx <= rad; dx += rad) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = Math.max(0, Math.min(c.width - 1, x + dx));
                    const ny = Math.max(0, Math.min(c.height - 1, y + dy));
                    const nIdx = (ny * c.width + nx) * 4;
                    const nLum = data[nIdx] * 0.299 + data[nIdx + 1] * 0.587 + data[nIdx + 2] * 0.114;
                    if (nLum < minLum) minLum = nLum;
                  }
                }

                // If pixel is significantly brighter than local minimum luminance (i.e. it's part of a letter)
                if (lum > minLum + 12 && lum > 35) {
                  // Collect truly dark local neighbors
                  for (let dy = -rad * 2; dy <= rad * 2; dy += 2) {
                    for (let dx = -rad * 2; dx <= rad * 2; dx += 2) {
                      const nx = Math.max(0, Math.min(c.width - 1, x + dx));
                      const ny = Math.max(0, Math.min(c.height - 1, y + dy));
                      const nIdx = (ny * c.width + nx) * 4;
                      const nLum = data[nIdx] * 0.299 + data[nIdx + 1] * 0.587 + data[nIdx + 2] * 0.114;
                      if (nLum <= minLum + 8) {
                        darkSumR += data[nIdx];
                        darkSumG += data[nIdx + 1];
                        darkSumB += data[nIdx + 2];
                        darkCount++;
                      }
                    }
                  }

                  if (darkCount > 0) {
                    const noise = (Math.random() - 0.5) * 3;
                    data[idx] = Math.max(0, Math.min(255, (darkSumR / darkCount) + noise));
                    data[idx + 1] = Math.max(0, Math.min(255, (darkSumG / darkCount) + noise));
                    data[idx + 2] = Math.max(0, Math.min(255, (darkSumB / darkCount) + noise));
                  }
                }
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
          window.inpaintDone = true;
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.inpaintDone === true', { timeout: 30000 });

  const canvasElement = await page.$('#c');
  const outPath = 'public/assets/images/hero_faithful_clean.jpg';
  await canvasElement.screenshot({ path: outPath, type: 'jpeg', quality: 96 });
  console.log(`Saved pixel-perfect clean hero background to ${outPath}`);

  await browser.close();
}

generateCleanHero().catch(console.error);
