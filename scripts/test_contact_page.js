import puppeteer from 'puppeteer-core';

async function testPage() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Let's see what buttons exist
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent?.trim(),
      className: b.className
    }));
  });
  console.log('Buttons:', buttons);

  // Click Page 3: Industries
  await page.evaluate(() => {
    const switcher = Array.from(document.querySelectorAll('.switch-seg-btn'));
    const ind = switcher.find(b => b.textContent?.includes('Industries'));
    if (ind) ind.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  const pageInfo = await page.evaluate(() => {
    const contact = document.getElementById('contact');
    const sections = Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className
    }));
    return { hasContact: !!contact, sections };
  });

  console.log('Page info after switch:', pageInfo);

  if (pageInfo.hasContact) {
    const el = await page.$('#contact');
    await el.screenshot({ path: 'current_contact_section_capture.png' });
    console.log('Saved current_contact_section_capture.png');
  }

  await browser.close();
}

testPage().catch(console.error);
