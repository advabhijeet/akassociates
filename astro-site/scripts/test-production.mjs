import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import worker from '../deployment/production-worker.mjs';
const manifest=JSON.parse(await readFile('dist-production/release-manifest.json','utf8'));
const env={ASSETS:{fetch:async req=>{const p=new URL(req.url).pathname;try{return new Response(await readFile('dist-production'+p),{headers:{'Content-Type':p.endsWith('.html')?'text/html':'text/plain'}});}catch{return new Response(null,{status:404});}}}};
for(const url of Object.keys(manifest.urls)){const r=await worker.fetch(new Request(url),env);assert.equal(r.status,200);assert.doesNotMatch(r.headers.get('X-Robots-Tag')||'',/noindex/i);const html=await r.text();assert.ok(html.includes('data-ak-release="production"'));assert.ok(html.includes('name="robots" content="index,follow"'));}
for(const host of ['https://preview.example','https://chambers-of-ak-url-preview.abhikr917.workers.dev']){const r=await worker.fetch(new Request(host+'/index.html'),env);assert.equal(r.status,404);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);}
assert.equal((await worker.fetch(new Request('https://www.chambersofak.in/practice.html'),env)).headers.get('Location'),'https://chambersofak.in/practice.html');
assert.equal((await worker.fetch(new Request('https://chambersofak.in/nonexistent'),env)).status,404);
assert.equal((await worker.fetch(new Request('https://chambersofak.in/services/msme-recovery-lawyer-delhi.html'),env)).headers.get('Location'),'https://chambersofak.in/services/msme-recovery-lawyer-delhi-ncr.html');
await assert.rejects(access('dist-production/design-system.html'));
assert.match(await readFile('dist/index.html','utf8'),/noindex,nofollow/);
assert.match(await readFile('dist-production/contact.html','utf8'),/Sending uses EmailJS/);
console.log('Production candidate host guard, canonical pages, noindex separation and redirects passed (mock binding).');
