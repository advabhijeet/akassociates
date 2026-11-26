import assert from 'node:assert/strict';
import worker from '../deployment/worker.mjs';
const paths=new Set(['/index.html','/404.html','/practice.html','/updates/test.html','/services/msme-recovery-lawyer-delhi-ncr.html']);
const env={ASSETS:{fetch:async request=>{const p=new URL(request.url).pathname;return new Response(paths.has(p)?p:'not found',{status:paths.has(p)?200:404});}}};
const req=(p,method='GET')=>worker.fetch(new Request('https://preview.example'+p,{method}),env);
for(const p of ['/','/practice.html','/updates/test.html']){const r=await req(p);assert.equal(r.status,200);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);}
for(const [from,to] of [['/index.html','/'],['/practice','/practice.html'],['/updates/test/','/updates/test.html'],['/services/msme-recovery-lawyer-delhi.html','/services/msme-recovery-lawyer-delhi-ncr.html'],['/services/msme-recovery-lawyer-delhi','/services/msme-recovery-lawyer-delhi-ncr.html']]){const r=await req(from+'?x=1');assert.equal(r.status,301);assert.equal(r.headers.get('Location'),'https://preview.example'+to+'?x=1');}
assert.equal((await req('/unknown')).status,404);assert.equal((await req('/contact.html','POST')).status,405);
console.log('Exact URL adapter unit tests passed with mocked static binding.');
