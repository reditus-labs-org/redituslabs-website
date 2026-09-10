import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/#approach', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const el = await page.$('.architecture-lab-section');
  if (el) {
    await el.screenshot({ path: 'C:\\Users\\SISASAswath\\.gemini\\antigravity-ide\\brain\\db5fd241-8afa-4aa5-9fc0-65a049c9ea43\\current_arch_live.png' });
    console.log('Captured current_arch_live.png');
  }

  // Also capture focused container
  const container = await page.$('.architecture-container');
  if (container) {
    await container.screenshot({ path: 'C:\\Users\\SISASAswath\\.gemini\\antigravity-ide\\brain\\db5fd241-8afa-4aa5-9fc0-65a049c9ea43\\arch_focused_container.png' });
    console.log('Captured arch_focused_container.png');
  }

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 800));
  const elMobile = await page.$('.architecture-lab-section');
  if (elMobile) {
    await elMobile.screenshot({ path: 'C:\\Users\\SISASAswath\\.gemini\\antigravity-ide\\brain\\db5fd241-8afa-4aa5-9fc0-65a049c9ea43\\arch_mobile_live.png' });
    console.log('Captured arch_mobile_live.png');
  }

  await browser.close();
}
capture();
