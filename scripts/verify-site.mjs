import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const results = [];
const check = (name, condition) => { assert.ok(condition, name); results.push(name); console.log(name); };
const go = async route => { console.log('Opening', route); await page.goto('http://127.0.0.1:5173/#' + route, {waitUntil: 'domcontentloaded'}); await page.waitForSelector('main'); await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))])); };
try {
 await page.setViewport({width: 1440, height: 1000, deviceScaleFactor: 1});
 await go('home');
 await page.click('.hero-primary-white-btn');
 await page.waitForSelector('#contact');
 await page.waitForFunction(() => Math.abs(document.getElementById('contact').getBoundingClientRect().top - 88) < 5);
 check('Home conversation button opens contact section', await page.evaluate(() => location.hash === '#contact'));
 await page.type('#contact-name', 'Website QA'); await page.type('#contact-email', 'qa@example.com'); await page.type('#contact-message', 'Checking the unconfigured contact state.');
 await page.click('.contact-submit-btn');
 await page.waitForSelector('[role="alert"]');
 check('Unconfigured form never claims delivery', !(await page.$('.contact-success-box')));
 await page.click('.navbar-links .nav-link:nth-child(2)');
 await page.waitForSelector('#capabilities');
 await page.waitForFunction(() => Math.abs(document.getElementById('capabilities').getBoundingClientRect().top - 88) < 5);
 check('What We Build reaches capabilities from another page', true);
 await go('approach');
 const firstCase = await page.$eval('.case-study-project-title', el => el.textContent);
 await page.click('[aria-label="Next case"]');
 check('Case carousel changes the actual project', firstCase !== await page.$eval('.case-study-project-title', el => el.textContent));
 await page.click('.case-study-hero-card');
 await page.waitForSelector('.editorial-body');
 check('Case card opens its detail', await page.evaluate(() => location.hash === '#case-study/connected-operations'));
 await go('industries');
 const firstIndustry = await page.$eval('.industry-vertical-card', el => el.getAttribute('href'));
 await page.click('[aria-label="Next industries"]');
 check('Industry carousel changes cards', firstIndustry !== await page.$eval('.industry-vertical-card', el => el.getAttribute('href')));
 const links = new Set(['services','playbook','story','about','privacy','terms','all-industries','all-insights','case-studies','architecture/ai']);
 for (const route of ['home','approach','industries','services','all-industries','all-insights','case-studies']) {
  await go(route);
  for (const href of await page.$$eval('main a[href^="#"]', els => els.map(el => el.getAttribute('href').slice(1)))) links.add(href);
 }
 for (const route of links) {
  await go(route);
  check('Destination renders: ' + route, !await page.evaluate(() => document.body.innerText.includes('This page hasn’t been built yet.')));
  check('Images load: ' + route, await page.$$eval('img', els => els.every(el => el.complete && el.naturalWidth > 0)));
 }
 for (const width of [1440, 390]) {
  await page.setViewport({width, height: 1000, deviceScaleFactor: 1});
  for (const route of ['home','approach','industries']) {
   await go(route);
   await new Promise(r => setTimeout(r, 2400));
   await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=700) { window.scrollTo(0,y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0,0); await new Promise(r => setTimeout(r, 900)); });
   check('No horizontal overflow: ' + route + ' ' + width, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
   await page.screenshot({path: 'verified-' + route + '-' + width + '.jpg', type:'jpeg', quality:70, fullPage:true});
  }
 }
 await go('home');
 await page.click('.mobile-menu-btn');
 check('Mobile menu opens', await page.$eval('.mobile-menu-btn', el => el.getAttribute('aria-expanded') === 'true'));
 await page.click('.navbar-links .nav-link:nth-child(3)');
 await page.waitForSelector('.approach-section');
 check('Mobile menu navigates and closes', await page.$eval('.mobile-menu-btn', el => el.getAttribute('aria-expanded') === 'false'));
 await page.goBack({waitUntil:'networkidle2'});
 check('Browser back restores home', await page.evaluate(() => location.hash === '#home'));
 check('No uncaught browser errors', errors.length === 0);
 fs.writeFileSync('scripts/verification-results.json', JSON.stringify({passed:results.length, checks:results, errors}, null, 2));
 console.log(JSON.stringify({passed:results.length, errors}));
} finally { await browser.close(); }
