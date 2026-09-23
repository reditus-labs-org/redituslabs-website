import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateRetailVariants() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/retail_zara.png').toString('base64');

  const configs = [
    { width: 2160, height: 3840, file: 'public/assets/images/4k/retail-4k.jpg' },
    { width: 1080, height: 1920, file: 'public/assets/images/4k/retail-1080.jpg' },
    { width: 540, height: 960, file: 'public/assets/images/4k/retail-540.jpg' }
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

      // Scale to fit nicely with breathing room for ZARA letters
      const scale = (CW * 1.074) / img.naturalWidth;
      const drawW = Math.round(img.naturalWidth * scale);
      const drawH = Math.round(img.naturalHeight * scale);
      const drawX = Math.round((CW - drawW) / 2);
      const drawY = CH - drawH; // bottom aligned

      // 1. Draw main photo
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // 2. Extend vertical louvers/slats up to the top of the canvas
      const slatSliceY = 6;
      const slatSliceH = 32;
      const step = Math.max(20, Math.round(50 * (CH / 1920)));

      for (let y = drawY; y >= 0; y -= step) {
        const destY = Math.max(0, y - step);
        const destH = y - destY;
        ctx.drawImage(
          img,
          0, slatSliceY, img.naturalWidth, slatSliceH,
          drawX, destY, drawW, destH
        );
      }

      // 3. Top subtle ambient architectural vignette
      const topVignette = ctx.createLinearGradient(0, 0, 0, drawY + Math.round(140 * (CH / 1920)));
      topVignette.addColorStop(0, 'rgba(10, 12, 16, 0.45)');
      topVignette.addColorStop(0.4, 'rgba(12, 14, 18, 0.15)');
      topVignette.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, CW, drawY + Math.round(140 * (CH / 1920)));

      // 4. Bottom soft ground shade (CSS provides the main card gradient)
      const bottomShade = ctx.createLinearGradient(0, CH - Math.round(400 * (CH / 1920)), 0, CH);
      bottomShade.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bottomShade.addColorStop(1, 'rgba(9, 10, 11, 0.35)');
      ctx.fillStyle = bottomShade;
      ctx.fillRect(0, CH - Math.round(400 * (CH / 1920)), CW, Math.round(400 * (CH / 1920)));

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

generateRetailVariants().catch(console.error);
