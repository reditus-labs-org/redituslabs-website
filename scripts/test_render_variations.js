import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generateVariations() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const heroBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.src = "data:image/png;base64,${heroBase64}";
          img.onload = () => {
            const W = 2560;
            const H = 1440;
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const natW = img.naturalWidth;   // 1444
            const natH = img.naturalHeight;  // 1948
            const heroH = H;
            const heroW = Math.round(heroH * (natW / natH)); // 1067
            const heroX = W - heroW; // 1493

            // Step 1: Base atmospheric sky
            const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
            bgGrad.addColorStop(0, '#071219');
            bgGrad.addColorStop(0.35, '#0a1721');
            bgGrad.addColorStop(0.60, '#11222e');
            bgGrad.addColorStop(0.72, '#1e3240'); // dawn mist horizon
            bgGrad.addColorStop(0.79, '#15212b'); // mountain base
            bgGrad.addColorStop(0.83, '#0b1117'); // terrace edge
            bgGrad.addColorStop(1.0, '#05080b'); // floor bottom
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Left slice of mountain/sky (without the portal)
            // In original image: x: 0 to 650 (approx 45% of width)
            const leftW = Math.round(natW * 0.45); // 650px

            // We need to cover from x = 0 to x = 1950 seamlessly.
            // Let's create:
            // Layer 1: Leftmost mountain slice [0..950]
            // Layer 2: Mid mountain slice [700..1950]
            // Layer 3: Hero image [1493..2560]

            const canMid = document.createElement('canvas');
            canMid.width = W;
            canMid.height = H;
            const ctxMid = canMid.getContext('2d');
            ctxMid.fillStyle = bgGrad;
            ctxMid.fillRect(0, 0, W, H);

            // Draw mountain/sky mirrored and unmirrored to create natural wide range
            // First slice on far left: mirrored left slice
            ctxMid.save();
            ctxMid.translate(1100, 0);
            ctxMid.scale(-1, 1);
            ctxMid.drawImage(img, 0, 0, leftW, natH, 0, 0, 1100, H);
            ctxMid.restore();

            // Second slice: normal left slice spanning from 600 to 1950
            const canSlice2 = document.createElement('canvas');
            canSlice2.width = W;
            canSlice2.height = H;
            const ctxSlice2 = canSlice2.getContext('2d');
            ctxSlice2.drawImage(img, 0, 0, leftW, natH, 600, 0, 1350, H);

            // Hero image on right: drawn at (heroX, 0)
            const canHero = document.createElement('canvas');
            canHero.width = W;
            canHero.height = H;
            const ctxHero = canHero.getContext('2d');
            ctxHero.drawImage(img, heroX, 0, heroW, heroH);

            // Let's get image data
            const dMid1 = ctxMid.getImageData(0, 0, W, H).data;
            const dMid2 = ctxSlice2.getImageData(0, 0, W, H).data;
            const dHero = ctxHero.getImageData(0, 0, W, H).data;

            const finalImg = ctx.createImageData(W, H);
            const df = finalImg.data;

            // Blend Seam 1: between Mid1 and Mid2 (x: 650 to 1050)
            const b1Start = 650;
            const b1End = 1050;
            const b1Len = b1End - b1Start;

            // Blend Seam 2: between Mid2 and Hero (x: 1510 to 1880)
            // Hero starts at 1493, so at 1510 Hero already has valid data!
            // Mid2 ends at 1950, so at 1880 Mid2 still has valid data!
            const b2Start = 1510;
            const b2End = 1880;
            const b2Len = b2End - b2Start;

            // Terrace level is around y = 1140 to 1150 in 1440p
            // Let's inspect floor blending
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                // 1. Blend Mid1 and Mid2
                let r12, g12, b12;
                if (x <= b1Start) {
                  r12 = dMid1[idx];
                  g12 = dMid1[idx+1];
                  b12 = dMid1[idx+2];
                } else if (x >= b1End) {
                  r12 = dMid2[idx];
                  g12 = dMid2[idx+1];
                  b12 = dMid2[idx+2];
                } else {
                  const t = (x - b1Start) / b1Len;
                  const st = t * t * (3 - 2 * t);
                  r12 = dMid1[idx] * (1 - st) + dMid2[idx] * st;
                  g12 = dMid1[idx+1] * (1 - st) + dMid2[idx+1] * st;
                  b12 = dMid1[idx+2] * (1 - st) + dMid2[idx+2] * st;
                }

                // 2. Blend Mid(1+2) with Hero
                let rf, gf, bf;
                if (x <= b2Start) {
                  rf = r12;
                  gf = g12;
                  bf = b12;
                } else if (x >= b2End) {
                  rf = dHero[idx];
                  gf = dHero[idx+1];
                  bf = dHero[idx+2];
                } else {
                  const t = (x - b2Start) / b2Len;
                  const st = t * t * (3 - 2 * t);
                  rf = r12 * (1 - st) + dHero[idx] * st;
                  gf = g12 * (1 - st) + dHero[idx+1] * st;
                  bf = b12 * (1 - st) + dHero[idx+2] * st;
                }

                df[idx] = Math.round(rf);
                df[idx+1] = Math.round(gf);
                df[idx+2] = Math.round(bf);
                df[idx+3] = 255;
              }
            }

            ctx.putImageData(finalImg, 0, 0);

            // Add fine cinematic film grain
            const grainData = ctx.getImageData(0, 0, W, H);
            const gd = grainData.data;
            for (let i = 0; i < gd.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.5;
              gd[i] = Math.max(0, Math.min(255, gd[i] + noise));
              gd[i+1] = Math.max(0, Math.min(255, gd[i+1] + noise));
              gd[i+2] = Math.max(0, Math.min(255, gd[i+2] + noise));
            }
            ctx.putImageData(grainData, 0, 0);

            window.blendReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.blendReady === true', { timeout: 30000 });
  const canvas = await page.$('#c');
  await canvas.screenshot({ path: 'public/assets/images/test_pure_blend.png' });
  console.log('Saved test_pure_blend.png');
  await browser.close();
}

generateVariations().catch(console.error);
