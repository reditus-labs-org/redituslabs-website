import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const results=[];
fs.mkdirSync('output/image-review',{recursive:true});
try {
 for(const width of [390,1920,3840]) {
  await page.setViewport({width,height:1080,deviceScaleFactor:1});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const route of ['industries','approach','all-insights','all-industries']) {
   await page.goto('http://127.0.0.1:5173/#'+route,{waitUntil:'networkidle2'});
   await page.evaluate(()=>Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>{}))));
   const images=await page.$$eval('img',els=>els.map(i=>({source:i.getAttribute('src'),selected:i.currentSrc,complete:i.complete&&i.naturalWidth>0,srcset:i.srcset})));
   assert(images.every(i=>i.complete),'Broken image '+route);
   assert(images.every(i=>!i.source.includes('/reference_')),'Tiny reference crop still in use');
   assert(images.filter(i=>i.source.includes('/4k/')).every(i=>i.srcset.includes('-4k.jpg')),'Missing responsive 4K variant');
   results.push({route,width,images});
   if(width===1920&&route==='industries') {
    await page.screenshot({path:'output/image-review/industries-desktop.jpg',type:'jpeg',quality:90});
    for(const [selector,name] of [['.real-solutions-card','solutions'],['.insights-section','insights'],['.grand-footer','footer']]) await (await page.$(selector)).screenshot({path:'output/image-review/'+name+'.jpg',type:'jpeg',quality:90});
   }
   if(width===1920&&route==='approach') await (await page.$('.case-study-hero-card')).screenshot({path:'output/image-review/case.jpg',type:'jpeg',quality:90});
   if(width===390&&route==='industries') await page.screenshot({path:'output/image-review/industries-mobile.jpg',type:'jpeg',quality:90});
   if(width===3840&&route==='industries') {
    const selected=await page.$eval('.real-solutions-img',i=>i.currentSrc);
    assert(selected.endsWith('solutions-4k.jpg'),'4K display must select the 4K banner');
   }
  }
 }
 const exports=JSON.parse(fs.readFileSync('scripts/image-export-report.json','utf8').replace(/^\uFEFF/,''));
 const masters=exports.filter(e=>e.file.endsWith('-4k.jpg'));
 assert.equal(masters.length,11);
 assert(masters.every(e=>Math.max(e.width,e.height)===3840&&Math.min(e.width,e.height)===2160));
 assert.equal(errors.length,0);
 fs.writeFileSync('output/image-review/verification.json',JSON.stringify({masters:masters.length,responsiveFiles:exports.length,pageChecks:results.length,errors,results},null,2));
 console.log(JSON.stringify({masters:masters.length,responsiveFiles:exports.length,pageChecks:results.length,errors}));
} finally {await browser.close();}
