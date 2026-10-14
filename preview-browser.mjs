import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const browser=await chromium.launch({channel:'chrome',headless:false,args:['--start-maximized']});
const context=await browser.newContext({viewport:null});
await context.route('http://reditus.test/**',async route=>{const p=new URL(route.request().url()).pathname;const f=path.join(process.cwd(),'dist',p==='/'?'index.html':p);try{await route.fulfill({body:await fs.readFile(f),contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream'});}catch{await route.fulfill({status:404,body:'Missing'});}});
const page=await context.newPage();await page.goto('http://reditus.test/',{waitUntil:'networkidle'});console.log('Reditus landing page opened in a separate Chrome preview.');await new Promise(resolve=>browser.on('disconnected',resolve));
