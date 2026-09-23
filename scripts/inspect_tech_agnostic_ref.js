import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788758469849.png';
  const imgBase64 = fs.readFileSync(filePath).toString('base64');
  
  await page.setContent(`
    <img id="img" src="data:image/png;base64,${imgBase64}" />
    <canvas id="c"></canvas>
  `);

  const info = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.getElementById('c');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return {
      width: img.naturalWidth,
      height: img.naturalHeight
    };
  });

  console.log('Reference image dimensions:', info.width, 'x', info.height);

  // Let's crop the right-hand stack area to inspect it clearly
  const stackBase64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    // Stack is on the top right
    const x = Math.floor(img.naturalWidth * 0.65);
    const y = 20;
    const w = Math.floor(img.naturalWidth * 0.32);
    const h = Math.floor(img.naturalHeight * 0.5);
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/assets/images/tech_stack_crop.png', stackBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved tech_stack_crop.png');

  // Also let's crop the button
  const btnBase64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const x = 20;
    const y = Math.floor(img.naturalHeight * 0.65);
    const w = 120;
    const h = 50;
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return c.toDataURL('image/png');
  });
  fs.writeFileSync('public/assets/images/tech_btn_crop.png', btnBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved tech_btn_crop.png');

  await browser.close();
}

inspect().catch(console.error);
