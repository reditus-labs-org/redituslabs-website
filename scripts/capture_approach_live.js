import puppeteer from 'puppeteer-core';

async function captureApproach() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Click Approach link/button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.switch-seg-btn, .nav-link, button'));
    const appBtn = btns.find(b => b.textContent?.includes('Approach'));
    if (appBtn) appBtn.click();
  });

  await new Promise(r => setTimeout(r, 1200));

  const approachSection = await page.$('#approach');
  if (approachSection) {
    await approachSection.screenshot({ path: 'current_approach_section_capture.png' });
    console.log('Saved current_approach_section_capture.png');
  } else {
    console.log('Approach section not found');
  }

  await browser.close();
}

captureApproach().catch(console.error);
