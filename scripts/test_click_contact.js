import puppeteer from 'puppeteer-core';

async function testClick() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Click .hero-primary-white-btn
  await page.evaluate(() => {
    const btn = document.querySelector('.hero-primary-white-btn');
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 1500));

  const pageInfo = await page.evaluate(() => {
    const contact = document.getElementById('contact');
    return { hasContact: !!contact };
  });

  console.log('Has contact after clicking Start a conversation:', pageInfo);

  if (pageInfo.hasContact) {
    const el = await page.$('#contact');
    if (el) {
      await el.screenshot({ path: 'current_contact_section_capture.png' });
      console.log('Saved current_contact_section_capture.png');
    }
  }

  await browser.close();
}

testClick().catch(console.error);
