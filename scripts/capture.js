import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:5173/';
const outputPath = process.argv[3] || 'hero_viewport_check.png';
const fullPage = process.argv[4] === 'true';
const width = parseInt(process.argv[5]) || 1080;
const height = parseInt(process.argv[6]) || 1440;

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  // Wait 2.5 seconds for GSAP entrance timeline to complete
  await new Promise(r => setTimeout(r, 2500));

  await page.screenshot({ path: outputPath, fullPage });
  console.log(`Saved screenshot to ${outputPath} (${width}x${height})`);
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
