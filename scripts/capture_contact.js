import puppeteer from 'puppeteer-core';

async function captureContact() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Click on "Industries" in the navbar or switcher
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const indBtn = btns.find(b => b.textContent.includes('Industries'));
    if (indBtn) indBtn.click();
  });

  await new Promise(r => setTimeout(r, 1200));

  const contactSection = await page.$('#contact');
  if (contactSection) {
    await contactSection.screenshot({ path: 'current_contact_section_capture.png' });
    console.log('Saved current_contact_section_capture.png');
  } else {
    console.log('Contact section not found');
  }

  await browser.close();
}

captureContact().catch(console.error);
