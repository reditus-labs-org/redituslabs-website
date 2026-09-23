import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateVariants() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/gilead_balm_healthcare.jpg').toString('base64');

  const configs = [
    { width: 2160, height: 3840, file: 'public/assets/images/4k/healthcare-4k.jpg' },
    { width: 1080, height: 1920, file: 'public/assets/images/4k/healthcare-1080.jpg' },
    { width: 540, height: 960, file: 'public/assets/images/4k/healthcare-540.jpg' }
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
      const img = new Image();
      await new Promise(resolve => {
        img.onload = resolve;
        img.src = 'data:image/jpeg;base64,' + base64;
      });

      const flyerW = CW;
      const flyerScale = flyerW / img.naturalWidth;
      const flyerH = img.naturalHeight * flyerScale;

      // 160px on 1920 height
      const topOffset = Math.round(CH * (150 / 1920));

      // Draw flyer
      ctx.drawImage(img, 0, topOffset, flyerW, flyerH);

      // 1. Clean top extension:
      // In the original flyer, y=10 to y=14 is perfectly smooth and free of any boundary compression noise.
      // In the drawn image, this is at: topOffset + Math.round(10 * flyerScale)
      const sampleTopY = topOffset + Math.round(12 * flyerScale);
      ctx.drawImage(canvas, 0, sampleTopY, flyerW, 4, 0, 0, flyerW, topOffset);

      // 2. Clean bottom extension:
      // The bottom teal in the drawn image at y = topOffset + Math.round(1000 * flyerScale)
      const sampleBottomY = topOffset + Math.round(1000 * flyerScale);
      const flyerBottomY = topOffset + flyerH;
      ctx.drawImage(canvas, 0, sampleBottomY, flyerW, 4, 0, flyerBottomY - 2, flyerW, CH - flyerBottomY + 2);

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

generateVariants().catch(console.error);
