import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function generatePerfectCleanPlate() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.src = "data:image/png;base64,${imgBase64}";
          img.onload = () => {
            const c = document.getElementById('c');
            const W = img.naturalWidth;
            const H = img.naturalHeight;
            // High-resolution supersampling: 3x (1083 x 1461)
            const S = 3;
            c.width = W * S;
            c.height = H * S;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, c.width, c.height);

            const swW = c.width;
            const swH = c.height;

            // 1. Clean Top Header: y = 0 to 45 * S across the entire width
            // Sample the smooth sky gradient from the pristine area below header (y = 45*S to 60*S)
            // Top of sky is around rgb(8, 20, 27) down to rgb(12, 23, 31)
            const headH = Math.round(42 * S);
            const headGrad = ctx.createLinearGradient(0, 0, 0, headH);
            headGrad.addColorStop(0, '#071219');
            headGrad.addColorStop(0.5, '#0a1720');
            headGrad.addColorStop(1, '#0e1c25');
            ctx.fillStyle = headGrad;
            ctx.fillRect(0, 0, swW, headH);

            // Add soft feather at bottom of header (y = 38*S to 46*S)
            const hFeather = ctx.createLinearGradient(0, Math.round(36 * S), 0, Math.round(46 * S));
            hFeather.addColorStop(0, 'rgba(14, 28, 37, 1.0)');
            hFeather.addColorStop(1, 'rgba(14, 28, 37, 0.0)');
            ctx.fillStyle = hFeather;
            ctx.fillRect(0, Math.round(36 * S), swW, Math.round(10 * S));

            // 2. Clean Left Narrative Area (x: 0 to 172 * S, y: 44 * S to 280 * S)
            // Left boundary (x=0), Top boundary (y=44*S), Right boundary (x=172*S near building shadow),
            // Bottom boundary (y=280*S above mountain ridge at 300*S)
            // The sky transitions smoothly from dark blue at y=44*S to misty dawn atmosphere at y=280*S
            const leftW = Math.round(172 * S);
            const leftTop = Math.round(44 * S);
            const leftH = Math.round((280 - 44) * S);

            const skyGrad = ctx.createLinearGradient(0, leftTop, 0, leftTop + leftH);
            skyGrad.addColorStop(0, '#0e1c25');
            skyGrad.addColorStop(0.2, '#12202a');
            skyGrad.addColorStop(0.5, '#192834');
            skyGrad.addColorStop(0.75, '#233443');
            skyGrad.addColorStop(0.9, '#314455');
            skyGrad.addColorStop(1, '#44576a'); // dawn mountain mist tone

            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, leftTop, leftW, leftH);

            // Soft atmospheric shadow blend on right edge of sky where building starts
            const shadowW = Math.round(24 * S);
            const shadowX = leftW - shadowW;
            const shadowGrad = ctx.createLinearGradient(shadowX, 0, leftW, 0);
            shadowGrad.addColorStop(0, 'rgba(14, 20, 26, 0.0)');
            shadowGrad.addColorStop(0.6, 'rgba(14, 20, 26, 0.5)');
            shadowGrad.addColorStop(1, 'rgba(14, 20, 26, 0.95)');
            ctx.fillStyle = shadowGrad;
            ctx.fillRect(shadowX, leftTop, shadowW, leftH);

            // Soft feather blend at bottom into the mountain mist (y: 270*S to 290*S)
            const mistFeather = ctx.createLinearGradient(0, Math.round(270 * S), 0, Math.round(290 * S));
            mistFeather.addColorStop(0, 'rgba(68, 87, 106, 0.0)');
            mistFeather.addColorStop(0.5, 'rgba(68, 87, 106, 0.4)');
            mistFeather.addColorStop(1, 'rgba(68, 87, 106, 0.0)');
            ctx.fillStyle = mistFeather;
            ctx.fillRect(0, Math.round(270 * S), leftW, Math.round(20 * S));

            // 3. Clean Right Pillar text: RETURN. REIMAGINE. REALIZE.
            // Text is at x: 280*S to 355*S, y: 232*S to 298*S
            // Clean concrete wall is at x: 280*S to 355*S, y: 140*S to 206*S
            const pX = Math.round(278 * S);
            const pY = Math.round(230 * S);
            const pW = Math.round(77 * S);
            const pH = Math.round(70 * S);
            const cleanWallY = Math.round(150 * S);

            // Use an offscreen canvas with feathered edges to clone the concrete texture
            const offC = document.createElement('canvas');
            offC.width = pW;
            offC.height = pH;
            const offCtx = offC.getContext('2d');
            offCtx.drawImage(c, pX, cleanWallY, pW, pH, 0, 0, pW, pH);

            // Create radial/gradient feather mask on offC
            offCtx.globalCompositeOperation = 'destination-in';
            const fGrad = offCtx.createRadialGradient(pW/2, pH/2, pW*0.2, pW/2, pH/2, pW*0.6);
            fGrad.addColorStop(0, 'rgba(0,0,0,1)');
            fGrad.addColorStop(0.7, 'rgba(0,0,0,0.95)');
            fGrad.addColorStop(1, 'rgba(0,0,0,0)');
            offCtx.fillStyle = fGrad;
            offCtx.fillRect(0, 0, pW, pH);

            ctx.drawImage(offC, pX, pY);

            // 4. Clean Floor Text: SAME PROBLEMS. HIGHER POSSIBILITIES.
            // Located at x: 260*S to 355*S, y: 420*S to 456*S
            // Pristine floor with same reflection tone is at x: 190*S to 255*S, y: 420*S to 456*S
            const flX = Math.round(258 * S);
            const flY = Math.round(418 * S);
            const flW = Math.round(98 * S);
            const flH = Math.round(40 * S);
            const sampleFlX = Math.round(180 * S);

            const flOff = document.createElement('canvas');
            flOff.width = flW;
            flOff.height = flH;
            const flOffCtx = flOff.getContext('2d');
            flOffCtx.drawImage(c, sampleFlX, flY, flW, flH, 0, 0, flW, flH);

            flOffCtx.globalCompositeOperation = 'destination-in';
            const flGrad = flOffCtx.createRadialGradient(flW/2, flH/2, flW*0.2, flW/2, flH/2, flW*0.55);
            flGrad.addColorStop(0, 'rgba(0,0,0,1)');
            flGrad.addColorStop(0.75, 'rgba(0,0,0,0.9)');
            flGrad.addColorStop(1, 'rgba(0,0,0,0)');
            flOffCtx.fillStyle = flGrad;
            flOffCtx.fillRect(0, 0, flW, flH);

            ctx.drawImage(flOff, flX, flY);

            // 5. Clean Bottom Left Scroll indicator
            // Located at x: 10*S to 55*S, y: 415*S to 465*S
            const scX = Math.round(8 * S);
            const scY = Math.round(412 * S);
            const scW = Math.round(50 * S);
            const scH = Math.round(55 * S);
            const scSampleX = Math.round(65 * S);

            const scOff = document.createElement('canvas');
            scOff.width = scW;
            scOff.height = scH;
            const scOffCtx = scOff.getContext('2d');
            scOffCtx.drawImage(c, scSampleX, scY, scW, scH, 0, 0, scW, scH);

            scOffCtx.globalCompositeOperation = 'destination-in';
            const scGrad = scOffCtx.createRadialGradient(scW/2, scH/2, scW*0.15, scW/2, scH/2, scW*0.5);
            scGrad.addColorStop(0, 'rgba(0,0,0,1)');
            scGrad.addColorStop(0.8, 'rgba(0,0,0,0.85)');
            scGrad.addColorStop(1, 'rgba(0,0,0,0)');
            scOffCtx.fillStyle = scGrad;
            scOffCtx.fillRect(0, 0, scW, scH);

            ctx.drawImage(scOff, scX, scY);

            // 6. Natural Sensor / Film Grain
            // Add ultra-fine film grain across the left sky so it seamlessly matches the photographic grain
            const grainImgData = ctx.getImageData(0, 0, leftW, leftTop + leftH);
            const gData = grainImgData.data;
            for (let i = 0; i < gData.length; i += 4) {
              const noise = (Math.random() - 0.5) * 6;
              gData[i] = Math.max(0, Math.min(255, gData[i] + noise));
              gData[i+1] = Math.max(0, Math.min(255, gData[i+1] + noise));
              gData[i+2] = Math.max(0, Math.min(255, gData[i+2] + noise));
            }
            ctx.putImageData(grainImgData, 0, 0);

            window.plateReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.plateReady === true', { timeout: 15000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_pristine_environment.jpg';
  await canvas.screenshot({ path: outPath, type: 'jpeg', quality: 97 });
  console.log(`Saved ultra-clean hero environment to ${outPath}`);
  await browser.close();
}

generatePerfectCleanPlate().catch(console.error);
