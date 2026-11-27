import {chromium} from 'playwright';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import assert from 'node:assert/strict';
import {securityHeaders} from '../deployment/security-headers.mjs';
const root=resolve('dist-production'),origin='https://chambersofak.in';
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon','.json':'application/json'};
const browser=await chromium.launch({headless:true});
let submissions=[],tags=0,captchaLoads=0,fail=false;
try{
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.route('**/*',async route=>{const req=route.request(),u=new URL(req.url());
 if(u.origin==='https://api.emailjs.com'){if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'content-type'}});assert.equal(req.method(),'POST');submissions.push(req.postDataJSON());return route.fulfill({status:fail?500:200,headers:{'Access-Control-Allow-Origin':origin,'Content-Type':'text/plain'},body:fail?'mock failure':'OK'});}
 if(u.origin==='https://www.google.com'&&u.pathname==='/recaptcha/api.js'){captchaLoads++;return route.fulfill({status:200,contentType:'text/javascript',body:"window.grecaptcha={render(el,o){window.mockCaptcha=o;el.textContent='Mock challenge';return 0},reset(){window.mockToken=''},getResponse(){return window.mockToken||''}};window.akCaptchaReady();"});}
 if(u.origin==='https://www.googletagmanager.com'){tags++;return route.fulfill({status:200,contentType:'text/javascript',body:'/* mock GTM; no tracking */'});}
 if(u.origin!==origin)return route.abort();
 const f=resolve(root,'.'+(u.pathname==='/'?'/index.html':decodeURIComponent(u.pathname)));
 if(!f.startsWith(root+sep))return route.abort();
 try{return route.fulfill({status:200,headers:securityHeaders,contentType:types[extname(f)]||'application/octet-stream',body:await readFile(f)});}catch{return route.fulfill({status:404,body:'missing'});}
});
const navigation=await page.goto(origin+'/contact.html');assert.equal(navigation.headers()['x-frame-options'],'DENY');assert.match(navigation.headers()['content-security-policy'],/frame-ancestors 'none'/);const form=page.locator('[data-contact-dynamic-form]');
assert.equal(tags,0);assert.equal(captchaLoads,0);await page.locator('[data-analytics-deny]').click();assert.equal(tags,0);
await form.locator('[data-matter-type]').selectOption('msme');await form.locator('[name=email]').fill('mock@example.invalid');await form.locator('[name=summary]').fill('Synthetic test message, not a real enquiry');await form.locator('[data-form-consent]').check();
await form.locator('[data-generate-enquiry]').click();assert.equal(submissions.length,0);assert.equal(captchaLoads,0);assert.ok(await form.locator('[data-emailjs-send]').isDisabled());
await form.locator('[data-captcha-load]').click();await page.waitForFunction(()=>!!window.mockCaptcha);assert.equal(captchaLoads,1);assert.ok(await form.locator('[data-emailjs-send]').isDisabled());
const solve=token=>page.evaluate(t=>{window.mockToken=t;window.mockCaptcha.callback(t)},token);await solve('mock-expired');assert.ok(await form.locator('[data-emailjs-send]').isEnabled());await page.evaluate(()=>{window.mockToken='';window.mockCaptcha['expired-callback']()});assert.ok(await form.locator('[data-emailjs-send]').isDisabled());
await solve('mock-edit');await form.locator('[name=summary]').fill('Synthetic test message, not a real enquiry — revised');await form.locator('[data-generate-enquiry]').click();assert.ok(await form.locator('[data-emailjs-send]').isDisabled());await solve('mock-first');
fail=true;await form.locator('[data-emailjs-send]').click();await form.getByText(/Delivery could not be confirmed/).waitFor();assert.equal(submissions.length,1);assert.equal(submissions[0].template_params['g-recaptcha-response'],'mock-first');assert.ok(await form.locator('[data-emailjs-send]').isDisabled());
await page.locator('[data-analytics-settings]').click();await Promise.all([page.waitForResponse(r=>r.url().startsWith('https://www.googletagmanager.com/gtm.js')),page.locator('[data-analytics-allow]').click()]);await page.waitForFunction(()=>Array.isArray(window.dataLayer));assert.equal(tags,1);
fail=false;await solve('mock-second');await form.locator('[data-emailjs-send]').click();await form.getByText('Enquiry sent successfully.').waitFor();assert.equal(submissions.length,2);assert.ok(await form.locator('[data-emailjs-send]').isDisabled());
assert.equal(submissions[1].template_params['g-recaptcha-response'],'mock-second');assert.ok(!submissions[1].template_params.message.includes('mock-second'));assert.equal(submissions[1].template_params.reply_to,'mock@example.invalid');assert.match(submissions[1].template_params.message,/Synthetic test message/);
const events=await page.evaluate(()=>window.dataLayer.filter(x=>x.event==='enquiry_submit'));assert.equal(events.length,1);assert.deepEqual(events[0],{event:'enquiry_submit',page_path:'/contact.html'});
await page.locator('[data-analytics-settings]').click();await Promise.all([page.waitForEvent('load'),page.locator('[data-analytics-deny]').click()]);assert.equal(tags,1);
console.log('Production browser UI: mocked failure and success, explicit send, consent, analytics event privacy and withdrawal passed. No external calls sent.');
}finally{await browser.close();}
