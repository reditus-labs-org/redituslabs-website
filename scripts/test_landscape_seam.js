import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function testLandscapeSeam() {
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
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const natW = img.naturalWidth;   // 1444
            const natH = img.naturalHeight;  // 1948

            // Let's analyze the hero placement:
            // If the hero image is placed on the right so its right edge is at W:
            const heroH = H;
            const heroW = Math.round(heroH * (natW / natH)); // 1067
            const heroX = W - heroW; // 1493

            // What if we draw the hero image at (heroX, 0) with width heroW, height heroH?
            // In the hero image, the pool is located in the lower-left:
            // In original coordinates: x: 0 to ~480, y: ~1550 to 1948
            // In canvas coordinates: x: 1493 to ~1850, y: ~1145 to 1440.

            // Notice that the pool is an architectural cutout in the floor.
            // But having it cut off at x = 1493 looks like an accidental hard crop!
            // If we inpaint / patch the floor where the cutout was cut off, OR if we extend the pool gracefully, OR if we fill the pool cutout with the reflective terrace floor:
            // Let's see: what does the floor look like to the right of the pool?
            // At x = 500 to 750 in original image, the floor is pure reflective granite slab with subtle perspective lines and warm glow.
            
            console.log('Hero image loaded:', natW, natH);
            window.testReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.testReady === true', { timeout: 10000 });
  await browser.close();
  console.log('Test setup verified.');
}

testLandscapeSeam().catch(console.error);
