import puppeteer from 'puppeteer-core';

async function verifyRemoval() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/#approach', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Check if floating switcher exists in DOM
  const switcher = await page.$('.floating-page-switcher');
  console.log('Floating switcher exists in DOM:', switcher !== null);

  // Take screenshot of viewport
  await page.screenshot({ path: 'C:\\Users\\SISASAswath\\.gemini\\antigravity-ide\\brain\\db5fd241-8afa-4aa5-9fc0-65a049c9ea43\\page_after_button_removed.png' });
  console.log('Saved page_after_button_removed.png');

  await browser.close();
}
verifyRemoval();
