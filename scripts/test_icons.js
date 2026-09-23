import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function testIcons() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          background: #f4f2eb;
          display: flex;
          gap: 40px;
          padding: 50px;
          align-items: center;
          font-family: sans-serif;
        }
        .icon-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        svg {
          width: 44px;
          height: 44px;
          color: #2a2d30;
        }
        img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          image-rendering: pixelated;
        }
      </style>
    </head>
    <body>
      <div class="icon-box">
        <span>Ref 1</span>
        <img src="data:image/png;base64,${fs.readFileSync('public/assets/images/ref_icon_1.png').toString('base64')}" />
        <span>SVG 1</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Faceted star/prism -->
          <polygon points="24,6 30,15 40,17 33,25 36,36 24,30 12,36 15,25 8,17 18,15" />
          <line x1="24" y1="6" x2="24" y2="30" />
          <line x1="18" y1="15" x2="30" y2="15" />
          <line x1="15" y1="25" x2="33" y2="25" />
          <circle cx="24" cy="20" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div class="icon-box">
        <span>Ref 2</span>
        <img src="data:image/png;base64,${fs.readFileSync('public/assets/images/ref_icon_2.png').toString('base64')}" />
        <span>SVG 2</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Circular arc drafting -->
          <path d="M 33 13 A 16 16 0 1 0 24 40" stroke-dasharray="0" />
          <!-- Layered isometric perspective sheets -->
          <path d="M 18 19 L 28 15 L 38 19 L 28 23 Z" />
          <path d="M 18 19 L 18 29 L 28 33 L 38 29 L 38 19" />
          <line x1="28" y1="23" x2="28" y2="33" />
          <line x1="23" y1="21" x2="23" y2="31" stroke-dasharray="1 2" />
          <line x1="33" y1="21" x2="33" y2="31" stroke-dasharray="1 2" />
        </svg>
      </div>

      <div class="icon-box">
        <span>Ref 3</span>
        <img src="data:image/png;base64,${fs.readFileSync('public/assets/images/ref_icon_3.png').toString('base64')}" />
        <span>SVG 3</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Isometric engineering cube & projecting vectors -->
          <path d="M 24 13 L 36 19 L 24 25 L 12 19 Z" />
          <path d="M 12 19 L 12 31 L 24 37 L 36 31 L 36 19" />
          <line x1="24" y1="25" x2="24" y2="37" />
          <!-- Projecting axis ticks -->
          <line x1="36" y1="19" x2="42" y2="16" />
          <line x1="12" y1="31" x2="6" y2="34" />
          <circle cx="24" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>

      <div class="icon-box">
        <span>Ref 4</span>
        <img src="data:image/png;base64,${fs.readFileSync('public/assets/images/ref_icon_4.png').toString('base64')}" />
        <span>SVG 4</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Viewfinder circle -->
          <circle cx="24" cy="24" r="16" />
          <rect x="17" y="17" width="14" height="14" rx="2.5" />
          <circle cx="24" cy="24" r="3" />
          <line x1="24" y1="14" x2="24" y2="16" />
          <line x1="24" y1="32" x2="24" y2="34" />
        </svg>
      </div>

      <div class="icon-box">
        <span>Ref 5</span>
        <img src="data:image/png;base64,${fs.readFileSync('public/assets/images/ref_icon_5.png').toString('base64')}" />
        <span>SVG 5</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Infinite iteration knot / triangular loop -->
          <path d="M 24 9 L 37 33 L 11 33 Z" />
          <path d="M 24 17 L 31 29 L 17 29 Z" />
          <path d="M 24 9 C 28 16, 28 22, 24 29" />
          <circle cx="24" cy="9" r="1.5" fill="currentColor" />
          <line x1="11" y1="33" x2="7" y2="37" />
          <line x1="37" y1="33" x2="41" y2="37" />
        </svg>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.screenshot({ path: 'test_icons_compare.png' });
  console.log('Saved test_icons_compare.png');
  await browser.close();
}

testIcons();
