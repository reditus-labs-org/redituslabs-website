import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function buildUltraSeamlessLandscape() {
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
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const heroH = H;
            const heroW = Math.round(heroH * (img.naturalWidth / img.naturalHeight)); // ~1067 px
            const heroX = W - heroW; // 1493 px

            // 1. Base Sky Gradient across full canvas
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
            skyGrad.addColorStop(0, '#071219');
            skyGrad.addColorStop(0.3, '#0b1721');
            skyGrad.addColorStop(0.55, '#12232f');
            skyGrad.addColorStop(0.70, '#203241'); // dawn mist horizon
            skyGrad.addColorStop(0.80, '#15212a'); // mountain base
            skyGrad.addColorStop(0.85, '#0d1319'); // terrace edge
            skyGrad.addColorStop(1.0, '#070a0d'); // dark floor
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, W, H);

            // 2. Continuous Left Landscape Extension using natural layers from img
            const natW = img.naturalWidth;
            const natH = img.naturalHeight;
            const mSliceW = Math.round(natW * 0.46);

            // Layer A: Far left mountain range (mirrored for natural variation, x: 0 to 800)
            ctx.save();
            ctx.translate(950, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, mSliceW, natH, 0, 0, 1050, H);
            ctx.restore();

            // Layer B: Mid-left mountain range with feathered blend
            const midC = document.createElement('canvas');
            midC.width = 1100;
            midC.height = H;
            const midCtx = midC.getContext('2d');
            midCtx.drawImage(img, 0, 0, mSliceW, natH, 0, 0, 1100, H);

            // Feather left edge of midC (0 to 350)
            midCtx.globalCompositeOperation = 'destination-in';
            const midAlpha = midCtx.createLinearGradient(0, 0, 350, 0);
            midAlpha.addColorStop(0, 'rgba(0,0,0,0)');
            midAlpha.addColorStop(1, 'rgba(0,0,0,1)');
            midCtx.fillStyle = midAlpha;
            midCtx.fillRect(0, 0, 350, H);
            midCtx.fillStyle = 'rgba(0,0,0,1)';
            midCtx.fillRect(350, 0, midC.width - 350, H);

            ctx.drawImage(midC, 650, 0);

            // 3. Draw Main Hero Image on Right with feathered left edge (x: 0 to 320 in hero coords)
            const heroC = document.createElement('canvas');
            heroC.width = heroW;
            heroC.height = heroH;
            const heroCtx = heroC.getContext('2d');
            heroCtx.drawImage(img, 0, 0, heroW, heroH);

            // Feather left edge of heroC (0 to 320)
            heroCtx.globalCompositeOperation = 'destination-in';
            const hAlpha = heroCtx.createLinearGradient(0, 0, 320, 0);
            hAlpha.addColorStop(0, 'rgba(0,0,0,0)');
            hAlpha.addColorStop(0.3, 'rgba(0,0,0,0.4)');
            hAlpha.addColorStop(0.7, 'rgba(0,0,0,0.85)');
            hAlpha.addColorStop(1.0, 'rgba(0,0,0,1)');
            heroCtx.fillStyle = hAlpha;
            heroCtx.fillRect(0, 0, 320, heroH);
            // CRITICAL: Keep the rest of the hero image (portal, person, reflections) 100% intact!
            heroCtx.fillStyle = 'rgba(0,0,0,1)';
            heroCtx.fillRect(320, 0, heroW - 320, heroH);

            ctx.drawImage(heroC, heroX, 0);

            // 4. Atmospheric Horizon Mist Fog Band across mountain valleys
            const mistGrad = ctx.createLinearGradient(0, 880, 0, 1220);
            mistGrad.addColorStop(0, 'rgba(32, 50, 66, 0.0)');
            mistGrad.addColorStop(0.4, 'rgba(50, 72, 92, 0.32)');
            mistGrad.addColorStop(0.75, 'rgba(70, 92, 114, 0.40)');
            mistGrad.addColorStop(0.92, 'rgba(40, 58, 74, 0.25)');
            mistGrad.addColorStop(1.0, 'rgba(15, 22, 28, 0.0)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, 880, heroX + 150, 340);

            // 5. Extended Terrace Floor & Reflections across left side (y: 1205 to 1440)
            const floorTop = 1204;
            const floorH = H - floorTop;

            const floorGrad = ctx.createLinearGradient(0, floorTop, 0, H);
            floorGrad.addColorStop(0, '#0c1218');
            floorGrad.addColorStop(0.15, '#0e161f');
            floorGrad.addColorStop(0.55, '#0a0f14');
            floorGrad.addColorStop(1.0, '#06090c');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, floorTop, heroX + 80, floorH);

            // Terrace boundary edge line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, floorTop);
            ctx.lineTo(heroX + 120, floorTop);
            ctx.stroke();

            // Warm golden dawn light reflection from portal spilling across floor
            const warmReflect = ctx.createRadialGradient(heroX + 300, floorTop + 50, 30, heroX + 300, floorTop + 50, 1200);
            warmReflect.addColorStop(0, 'rgba(210, 165, 115, 0.12)');
            warmReflect.addColorStop(0.35, 'rgba(140, 110, 80, 0.05)');
            warmReflect.addColorStop(0.7, 'rgba(80, 65, 50, 0.015)');
            warmReflect.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmReflect;
            ctx.fillRect(0, floorTop, heroX + 300, floorH);

            // 6. Cinematic Film Grain
            const imgData = ctx.getImageData(0, 0, W, H);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.5;
              d[i] = Math.max(0, Math.min(255, d[i] + noise));
              d[i+1] = Math.max(0, Math.min(255, d[i+1] + noise));
              d[i+2] = Math.max(0, Math.min(255, d[i+2] + noise));
            }
            ctx.putImageData(imgData, 0, 0);

            window.ready = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.ready === true', { timeout: 30000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved ultra-seamless 16:9 PC landscape hero image to ${outPath}`);
  await browser.close();
}

buildUltraSeamlessLandscape().catch(console.error);
