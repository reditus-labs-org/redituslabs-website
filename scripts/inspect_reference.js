import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function inspect() {
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
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Sample vertical profile along x=80
            const samples = [];
            for (let y = 0; y < img.naturalHeight; y += 15) {
              const p = ctx.getImageData(80, y, 1, 1).data;
              samples.push({ y, r: p[0], g: p[1], b: p[2] });
            }

            // Find building left edge at y=200
            let buildingX = -1;
            for (let x = 150; x < 250; x++) {
              const p = ctx.getImageData(x, 200, 1, 1).data;
              // building wall is noticeably darker or different
              if (p[0] < 35 && p[1] < 40 && p[2] < 45) {
                buildingX = x;
                break;
              }
            }

            window.data = { width: img.naturalWidth, height: img.naturalHeight, samples, buildingX };
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.data !== undefined', { timeout: 10000 });
  const data = await page.evaluate(() => window.data);
  console.log('Image dimensions:', data.width, 'x', data.height);
  console.log('Building left edge around y=200:', data.buildingX);
  console.log('Vertical profile at x=80:');
  console.table(data.samples);

  await browser.close();
}

inspect().catch(console.error);
