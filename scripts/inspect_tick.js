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

  const results = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.getElementById('c');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's inspect a 15x25 window around x=101, y=110 to 135
    const windowMap = [];
    for (let y = 115; y <= 135; y++) {
      let row = `y=${y.toString().padStart(3, ' ')}: `;
      for (let x = 95; x <= 106; x++) {
        const p = ctx.getImageData(x, y, 1, 1).data;
        const b = (p[0] + p[1] + p[2]) / 3;
        row += b < 235 ? '#' : '.';
      }
      windowMap.push(row);
    }

    // Also inspect around x=254, y=115 to 135
    const windowMap4 = [];
    for (let y = 115; y <= 135; y++) {
      let row = `y=${y.toString().padStart(3, ' ')}: `;
      for (let x = 248; x <= 258; x++) {
        const p = ctx.getImageData(x, y, 1, 1).data;
        const b = (p[0] + p[1] + p[2]) / 3;
        row += b < 235 ? '#' : '.';
      }
      windowMap4.push(row);
    }

    return { windowMap, windowMap4 };
  });

  console.log('Divider tick shape at x=101:');
  console.log(results.windowMap.join('\n'));

  console.log('Divider tick shape at x=254:');
  console.log(results.windowMap4.join('\n'));

  await browser.close();
}

run().catch(console.error);
