import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function createLandscapeHero() {
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

          function run() {
            loaded++;
            if (loaded < 2) return;

            const W = 2560;
            const H = 1440;
            const c = document.getElementById('c');
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // 1. Full-bleed Dark Cinematic Sky Gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
            skyGrad.addColorStop(0, '#071219');
            skyGrad.addColorStop(0.25, '#0a1721');
            skyGrad.addColorStop(0.5, '#11222e');
            skyGrad.addColorStop(0.68, '#1e3242');
            skyGrad.addColorStop(0.78, '#2b3f52'); // mist horizon
            skyGrad.addColorStop(0.85, '#17232e'); // terrace edge
            skyGrad.addColorStop(1.0, '#0a0e13'); // dark floor
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, W, H);

            // 2. Mountain Range Extension across left and center (x: 0 to 1750, y: 720 to 1220)
            // Draw mountain into offscreen canvas
            const mW = 1800;
            const mH = 500;
            const mC = document.createElement('canvas');
            mC.width = mW;
            mC.height = mH;
            const mCtx = mC.getContext('2d');
            // Draw mountain image cropped to the ridge section
            mCtx.drawImage(mtnImg, 0, 200, mtnImg.naturalWidth, 600, 0, 0, mW, mH);

            // Color grade mountain to cool dark blue-gray with dawn tone
            mCtx.globalCompositeOperation = 'multiply';
            mCtx.fillStyle = '#6c8294';
            mCtx.fillRect(0, 0, mW, mH);

            mCtx.globalCompositeOperation = 'source-over';
            // Atmospheric mist over mountain base
            const mistGrad = mCtx.createLinearGradient(0, 0, 0, mH);
            mistGrad.addColorStop(0, 'rgba(15, 25, 35, 0.0)');
            mistGrad.addColorStop(0.5, 'rgba(40, 58, 75, 0.25)');
            mistGrad.addColorStop(0.85, 'rgba(65, 85, 105, 0.6)');
            mistGrad.addColorStop(1.0, 'rgba(30, 45, 58, 0.9)');
            mCtx.fillStyle = mistGrad;
            mCtx.fillRect(0, 0, mW, mH);

            // Feather top of mountain into sky
            const mFadeC = document.createElement('canvas');
            mFadeC.width = mW;
            mFadeC.height = mH;
            const mFadeCtx = mFadeC.getContext('2d');
            mFadeCtx.drawImage(mC, 0, 0);

            // Gradient mask for mountain (fade top and fade right)
            const topFade = mFadeCtx.createLinearGradient(0, 0, 0, 140);
            topFade.addColorStop(0, 'rgba(10, 18, 25, 1.0)');
            topFade.addColorStop(0.7, 'rgba(10, 18, 25, 0.5)');
            topFade.addColorStop(1, 'rgba(10, 18, 25, 0.0)');
            mFadeCtx.fillStyle = topFade;
            mFadeCtx.fillRect(0, 0, mW, 140);

            // Blend right side of mountain
            const rFade = mFadeCtx.createLinearGradient(mW - 400, 0, mW, 0);
            rFade.addColorStop(0, 'rgba(0,0,0,0)');
            rFade.addColorStop(1, 'rgba(15, 25, 35, 1)');
            mFadeCtx.fillStyle = rFade;
            mFadeCtx.fillRect(mW - 400, 0, 400, mH);

            // Draw mountain onto main canvas
            ctx.drawImage(mFadeC, 0, 710, mW, mH);

            // 3. Draw Hero Image on the Right
            // Hero natural aspect ratio: 361 / 487 (1444 / 1948)
            // Fit height = 1440, width = 1067
            const hH = H;
            const hW = Math.round(hH * (heroImg.naturalWidth / heroImg.naturalHeight)); // 1067
            const hX = W - hW; // 1493

            // Draw hero image directly on right
            ctx.drawImage(heroImg, hX, 0, hW, hH);

            // 4. Seamless Horizontal Transition Blend between Left Landscape and Hero
            // We blend the vertical strip around x = hX (from hX - 100 to hX + 250)
            // In the sky (y: 0 to 850)
            const skyBlend = ctx.createLinearGradient(hX - 80, 0, hX + 200, 0);
            skyBlend.addColorStop(0, 'rgba(14, 28, 38, 0.0)');
            skyBlend.addColorStop(0.4, 'rgba(14, 28, 38, 0.4)');
            skyBlend.addColorStop(0.7, 'rgba(14, 28, 38, 0.2)');
            skyBlend.addColorStop(1, 'rgba(14, 28, 38, 0.0)');
            ctx.fillStyle = skyBlend;
            ctx.fillRect(hX - 80, 0, 280, 850);

            // In the mountain mist zone (y: 850 to 1210)
            const mistBlend = ctx.createLinearGradient(hX - 120, 0, hX + 180, 0);
            mistBlend.addColorStop(0, 'rgba(50, 70, 90, 0.0)');
            mistBlend.addColorStop(0.5, 'rgba(55, 75, 95, 0.35)');
            mistBlend.addColorStop(1, 'rgba(50, 70, 90, 0.0)');
            ctx.fillStyle = mistBlend;
            ctx.fillRect(hX - 120, 850, 300, 360);

            // 5. Dark Architectural Terrace Floor (y: 1205 to 1440 across left)
            const floorTop = 1206;
            const floorH = H - floorTop;

            const floorGrad = ctx.createLinearGradient(0, floorTop, 0, H);
            floorGrad.addColorStop(0, '#0c1218');
            floorGrad.addColorStop(0.15, '#0e151e');
            floorGrad.addColorStop(0.5, '#0b1016');
            floorGrad.addColorStop(1, '#070a0d');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, floorTop, hX + 120, floorH);

            // Terrace boundary edge line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, floorTop);
            ctx.lineTo(hX + 160, floorTop);
            ctx.stroke();

            // Subtle floor reflection of the mountain sky
            const flReflect = ctx.createRadialGradient(800, floorTop + 60, 20, 800, floorTop + 60, 600);
            flReflect.addColorStop(0, 'rgba(140, 160, 185, 0.05)');
            flReflect.addColorStop(0.5, 'rgba(80, 100, 120, 0.02)');
            flReflect.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = flReflect;
            ctx.fillRect(0, floorTop, hX + 120, floorH);

            // 6. Natural Sensor / Film Grain
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
          }

          heroImg.onload = run;
          mtnImg.onload = run;
          heroImg.src = "data:image/png;base64,${heroBase64}";
          mtnImg.src = "data:image/jpeg;base64,${mtnBase64}";
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.ready === true', { timeout: 30000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved flawless 16:9 PC landscape hero image to ${outPath}`);
  await browser.close();
}

createLandscapeHero().catch(console.error);
