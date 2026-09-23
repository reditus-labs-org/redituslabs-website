import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generateUnifiedPool() {
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

            // Atmospheric gradient background
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

            // Left slice width (mountain & sky without the portal structure)
            const leftW = Math.round(natW * 0.48); // ~693px

            // Layer 1: Left Mirrored Canvas
            // We want Layer 1 to cover x: 0 to 1450
            const canLeft = document.createElement('canvas');
            canLeft.width = W;
            canLeft.height = H;
            const ctxL = canLeft.getContext('2d');
            ctxL.fillStyle = bgGrad;
            ctxL.fillRect(0, 0, W, H);
            ctxL.save();
            ctxL.translate(1650, 0);
            ctxL.scale(-1, 1);
            // draw left slice mirrored across 0..1650 so it overlaps heroX = 1493
            ctxL.drawImage(img, 0, 0, leftW, natH, 0, 0, 1650, H);
            ctxL.restore();

            // Layer 2: Mid Mountain & Sky Bridge (ONLY for y < 1140)
            // To prevent mountain symmetry artifacts in the center, we bridge the mountains
            const canMid = document.createElement('canvas');
            canMid.width = W;
            canMid.height = H;
            const ctxM = canMid.getContext('2d');
            ctxM.drawImage(img, 0, 0, leftW, natH, 700, 0, 1200, H);

            // Layer 3: Hero Image on Right (heroX = 1493 to 2560)
            const canHero = document.createElement('canvas');
            canHero.width = W;
            canHero.height = H;
            const ctxH = canHero.getContext('2d');
            ctxH.fillStyle = bgGrad;
            ctxH.fillRect(0, 0, W, H);
            ctxH.drawImage(img, heroX, 0, heroW, heroH);

            const dLeft = ctxL.getImageData(0, 0, W, H).data;
            const dMid = ctxM.getImageData(0, 0, W, H).data;
            const dHero = ctxH.getImageData(0, 0, W, H).data;

            const finalImg = ctx.createImageData(W, H);
            const df = finalImg.data;

            // Blend zones:
            // For Sky/Mountains (y < 1140):
            // Blend Left -> Mid (x: 700..1050)
            // Blend Mid -> Hero (x: 1490..1850)
            const skyB1Start = 700, skyB1End = 1050;
            const skyB2Start = 1490, skyB2End = 1850;

            // For Floor (y >= 1140):
            // Direct blend between Left (mirrored) and Hero (right)
            // Left extends to 1400.
            // Hero starts at 1493.
            // Wait, we need Left to extend past 1493 so they overlap!
            // Let's make sure canLeft extends to 1600:
            // ctxL.translate(1600, 0); ctxL.drawImage(..., 0, 0, 1600, H);
            // Then floor blend zone is x: 1480 to 1600!
            // In that zone, the mirrored pool and normal pool meet seamlessly in the center!

            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                if (y < 1140) {
                  // Sky & Mountain blend
                  let r12, g12, b12;
                  if (x <= skyB1Start) {
                    r12 = dLeft[idx]; g12 = dLeft[idx+1]; b12 = dLeft[idx+2];
                  } else if (x >= skyB1End) {
                    r12 = dMid[idx]; g12 = dMid[idx+1]; b12 = dMid[idx+2];
                  } else {
                    const t = (x - skyB1Start) / (skyB1End - skyB1Start);
                    const st = t * t * (3 - 2 * t);
                    r12 = dLeft[idx] * (1 - st) + dMid[idx] * st;
                    g12 = dLeft[idx+1] * (1 - st) + dMid[idx+1] * st;
                    b12 = dLeft[idx+2] * (1 - st) + dMid[idx+2] * st;
                  }

                  let rf, gf, bf;
                  if (x <= skyB2Start) {
                    rf = r12; gf = g12; bf = b12;
                  } else if (x >= skyB2End) {
                    rf = dHero[idx]; gf = dHero[idx+1]; bf = dHero[idx+2];
                  } else {
                    const t = (x - skyB2Start) / (skyB2End - skyB2Start);
                    const st = t * t * (3 - 2 * t);
                    rf = r12 * (1 - st) + dHero[idx] * st;
                    gf = g12 * (1 - st) + dHero[idx+1] * st;
                    bf = b12 * (1 - st) + dHero[idx+2] * st;
                  }
                  df[idx] = Math.round(rf);
                  df[idx+1] = Math.round(gf);
                  df[idx+2] = Math.round(bf);
                } else {
                  // Floor blend:
                  // Direct smooth cross-fade between dLeft and dHero around x: 1480..1650
                  const flStart = 1480;
                  const flEnd = 1620;
                  let rf, gf, bf;
                  if (x <= flStart) {
                    rf = dLeft[idx]; gf = dLeft[idx+1]; bf = dLeft[idx+2];
                  } else if (x >= flEnd) {
                    rf = dHero[idx]; gf = dHero[idx+1]; bf = dHero[idx+2];
                  } else {
                    const t = (x - flStart) / (flEnd - flStart);
                    const st = t * t * (3 - 2 * t);
                    rf = dLeft[idx] * (1 - st) + dHero[idx] * st;
                    gf = dLeft[idx+1] * (1 - st) + dHero[idx+1] * st;
                    bf = dLeft[idx+2] * (1 - st) + dHero[idx+2] * st;
                  }
                  df[idx] = Math.round(rf);
                  df[idx+1] = Math.round(gf);
                  df[idx+2] = Math.round(bf);
                }
                df[idx+3] = 255;
              }
            }

            ctx.putImageData(finalImg, 0, 0);

            // Add fine cinematic film grain
            const grainData = ctx.getImageData(0, 0, W, H);
            const gd = grainData.data;
            for (let i = 0; i < gd.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.0;
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
  await canvas.screenshot({ path: 'public/assets/images/test_unified_pool.png' });
  console.log('Saved test_unified_pool.png');
  await browser.close();
}

generateUnifiedPool().catch(console.error);
