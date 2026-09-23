import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function buildLandscapeHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  const heroBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');
  const mtnBase64 = fs.readFileSync('public/assets/images/mountain_mist_horizon.jpg').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <canvas id="c"></canvas>
        <script>
          const heroImg = new Image();
          const mtnImg = new Image();
          let loaded = 0;

          function onLoaded() {
            loaded++;
            if (loaded < 2) return;

            // Target 16:9 Landscape Resolution: 2560 x 1440
            const W = 2560;
            const H = 1440;
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // 1. Draw base sky gradient across the entire canvas
            // Matching the dark dawn slate blue of the hero sky
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
            skyGrad.addColorStop(0, '#071219');
            skyGrad.addColorStop(0.25, '#0b1922');
            skyGrad.addColorStop(0.5, '#12232f');
            skyGrad.addColorStop(0.65, '#1a2e3d');
            skyGrad.addColorStop(0.72, '#283c4e'); // mist horizon
            skyGrad.addColorStop(0.82, '#18242f'); // mountain base
            skyGrad.addColorStop(1.0, '#0a0e13'); // dark floor
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, W, H);

            // 2. Render extended mountain horizon on the left side
            // mtnImg is 1920 x 1080
            // We scale and position mtnImg across the left and center: x: 0 to 1800, y: 550 to 1250
            const mtnH = Math.round(H * 0.55); // 792px
            const mtnW = Math.round(mtnH * (mtnImg.naturalWidth / mtnImg.naturalHeight)); // ~1408px
            const mtnY = Math.round(H * 0.40); // 576px

            // Draw mountain into an offscreen canvas to apply atmospheric color grading and masking
            const mtnC = document.createElement('canvas');
            mtnC.width = mtnW;
            mtnC.height = mtnH;
            const mtnCtx = mtnC.getContext('2d');
            mtnCtx.drawImage(mtnImg, 0, 0, mtnW, mtnH);

            // Color grade mountain to match the dark cool blue/champagne dawn palette of the hero
            mtnCtx.globalCompositeOperation = 'multiply';
            mtnCtx.fillStyle = '#657b8e';
            mtnCtx.fillRect(0, 0, mtnW, mtnH);

            // Soft atmospheric mist overlay on mountains
            mtnCtx.globalCompositeOperation = 'screen';
            const mtnMistGrad = mtnCtx.createLinearGradient(0, 0, 0, mtnH);
            mtnMistGrad.addColorStop(0, 'rgba(10, 18, 25, 0.0)');
            mtnMistGrad.addColorStop(0.5, 'rgba(35, 52, 68, 0.35)');
            mtnMistGrad.addColorStop(0.8, 'rgba(55, 75, 95, 0.55)');
            mtnMistGrad.addColorStop(1, 'rgba(20, 30, 40, 0.2)');
            mtnCtx.fillStyle = mtnMistGrad;
            mtnCtx.fillRect(0, 0, mtnW, mtnH);

            // Feather top of mountain into the sky
            mtnCtx.globalCompositeOperation = 'destination-in';
            const mtnAlphaGrad = mtnCtx.createLinearGradient(0, 0, 0, mtnH);
            mtnAlphaGrad.addColorStop(0, 'rgba(0,0,0,0)');
            mtnAlphaGrad.addColorStop(0.2, 'rgba(0,0,0,1)');
            mtnAlphaGrad.addColorStop(0.85, 'rgba(0,0,0,1)');
            mtnAlphaGrad.addColorStop(1, 'rgba(0,0,0,0.2)');
            mtnCtx.fillStyle = mtnAlphaGrad;
            mtnCtx.fillRect(0, 0, mtnW, mtnH);

            // Draw graded mountains onto main canvas (mirrored/positioned to seamlessly meet hero mountains)
            ctx.drawImage(mtnC, 0, mtnY, mtnW, mtnH);

            // 3. Draw the Hero Architectural Structure & Portal on the Right
            // Hero image natural aspect ratio: 361 / 487
            // Scale hero image so its height matches H = 1440
            const heroH = H;
            const heroW = Math.round(heroH * (heroImg.naturalWidth / heroImg.naturalHeight)); // ~1067px
            const heroX = W - heroW; // 2560 - 1067 = 1493px

            // We create an offscreen canvas for the hero image with a wide, soft horizontal blend on its left edge
            const hC = document.createElement('canvas');
            hC.width = heroW;
            hC.height = heroH;
            const hCtx = hC.getContext('2d');
            hCtx.drawImage(heroImg, 0, 0, heroW, heroH);

            // Create a wide, perfectly smooth feathered blend on the left 40% of the hero image
            // This leaves the portal, human silhouette, floor reflections and building 100% untouched on the right
            // and smoothly blends its mountains and mist into the extended landscape on the left
            const blendW = Math.round(heroW * 0.45); // ~480px
            const blendGrad = hCtx.createLinearGradient(0, 0, blendW, 0);
            blendGrad.addColorStop(0, 'rgba(0,0,0,0)');
            blendGrad.addColorStop(0.25, 'rgba(0,0,0,0.3)');
            blendGrad.addColorStop(0.65, 'rgba(0,0,0,0.85)');
            blendGrad.addColorStop(1, 'rgba(0,0,0,1)');

            hCtx.globalCompositeOperation = 'destination-in';
            hCtx.fillStyle = blendGrad;
            hCtx.fillRect(0, 0, blendW, heroH);

            // Draw hero image on right side
            ctx.drawImage(hC, heroX, 0, heroW, heroH);

            // 4. Extended Floor & Reflection Terrace
            // In the hero image, the floor starts around y = 0.84 * H (1210px)
            // Draw smooth dark reflective terrace floor extending across the entire bottom (y: 1200 to 1440)
            const floorTop = Math.round(H * 0.835); // ~1202px
            const floorH = H - floorTop;

            const floorGrad = ctx.createLinearGradient(0, floorTop, 0, H);
            floorGrad.addColorStop(0, '#0c1218');
            floorGrad.addColorStop(0.3, '#0e151d');
            floorGrad.addColorStop(0.7, '#0a0f14');
            floorGrad.addColorStop(1, '#070b0e');

            // Draw floor across the left side up to where hero's reflective cutout begins
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, floorTop, heroX + Math.round(heroW * 0.25), floorH);

            // Add subtle terrace edge line separating mountain mist from floor
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, floorTop);
            ctx.lineTo(heroX + Math.round(heroW * 0.35), floorTop);
            ctx.stroke();

            // Subtle dawn warm glow reflection on the terrace floor coming from the distant horizon
            const warmReflect = ctx.createRadialGradient(heroX * 0.4, floorTop + 60, 20, heroX * 0.4, floorTop + 60, 450);
            warmReflect.addColorStop(0, 'rgba(180, 140, 100, 0.06)');
            warmReflect.addColorStop(0.5, 'rgba(120, 100, 80, 0.03)');
            warmReflect.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmReflect;
            ctx.fillRect(0, floorTop, heroX, floorH);

            // 5. Film / Sensor Photographic Grain
            // Add cohesive micro-grain across the entire 2560x1440 canvas
            const imgData = ctx.getImageData(0, 0, W, H);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const noise = (Math.random() - 0.5) * 4;
              d[i] = Math.max(0, Math.min(255, d[i] + noise));
              d[i+1] = Math.max(0, Math.min(255, d[i+1] + noise));
              d[i+2] = Math.max(0, Math.min(255, d[i+2] + noise));
            }
            ctx.putImageData(imgData, 0, 0);

            window.landscapeReady = true;
          }

          heroImg.onload = onLoaded;
          mtnImg.onload = onLoaded;
          heroImg.src = "data:image/png;base64,${heroBase64}";
          mtnImg.src = "data:image/jpeg;base64,${mtnBase64}";
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.landscapeReady === true', { timeout: 30000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved 16:9 PC landscape hero image to ${outPath}`);
  await browser.close();
}

buildLandscapeHero().catch(console.error);
