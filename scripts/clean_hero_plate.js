import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function createFlawlessPlate() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const imagePath = 'C:/Users/SISASAswath/.gemini/antigravity-ide/brain/9cdf68de-58c4-46d6-ae67-527c884471b8/.user_uploaded/media_1788710424971.png';
  const imgBase64 = fs.readFileSync(imagePath).toString('base64');
  const dataUri = `data:image/png;base64,${imgBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>body{margin:0;overflow:hidden;background:#000;}</style></head>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.src = "${dataUri}";
        img.onload = () => {
          const c = document.getElementById('c');
          const scale = 4; // 1444 x 1948
          c.width = img.naturalWidth * scale;
          c.height = img.naturalHeight * scale;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, c.width, c.height);

          // We want to remove ONLY the text and buttons, keeping the colossal architecture,
          // glowing portal, silhouette figure, mountain range, and water channel 100% pristine.

          // 1. Clean Top Header:
          // The sky between y=0 and y=46*scale is smooth dark navy-charcoal clouds.
          // Sample the clean sky at x: 190..240, y: 15..45 or create a seamless gradient.
          const hdrH = 46 * scale;
          const hdrGrad = ctx.createLinearGradient(0, 0, 0, hdrH);
          hdrGrad.addColorStop(0, '#0c1015');
          hdrGrad.addColorStop(0.5, '#0f141a');
          hdrGrad.addColorStop(1, '#131921');
          
          // Blend header with soft edge
          ctx.save();
          ctx.fillStyle = hdrGrad;
          // Only cover where nav text is: left (0..120), center (120..270), right (280..361)
          // Actually the sky behind the top of the portal can stay untouched (x > 260 is sky, building top is at x:220..361, y>45)
          ctx.fillRect(0, 0, 215 * scale, hdrH);
          ctx.fillRect(290 * scale, 0, 71 * scale, hdrH);
          ctx.restore();

          // 2. Clean Left Headline Area (x: 0..172*scale, y: 55*scale..225*scale):
          // This entire zone is pure moody overcast sky!
          // Let's create an atmospheric sky gradient that perfectly matches the surrounding tones
          const skyTop = 45 * scale;
          const skyH = 180 * scale;
          const skyW = 175 * scale;

          const leftSky = ctx.createLinearGradient(0, skyTop, 0, skyTop + skyH);
          leftSky.addColorStop(0, '#121820');
          leftSky.addColorStop(0.35, '#171f28');
          leftSky.addColorStop(0.7, '#1e2833');
          leftSky.addColorStop(1, '#2b3846');

          ctx.save();
          ctx.fillStyle = leftSky;
          ctx.fillRect(0, skyTop, skyW, skyH);

          // Soft feathered transition on the right of the sky (towards the building shadow)
          const fW = 35 * scale;
          const fX = skyW - fW;
          const feather = ctx.createLinearGradient(fX, 0, skyW, 0);
          feather.addColorStop(0, 'rgba(23, 31, 40, 0)');
          feather.addColorStop(1, 'rgba(15, 20, 26, 0.9)');
          ctx.fillStyle = feather;
          ctx.fillRect(fX, skyTop, fW, skyH);
          ctx.restore();

          // Add fine organic film grain over the sky to match photographic texture
          const skyData = ctx.getImageData(0, skyTop, skyW, skyH);
          for (let i = 0; i < skyData.data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 6;
            skyData.data[i] = Math.max(0, Math.min(255, skyData.data[i] + noise));
            skyData.data[i+1] = Math.max(0, Math.min(255, skyData.data[i+1] + noise));
            skyData.data[i+2] = Math.max(0, Math.min(255, skyData.data[i+2] + noise));
          }
          ctx.putImageData(skyData, 0, skyTop);

          // 3. Clean CTA Buttons Area (x: 10*scale..180*scale, y: 225*scale..262*scale):
          // This is the mountain horizon and misty haze right below the sky.
          // Let's blend from the natural mountain slopes right below (y: 265*scale..300*scale)
          const btnW = 180 * scale;
          const btnY = 224 * scale;
          const btnH = 38 * scale;

          // Draw a soft misty atmospheric haze that covers the button and blends naturally into the mountains
          const mtnHaze = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
          mtnHaze.addColorStop(0, '#2b3846');
          mtnHaze.addColorStop(0.5, '#354352');
          mtnHaze.addColorStop(1, 'rgba(53, 67, 82, 0.1)');

          ctx.save();
          ctx.fillStyle = mtnHaze;
          ctx.fillRect(0, btnY, btnW, btnH);
          ctx.restore();

          // 4. Clean Pillar Text ("RETURN. REIMAGINE. REALIZE." at x: 285*scale..355*scale, y: 230*scale..300*scale)
          // The wall is uniform dark charcoal concrete shadow.
          // Sample the clean concrete wall right above (y: 160*scale..220*scale)
          const pX = 282 * scale;
          const pY = 230 * scale;
          const pW = 75 * scale;
          const pH = 75 * scale;

          // Use a soft blur patch from the shadow concrete wall
          const wallGrad = ctx.createLinearGradient(pX, pY, pX + pW, pY);
          wallGrad.addColorStop(0, '#1c1f23');
          wallGrad.addColorStop(0.5, '#1e2125');
          wallGrad.addColorStop(1, '#1b1d21');

          ctx.save();
          ctx.fillStyle = wallGrad;
          ctx.fillRect(pX, pY, pW, pH);
          ctx.restore();

          // Add fine concrete grain to pillar patch
          const pData = ctx.getImageData(pX, pY, pW, pH);
          for (let i = 0; i < pData.data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 5;
            pData.data[i] = Math.max(0, Math.min(255, pData.data[i] + noise));
            pData.data[i+1] = Math.max(0, Math.min(255, pData.data[i+1] + noise));
            pData.data[i+2] = Math.max(0, Math.min(255, pData.data[i+2] + noise));
          }
          ctx.putImageData(pData, pX, pY);

          // 5. Clean Bottom Right Text ("SAME PROBLEMS. HIGHER POSSIBILITIES." at x: 265*scale..355*scale, y: 420*scale..455*scale)
          const bX = 265 * scale;
          const bY = 418 * scale;
          const bW = 92 * scale;
          const bH = 38 * scale;

          const floorGrad = ctx.createLinearGradient(bX, bY, bX, bY + bH);
          floorGrad.addColorStop(0, '#131619');
          floorGrad.addColorStop(0.5, '#121517');
          floorGrad.addColorStop(1, '#101214');

          ctx.save();
          ctx.fillStyle = floorGrad;
          ctx.fillRect(bX, bY, bW, bH);
          ctx.restore();

          // 6. Clean Bottom Left Scroll Indicator (x: 10*scale..60*scale, y: 410*scale..465*scale)
          const sX = 10 * scale;
          const sY = 410 * scale;
          const sW = 55 * scale;
          const sH = 55 * scale;

          const waterGrad = ctx.createLinearGradient(sX, sY, sX, sY + sH);
          waterGrad.addColorStop(0, '#0c0f12');
          waterGrad.addColorStop(1, '#090b0e');

          ctx.save();
          ctx.fillStyle = waterGrad;
          ctx.fillRect(sX, sY, sW, sH);
          ctx.restore();

          window.plateReady = true;
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.plateReady === true', { timeout: 30000 });

  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_flawless_plate.jpg';
  await canvas.screenshot({ path: outPath, type: 'jpeg', quality: 96 });
  console.log(`Saved flawless plate to ${outPath}`);

  await browser.close();
}

createFlawlessPlate().catch(console.error);
