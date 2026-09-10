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
  
  // Scroll to #capabilities
  const section = await page.$('#capabilities');
  if (section) {
    await section.screenshot({ path: 'current_capabilities_capture.png' });
    console.log('Saved current_capabilities_capture.png');
  } else {
    console.log('Capabilities section not found');
  }

  await browser.close();
}

capture().catch(console.error);
