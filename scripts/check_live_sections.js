import puppeteer from 'puppeteer-core';

async function checkBoth() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Wait 1 second
  await new Promise(r => setTimeout(r, 1000));

  // Capture Capabilities
  const cap = await page.$('#capabilities');
  if (cap) {
    await cap.screenshot({ path: 'live_capabilities_now.png' });
  }

  // Capture TechAgnostic
  const tech = await page.$('.tech-agnostic-section');
  if (tech) {
    await tech.screenshot({ path: 'live_tech_agnostic_now.png' });
  }

  console.log('Captured live_capabilities_now.png and live_tech_agnostic_now.png');
  await browser.close();
}

checkBoth().catch(console.error);
