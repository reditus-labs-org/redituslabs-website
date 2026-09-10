import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/#approach', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Check if approach section is present
  const hasApproach = await page.$('#approach');
  console.log('Has #approach on page:', !!hasApproach);

  if (hasApproach) {
    // Screenshot section
    await hasApproach.screenshot({ path: 'verified_approach_desktop.png' });
    console.log('Saved verified_approach_desktop.png');
  }

  // Now set viewport to tall mobile/portrait matching reference image
  await page.setViewport({ width: 440, height: 1100, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 500));

  // Hide floating switcher for clean reference view
  await page.evaluate(() => {
    const sw = document.querySelector('.floating-page-switcher');
    if (sw) sw.style.display = 'none';
  });

  const appMobile = await page.$('#approach');
  if (appMobile) {
    await appMobile.screenshot({ path: 'verified_approach_mobile.png' });
    console.log('Saved verified_approach_mobile.png');
  }

  // Also full page screenshot
  await page.screenshot({ path: 'verified_approach_page.png' });
  console.log('Saved verified_approach_page.png');

  await browser.close();
}

capture().catch(console.error);
