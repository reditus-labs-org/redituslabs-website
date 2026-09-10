import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function testSimpleDraw() {
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

            const heroH = H;
            const heroW = Math.round(heroH * (img.naturalWidth / img.naturalHeight)); // 1067
            const heroX = W - heroW; // 1493

            // 1. Draw hero image on the right
            ctx.drawImage(img, heroX, 0, heroW, heroH);

            // 2. Draw left slice mirrored on far left (0 to 1000)
            ctx.save();
            ctx.translate(1000, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, Math.round(img.naturalWidth * 0.48), img.naturalHeight, 0, 0, 1000, heroH);
            ctx.restore();

            // 3. Draw left slice in the middle (700 to heroX + 50)
            ctx.drawImage(img, 0, 0, Math.round(img.naturalWidth * 0.48), img.naturalHeight, 600, 0, heroX - 550, heroH);

            // 4. Smooth linear blend over the seam at x = heroX (from heroX - 100 to heroX + 100)
            const seamGrad = ctx.createLinearGradient(heroX - 80, 0, heroX + 80, 0);
            seamGrad.addColorStop(0, 'rgba(12, 22, 30, 0)');
            seamGrad.addColorStop(0.5, 'rgba(12, 22, 30, 0.45)');
            seamGrad.addColorStop(1, 'rgba(12, 22, 30, 0)');
            ctx.fillStyle = seamGrad;
            ctx.fillRect(heroX - 80, 0, 160, H);

            // Seam at x = 700
            const seam1 = ctx.createLinearGradient(620, 0, 780, 0);
            seam1.addColorStop(0, 'rgba(12, 22, 30, 0)');
            seam1.addColorStop(0.5, 'rgba(12, 22, 30, 0.45)');
            seam1.addColorStop(1, 'rgba(12, 22, 30, 0)');
            ctx.fillStyle = seam1;
            ctx.fillRect(620, 0, 160, H);

            window.ready = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.ready === true', { timeout: 15000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_landscape_pc.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved simple draw to ${outPath}`);
  await browser.close();
}

testSimpleDraw().catch(console.error);
