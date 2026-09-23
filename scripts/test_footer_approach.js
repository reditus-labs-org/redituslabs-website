import puppeteer from 'puppeteer-core';

async function testApproach() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Click the footer link for Approach
  await page.evaluate(() => {
    const footerLinks = Array.from(document.querySelectorAll('.home-footer-nav a'));
    const appLink = footerLinks.find(a => a.textContent === 'Approach');
    if (appLink) appLink.click();
  });

  await new Promise(r => setTimeout(r, 1200));

  const info = await page.evaluate(() => {
    const approach = document.getElementById('approach');
    return { hasApproach: !!approach };
  });

  console.log('Has approach:', info);

  if (info.hasApproach) {
    const el = await page.$('#approach');
    if (el) {
      await el.screenshot({ path: 'current_approach_section_capture.png' });
      console.log('Saved current_approach_section_capture.png');
    }
  }

  await browser.close();
}

testApproach().catch(console.error);
