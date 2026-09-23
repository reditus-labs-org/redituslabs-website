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

  const info = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.getElementById('c');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const bgTopLeft = Array.from(ctx.getImageData(10, 10, 1, 1).data);
    const bgCenter = Array.from(ctx.getImageData(Math.floor(img.naturalWidth/2), 10, 1, 1).data);
    const bgBottom = Array.from(ctx.getImageData(10, img.naturalHeight - 10, 1, 1).data);

    // Let's sample along horizontal lines to find divider positions
    // Dividers are vertical lines around y = 150 to 300
    const dividerRow = [];
    const yScan = Math.floor(img.naturalHeight * 0.4);
    for (let x = 0; x < img.naturalWidth; x++) {
      const p = ctx.getImageData(x, yScan, 1, 1).data;
      dividerRow.push({ x, r: p[0], g: p[1], b: p[2] });
    }

    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      bgTopLeft,
      bgCenter,
      bgBottom,
      yScan
    };
  });

  console.log('Image dimensions:', info.width, 'x', info.height);
  console.log('BG samples:', {
    topLeft: `rgb(${info.bgTopLeft.slice(0,3).join(',')})`,
    center: `rgb(${info.bgCenter.slice(0,3).join(',')})`,
    bottom: `rgb(${info.bgBottom.slice(0,3).join(',')})`
  });

  await browser.close();
}

run().catch(console.error);
