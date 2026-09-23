import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function testMedianFilter() {
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

            const src = ctx.getImageData(0, 0, W, H);
            const dst = ctx.createImageData(W, H);
            dst.data.set(src.data);

            // Apply 2D median filter with radius R on bounding boxes
            function applyMedian(x0, y0, x1, y1, R) {
              const rVals = [];
              const gVals = [];
              const bVals = [];
              const winSize = (2 * R + 1) * (2 * R + 1);

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
            }

            // 1. Top Header: y: 0..30
            applyMedian(0, 0, 195, 32, 4);
            applyMedian(265, 0, W - 1, 32, 4);

            // 2. Pillar text: RETURN. REIMAGINE. REALIZE.
            applyMedian(275, 230, 355, 300, 5);

            // 3. Floor text: SAME PROBLEMS. HIGHER POSSIBILITIES.
            applyMedian(255, 415, 355, 455, 4);

            // 4. Scroll indicator bottom left
            applyMedian(5, 410, 55, 465, 4);

            ctx.putImageData(dst, 0, 0);
            window.testReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.testReady === true', { timeout: 20000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_median_test.png';
  await canvas.screenshot({ path: outPath });
  console.log(`Saved median test to ${outPath}`);
  await browser.close();
}

testMedianFilter().catch(console.error);
