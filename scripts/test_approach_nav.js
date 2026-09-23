import puppeteer from 'puppeteer-core';

async function testApproach() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Look for any link or button for approach
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a, button'));
    for (const el of links) {
      if (el.textContent && el.textContent.includes('Approach')) {
        el.click();
        return;
      }
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  const info = await page.evaluate(() => {
    const approach = document.getElementById('approach');
    return { hasApproach: !!approach };
  });

  console.log('Page info:', info);

  if (info.hasApproach) {
    const el = await page.$('#approach');
    if (el) {
      await el.screenshot({ path: 'current_approach_section_capture.png' });
      console.log('Saved current_approach_section_capture.png');
    }
  } else {
    // If not found, let's see how ApproachPage is triggered in App.tsx
    // Let's force window navigation or check App.tsx
  }

  await browser.close();
}

testApproach().catch(console.error);
