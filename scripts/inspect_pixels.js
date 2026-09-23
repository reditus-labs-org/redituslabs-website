import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  const imagePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/9cdf68de-58c4-46d6-ae67-527c884471b8/.user_uploaded/media_1788710424971.png';
  const imgBase64 = fs.readFileSync(imagePath).toString('base64');
  
  const html = `
    <html><body>
      <img id="i" src="data:image/png;base64,${imgBase64}" />
      <canvas id="c"></canvas>
      <script>
        const img = document.getElementById('i');
        img.onload = () => {
          const c = document.getElementById('c');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, c.width, c.height).data;
          
          let minX = 999, maxX = 0, minY = 999, maxY = 0;
          for (let y = 0; y < c.height; y++) {
            for (let x = 0; x < c.width; x++) {
              const idx = (y * c.width + x) * 4;
              const r = data[idx], g = data[idx+1], b = data[idx+2];
              // Find white button pixels
              if (r > 230 && g > 230 && b > 230 && x < 120 && y > 200 && y < 300) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          window.result = { button: { minX, maxX, minY, maxY }, w: c.width, h: c.height };
        };
      </script>
    </body></html>
  `;
  
  await page.setContent(html);
  await page.waitForFunction('window.result !== undefined');
  const res = await page.evaluate('window.result');
  console.log('Coordinates:', res);
  await browser.close();
}

inspect().catch(console.error);
