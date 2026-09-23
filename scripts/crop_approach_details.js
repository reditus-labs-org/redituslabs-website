import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788764547385.png';
  const imgBase64 = fs.readFileSync(filePath).toString('base64');
  
  await page.setContent(`<img id="img" src="data:image/png;base64,${imgBase64}" />`);

  // Crop each of the 5 icons individually at full resolution
  for (let i = 0; i < 5; i++) {
    const iconBase64 = await page.evaluate((idx) => {
      const img = document.getElementById('img');
      const c = document.createElement('canvas');
      const x = Math.floor(img.naturalWidth * 0.81);
      const w = Math.floor(img.naturalWidth * 0.16);
      const startY = Math.floor(img.naturalHeight * 0.615);
      const rowH = Math.floor(img.naturalHeight * 0.0635);
      const y = startY + idx * rowH;
      const h = rowH;
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      return c.toDataURL('image/png');
    }, i);
    fs.writeFileSync(`public/assets/images/ref_icon_${i+1}.png`, iconBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
  }

  // Also crop the number timeline on the left
  const timelineBase64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const x = Math.floor(img.naturalWidth * 0.08);
    const w = Math.floor(img.naturalWidth * 0.17);
    const y = Math.floor(img.naturalHeight * 0.615);
    const h = Math.floor(img.naturalHeight * 0.32);
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return c.toDataURL('image/png');
  });
  fs.writeFileSync('public/assets/images/ref_timeline.png', timelineBase64.replace(/^data:image\/png;base64,/, ''), 'base64');

  // Crop the bottom button
  const btnBase64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const x = 0;
    const w = img.naturalWidth;
    const y = Math.floor(img.naturalHeight * 0.93);
    const h = Math.floor(img.naturalHeight * 0.07);
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return c.toDataURL('image/png');
  });
  fs.writeFileSync('public/assets/images/ref_bottom_btn.png', btnBase64.replace(/^data:image\/png;base64,/, ''), 'base64');

  console.log('Saved all reference crops successfully!');
  await browser.close();
}
run();
