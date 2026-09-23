import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function generateEducationVariants() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/education_diploma.png').toString('base64');

  const configs = [
    { width: 2160, height: 3840, file: 'public/assets/images/4k/education-4k.jpg' },
    { width: 1080, height: 1920, file: 'public/assets/images/4k/education-1080.jpg' },
    { width: 540, height: 960, file: 'public/assets/images/4k/education-540.jpg' }
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

      // 1. Full sky background gradient top to bottom
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CH);
      skyGrad.addColorStop(0.0, 'rgb(24, 56, 97)');
      skyGrad.addColorStop(0.2, 'rgb(28, 61, 105)');
      skyGrad.addColorStop(0.4, 'rgb(34, 69, 116)');
      skyGrad.addColorStop(0.65, 'rgb(42, 78, 126)');
      skyGrad.addColorStop(0.85, 'rgb(48, 83, 130)');
      skyGrad.addColorStop(1.0, 'rgb(52, 86, 132)');

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CW, CH);

      // 2. Proportions & Positioning
      // Original photo: 400 x 600
      // Scale so that width is ~88% of CW to leave comfortable breathing room on all sides
      const scale = (CW * 0.88) / img.naturalWidth;
      const photoW = img.naturalWidth * scale;
      const photoH = img.naturalHeight * scale;

      // Position: center horizontally, leave headroom at top
      const photoX = (CW - photoW) / 2;
      const photoY = CH * 0.10; // 10% headroom

      // Create an offscreen canvas for the photo
      const offscreen = document.createElement('canvas');
      offscreen.width = Math.ceil(photoW);
      offscreen.height = Math.ceil(photoH);
      const octx = offscreen.getContext('2d');
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = 'high';
      octx.drawImage(img, 0, 0, photoW, photoH);

      // Seamlessly feather outer sky edges of the photo so zero seam appears:
      const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
      const d = imgData.data;
      const pw = offscreen.width;
      const ph = offscreen.height;

      // Left edge feather (only in sky area, y < ph * 0.8)
      const featherL = Math.round(pw * 0.08);
      for (let x = 0; x < featherL; x++) {
        const factor = x / featherL;
        for (let y = 0; y < Math.round(ph * 0.8); y++) {
          const idx = (y * pw + x) * 4;
          // Sky condition: blue channel dominant
          if (d[idx + 2] > d[idx] + 30) {
            d[idx + 3] = Math.round(d[idx + 3] * factor);
          }
        }
      }

      // Top edge feather (in sky area, x < pw * 0.65)
      const featherT = Math.round(ph * 0.08);
      for (let y = 0; y < featherT; y++) {
        const factor = y / featherT;
        for (let x = 0; x < Math.round(pw * 0.65); x++) {
          const idx = (y * pw + x) * 4;
          if (d[idx + 2] > d[idx] + 30) {
            d[idx + 3] = Math.round(d[idx + 3] * factor);
          }
        }
      }

      // Right edge feather (in sky area, y < ph * 0.6)
      const featherR = Math.round(pw * 0.08);
      const startR = pw - featherR;
      for (let x = startR; x < pw; x++) {
        const factor = (pw - 1 - x) / featherR;
        for (let y = 0; y < Math.round(ph * 0.6); y++) {
          const idx = (y * pw + x) * 4;
          if (d[idx + 2] > d[idx] + 30) {
            d[idx + 3] = Math.round(d[idx + 3] * factor);
          }
        }
      }

      octx.putImageData(imgData, 0, 0);

      // Draw the feathered photo
      ctx.drawImage(offscreen, photoX, photoY);

      // 3. Extend the gown naturally below photoY + photoH
      // In original coordinates:
      // At y = 580, edge was x = 57
      // At y = 599, edge was x = 34
      // Slope: dx/dy = (34 - 57) / (599 - 580) = -23 / 19 ≈ -1.21
      const gownBottomY = photoY + photoH;
      const gownEdgeStartX = photoX + (34 * scale);

      ctx.save();
      ctx.beginPath();
      // Start from the gown edge at the bottom of the photo
      ctx.moveTo(gownEdgeStartX, gownBottomY);
      // Slope down and to the left
      const slope = -1.1; // dx per dy
      const deltaY = (0 - gownEdgeStartX) / slope; // dy to reach x = 0
      const reachZeroY = gownBottomY + deltaY;

      if (reachZeroY < CH) {
        ctx.lineTo(0, reachZeroY);
        ctx.lineTo(0, CH);
      } else {
        const endX = gownEdgeStartX + (CH - gownBottomY) * slope;
        ctx.lineTo(Math.max(0, endX), CH);
      }
      ctx.lineTo(CW, CH);
      ctx.lineTo(CW, gownBottomY);
      ctx.closePath();

      // Fill with smooth gown gradient matching the deep black fabric texture
      const gownGrad = ctx.createLinearGradient(0, gownBottomY, 0, CH);
      gownGrad.addColorStop(0.0, 'rgb(16, 22, 18)');
      gownGrad.addColorStop(0.3, 'rgb(14, 18, 15)');
      gownGrad.addColorStop(0.7, 'rgb(10, 13, 11)');
      gownGrad.addColorStop(1.0, 'rgb(8, 9, 8)');

      ctx.fillStyle = gownGrad;
      ctx.fill();
      ctx.restore();

      // Sample a strip of actual gown texture from the photo bottom and overlay gently
      ctx.save();
      ctx.globalAlpha = 0.6;
      const gownTextureW = photoW - (34 * scale);
      ctx.drawImage(offscreen, 34 * scale, photoH - 6, gownTextureW, 5, gownEdgeStartX, gownBottomY, gownTextureW, CH - gownBottomY);
      ctx.restore();

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

generateEducationVariants().catch(console.error);
