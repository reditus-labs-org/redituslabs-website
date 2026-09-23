import fs from 'fs';
import puppeteer from 'puppeteer-core';

async function morphologicalClean() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('public/assets/images/hero_reference_visual.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.src = "data:image/png;base64,${imgBase64}";
          img.onload = () => {
            const c = document.getElementById('c');
            const W = img.naturalWidth;
            const H = img.naturalHeight;
            // Native resolution
            c.width = W;
            c.height = H;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, W, H);
            const data = imgData.data;

            function getLum(x, y) {
              if (x < 0) x = 0; if (x >= W) x = W - 1;
              if (y < 0) y = 0; if (y >= H) y = H - 1;
              const idx = (y * W + x) * 4;
              return 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
            }

            function getRGB(x, y) {
              if (x < 0) x = 0; if (x >= W) x = W - 1;
              if (y < 0) y = 0; if (y >= H) y = H - 1;
              const idx = (y * W + x) * 4;
              return [data[idx], data[idx+1], data[idx+2]];
            }

            function setRGB(x, y, r, g, b) {
              const idx = (y * W + x) * 4;
              data[idx] = r;
              data[idx+1] = g;
              data[idx+2] = b;
            }

            // 1. CTA Button Removal (x: 12..98, y: 238..263)
            // The white rectangular button is a solid block.
            // We interpolate vertically from y=235 (above button) to y=266 (below button)
            for (let y = 237; y <= 264; y++) {
              const t = (y - 236) / (265 - 236);
              // smoothstep t
              const st = t * t * (3 - 2 * t);
              for (let x = 11; x <= 97; x++) {
                const top = getRGB(x, 235);
                const bot = getRGB(x, 266);
                const r = top[0] * (1 - st) + bot[0] * st + (Math.random() - 0.5) * 3;
                const g = top[1] * (1 - st) + bot[1] * st + (Math.random() - 0.5) * 3;
                const b = top[2] * (1 - st) + bot[2] * st + (Math.random() - 0.5) * 3;
                setRGB(x, y, r, g, b);
              }
            }

            // 2. Play button circle & text: Watch our story (x: 104..180, y: 236..265)
            // Remove text and circle outline by vertical/horizontal neighbor sampling
            for (let y = 236; y <= 265; y++) {
              for (let x = 104; x <= 180; x++) {
                const l = getLum(x, y);
                // Background here is around l = 35..50. Text/circle is l > 65
                if (l > 60) {
                  const top = getRGB(x, 234);
                  const bot = getRGB(x, 267);
                  const t = (y - 234) / (267 - 234);
                  const r = top[0] * (1 - t) + bot[0] * t;
                  const g = top[1] * (1 - t) + bot[1] * t;
                  const b = top[2] * (1 - t) + bot[2] * t;
                  setRGB(x, y, r, g, b);
                }
              }
            }

            // 3. Main Headline & Eyebrow & Body text (x: 8..172, y: 68..232)
            // Characters are bright on dark cloudy sky.
            // For each pixel with high brightness compared to surrounding cloud:
            for (let pass = 0; pass < 3; pass++) {
              for (let y = 68; y <= 234; y++) {
                for (let x = 8; x <= 172; x++) {
                  const l = getLum(x, y);
                  // Cloud brightness is generally 15..40
                  if (l > 48) {
                    // Sample left 6px and right 6px
                    let lx = x - 1;
                    while (lx > 0 && getLum(lx, y) > 48 && (x - lx) < 8) lx--;
                    let rx = x + 1;
                    while (rx < W && getLum(rx, y) > 48 && (rx - x) < 8) rx++;

                    let ty = y - 1;
                    while (ty > 0 && getLum(x, ty) > 48 && (y - ty) < 8) ty--;
                    let by = y + 1;
                    while (by < H && getLum(x, by) > 48 && (by - y) < 8) by++;

                    const lC = getRGB(lx, y);
                    const rC = getRGB(rx, y);
                    const tC = getRGB(x, ty);
                    const bC = getRGB(x, by);

                    const r = (lC[0] + rC[0] + tC[0] + bC[0]) / 4;
                    const g = (lC[1] + rC[1] + tC[1] + bC[1]) / 4;
                    const b = (lC[2] + rC[2] + tC[2] + bC[2]) / 4;
                    setRGB(x, y, r, g, b);
                  }
                }
              }
            }

            // 4. Top Header ("REDITUS", "Home", "What We Build", "Approach", "Industries", "Let's Build ->")
            // y: 6..28, x: 8..350
            for (let pass = 0; pass < 3; pass++) {
              for (let y = 6; y <= 28; y++) {
                for (let x = 8; x <= 350; x++) {
                  // Skip if inside central portal beam
                  if (x >= 205 && x <= 255) continue;
                  const l = getLum(x, y);
                  // Sky here is l < 32
                  if (l > 35) {
                    let ty = y - 1;
                    while (ty > 0 && getLum(x, ty) > 35 && (y - ty) < 6) ty--;
                    let by = y + 1;
                    while (by < 40 && getLum(x, by) > 35 && (by - y) < 6) by++;

                    let lx = x - 1;
                    while (lx > 0 && getLum(lx, y) > 35 && (x - lx) < 6) lx--;
                    let rx = x + 1;
                    while (rx < W && getLum(rx, y) > 35 && (rx - x) < 6) rx++;

                    const tC = getRGB(x, ty);
                    const bC = getRGB(x, by);
                    const lC = getRGB(lx, y);
                    const rC = getRGB(rx, y);

                    const r = (tC[0] + bC[0] + lC[0] + rC[0]) / 4;
                    const g = (tC[1] + bC[1] + lC[1] + rC[1]) / 4;
                    const b = (tC[2] + bC[2] + lC[2] + rC[2]) / 4;
                    setRGB(x, y, r, g, b);
                  }
                }
              }
            }

            // 5. Right building wall: RETURN. REIMAGINE. REALIZE. (x: 280..352, y: 232..296)
            for (let pass = 0; pass < 3; pass++) {
              for (let y = 230; y <= 298; y++) {
                for (let x = 278; x <= 352; x++) {
                  const l = getLum(x, y);
                  // Concrete wall is around 35..45, text is > 55
                  if (l > 55) {
                    let lx = x - 1;
                    while (lx > 270 && getLum(lx, y) > 55 && (x - lx) < 5) lx--;
                    let rx = x + 1;
                    while (rx < 358 && getLum(rx, y) > 55 && (rx - x) < 5) rx++;
                    const lC = getRGB(lx, y);
                    const rC = getRGB(rx, y);
                    setRGB(x, y, (lC[0] + rC[0]) / 2, (lC[1] + rC[1]) / 2, (lC[2] + rC[2]) / 2);
                  }
                }
              }
            }

            // 6. Floor text: SAME PROBLEMS. HIGHER POSSIBILITIES. (x: 260..355, y: 420..450)
            for (let pass = 0; pass < 3; pass++) {
              for (let y = 418; y <= 450; y++) {
                for (let x = 260; x <= 355; x++) {
                  const l = getLum(x, y);
                  if (l > 30) {
                    let lx = x - 1;
                    while (lx > 250 && getLum(lx, y) > 30 && (x - lx) < 5) lx--;
                    let rx = x + 1;
                    while (rx < 360 && getLum(rx, y) > 30 && (rx - x) < 5) rx++;
                    const lC = getRGB(lx, y);
                    const rC = getRGB(rx, y);
                    setRGB(x, y, (lC[0] + rC[0]) / 2, (lC[1] + rC[1]) / 2, (lC[2] + rC[2]) / 2);
                  }
                }
              }
            }

            // 7. Scroll indicator at bottom left (x: 10..55, y: 412..462)
            for (let pass = 0; pass < 3; pass++) {
              for (let y = 412; y <= 462; y++) {
                for (let x = 10; x <= 55; x++) {
                  const l = getLum(x, y);
                  if (l > 30) {
                    let lx = x - 1;
                    while (lx > 0 && getLum(lx, y) > 30 && (x - lx) < 5) lx--;
                    let rx = x + 1;
                    while (rx < 65 && getLum(rx, y) > 30 && (rx - x) < 5) rx++;
                    const lC = getRGB(lx, y);
                    const rC = getRGB(rx, y);
                    setRGB(x, y, (lC[0] + rC[0]) / 2, (lC[1] + rC[1]) / 2, (lC[2] + rC[2]) / 2);
                  }
                }
              }
            }

            ctx.putImageData(imgData, 0, 0);
            window.cleanReady = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.cleanReady === true', { timeout: 15000 });
  const canvas = await page.$('#c');
  const outPath = 'public/assets/images/hero_flawless_backdrop.png';
  await canvas.screenshot({ path: outPath, omitBackground: false });
  console.log(`Saved flawless clean backdrop to ${outPath}`);
  await browser.close();
}

morphologicalClean().catch(console.error);
