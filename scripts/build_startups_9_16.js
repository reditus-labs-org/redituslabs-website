import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateStartupsVariants() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/startups_team.png').toString('base64');

  const configs = [
    { width: 2160, height: 3840, file: 'public/assets/images/4k/startups-4k.jpg' },
    { width: 1080, height: 1920, file: 'public/assets/images/4k/startups-1080.jpg' },
    { width: 540, height: 960, file: 'public/assets/images/4k/startups-540.jpg' }
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

      // Original is 359 x 639
      // Fit to CW x CH (which is 9:16)
      // Smallest dimension fit to cover:
      const scale = Math.max(CW / img.naturalWidth, CH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const drawX = (CW - drawW) / 2;
      const drawY = (CH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle enhancement: rich cinematic grading to match dark architectural agency aesthetic
      const vignette = ctx.createLinearGradient(0, 0, 0, CH);
      vignette.addColorStop(0.0, 'rgba(10, 12, 16, 0.25)');
      vignette.addColorStop(0.18, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.65, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1.0, 'rgba(8, 10, 14, 0.5)');
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

generateStartupsVariants().catch(console.error);
