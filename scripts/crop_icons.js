import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788753733591.png';
  const imgBase64 = fs.readFileSync(filePath).toString('base64');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;">
        <img id="img" src="data:image/png;base64,${imgBase64}" />
        <canvas id="c"></canvas>
      </body>
    </html>
  `);

  // Column boundaries are roughly:
  // Col 1: x: 27 to 101 (center ~64)
  // Col 2: x: 101 to 177 (center ~139)
  // Col 3: x: 177 to 254 (center ~215)
  // Col 4: x: 254 to 330 (center ~292)
  // Col 5: x: 330 to 407 (center ~368)
  // Let's find y bounds of the icons:
  // Icons are between y = 140 and 210
  
  const iconCoords = [
    { name: 'icon_01_product', x: 32, y: 145, w: 64, h: 55 },
    { name: 'icon_02_ai', x: 108, y: 145, w: 64, h: 55 },
    { name: 'icon_03_system', x: 184, y: 145, w: 64, h: 55 },
    { name: 'icon_04_automation', x: 260, y: 145, w: 64, h: 55 },
    { name: 'icon_05_reengineering', x: 336, y: 145, w: 64, h: 55 },
  ];

  for (const ic of iconCoords) {
    const dataUrl = await page.evaluate((ic) => {
      const img = document.getElementById('img');
      const c = document.createElement('canvas');
      c.width = ic.w;
      c.height = ic.h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, ic.x, ic.y, ic.w, ic.h, 0, 0, ic.w, ic.h);
      return c.toDataURL('image/png');
    }, ic);

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(`public/assets/images/${ic.name}_crop.png`, base64Data, 'base64');
  }

  console.log('Saved cropped icons to public/assets/images/');
  await browser.close();
}

run().catch(console.error);
