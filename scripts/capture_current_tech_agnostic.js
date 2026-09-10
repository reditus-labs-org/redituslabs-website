import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const section = await page.$('.tech-agnostic-section');
  if (section) {
    await section.screenshot({ path: 'current_tech_agnostic_capture.png' });
    console.log('Saved current_tech_agnostic_capture.png');
  } else {
    console.log('Tech agnostic section not found');
  }

  await browser.close();
}

capture().catch(console.error);
