import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788764547385.png';
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

  console.log('Reference image info:', info);

  // Let's crop the steps area to inspect icons and timeline
  const stepsCrop = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const y = Math.floor(img.naturalHeight * 0.62);
    const h = Math.floor(img.naturalHeight * 0.35);
    c.width = img.naturalWidth;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, y, img.naturalWidth, h, 0, 0, img.naturalWidth, h);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/assets/images/approach_steps_ref.png', stepsCrop.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved approach_steps_ref.png');

  // Crop banner
  const bannerCrop = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    const y = Math.floor(img.naturalHeight * 0.25);
    const h = Math.floor(img.naturalHeight * 0.37);
    c.width = img.naturalWidth;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, y, img.naturalWidth, h, 0, 0, img.naturalWidth, h);
    return c.toDataURL('image/png');
  });
  fs.writeFileSync('public/assets/images/approach_banner_ref.png', bannerCrop.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved approach_banner_ref.png');

  await browser.close();
}

inspect().catch(console.error);
