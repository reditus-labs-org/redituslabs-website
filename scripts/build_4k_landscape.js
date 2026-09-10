import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function build4KLandscape() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set high viewport
  await page.setViewport({ width: 3840, height: 2160, deviceScaleFactor: 1 });

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
            const W = 3840; // True 4K UHD width
            const H = 2160; // True 4K UHD height
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });

            const natW = img.naturalWidth;   // 1444
            const natH = img.naturalHeight;  // 1948

            // Hero aspect ratio & placement:
            // Scaled height = H = 2160.
            // Width = 2160 * (1444 / 1948) = 1601px.
            const heroH = H;
            const heroW = Math.round(heroH * (natW / natH)); // 1601
            const heroX = W - heroW; // 2239

            // Atmospheric gradient background base
            const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
            bgGrad.addColorStop(0, '#060f15');
            bgGrad.addColorStop(0.35, '#09151e');
            bgGrad.addColorStop(0.60, '#101f2a');
            bgGrad.addColorStop(0.72, '#1b2d39'); // dawn mist horizon
            bgGrad.addColorStop(0.79, '#131d25'); // mountain base
            bgGrad.addColorStop(0.83, '#0a0f14'); // terrace edge
            bgGrad.addColorStop(1.0, '#04070a'); // floor bottom
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Left slice of mountains/sky without the portal:
            // natW * 0.48 = 693px.
            const leftW = Math.round(natW * 0.48);

            // To fill x: 0 to heroX (2239) WITHOUT horizontal stretching:
            // 1:1 scale for leftW in 4K is: leftW * (2160 / 1948) = 768px!
            const slice4KW = Math.round(leftW * (heroH / natH)); // 768px wide at 1:1 scale!
            console.log('4K 1:1 slice width:', slice4KW);

            // We need to cover 2400px with slices that do NOT distort horizontally!
            // Slice 1 (Far Left, Mirrored): placed at x: 0 to 850
            // Slice 2 (Mid Left): placed at x: 700 to 1600
            // Slice 3 (Mid Right, connecting to Hero): placed at x: 1450 to 2400
            // Hero (Right): placed at x: 2239 to 3840

            // Canvas for Panoramic Left Layers:
            // Layer A: Mirrored left slice at natural proportion
            const canA = document.createElement('canvas');
            canA.width = W; canA.height = H;
            const ctxA = canA.getContext('2d');
            ctxA.fillStyle = bgGrad; ctxA.fillRect(0, 0, W, H);
            ctxA.save();
            ctxA.translate(950, 0);
            ctxA.scale(-1, 1);
            ctxA.drawImage(img, 0, 0, leftW, natH, 0, 0, 950, H);
            ctxA.restore();

            // Layer B: Second slice at natural proportion (span 750 to 1800)
            const canB = document.createElement('canvas');
            canB.width = W; canB.height = H;
            const ctxB = canB.getContext('2d');
            ctxB.fillStyle = bgGrad; ctxB.fillRect(0, 0, W, H);
            ctxB.drawImage(img, 0, 0, leftW, natH, 750, 0, 1050, H);

            // Layer C: Third slice bridging into hero (span 1550 to 2500)
            const canC = document.createElement('canvas');
            canC.width = W; canC.height = H;
            const ctxC = canC.getContext('2d');
            ctxC.fillStyle = bgGrad; ctxC.fillRect(0, 0, W, H);
            ctxC.save();
            ctxC.translate(2500, 0);
            ctxC.scale(-1, 1);
            ctxC.drawImage(img, 0, 0, leftW, natH, 0, 0, 950, H);
            ctxC.restore();

            // Layer Hero: The primary 4K hero plate (span 2239 to 3840)
            const canHero = document.createElement('canvas');
            canHero.width = W; canHero.height = H;
            const ctxH = canHero.getContext('2d');
            ctxH.fillStyle = bgGrad; ctxH.fillRect(0, 0, W, H);
            ctxH.drawImage(img, heroX, 0, heroW, heroH);

            // Fetch pixel data
            const dA = ctxA.getImageData(0, 0, W, H).data;
            const dB = ctxB.getImageData(0, 0, W, H).data;
            const dC = ctxC.getImageData(0, 0, W, H).data;
            const dH = ctxH.getImageData(0, 0, W, H).data;

            const finalData = ctx.createImageData(W, H);
            const df = finalData.data;

            // Terrace floor edge is at y ≈ 1710 in 4K (2160 * 0.792)
            const floorY = 1710;

            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                let r, g, b;

                // Blend Layer A and Layer B across x: 700..950
                let rAB, gAB, bAB;
                if (x <= 700) {
                  rAB = dA[idx]; gAB = dA[idx+1]; bAB = dA[idx+2];
                } else if (x >= 950) {
                  rAB = dB[idx]; gAB = dB[idx+1]; bAB = dB[idx+2];
                } else {
                  const t = (x - 700) / 250;
                  const st = t * t * (3 - 2 * t);
                  rAB = dA[idx] * (1 - st) + dB[idx] * st;
                  gAB = dA[idx+1] * (1 - st) + dB[idx+1] * st;
                  bAB = dA[idx+2] * (1 - st) + dB[idx+2] * st;
                }

                // Blend AB with Layer C across x: 1550..1800
                let rABC, gABC, bABC;
                if (x <= 1550) {
                  rABC = rAB; gABC = gAB; bABC = bAB;
                } else if (x >= 1800) {
                  rABC = dC[idx]; gABC = dC[idx+1]; bABC = dC[idx+2];
                } else {
                  const t = (x - 1550) / 250;
                  const st = t * t * (3 - 2 * t);
                  rABC = rAB * (1 - st) + dC[idx] * st;
                  gABC = gAB * (1 - st) + dC[idx+1] * st;
                  bABC = gAB * (1 - st) + dC[idx+2] * st;
                }

                // Blend ABC with Hero across x: 2240..2500
                // Hero starts at 2239!
                if (x <= 2240) {
                  r = rABC; g = gABC; b = bABC;
                } else if (x >= 2500) {
                  r = dH[idx]; g = dH[idx+1]; b = dH[idx+2];
                } else {
                  const t = (x - 2240) / 260;
                  const st = t * t * (3 - 2 * t);
                  r = rABC * (1 - st) + dH[idx] * st;
                  g = gABC * (1 - st) + dH[idx+1] * st;
                  b = bABC * (1 - st) + dH[idx+2] * st;
                }

                df[idx] = Math.round(r);
                df[idx+1] = Math.round(g);
                df[idx+2] = Math.round(b);
                df[idx+3] = 255;
              }
            }

            ctx.putImageData(finalData, 0, 0);

            // ==========================================
            // STEP 2: 4K HIGH-FREQUENCY UNSHARP MASK & CONTRAST
            // ==========================================
            const srcImg = ctx.getImageData(0, 0, W, H);
            const sd = srcImg.data;
            const sharpImg = ctx.createImageData(W, H);
            const shd = sharpImg.data;

            // Convolution Kernel for 4K Super-Sharp Definition
            // Unsharp high-pass kernel with edge enhancement
            const sharpenAmount = 1.35; // Fine crisp edge boost
            
            for (let y = 1; y < H - 1; y++) {
              for (let x = 1; x < W - 1; x++) {
                const idx = (y * W + x) * 4;

                for (let c = 0; c < 3; c++) {
                  const center = sd[idx + c];
                  // 5-point Laplacian high-pass
                  const top    = sd[((y - 1) * W + x) * 4 + c];
                  const bottom = sd[((y + 1) * W + x) * 4 + c];
                  const left   = sd[(y * W + (x - 1)) * 4 + c];
                  const right  = sd[(y * W + (x + 1)) * 4 + c];

                  const laplacian = (4 * center - top - bottom - left - right);
                  
                  // Add boosted high frequency
                  let val = center + sharpenAmount * laplacian;

                  // Micro-contrast S-curve
                  val = ((val / 255 - 0.5) * 1.06 + 0.5) * 255;

                  shd[idx + c] = Math.max(0, Math.min(255, val));
                }
                shd[idx + 3] = 255;
              }
            }

            // Copy borders
            for (let x = 0; x < W; x++) {
              const top = x * 4;
              const btm = ((H - 1) * W + x) * 4;
              for (let i = 0; i < 4; i++) {
                shd[top + i] = sd[top + i];
                shd[btm + i] = sd[btm + i];
              }
            }

            // Micro photographic sensor texture (Hasselblad / cinema sensor grain)
            for (let i = 0; i < shd.length; i += 4) {
              const noise = (Math.random() - 0.5) * 4.2;
              shd[i]   = Math.max(0, Math.min(255, shd[i]   + noise));
              shd[i+1] = Math.max(0, Math.min(255, shd[i+1] + noise));
              shd[i+2] = Math.max(0, Math.min(255, shd[i+2] + noise));
            }

            ctx.putImageData(sharpImg, 0, 0);

            console.log('4K processing completed!');
            window.renderComplete = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.renderComplete === true', { timeout: 60000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_4k_test.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved 4K landscape to ${outPath}`);
  await browser.close();
}

build4KLandscape().catch(console.error);
