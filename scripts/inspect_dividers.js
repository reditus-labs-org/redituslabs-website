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

    // Look at divider lines around y = 140 (between numbers and icons)
    const y = 140;
    const darkPoints = [];
    for (let x = 0; x < img.naturalWidth; x++) {
      const p = ctx.getImageData(x, y, 1, 1).data;
      const brightness = (p[0] + p[1] + p[2]) / 3;
      if (brightness < 235) { // darker than background ~243
        darkPoints.push({ x, brightness });
      }
    }

    // Also look at top of dividers around y = 115 to 130 to see the tick marks
    const ticks = [];
    for (let testY = 115; testY <= 135; testY += 2) {
      for (let x = 0; x < img.naturalWidth; x++) {
        const p = ctx.getImageData(x, testY, 1, 1).data;
        const brightness = (p[0] + p[1] + p[2]) / 3;
        if (brightness < 230) {
          ticks.push({ x, y: testY, brightness, p: [p[0], p[1], p[2]] });
        }
      }
    }

    return { darkPoints, ticksSample: ticks.slice(0, 30) };
  });

  console.log('Vertical divider candidates at y=140:');
  console.log(results.darkPoints);

  await browser.close();
}

run().catch(console.error);
