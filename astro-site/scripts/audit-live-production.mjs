import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {lookup} from 'node:dns/promises';
import assert from 'node:assert/strict';
const origin='https://chambersofak.in', www='https://www.chambersofak.in';
const expectedRelease='49163f9c381423fd7d63f5c43dee69a267e68020';
const inv=JSON.parse(await readFile(new URL('../migration/legacy-inventory.json',import.meta.url),'utf8'));
const urls=[...inv.sitemap.map(u=>new URL(u,origin).href),origin+'/legal-tools.html'];
assert.equal(urls.length,87);assert.equal(new Set(urls).size,87);
const report={expectedRelease,dns:{},results:[],warnings:[]};
for(const host of [new URL(origin).hostname,new URL(www).hostname]){
 try{report.dns[host]=await lookup(host,{all:true});}catch(e){report.dns[host]=String(e);}
}
const get=async u=>fetch(new URL(u,origin),{redirect:'manual',signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Chambers-of-AK-post-launch-audit/1.0'}});
const robotsOK=r=>assert.doesNotMatch(r.headers.get('x-robots-tag')||'',/noindex|nofollow|\bnone\b/i);

const securityHeaders={
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
 'Content-Security-Policy':"frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
};
const verifySecurity=r=>{for(const [name,value] of Object.entries(securityHeaders))assert.equal(r.headers.get(name),value,name);};

const checks=[];let manifest;
const add=(group,url,fn)=>checks.push({group,url,fn});
const run=async ({group,url,fn})=>{try{const r=await get(url);if(new URL(url).protocol==='https:')verifySecurity(r);const extra=await fn(r);report.results.push({group,url,status:r.status,server:r.headers.get('server'),pass:true,...extra});}catch(e){report.results.push({group,url,pass:false,error:String(e.message||e)});}};
// Allow Cloudflare's Git-integrated deployment to finish before auditing.
for(let attempt=0;attempt<24;attempt++){
 try{const r=await get(origin+'/release-manifest.json');if(r.ok&&(await r.json()).release===expectedRelease)break;}catch{}
 if(attempt<23)await new Promise(resolve=>setTimeout(resolve,10000));
}
await run({group:'release',url:origin+'/release-manifest.json',fn:async r=>{assert.equal(r.status,200);manifest=await r.json();assert.equal(manifest.release,expectedRelease);assert.deepEqual(Object.keys(manifest.urls).sort(),[...urls].sort());return {release:manifest.release};}});
for(const u of urls)add('canonical',u,async r=>{
 assert.equal(r.status,200);robotsOK(r);assert.match(r.headers.get('content-type')||'',/text\/html/i);
 const html=await r.text();assert.match(html,/data-ak-release="production"/);assert.match(html,/name="robots" content="index,follow"/);
 const canon=[...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
 assert.equal(canon.length,1,'canonical count');assert.ok(canon[0][0].includes('href="'+u+'"'),'canonical target');
 const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();assert.ok(title,'missing title');
 const meta=[...html.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)];assert.equal(meta.length,1,'description count');
 assert.ok(meta[0][0].match(/\bcontent=["'][^"']+/),'empty description');
 const ld=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 for(const l of ld)JSON.parse(l[1]);if(!ld.length)report.warnings.push({url:u,note:'No JSON-LD script present; assess applicability separately'});
 assert.ok(manifest?.urls?.[u],'missing manifest hash');assert.equal(createHash('sha256').update(html).digest('hex'),manifest.urls[u],'live HTML hash differs from manifest');
 if(u===origin+'/contact.html'){assert.ok(html.includes('data-captcha-load'));assert.ok(html.includes('data-captcha-widget'));assert.ok(html.includes('g-recaptcha-response'));assert.ok(html.includes('6LduzDQuAAAAALtanZT4xKZnzw7zHOJsj2wpsC8_'));assert.ok(!/<script[^>]+src=["']https:\/\/www\.google\.com\/recaptcha\/api\.js/i.test(html),'CAPTCHA loaded before explicit action');}
 if(u===origin+'/privacy-policy.html')assert.ok(html.includes('Google reCAPTCHA'));
 return {title,jsonLd:ld.length};
});
const aliases={'/services/cheque-bounce-lawyer-bihar.html':'/services/cheque-bounce-lawyer-patna.html','/services/civil-litigation-lawyer-bihar.html':'/services/civil-litigation-lawyer-patna.html','/services/msme-recovery-lawyer-delhi.html':'/services/msme-recovery-lawyer-delhi-ncr.html','/services/property-dispute-lawyer-bihar.html':'/services/property-dispute-lawyer-patna.html','/practice':'/practice.html','/index.html':'/'};
for(const [p,to] of Object.entries(aliases))add('redirect',origin+p,async r=>{assert.equal(r.status,301);robotsOK(r);assert.equal(new URL(r.headers.get('location'),origin).href,origin+to);});
for(const p of ['/','/practice.html?audit=1'])add('www',www+p,async r=>{assert.equal(r.status,301);assert.equal(new URL(r.headers.get('location'),www).href,origin+p);});
for(const host of [origin,www])add('http-to-https',host.replace('https:','http:')+'/',async r=>{assert.ok([301,302,307,308].includes(r.status),'HTTP does not redirect to HTTPS');const to=new URL(r.headers.get('location'),host);assert.equal(to.protocol,'https:');assert.ok([origin,www].includes(to.origin));});
for(const p of ['/qa-route-does-not-exist','/design-system.html'])add('not-found',origin+p,async r=>{assert.equal(r.status,404);assert.match(r.headers.get('x-robots-tag')||'',/noindex/i);});
add('discovery',origin+'/robots.txt',async r=>{assert.equal(r.status,200);robotsOK(r);const body=await r.text();assert.equal(body,await readFile(new URL('../../robots.txt',import.meta.url),'utf8'));assert.doesNotMatch(body,/^Disallow:\s*\/\s*$/mi);});
add('discovery',origin+'/sitemap.xml',async r=>{assert.equal(r.status,200);robotsOK(r);const xml=await r.text();assert.match(xml,/<urlset\b/);assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]).sort(),[...urls].sort());});
add('discovery',origin+'/feed.xml',async r=>{assert.equal(r.status,200);robotsOK(r);const body=await r.text();assert.match(body,/<rss\b/);assert.match(body,/<item>/);});
add('verification',origin+'/google3164979181871a1d.html',async r=>{assert.equal(r.status,200);assert.equal((await r.text()).trim(),(await readFile(new URL('../../google3164979181871a1d.html',import.meta.url),'utf8')).trim());});
const key='5c688070aeba92b5256f3a4590fd4c6e.txt';
add('verification',origin+'/'+key,async r=>{assert.equal(r.status,200);assert.equal((await r.text()).trim(),key.replace('.txt',''));});
for(let i=0;i<checks.length;i+=6)await Promise.all(checks.slice(i,i+6).map(run));

const mdEligible=p=>p==='/'||p==='/legal-updates.html'||/^\/updates\/[a-z0-9-]+\.html$/.test(p);
const mdUrls=urls.filter(u=>mdEligible(new URL(u).pathname));
const mdGet=(u,accept='text/markdown',method='GET')=>fetch(u,{method,redirect:'manual',signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Chambers-of-AK-post-launch-audit/1.0',Accept:accept}});
for(let i=0;i<mdUrls.length;i+=6)await Promise.all(mdUrls.slice(i,i+6).map(async url=>{
 try{
 const r=await mdGet(url);verifySecurity(r);assert.equal(r.status,200);assert.match(r.headers.get('content-type')||'',/^text\/markdown/i);assert.match(r.headers.get('vary')||'',/Accept/i);assert.match(r.headers.get('cache-control')||'',/no-store/i);robotsOK(r);assert.equal(r.headers.get('link'),'<'+url+'>; rel="canonical"');
 const body=await r.text();assert.ok(body.startsWith('Source: '+url+'\n'));assert.ok(body.length>200);if(url.includes('/updates/'))assert.match(body,/General information only; not legal advice or solicitation/);
 const p=new URL(url).pathname,internal=origin+'/_ak-markdown'+(p==='/'?'/index.html':p)+'.md';const blocked=await mdGet(internal);verifySecurity(blocked);assert.equal(blocked.status,404);
 const head=await mdGet(url,'text/markdown','HEAD');verifySecurity(head);assert.equal(head.status,200);assert.match(head.headers.get('content-type')||'',/^text\/markdown/i);assert.equal(await head.text(),'');
 const html=await mdGet(url,'text/html');verifySecurity(html);assert.equal(html.status,200);assert.match(html.headers.get('content-type')||'',/text\/html/i);assert.equal(createHash('sha256').update(await html.text()).digest('hex'),manifest.urls[url]);
 report.results.push({group:'markdown',url,pass:true,status:r.status});
 }catch(e){report.results.push({group:'markdown',url,pass:false,error:String(e.message||e)});}
}));
for(const [path,accept,status,type] of [['/','text/markdown;q=0,text/html',200,'text/html'],['/','*/*',200,'text/html'],['/legal-tools.html','text/markdown',200,'text/html'],['/design-system.html','text/markdown',404,null],['/index.html','text/markdown',301,null]]){
 try{const r=await mdGet(origin+path,accept);verifySecurity(r);assert.equal(r.status,status);if(type)assert.ok((r.headers.get('content-type')||'').includes(type));report.results.push({group:'negotiation',url:origin+path,pass:true,status:r.status});}catch(e){report.results.push({group:'negotiation',url:origin+path,pass:false,error:String(e.message||e)});}
}

const groups={};for(const r of report.results){const g=groups[r.group]??={passed:0,failed:0};g[r.pass?'passed':'failed']++;}
report.groups=groups;report.failures=report.results.filter(r=>!r.pass);report.passed=report.results.length-report.failures.length;report.total=report.results.length;
const titles=new Map();for(const r of report.results.filter(r=>r.title)){if(titles.has(r.title))report.warnings.push({url:r.url,note:'Duplicate title with '+titles.get(r.title)});else titles.set(r.title,r.url);}
await writeFile('live-audit-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({expectedRelease,dns:report.dns,groups,passed:report.passed,total:report.total,failures:report.failures,warnings:report.warnings},null,2));
assert.equal(report.failures.length,0,'Live audit has failed checks; inspect report.');
