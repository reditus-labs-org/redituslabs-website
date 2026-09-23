import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function check() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const filePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/db5fd241-8afa-4aa5-9fc0-65a049c9ea43/.user_uploaded/media_1788772390176.png';
  const imgBase64 = fs.readFileSync(filePath).toString('base64');
  await page.setContent(`<img id="img" src="data:image/png;base64,${imgBase64}" />`);
  const dims = await page.evaluate(() => {
    const img = document.getElementById('img');
    return { w: img.naturalWidth, h: img.naturalHeight, ratio: (img.naturalWidth / img.naturalHeight).toFixed(3) };
  });
  console.log('Attached image dims:', dims);
  await browser.close();
}

check().catch(console.error);
