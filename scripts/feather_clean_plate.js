import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateSeamlessCleanPlate() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const imagePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/9cdf68de-58c4-46d6-ae67-527c884471b8/.user_uploaded/media_1788710424971.png';
  const imgBase64 = fs.readFileSync(imagePath).toString('base64');
  const dataUri = `data:image/png;base64,${imgBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>body { margin: 0; background: #000; overflow: hidden; } canvas { display: block; }</style>
    </head>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.src = "${dataUri}";
        img.onload = () => {
          const c = document.getElementById('c');
          const scale = 3; // 1083 x 1461
          c.width = img.naturalWidth * scale;
          c.height = img.naturalHeight * scale;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, c.width, c.height);

          // 1. Cover the white button with dark mountain texture first
          const btnX = Math.round(12 * scale);
          const btnY = Math.round(224 * scale);
          const btnW = Math.round(100 * scale);
          const btnH = Math.round(28 * scale);
          const sampleY = Math.round(256 * scale); // dark mountain slope below

          ctx.drawImage(c, btnX, sampleY, btnW, btnH, btnX, btnY, btnW, btnH);

          // 2. Offscreen heavily blurred copy
          const blurCanvas = document.createElement('canvas');
          blurCanvas.width = c.width;
          blurCanvas.height = c.height;
          const blurCtx = blurCanvas.getContext('2d');
          blurCtx.filter = 'blur(22px)';
          blurCtx.drawImage(c, 0, 0, c.width, c.height);

          // Seamless feathered text dissolution
          function dissolveTextZone(x, y, w, h, feather = 12) {
            const px = Math.round(x * scale);
            const py = Math.round(y * scale);
            const pw = Math.round(w * scale);
            const ph = Math.round(h * scale);
            const pf = Math.round(feather * scale);

            const patch = document.createElement('canvas');
            patch.width = pw;
            patch.height = ph;
            const pCtx = patch.getContext('2d');
            pCtx.drawImage(blurCanvas, px, py, pw, ph, 0, 0, pw, ph);

            const mask = document.createElement('canvas');
            mask.width = pw;
            mask.height = ph;
            const mCtx = mask.getContext('2d');
            mCtx.fillStyle = '#ffffff';
            mCtx.filter = \`blur(\${pf}px)\`;
            mCtx.fillRect(pf, pf, pw - pf * 2, ph - pf * 2);

            pCtx.globalCompositeOperation = 'destination-in';
            pCtx.drawImage(mask, 0, 0);

            ctx.drawImage(patch, px, py);
          }

          // Top Header
          dissolveTextZone(0, 0, 361, 48, 8);

          // Left Headline & Copy
          dissolveTextZone(0, 48, 175, 175, 12);

          // CTA Area (now dark)
          dissolveTextZone(0, 218, 185, 45, 10);

          // Right Pillar Text
          dissolveTextZone(280, 220, 81, 95, 10);

          // Bottom Right text
          dissolveTextZone(258, 410, 103, 50, 10);

          // Bottom Left scroll
          dissolveTextZone(0, 405, 75, 60, 10);

          window.ready = true;
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.ready === true', { timeout: 30000 });

  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_seamless_clean.jpg';
  await canvas.screenshot({ path: outPath, type: 'jpeg', quality: 96 });
  console.log(`Saved completely clean seamless hero plate to ${outPath}`);

  await browser.close();
}

generateSeamlessCleanPlate().catch(console.error);
