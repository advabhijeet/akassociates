import {readFile,writeFile,cp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const src=resolve('dist'),out=resolve('dist-production'),origin='https://chambersofak.in';
const release=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.match(release,/^[a-f0-9]{40}$/);
const sitemap=await readFile(resolve(src,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(new Set(urls).size,urls.length);
await rm(out,{recursive:true,force:true});await cp(src,out,{recursive:true});await rm(resolve(out,'_redirects'),{force:true});
await rm(resolve(out,'design-system.html'),{force:true});
const hashes={};
for(const url of urls){const u=new URL(url);assert.equal(u.origin,origin);assert.ok(!u.search&&!u.hash);const f=resolve(out,'.'+(u.pathname==='/'?'/index.html':u.pathname));assert.ok(f.startsWith(out+'/')||f.startsWith(out+'\\'));let html=await readFile(f,'utf8');assert.ok(html.includes('href="'+url+'"'));assert.ok(html.includes('name="robots" content="noindex,nofollow"'));
 html=html.replace('name="robots" content="noindex,nofollow"','name="robots" content="index,follow"').replace('<html lang="en-IN">','<html lang="en-IN" data-ak-release="production">');
 assert.ok(html.includes('data-ak-release="production"'));
 if(u.pathname==='/contact.html'){
 html=html.replace('Prepare and copy a structured first-contact message locally. Direct website delivery is disabled in this preview.','Prepare a structured first-contact message, review it, and send it through EmailJS only if you choose.').replace('<strong>Preview mode:</strong> online enquiry delivery is disabled. Use the local message builder below to prepare a message without sending it.','<strong>Structured enquiry:</strong> prepare the message below. It is not transmitted until you explicitly select Send Enquiry.').replace('Preview only. Information remains local. Do not enter confidential or privileged material. Direct delivery is disabled.','Your message stays in your browser until you choose Send Enquiry. Sending uses EmailJS. Do not enter confidential or privileged material.').replace('Review your prepared message. Preview mode disables direct email delivery and external compose links.','Review the prepared message before sending via EmailJS, or copy it and use the listed contact channels.');
 assert.ok(!html.includes('Preview only. Information remains local.'));
 }
 if(u.pathname==='/privacy-policy.html')html=html.replace('This website uses Google Tag Manager and Google Analytics 4 to understand basic website usage','Optional analytics use Google Tag Manager and Google Analytics 4 only after visitors allow analytics. Analytics preferences can be changed using the control below the footer. These tools help understand basic website usage');
 await writeFile(f,html);hashes[url]=createHash('sha256').update(html).digest('hex');
}
await writeFile(resolve(out,'robots.txt'),await readFile('../robots.txt','utf8'));
await writeFile(resolve(out,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
await writeFile(resolve(out,'release-manifest.json'),JSON.stringify({release,urls:hashes},null,2)+'\n');
assert.match(await readFile(resolve(src,'robots.txt'),'utf8'),/Disallow: \//);
assert.match(await readFile(resolve(src,'index.html'),'utf8'),/noindex,nofollow/);
assert.match(await readFile(resolve(out,'404.html'),'utf8'),/noindex,nofollow/);
console.log('Isolated production candidate: '+urls.length+' indexable canonical pages. Staging output unchanged; no deployment.');
