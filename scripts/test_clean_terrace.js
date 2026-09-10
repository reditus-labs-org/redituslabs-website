import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generateCleanTerrace() {
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

            // Sky & Mountain layer:
            // We want mountains and sky to seamlessly cover 0 to 2560.
            // In original image: x: 0 to 650 has sky and mountains.
            // Let's create an extended sky & mountain panorama:
            const canSkyMtn = document.createElement('canvas');
            canSkyMtn.width = W;
            canSkyMtn.height = H;
            const ctxSM = canSkyMtn.getContext('2d');

            // Left slice mirrored:
            ctxSM.save();
            ctxSM.translate(1100, 0);
            ctxSM.scale(-1, 1);
            ctxSM.drawImage(img, 0, 0, 650, natH, 0, 0, 1100, H);
            ctxSM.restore();

            // Left slice unmirrored to connect with hero:
            const canMid = document.createElement('canvas');
            canMid.width = W;
            canMid.height = H;
            const ctxM = canMid.getContext('2d');
            ctxM.drawImage(img, 0, 0, 650, natH, 600, 0, 1350, H);

            // Blend them horizontally in sky/mountain zone (y: 0 to 1180)
            const dSM1 = ctxSM.getImageData(0, 0, W, H).data;
            const dSM2 = ctxM.getImageData(0, 0, W, H).data;

            // Hero image:
            const canHero = document.createElement('canvas');
            canHero.width = W;
            canHero.height = H;
            const ctxH = canHero.getContext('2d');
            ctxH.drawImage(img, heroX, 0, heroW, heroH);
            const dHero = ctxH.getImageData(0, 0, W, H).data;

            // Inpainting the pool in dHero:
            // In dHero, the pool is between x: 1493 and x: 1820, y > 1150.
            // To the right of the pool (x: 1840 to 2050), the terrace floor is clean reflective granite!
            // Let's sample the clean floor patch and smoothly cover the pool:
            const canFloorPatch = document.createElement('canvas');
            canFloorPatch.width = W;
            canFloorPatch.height = H;
            const ctxFP = canFloorPatch.getContext('2d');
            
            // Draw clean terrace floor patch (from hero image around x: 1850..2050) across x: 0..1850
            // In original img coords: clean floor is around x: 500..700, y: 1550..1948
            // We can tile/stretch this clean floor texture horizontally across the entire terrace!
            ctxFP.drawImage(img, 480, 1500, 260, 448, 0, 1120, W, 320);

            const dFloor = ctxFP.getImageData(0, 0, W, H).data;

            const finalImg = ctx.createImageData(W, H);
            const df = finalImg.data;

            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                // 1. Sky & Mountains (y < 1140)
                // Blend SM1 (0..950) and SM2 (750..1800) and Hero (1520..2560)
                let rSky, gSky, bSky;
                const b1Start = 700, b1End = 1000;
                let r12, g12, b12;
                if (x <= b1Start) {
                  r12 = dSM1[idx]; g12 = dSM1[idx+1]; b12 = dSM1[idx+2];
                } else if (x >= b1End) {
                  r12 = dSM2[idx]; g12 = dSM2[idx+1]; b12 = dSM2[idx+2];
                } else {
                  const t = (x - b1Start) / (b1End - b1Start);
                  const st = t * t * (3 - 2 * t);
                  r12 = dSM1[idx] * (1 - st) + dSM2[idx] * st;
                  g12 = dSM1[idx+1] * (1 - st) + dSM2[idx+1] * st;
                  b12 = dSM1[idx+2] * (1 - st) + dSM2[idx+2] * st;
                }

                const b2Start = 1520, b2End = 1880;
                if (x <= b2Start) {
                  rSky = r12; gSky = g12; bSky = b12;
                } else if (x >= b2End) {
                  rSky = dHero[idx]; gSky = dHero[idx+1]; bSky = dHero[idx+2];
                } else {
                  const t = (x - b2Start) / (b2End - b2Start);
                  const st = t * t * (3 - 2 * t);
                  rSky = r12 * (1 - st) + dHero[idx] * st;
                  gSky = g12 * (1 - st) + dHero[idx+1] * st;
                  bSky = b12 * (1 - st) + dHero[idx+2] * st;
                }

                // 2. Floor blending (y >= 1140)
                // If y >= 1140, we want clean terrace on left, blending into hero floor on right
                // Hero floor has warm light reflection at x ≈ 2160 (under doorway)
                if (y < 1140) {
                  df[idx] = Math.round(rSky);
                  df[idx+1] = Math.round(gSky);
                  df[idx+2] = Math.round(bSky);
                } else {
                  // Terrace transition:
                  // For x >= 1900: 100% hero floor (has doorway glow and person reflection)
                  // For x < 1900: blend clean floor with subtle warm glow
                  const flHeroStart = 1850;
                  const flHeroEnd = 2020;
                  let rf, gf, bf;
                  if (x >= flHeroEnd) {
                    rf = dHero[idx];
                    gf = dHero[idx+1];
                    bf = dHero[idx+2];
                  } else if (x <= flHeroStart) {
                    rf = dFloor[idx];
                    gf = dFloor[idx+1];
                    bf = dFloor[idx+2];
                  } else {
                    const t = (x - flHeroStart) / (flHeroEnd - flHeroStart);
                    const st = t * t * (3 - 2 * t);
                    rf = dFloor[idx] * (1 - st) + dHero[idx] * st;
                    gf = dFloor[idx+1] * (1 - st) + dHero[idx+1] * st;
                    bf = dFloor[idx+2] * (1 - st) + dHero[idx+2] * st;
                  }

                  // Vertical blend at terrace horizon (y: 1130..1150)
                  if (y <= 1150) {
                    const vy = (y - 1130) / 20;
                    const svy = Math.max(0, Math.min(1, vy * vy * (3 - 2 * vy)));
                    rf = rSky * (1 - svy) + rf * svy;
                    gf = gSky * (1 - svy) + gf * svy;
                    bf = bSky * (1 - svy) + bf * svy;
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
  await canvas.screenshot({ path: 'public/assets/images/test_clean_terrace.png' });
  console.log('Saved test_clean_terrace.png');
  await browser.close();
}

generateCleanTerrace().catch(console.error);
