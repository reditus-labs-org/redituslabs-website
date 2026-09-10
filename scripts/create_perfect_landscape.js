import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function buildPerfectLandscape() {
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
            const heroW = Math.round(heroH * (img.naturalWidth / img.naturalHeight)); // 1067
            const heroX = W - heroW; // 1493

            // 1. SKY & ATMOSPHERE LAYER (y: 0 to 1205 across full width 2560)
            // Base sky gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
            skyGrad.addColorStop(0, '#071219');
            skyGrad.addColorStop(0.3, '#0a1721');
            skyGrad.addColorStop(0.55, '#11222f');
            skyGrad.addColorStop(0.70, '#1f3241'); // dawn mist horizon
            skyGrad.addColorStop(0.80, '#15212a'); // mountain base
            skyGrad.addColorStop(0.85, '#0c1218'); // terrace edge
            skyGrad.addColorStop(1.0, '#070a0d'); // floor bottom
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, W, H);

            // 2. MOUNTAIN & MIST BAND (y: 820 to 1210)
            // Extract the mountain band from img
            const natW = img.naturalWidth;
            const natH = img.naturalHeight;
            const mSliceW = Math.round(natW * 0.48); // ~693
            const mtnTop = Math.round(natH * 0.58); // ~1130
            const mtnH = Math.round(natH * 0.26); // ~506
            const destMtnY = Math.round(H * 0.58); // 835
            const destMtnH = Math.round(H * 0.26); // 374

            // Create offscreen mountain canvas
            const mC = document.createElement('canvas');
            mC.width = mSliceW;
            mC.height = mtnH;
            const mCtx = mC.getContext('2d');
            mCtx.drawImage(img, 0, mtnTop, mSliceW, mtnH, 0, 0, mSliceW, mtnH);

            // Layer 1: Left mountain range (mirrored, x: 0 to 850)
            ctx.save();
            ctx.translate(850, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(mC, 0, 0, mSliceW, mtnH, 0, destMtnY, 850, destMtnH);
            ctx.restore();

            // Layer 2: Center mountain range with 300px linear cross-fade into Layer 1 (x: 600 to heroX + 50)
            const midW = (heroX + 50) - 600; // ~943px
            const midC = document.createElement('canvas');
            midC.width = midW;
            midC.height = destMtnH;
            const midCtx = midC.getContext('2d');
            midCtx.drawImage(mC, 0, 0, mSliceW, mtnH, 0, 0, midW, destMtnH);

            // Feather left edge of midC (0 to 300px)
            const midGrad = midCtx.createLinearGradient(0, 0, 300, 0);
            midGrad.addColorStop(0, 'rgba(0,0,0,0)');
            midGrad.addColorStop(1, 'rgba(0,0,0,1)');
            midCtx.globalCompositeOperation = 'destination-in';
            midCtx.fillStyle = midGrad;
            midCtx.fillRect(0, 0, 300, destMtnH);
            midCtx.fillStyle = 'rgba(0,0,0,1)';
            midCtx.fillRect(300, 0, midW - 300, destMtnH);

            ctx.drawImage(midC, 600, destMtnY);

            // 3. DRAW HERO IMAGE ON RIGHT (x: heroX to W)
            // Feather the left 280px of the mountain band in hero image so it seamlessly merges with mid mountains
            const hC = document.createElement('canvas');
            hC.width = heroW;
            hC.height = heroH;
            const hCtx = hC.getContext('2d');
            hCtx.drawImage(img, 0, 0, heroW, heroH);

            // Feather left edge of hC in the sky and mountain band (0 to 250px)
            const hGrad = hCtx.createLinearGradient(0, 0, 250, 0);
            hGrad.addColorStop(0, 'rgba(0,0,0,0)');
            hGrad.addColorStop(1, 'rgba(0,0,0,1)');
            hCtx.globalCompositeOperation = 'destination-in';
            hCtx.fillStyle = hGrad;
            // Apply only to left strip: 0 to 250
            hCtx.fillRect(0, 0, 250, heroH);
            // CRITICAL: keep everything from 250 to heroW 100% untouched!
            hCtx.fillStyle = '#fff';
            hCtx.fillRect(250, 0, heroW - 250, heroH);

            ctx.drawImage(hC, heroX, 0);

            // 4. SOFT ATMOSPHERIC HORIZON MIST (across full width x: 0 to heroX + 100)
            // Adds soft dawn fog in mountain valleys, erasing any subtle ridge discrepancies
            const fogGrad = ctx.createLinearGradient(0, destMtnY + 60, 0, destMtnY + destMtnH);
            fogGrad.addColorStop(0, 'rgba(35, 52, 68, 0.0)');
            fogGrad.addColorStop(0.45, 'rgba(55, 78, 98, 0.38)');
            fogGrad.addColorStop(0.75, 'rgba(75, 98, 118, 0.48)');
            fogGrad.addColorStop(0.92, 'rgba(45, 62, 78, 0.30)');
            fogGrad.addColorStop(1.0, 'rgba(15, 22, 28, 0.0)');
            ctx.fillStyle = fogGrad;
            ctx.fillRect(0, destMtnY + 60, heroX + 150, destMtnH - 60);

            // 5. EXTENDED ARCHITECTURAL TERRACE FLOOR (y: 1205 to 1440, x: 0 to heroX + 120)
            const floorTop = 1205;
            const floorH = H - floorTop;

            const floorGrad = ctx.createLinearGradient(0, floorTop, 0, H);
            floorGrad.addColorStop(0, '#0c1218');
            floorGrad.addColorStop(0.12, '#0e151e');
            floorGrad.addColorStop(0.5, '#0b1016');
            floorGrad.addColorStop(1.0, '#070a0e');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, floorTop, heroX + 80, floorH);

            // Terrace boundary edge line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, floorTop);
            ctx.lineTo(heroX + 120, floorTop);
            ctx.stroke();

            // Warm golden light reflections spilling across the terrace from the portal
            const warmReflect = ctx.createRadialGradient(heroX + 280, floorTop + 60, 40, heroX + 280, floorTop + 60, 1300);
            warmReflect.addColorStop(0, 'rgba(225, 175, 125, 0.14)');
            warmReflect.addColorStop(0.3, 'rgba(150, 115, 85, 0.06)');
            warmReflect.addColorStop(0.7, 'rgba(80, 65, 50, 0.015)');
            warmReflect.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmReflect;
            ctx.fillRect(0, floorTop, heroX + 350, floorH);

            // Draw the elegant geometric water channel entering from the bottom-left corner
            // Sample the water cutout from img (x: 0 to 300, y: 1680 to 1948)
            const waterNatTop = Math.round(natH * 0.86);
            const waterNatH = natH - waterNatTop;
            const waterNatW = Math.round(natW * 0.38);
            const waterDestW = Math.round(heroW * 0.38);
            const waterDestH = floorH;

            // Blend water cutout gently into the left floor
            const wC = document.createElement('canvas');
            wC.width = waterDestW;
            wC.height = waterDestH;
            const wCtx = wC.getContext('2d');
            wCtx.drawImage(img, 0, waterNatTop, waterNatW, waterNatH, 0, 0, waterDestW, waterDestH);

            // Feather right edge of water cutout
            const wFade = wCtx.createLinearGradient(waterDestW - 120, 0, waterDestW, 0);
            wFade.addColorStop(0, 'rgba(0,0,0,1)');
            wFade.addColorStop(1, 'rgba(0,0,0,0)');
            wCtx.globalCompositeOperation = 'destination-in';
            wCtx.fillStyle = wFade;
            wCtx.fillRect(waterDestW - 120, 0, 120, waterDestH);

            ctx.drawImage(wC, 0, floorTop);

            // 6. Photographic Sensor Grain across entire canvas
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
  console.log(`Saved perfect 16:9 PC landscape hero image to ${outPath}`);
  await browser.close();
}

buildPerfectLandscape().catch(console.error);
