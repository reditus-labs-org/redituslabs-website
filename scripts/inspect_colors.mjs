import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('C:\\Users\\SISASAswath\\.gemini\\antigravity-ide\\brain\\db5fd241-8afa-4aa5-9fc0-65a049c9ea43\\.user_uploaded\\media_1788773261848.png').toString('base64');
  await page.setContent('<canvas id="c"></canvas>');
  const res = await page.evaluate(async (data) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const p1 = ctx.getImageData(10, 10, 1, 1).data;
        const p2 = ctx.getImageData(Math.round(img.naturalWidth / 2), 10, 1, 1).data;
        const p3 = ctx.getImageData(10, img.naturalHeight - 10, 1, 1).data;
        resolve({
          topLeft: [p1[0], p1[1], p1[2]],
          topMid: [p2[0], p2[1], p2[2]],
          bottomLeft: [p3[0], p3[1], p3[2]],
          w: img.naturalWidth,
          h: img.naturalHeight
        });
      };
      img.src = 'data:image/jpeg;base64,' + data;
    });
  }, b64);
  console.log(res);
  await browser.close();
}
main();
