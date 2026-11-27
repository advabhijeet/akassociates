import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import worker from '../deployment/production-worker.mjs';
import {eligible,markdownPath,wantsMarkdown} from '../deployment/markdown-negotiation.mjs';
const manifest=JSON.parse(await readFile('dist-production/release-manifest.json','utf8'));
const env={ASSETS:{fetch:async req=>{const p=new URL(req.url).pathname;try{const b=await readFile('dist-production'+p);return new Response(req.method==='HEAD'?null:b,{headers:{'Content-Type':p.endsWith('.html')?'text/html':'text/plain'}});}catch{return new Response(null,{status:404});}}}};
const origin='https://chambersofak.in';
const request=(url,accept,method='GET')=>worker.fetch(new Request(url,{method,headers:{Accept:accept}}),env);
let count=0;
for(const [url,hash] of Object.entries(manifest.urls)){
 const p=new URL(url).pathname;
 const html=await request(url,'text/html');
 assert.equal(html.status,200);
 assert.equal(createHash('sha256').update(await html.text()).digest('hex'),hash);
 const md=await request(url,'text/markdown');
 if(!eligible(p)){assert.equal(md.status,200);assert.match(md.headers.get('Content-Type'),/html/);continue;}
 assert.equal(md.status,200);assert.match(md.headers.get('Content-Type'),/^text\/markdown/);
 assert.match(md.headers.get('Vary'),/Accept/i);assert.equal(md.headers.get('Cache-Control'),'no-store');
 assert.equal(md.headers.get('Link'),'<'+url+'>; rel="canonical"');
 const body=await md.text();assert.ok(body.startsWith('Source: '+url+'\n'));assert.ok(body.length>200);
 assert.doesNotMatch(body,/<(?:script|style|form)\b/i);
 if(p.startsWith('/updates/'))assert.match(body,/General information only; not legal advice or solicitation/);
 assert.equal((await request(origin+markdownPath(p),'text/markdown')).status,404);
 const head=await request(url,'text/markdown','HEAD');assert.equal(head.status,200);assert.equal(await head.text(),'');
 count++;
}
for(const a of ['*/*','text/html','text/markdown;q=0','text/html;q=1,text/markdown;q=0.2'])assert.equal(wantsMarkdown(a),false,a);
for(const a of ['text/markdown','text/markdown;q=0.8,text/html;q=0.2','text/markdown,text/html'])assert.equal(wantsMarkdown(a),true,a);
for(const p of ['/design-system.html','/not-a-real-page.html','/_ak-markdown/index.html.md'])assert.equal((await request(origin+p,'text/markdown')).status,404);
assert.equal((await request('https://www.chambersofak.in/','text/markdown')).status,301);
assert.equal((await request(origin+'/index.html','text/markdown')).status,301);
assert.equal((await request(origin+'/','text/markdown','POST')).status,405);
assert.match(await readFile('dist-production/robots.txt','utf8'),/Content-Signal: search=yes, ai-input=yes, ai-train=no/);
assert.match(await readFile('dist/robots.txt','utf8'),/Disallow: \//);
await assert.rejects(access('dist/_ak-markdown'));
console.log('Markdown negotiation and canonical HTML integrity verified for '+count+' pages.');
