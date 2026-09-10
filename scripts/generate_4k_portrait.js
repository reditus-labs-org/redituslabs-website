import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generate4KPortrait() {
  console.log('Generating 4K Portrait Master plate...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const W = 2160;
  const H = 2916; // 3:4 portrait 4K
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const heroBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; overflow:hidden;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.src = "data:image/png;base64,${heroBase64}";
          img.onload = () => {
            const W = 2160;
            const H = 2916;
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.drawImage(img, 0, 0, W, H);

            // 4K Luminance Unsharp Mask & High-Frequency Boost
            const fullImg = ctx.getImageData(0, 0, W, H);
            const fd = fullImg.data;
            const sharpImg = ctx.createImageData(W, H);
            const sd = sharpImg.data;

            const sharpenStrength = 1.85; // Crisp 4K edge definition

            for (let y = 1; y < H - 1; y++) {
              for (let x = 1; x < W - 1; x++) {
                const idx = (y * W + x) * 4;

                const cr = fd[idx], cg = fd[idx+1], cb = fd[idx+2];
                const cLum = 0.299 * cr + 0.587 * cg + 0.114 * cb;

                const topIdx = ((y-1)*W + x)*4;
                const btmIdx = ((y+1)*W + x)*4;
                const lftIdx = (y*W + (x-1))*4;
                const rgtIdx = (y*W + (x+1))*4;

                const tLum = 0.299 * fd[topIdx] + 0.587 * fd[topIdx+1] + 0.114 * fd[topIdx+2];
                const bLum = 0.299 * fd[btmIdx] + 0.587 * fd[btmIdx+1] + 0.114 * fd[btmIdx+2];
                const lLum = 0.299 * fd[lftIdx] + 0.587 * fd[lftIdx+1] + 0.114 * fd[lftIdx+2];
                const rLum = 0.299 * fd[rgtIdx] + 0.587 * fd[rgtIdx+1] + 0.114 * fd[rgtIdx+2];

                const laplacian = 4 * cLum - tLum - bLum - lLum - rLum;

                const sharpLum = cLum + sharpenStrength * laplacian;
                const lumRatio = cLum > 2 ? (sharpLum / cLum) : 1;
                const clampedRatio = Math.max(0.65, Math.min(1.45, lumRatio));

                let nr = cr * clampedRatio;
                let ng = cg * clampedRatio;
                let nb = cb * clampedRatio;

                // Subtle S-curve contrast enhancement
                nr = ((nr / 255 - 0.5) * 1.05 + 0.5) * 255;
                ng = ((ng / 255 - 0.5) * 1.05 + 0.5) * 255;
                nb = ((nb / 255 - 0.5) * 1.05 + 0.5) * 255;

                sd[idx]   = Math.max(0, Math.min(255, nr));
                sd[idx+1] = Math.max(0, Math.min(255, ng));
                sd[idx+2] = Math.max(0, Math.min(255, nb));
                sd[idx+3] = 255;
              }
            }

            // Copy border rows/cols
            for (let x = 0; x < W; x++) {
              const top = x * 4;
              const btm = ((H - 1) * W + x) * 4;
              for (let i = 0; i < 4; i++) {
                sd[top + i] = fd[top + i];
                sd[btm + i] = fd[btm + i];
              }
            }
            for (let y = 0; y < H; y++) {
              const left = (y * W) * 4;
              const right = (y * W + (W - 1)) * 4;
              for (let i = 0; i < 4; i++) {
                sd[left + i] = fd[left + i];
                sd[right + i] = fd[right + i];
              }
            }

            // 4K Cinema sensor grain
            for (let i = 0; i < sd.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.6;
              sd[i]   = Math.max(0, Math.min(255, sd[i]   + noise));
              sd[i+1] = Math.max(0, Math.min(255, sd[i+1] + noise));
              sd[i+2] = Math.max(0, Math.min(255, sd[i+2] + noise));
            }

            ctx.putImageData(sharpImg, 0, 0);
            window.renderComplete = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.renderComplete === true', { timeout: 90000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_reference_visual.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved 2160x2916 4K portrait master plate to ${outPath}`);
  await browser.close();
}

generate4KPortrait().catch(console.error);
