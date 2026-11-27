import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import worker from '../deployment/production-worker.mjs';
import {securityHeaders} from '../deployment/security-headers.mjs';
const manifest=JSON.parse(await readFile('dist-production/release-manifest.json','utf8'));
const env={ASSETS:{fetch:async req=>{const p=new URL(req.url).pathname;try{return new Response(req.method==='HEAD'?null:await readFile('dist-production'+p),{headers:{'Content-Type':p.endsWith('.html')?'text/html':'text/plain'}});}catch{return new Response(null,{status:404});}}}};
const verify=r=>{for(const [name,value] of Object.entries(securityHeaders))assert.equal(r.headers.get(name),value,name);};
for(const [url,hash] of Object.entries(manifest.urls)){
 const r=await worker.fetch(new Request(url,{headers:{Accept:'text/html'}}),env);
 verify(r);assert.equal(r.status,200);assert.equal(createHash('sha256').update(await r.text()).digest('hex'),hash);
}
const origin='https://chambersofak.in';
for(const [url,status,method,accept] of [[origin+'/',200,'GET','text/markdown'],[origin+'/',200,'HEAD','text/markdown'],[origin+'/robots.txt',200,'GET','*/*'],[origin+'/index.html',301,'GET','text/html'],['https://www.chambersofak.in/',301,'GET','text/html'],[origin+'/design-system.html',404,'GET','text/html'],[origin+'/_ak-markdown/index.html.md',404,'GET','text/html'],[origin+'/not-a-real-page',404,'GET','text/html'],[origin+'/',405,'POST','text/html'],['https://preview.example/',404,'GET','text/html']]){
 const r=await worker.fetch(new Request(url,{method,headers:{Accept:accept}}),env);assert.equal(r.status,status,url);verify(r);
}
console.log('Five baseline security headers verified on 87 canonical HTML routes and 10 alternate/error responses. HTML hashes preserved.');
