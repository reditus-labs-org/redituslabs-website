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
    <img id="img" src="data:image/png;base64,${imgBase64}" />
    <canvas id="c"></canvas>
  `);

  const centers = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.getElementById('c');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const cols = [
      { num: '01', x1: 27, x2: 101 },
      { num: '02', x1: 101, x2: 177 },
      { num: '03', x1: 177, x2: 254 },
      { num: '04', x1: 254, x2: 330 },
      { num: '05', x1: 330, x2: 407 }
    ];

    // For each column, find the bounding box of dark/colored pixels in y: 130 to 205
    return cols.map(col => {
      let minX = col.x2, maxX = col.x1;
      for (let y = 135; y <= 205; y++) {
        for (let x = col.x1 + 3; x <= col.x2 - 3; x++) {
          const p = ctx.getImageData(x, y, 1, 1).data;
          // delta from bg (244, 242, 237)
          const diff = Math.sqrt((p[0]-244)**2 + (p[1]-242)**2 + (p[2]-237)**2);
          if (diff > 25) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }
      const colCenter = (col.x1 + col.x2) / 2;
      const iconCenter = (minX + maxX) / 2;
      return {
        col: col.num,
        colRange: [col.x1, col.x2],
        colWidth: col.x2 - col.x1,
        colCenter,
        iconRange: [minX, maxX],
        iconWidth: maxX - minX,
        iconCenter,
        offsetFromCenter: iconCenter - colCenter
      };
    });
  });

  console.log('Icon centering analysis:', JSON.stringify(centers, null, 2));
  await browser.close();
}

run().catch(console.error);
