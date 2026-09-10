import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788759659391.png';
  const imgBase64 = fs.readFileSync(filePath).toString('base64');
  
  await page.setContent(`
    <img id="img" src="data:image/png;base64,${imgBase64}" />
    <canvas id="c"></canvas>
  `);

  const info = await page.evaluate(() => {
    const img = document.getElementById('img');
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(3)
    };
  });

  console.log('Image dimensions:', info.width, 'x', info.height, 'Aspect Ratio:', info.aspectRatio);

  // Crop right-side text to read clearly
  const textCrop = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const x = Math.floor(img.naturalWidth * 0.75);
    const y = Math.floor(img.naturalHeight * 0.1);
    const w = Math.floor(img.naturalWidth * 0.24);
    const h = Math.floor(img.naturalHeight * 0.25);
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/assets/images/contact_text_crop.png', textCrop.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved contact_text_crop.png');

  await browser.close();
}

inspect().catch(console.error);
