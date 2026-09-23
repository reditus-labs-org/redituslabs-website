import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generate4KMaster() {
  console.log('Generating 3840x2160 4K UHD Master Plate (1.5x scaled unified pool architecture)...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const W = 3840; // True 4K UHD
  const H = 2160;
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  // Read pristine 4K portrait plate as source
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
            const W = 3840;
            const H = 2160;
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const natW = img.naturalWidth;
            const natH = img.naturalHeight;

            // Hero positioning at 4K
            const heroH = H; // 2160
            const heroW = Math.round(heroH * (natW / natH)); // 1600
            const heroX = W - heroW; // 2240

            // Atmospheric gradient base
            const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
            bgGrad.addColorStop(0, '#060d13');
            bgGrad.addColorStop(0.35, '#09151e');
            bgGrad.addColorStop(0.60, '#101f2a');
            bgGrad.addColorStop(0.72, '#1b2d39'); // dawn mist horizon
            bgGrad.addColorStop(0.79, '#121c24'); // mountain base
            bgGrad.addColorStop(0.83, '#0a0f14'); // terrace edge
            bgGrad.addColorStop(1.0, '#04070a'); // floor bottom
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Left slice width
            const leftW = Math.round(natW * 0.48);

            // Layer 1: Left Mirrored Canvas (covers 0 to 2475)
            const canLeft = document.createElement('canvas');
            canLeft.width = W; canLeft.height = H;
            const ctxL = canLeft.getContext('2d');
            ctxL.fillStyle = bgGrad; ctxL.fillRect(0, 0, W, H);
            ctxL.save();
            ctxL.translate(2475, 0);
            ctxL.scale(-1, 1);
            ctxL.drawImage(img, 0, 0, leftW, natH, 0, 0, 2475, H);
            ctxL.restore();

            // Layer 2: Mid Mountain & Sky Bridge (spans 1050 to 2850, ONLY for y < 1710)
            const canMid = document.createElement('canvas');
            canMid.width = W; canMid.height = H;
            const ctxM = canMid.getContext('2d');
            ctxM.drawImage(img, 0, 0, leftW, natH, 1050, 0, 1800, H);

            // Layer 3: Hero Image on Right (spans heroX=2240 to 3840)
            const canHero = document.createElement('canvas');
            canHero.width = W; canHero.height = H;
            const ctxH = canHero.getContext('2d');
            ctxH.fillStyle = bgGrad; ctxH.fillRect(0, 0, W, H);
            ctxH.drawImage(img, heroX, 0, heroW, heroH);

            const dLeft = ctxL.getImageData(0, 0, W, H).data;
            const dMid = ctxM.getImageData(0, 0, W, H).data;
            const dHero = ctxH.getImageData(0, 0, W, H).data;

            const finalImg = ctx.createImageData(W, H);
            const df = finalImg.data;

            // Proportional blend coordinates (exact 1.5x of seamless prototype)
            const skyB1Start = 1050; // 700 * 1.5
            const skyB1End   = 1575; // 1050 * 1.5
            const skyB2Start = 2235; // 1490 * 1.5
            const skyB2End   = 2775; // 1850 * 1.5

            const flStart = 2220; // 1480 * 1.5
            const flEnd   = 2430; // 1620 * 1.5
            const floorY  = 1710; // 1140 * 1.5

            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                if (y < floorY) {
                  // Sky & Mountain 3-layer blend
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
                  // Terrace Floor: Direct smooth cross-fade between dLeft (mirrored pool) and dHero (hero pool)
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

            // =================================================================
            // 4K LUMINANCE UNSHARP MASK & HIGH-FREQUENCY RECONSTRUCTION
            // =================================================================
            console.log('Applying 4K Luminance Unsharp Mask for razor-sharp definition...');
            const compImg = ctx.getImageData(0, 0, W, H);
            const cd = compImg.data;
            const sharpImg = ctx.createImageData(W, H);
            const sd = sharpImg.data;

            const sharpenStrength = 1.65; // Precision 4K crisp edge boost

            for (let y = 1; y < H - 1; y++) {
              for (let x = 1; x < W - 1; x++) {
                const idx = (y * W + x) * 4;

                const cr = cd[idx], cg = cd[idx+1], cb = cd[idx+2];
                const cLum = 0.299 * cr + 0.587 * cg + 0.114 * cb;

                // 4-neighbor cross Laplacian
                const topIdx = ((y-1)*W + x)*4;
                const btmIdx = ((y+1)*W + x)*4;
                const lftIdx = (y*W + (x-1))*4;
                const rgtIdx = (y*W + (x+1))*4;

                const tLum = 0.299 * cd[topIdx] + 0.587 * cd[topIdx+1] + 0.114 * cd[topIdx+2];
                const bLum = 0.299 * cd[btmIdx] + 0.587 * cd[btmIdx+1] + 0.114 * cd[btmIdx+2];
                const lLum = 0.299 * cd[lftIdx] + 0.587 * cd[lftIdx+1] + 0.114 * cd[lftIdx+2];
                const rLum = 0.299 * cd[rgtIdx] + 0.587 * cd[rgtIdx+1] + 0.114 * cd[rgtIdx+2];

                const laplacian = 4 * cLum - tLum - bLum - lLum - rLum;

                const sharpLum = cLum + sharpenStrength * laplacian;
                const lumRatio = cLum > 1 ? (sharpLum / cLum) : 1;
                const clampedRatio = Math.max(0.68, Math.min(1.42, lumRatio));

                let nr = cr * clampedRatio;
                let ng = cg * clampedRatio;
                let nb = cb * clampedRatio;

                // Micro-contrast S-curve
                nr = ((nr / 255 - 0.5) * 1.05 + 0.5) * 255;
                ng = ((ng / 255 - 0.5) * 1.05 + 0.5) * 255;
                nb = ((nb / 255 - 0.5) * 1.05 + 0.5) * 255;

                sd[idx]   = Math.max(0, Math.min(255, nr));
                sd[idx+1] = Math.max(0, Math.min(255, ng));
                sd[idx+2] = Math.max(0, Math.min(255, nb));
                sd[idx+3] = 255;
              }
            }

            // Copy borders
            for (let x = 0; x < W; x++) {
              const top = x * 4;
              const btm = ((H - 1) * W + x) * 4;
              for (let i = 0; i < 4; i++) {
                sd[top + i] = cd[top + i];
                sd[btm + i] = cd[btm + i];
              }
            }
            for (let y = 0; y < H; y++) {
              const left = (y * W) * 4;
              const right = (y * W + (W - 1)) * 4;
              for (let i = 0; i < 4; i++) {
                sd[left + i] = cd[left + i];
                sd[right + i] = cd[right + i];
              }
            }

            // 4K Cinema sensor grain for authentic 45-megapixel camera fidelity
            for (let i = 0; i < sd.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.4;
              sd[i]   = Math.max(0, Math.min(255, sd[i]   + noise));
              sd[i+1] = Math.max(0, Math.min(255, sd[i+1] + noise));
              sd[i+2] = Math.max(0, Math.min(255, sd[i+2] + noise));
            }

            ctx.putImageData(sharpImg, 0, 0);

            console.log('4K Master Rendering successfully completed!');
            window.renderComplete = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.renderComplete === true', { timeout: 90000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved flawless 3840x2160 4K UHD master image to ${outPath}`);
  await browser.close();
}

generate4KMaster().catch(console.error);
