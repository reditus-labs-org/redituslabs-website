import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function exportHD() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/hero_pristine_clean.png').toString('base64');

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
            // 4x upscale: 1444 x 1948
            c.width = img.naturalWidth * 4;
            c.height = img.naturalHeight * 4;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, c.width, c.height);

            // Add microscopic photographic sensor grain for luxury texture
            const imgData = ctx.getImageData(0, 0, c.width, c.height);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const noise = (Math.random() - 0.5) * 3.5;
              d[i] = Math.max(0, Math.min(255, d[i] + noise));
              d[i+1] = Math.max(0, Math.min(255, d[i+1] + noise));
              d[i+2] = Math.max(0, Math.min(255, d[i+2] + noise));
            }
            ctx.putImageData(imgData, 0, 0);

            window.hdReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.hdReady === true', { timeout: 20000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_pristine_hd.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved HD hero backdrop to ${outPath}`);
  
  // Also copy to hero_reference_visual.png
  fs.copyFileSync(outPath, 'public/assets/images/hero_reference_visual.png');
  console.log('Updated public/assets/images/hero_reference_visual.png');

  await browser.close();
}

exportHD().catch(console.error);
