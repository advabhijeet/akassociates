import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const origin='https://chambersofak.in',host='chambersofak.in';
const current=JSON.parse(await readFile('dist-production/release-manifest.json','utf8'));
const previousPath=process.argv[2];assert.ok(previousPath,'Provide previous deployed release manifest, or --initial for first cutover');
const previous=previousPath==='--initial'?{urls:{}}:JSON.parse(await readFile(previousPath,'utf8'));
const changed=Object.keys(current.urls).filter(u=>current.urls[u]!==previous.urls[u]);const removed=Object.keys(previous.urls).filter(u=>!current.urls[u]);
for(const u of [...changed,...removed])assert.equal(new URL(u).origin,origin);
console.log(JSON.stringify({release:current.release,changed,removed,mode:process.argv.includes('--send')?'send after live checks':'dry run'},null,2));
if(!process.argv.includes('--send'))process.exit(0);
assert.equal(process.env.AK_INDEXNOW_APPROVED,'YES','Explicit operator approval required');
async function get(path){return fetch(new URL(path,origin),{redirect:'manual',signal:AbortSignal.timeout(20000)});}
const marker=await get('/release-manifest.json');assert.equal(marker.status,200);assert.deepEqual(await marker.json(),current,'Live release does not match local candidate');
const robots=await get('/robots.txt');assert.equal(robots.status,200);assert.doesNotMatch(await robots.text(),/^Disallow:\s*\/\s*$/mi);
const sitemap=await get('/sitemap.xml');assert.equal(sitemap.status,200);const xml=await sitemap.text();const liveUrls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual([...liveUrls].sort(),Object.keys(current.urls).sort());
const keyFile='5c688070aeba92b5256f3a4590fd4c6e.txt';const key=(await readFile('../'+keyFile,'utf8')).trim();const kr=await get('/'+keyFile);assert.equal(kr.status,200);assert.equal((await kr.text()).trim(),key);
for(let i=0;i<changed.length;i+=8)await Promise.all(changed.slice(i,i+8).map(async u=>{const r=await get(u);assert.equal(r.status,200);assert.doesNotMatch(r.headers.get('x-robots-tag')||'',/noindex/i);const html=await r.text();assert.ok(html.includes('href="'+u+'"'));assert.ok(html.includes('name="robots" content="index,follow"'));assert.equal(createHash('sha256').update(html).digest('hex'),current.urls[u],'Live content mismatch '+u);}));
for(const u of removed){const r=await get(u);assert.ok([301,404,410].includes(r.status),'Removed route still accessible '+u);}
const urls=[...changed,...removed];if(!urls.length){console.log('No changed URLs.');process.exit(0);}
const result=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host,key,keyLocation:origin+'/'+keyFile,urlList:urls}),signal:AbortSignal.timeout(20000)});assert.ok([200,202].includes(result.status),'IndexNow HTTP '+result.status);console.log('IndexNow accepted request: '+result.status+' for '+urls.length+' URLs.');
