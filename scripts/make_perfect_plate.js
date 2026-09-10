import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function makePerfectPlate() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const imagePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/9cdf68de-58c4-46d6-ae67-527c884471b8/.user_uploaded/media_1788710424971.png';
  const imgBase64 = fs.readFileSync(imagePath).toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>body{margin:0;background:#000;overflow:hidden;}</style></head>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.src = "data:image/png;base64,${imgBase64}";
        img.onload = () => {
          const c = document.getElementById('c');
          const scale = 3; // 1083 x 1461
          c.width = img.naturalWidth * scale;
          c.height = img.naturalHeight * scale;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, c.width, c.height);

          // 1. Clean Top Header (y: 0..42)
          const hH = Math.round(42 * scale);
          const hGrad = ctx.createLinearGradient(0, 0, 0, hH);
          hGrad.addColorStop(0, '#0c1015');
          hGrad.addColorStop(0.5, '#0f141b');
          hGrad.addColorStop(1, '#141b24');
          ctx.fillStyle = hGrad;
          ctx.fillRect(0, 0, Math.round(210 * scale), hH);
          ctx.fillRect(Math.round(290 * scale), 0, Math.round(71 * scale), hH);

          // 2. Clean Headline & Copy Sky Area (x: 0..175, y: 45..242)
          // Draw smooth sky gradient that matches the atmosphere
          const sTop = Math.round(42 * scale);
          const sW = Math.round(175 * scale);
          const sH = Math.round(200 * scale);
          
          const sGrad = ctx.createLinearGradient(0, sTop, 0, sTop + sH);
          sGrad.addColorStop(0, '#121820');
          sGrad.addColorStop(0.3, '#161e27');
          sGrad.addColorStop(0.65, '#1e2936');
          sGrad.addColorStop(1, '#2c3a4a');
          
          ctx.fillStyle = sGrad;
          ctx.fillRect(0, sTop, sW, sH);

          // Soft blend to building shadow on the right
          const bW = Math.round(30 * scale);
          const bX = sW - bW;
          const bGrad = ctx.createLinearGradient(bX, 0, sW, 0);
          bGrad.addColorStop(0, 'rgba(25, 35, 46, 0)');
          bGrad.addColorStop(1, 'rgba(15, 20, 26, 0.95)');
          ctx.fillStyle = bGrad;
          ctx.fillRect(bX, sTop, bW, sH);

          // 3. Clean CTA Buttons (x: 10..180, y: 242..268)
          // Sample the clean mountain slope directly below (y: 270..296)
          const btnW = Math.round(175 * scale);
          const btnH = Math.round(26 * scale);
          const btnX = Math.round(10 * scale);
          const btnY = Math.round(242 * scale);
          const mtnSampleY = Math.round(270 * scale);

          ctx.drawImage(c, btnX, mtnSampleY, btnW, btnH, btnX, btnY, btnW, btnH);

          // Soft atmospheric haze overlay across the button area to blend mountain layers seamlessly
          const hazeGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
          hazeGrad.addColorStop(0, 'rgba(44, 58, 74, 0.85)');
          hazeGrad.addColorStop(0.5, 'rgba(50, 65, 82, 0.45)');
          hazeGrad.addColorStop(1, 'rgba(56, 72, 90, 0.0)');
          ctx.fillStyle = hazeGrad;
          ctx.fillRect(btnX, btnY, btnW, btnH);

          // Add fine photographic sensor grain to inpainted regions
          const grainData = ctx.getImageData(0, 0, sW, btnY + btnH);
          for (let i = 0; i < grainData.data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 5;
            grainData.data[i] = Math.max(0, Math.min(255, grainData.data[i] + noise));
            grainData.data[i+1] = Math.max(0, Math.min(255, grainData.data[i+1] + noise));
            grainData.data[i+2] = Math.max(0, Math.min(255, grainData.data[i+2] + noise));
          }
          ctx.putImageData(grainData, 0, 0);

          // 4. Clean Pillar Text: RETURN. REIMAGINE. REALIZE. (x: 285..355, y: 235..295)
          const pX = Math.round(282 * scale);
          const pY = Math.round(235 * scale);
          const pW = Math.round(75 * scale);
          const pH = Math.round(62 * scale);
          const cleanWallY = Math.round(155 * scale);

          ctx.drawImage(c, pX, cleanWallY, pW, pH, pX, pY, pW, pH);

          // 5. Clean Bottom Right Text: SAME PROBLEMS. HIGHER POSSIBILITIES. (x: 260..355, y: 420..455)
          const fX = Math.round(260 * scale);
          const fY = Math.round(420 * scale);
          const fW = Math.round(95 * scale);
          const fH = Math.round(35 * scale);
          const cleanFloorX = Math.round(210 * scale);

          ctx.drawImage(c, cleanFloorX, fY, fW, fH, fX, fY, fW, fH);

          // 6. Clean Bottom Left Scroll (x: 10..60, y: 415..465)
          const scX = Math.round(10 * scale);
          const scY = Math.round(415 * scale);
          const scW = Math.round(55 * scale);
          const scH = Math.round(50 * scale);
          const cleanWaterX = Math.round(65 * scale);

          ctx.drawImage(c, cleanWaterX, scY, scW, scH, scX, scY, scW, scH);

          window.plateReady = true;
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.plateReady === true', { timeout: 30000 });

  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_faithful_environment.jpg';
  await canvas.screenshot({ path: outPath, type: 'jpeg', quality: 96 });
  console.log(`Saved perfect hero plate to ${outPath}`);

  await browser.close();
}

makePerfectPlate().catch(console.error);
