import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function testFullMedian() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.src = "data:image/png;base64,${imgBase64}";
          img.onload = () => {
            const c = document.getElementById('c');
            const W = img.naturalWidth;
            const H = img.naturalHeight;
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);

            let src = ctx.getImageData(0, 0, W, H);
            let dst = ctx.createImageData(W, H);
            dst.data.set(src.data);

            function applyMedian(x0, y0, x1, y1, R) {
              const rVals = [];
              const gVals = [];
              const bVals = [];

              for (let y = y0; y <= y1; y++) {
                for (let x = x0; x <= x1; x++) {
                  rVals.length = 0;
                  gVals.length = 0;
                  bVals.length = 0;

                  for (let dy = -R; dy <= R; dy++) {
                    const py = Math.min(H - 1, Math.max(0, y + dy));
                    for (let dx = -R; dx <= R; dx++) {
                      const px = Math.min(W - 1, Math.max(0, x + dx));
                      const idx = (py * W + px) * 4;
                      rVals.push(src.data[idx]);
                      gVals.push(src.data[idx+1]);
                      bVals.push(src.data[idx+2]);
                    }
                  }

                  rVals.sort((a, b) => a - b);
                  gVals.sort((a, b) => a - b);
                  bVals.sort((a, b) => a - b);

                  const mid = Math.floor(rVals.length / 2);
                  const dstIdx = (y * W + x) * 4;
                  dst.data[dstIdx] = rVals[mid];
                  dst.data[dstIdx+1] = gVals[mid];
                  dst.data[dstIdx+2] = bVals[mid];
                  dst.data[dstIdx+3] = 255;
                }
              }
              // Sync dst back to src for sequential processing
              src.data.set(dst.data);
            }

            // 1. Top Header across entire sky (0 to W-1, y: 0..34)
            applyMedian(0, 0, W - 1, 34, 6);

            // 2. Pillar text: RETURN. REIMAGINE. REALIZE.
            applyMedian(275, 230, 355, 300, 5);

            // 3. Floor text: SAME PROBLEMS. HIGHER POSSIBILITIES.
            applyMedian(255, 415, 355, 455, 5);

            // 4. Scroll indicator bottom left
            applyMedian(5, 410, 55, 465, 5);

            // 5. CTA Button area (x: 10..180, y: 236..268)
            // Replace white button with interpolation between top and bottom
            for (let y = 236; y <= 268; y++) {
              const t = (y - 235) / (269 - 235);
              const st = t * t * (3 - 2 * t);
              for (let x = 10; x <= 180; x++) {
                const topIdx = (235 * W + x) * 4;
                const botIdx = (269 * W + x) * 4;
                const curIdx = (y * W + x) * 4;
                src.data[curIdx] = src.data[topIdx] * (1 - st) + src.data[botIdx] * st;
                src.data[curIdx+1] = src.data[topIdx+1] * (1 - st) + src.data[botIdx+1] * st;
                src.data[curIdx+2] = src.data[topIdx+2] * (1 - st) + src.data[botIdx+2] * st;
              }
            }
            dst.data.set(src.data);

            // 6. Eyebrow, Headline & Body (x: 8..172, y: 65..236)
            // Pass 1: R=8
            applyMedian(8, 65, 172, 236, 8);
            // Pass 2: R=6 to blend any subtle boundaries
            applyMedian(8, 65, 172, 236, 6);

            // 7. Median over CTA button region
            applyMedian(8, 236, 180, 270, 6);

            ctx.putImageData(dst, 0, 0);
            window.fullReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.fullReady === true', { timeout: 35000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_pristine_clean.png';
  await canvas.screenshot({ path: outPath });
  console.log(`Saved pristine clean plate to ${outPath}`);
  await browser.close();
}

testFullMedian().catch(console.error);
