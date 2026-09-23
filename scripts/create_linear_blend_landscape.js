import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function createLinearBlendLandscape() {
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

            const heroH = H;
            const heroW = Math.round(heroH * (img.naturalWidth / img.naturalHeight)); // 1067
            const heroX = W - heroW; // 1493

            // Step 1: Base Sky & Floor across entire 2560x1440
            const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
            bgGrad.addColorStop(0, '#071219');
            bgGrad.addColorStop(0.3, '#0a1721');
            bgGrad.addColorStop(0.55, '#11222e');
            bgGrad.addColorStop(0.70, '#1f3241'); // dawn mist horizon
            bgGrad.addColorStop(0.80, '#15212a'); // mountain base
            bgGrad.addColorStop(0.85, '#0c1218'); // terrace edge
            bgGrad.addColorStop(1.0, '#070a0d'); // floor bottom
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            const natW = img.naturalWidth;
            const natH = img.naturalHeight;
            const leftSliceW = Math.round(natW * 0.48);

            // Layer 1: Far Left Mirrored Slice (Canvas 1)
            const can1 = document.createElement('canvas');
            can1.width = W;
            can1.height = H;
            const ctx1 = can1.getContext('2d');
            ctx1.fillStyle = bgGrad;
            ctx1.fillRect(0, 0, W, H);

            ctx1.save();
            ctx1.translate(1100, 0);
            ctx1.scale(-1, 1);
            ctx1.drawImage(img, 0, 0, leftSliceW, natH, 0, 0, 1100, H);
            ctx1.restore();

            // Layer 2: Mid Slice (Canvas 2)
            const can2 = document.createElement('canvas');
            can2.width = W;
            can2.height = H;
            const ctx2 = can2.getContext('2d');
            ctx2.fillStyle = bgGrad;
            ctx2.fillRect(0, 0, W, H);
            ctx2.drawImage(img, 0, 0, leftSliceW, natH, 650, 0, 1100, H);

            // Layer 3: Hero Right Slice (Canvas 3)
            const can3 = document.createElement('canvas');
            can3.width = W;
            can3.height = H;
            const ctx3 = can3.getContext('2d');
            ctx3.fillStyle = bgGrad;
            ctx3.fillRect(0, 0, W, H);
            ctx3.drawImage(img, heroX, 0, heroW, heroH);

            // Get pixel buffers
            const d1 = ctx1.getImageData(0, 0, W, H).data;
            const d2 = ctx2.getImageData(0, 0, W, H).data;
            const d3 = ctx3.getImageData(0, 0, W, H).data;

            const finalImg = ctx.createImageData(W, H);
            const df = finalImg.data;

            // Seam 1: between Layer 1 and Layer 2 (x: 620 to 960)
            const s1Start = 620;
            const s1End = 960;
            const s1Len = s1End - s1Start;

            // Seam 2: between Layer 2 and Layer 3 (x: 1320 to 1680)
            const s2Start = 1320;
            const s2End = 1680;
            const s2Len = s2End - s2Start;

            // Floor transition zone around heroX (1350 to 1650)
            const flStart = 1360;
            const flEnd = 1640;
            const flLen = flEnd - flStart;

            // Terrace floor edge is at y = 1205
            const floorY = 1205;

            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const idx = (y * W + x) * 4;

                // 1. Calculate blended mountain/sky color from Layer 1 and Layer 2
                let r12, g12, b12;
                if (x <= s1Start) {
                  r12 = d1[idx];
                  g12 = d1[idx+1];
                  b12 = d1[idx+2];
                } else if (x >= s1End) {
                  r12 = d2[idx];
                  g12 = d2[idx+1];
                  b12 = d2[idx+2];
                } else {
                  const u = (x - s1Start) / s1Len;
                  const su = u * u * (3 - 2 * u);
                  r12 = d1[idx] * (1 - su) + d2[idx] * su;
                  g12 = d1[idx+1] * (1 - su) + d2[idx+1] * su;
                  b12 = d1[idx+2] * (1 - su) + d2[idx+2] * su;
                }

                // 2. Floor vs Mountain/Sky handling
                if (y >= floorY) {
                  // Synthesized floor for left side
                  const fy = (y - floorY) / (H - floorY);
                  const flR = Math.round(12 * (1 - fy) + 7 * fy);
                  const flG = Math.round(18 * (1 - fy) + 10 * fy);
                  const flB = Math.round(24 * (1 - fy) + 13 * fy);

                  // Warm portal reflection spilling toward the left
                  const dist = (heroX + 350) - x;
                  const glow = Math.max(0, 1 - dist / 1600) * 0.12 * (1 - fy * 0.5);

                  const synthR = Math.min(255, flR + Math.round(220 * glow));
                  const synthG = Math.min(255, flG + Math.round(175 * glow));
                  const synthB = Math.min(255, flB + Math.round(125 * glow));

                  // Smoothly cross-fade synthesized floor into d3 (hero floor)
                  if (x <= flStart) {
                    df[idx] = synthR;
                    df[idx+1] = synthG;
                    df[idx+2] = synthB;
                  } else if (x >= flEnd) {
                    df[idx] = d3[idx];
                    df[idx+1] = d3[idx+1];
                    df[idx+2] = d3[idx+2];
                  } else {
                    const w = (x - flStart) / flLen;
                    const sw = w * w * (3 - 2 * w);
                    df[idx] = Math.round(synthR * (1 - sw) + d3[idx] * sw);
                    df[idx+1] = Math.round(synthG * (1 - sw) + d3[idx+1] * sw);
                    df[idx+2] = Math.round(synthB * (1 - sw) + d3[idx+2] * sw);
                  }
                  df[idx+3] = 255;
                } else {
                  // Sky & Mountain blend: Layer (1+2) with Layer 3 (Hero Image)
                  if (x <= s2Start) {
                    df[idx] = Math.round(r12);
                    df[idx+1] = Math.round(g12);
                    df[idx+2] = Math.round(b12);
                  } else if (x >= s2End) {
                    df[idx] = d3[idx];
                    df[idx+1] = d3[idx+1];
                    df[idx+2] = d3[idx+2];
                  } else {
                    const v = (x - s2Start) / s2Len;
                    const sv = v * v * (3 - 2 * v);
                    df[idx] = Math.round(r12 * (1 - sv) + d3[idx] * sv);
                    df[idx+1] = Math.round(g12 * (1 - sv) + d3[idx+1] * sv);
                    df[idx+2] = Math.round(b12 * (1 - sv) + d3[idx+2] * sv);
                  }
                  df[idx+3] = 255;
                }
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

            // Terrace boundary edge line at y = 1205
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 1205);
            ctx.lineTo(heroX + 100, 1205);
            ctx.stroke();

            window.blendReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.blendReady === true', { timeout: 30000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved linear-blended 16:9 PC landscape hero image to ${outPath}`);
  await browser.close();
}

createLinearBlendLandscape().catch(console.error);
