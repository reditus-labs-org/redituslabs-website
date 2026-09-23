import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateFinanceVariants() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/finance_desk.png').toString('base64');

  const configs = [
    { width: 2160, height: 3840, file: 'public/assets/images/4k/finance-4k.jpg' },
    { width: 1080, height: 1920, file: 'public/assets/images/4k/finance-1080.jpg' },
    { width: 540, height: 960, file: 'public/assets/images/4k/finance-540.jpg' }
  ];

  for (const cfg of configs) {
    await page.setContent(`
      <html><body style="margin:0; background:#000;">
        <canvas id="c" width="${cfg.width}" height="${cfg.height}"></canvas>
      </body></html>
    `);

    await page.evaluate(async ({ base64, CW, CH }) => {
      const canvas = document.getElementById('c');
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const img = new Image();
      await new Promise(resolve => {
        img.onload = resolve;
        img.src = 'data:image/png;base64,' + base64;
      });

      const photoW = CW;
      const photoScale = photoW / img.naturalWidth;
      const photoH = img.naturalHeight * photoScale;

      // 120px top offset on 1920 height
      const topOffset = Math.round(CH * (120 / 1920));

      // Draw main photo
      ctx.drawImage(img, 0, topOffset, photoW, photoH);

      // 1. Extend top upward:
      // Sample clean slice at topOffset + 4 to topOffset + 8
      const topSliceY = topOffset + Math.round(4 * photoScale);
      ctx.drawImage(canvas, 0, topSliceY, photoW, 6, 0, 0, photoW, topOffset + 2);

      // 2. Extend bottom downward:
      // Sample clean slice near bottom of drawn photo
      const bottomSliceY = topOffset + photoH - Math.round(8 * photoScale);
      const photoBottomY = topOffset + photoH;
      ctx.drawImage(canvas, 0, bottomSliceY, photoW, 6, 0, photoBottomY - 2, photoW, CH - photoBottomY + 2);

      // 3. Subtle edge vignette / contrast enhancement:
      // Gives the flatlay rich depth fitting the studio aesthetic
      const vignette = ctx.createLinearGradient(0, 0, 0, CH);
      vignette.addColorStop(0.0, 'rgba(15, 18, 22, 0.22)');
      vignette.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1.0, 'rgba(12, 14, 18, 0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, CW, CH);

    }, { base64: imgBase64, CW: cfg.width, CH: cfg.height });

    const dataUrl = await page.evaluate(() => {
      return document.getElementById('c').toDataURL('image/jpeg', 0.96);
    });

    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
    fs.writeFileSync(cfg.file, Buffer.from(base64Data, 'base64'));
    console.log(`Generated ${cfg.file} (${cfg.width}x${cfg.height})`);
  }

  await browser.close();
}

generateFinanceVariants().catch(console.error);
