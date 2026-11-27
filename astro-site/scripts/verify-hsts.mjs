import assert from 'node:assert/strict';
const origin='https://chambersofak.in',www='https://www.chambersofak.in';
const expected='9e79bec8ecac701c59964ad0e5000dafed42fd5a';
const get=(url,accept='text/html')=>fetch(url,{redirect:'manual',headers:{Accept:accept,'User-Agent':'Chambers-of-AK-security-audit/1.0'},signal:AbortSignal.timeout(20000)});
const manifest=await get(origin+'/release-manifest.json','application/json');assert.equal(manifest.status,200);assert.equal((await manifest.json()).release,expected);
for(const [url,accept,status] of [[origin+'/','text/html',200],[origin+'/contact.html','text/html',200],[origin+'/privacy-policy.html','text/html',200],[origin+'/','text/markdown',200],[www+'/','text/html',301],[origin+'/qa-route-does-not-exist','text/html',404]]){
 const r=await get(url,accept);assert.equal(r.status,status);const h=r.headers.get('strict-transport-security')||'';
 console.log(JSON.stringify({url,accept,status:r.status,hsts:h,nosniff:r.headers.get('x-content-type-options'),frame:r.headers.get('x-frame-options'),permissions:r.headers.get('permissions-policy'),csp:r.headers.get('content-security-policy')}));
 assert.match(h,/(?:^|;\s*)max-age\s*=\s*2592000(?:;|$)/i,'Expected one-month HSTS');assert.doesNotMatch(h,/includeSubDomains|preload/i);assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.equal(r.headers.get('x-frame-options'),'DENY');assert.match(r.headers.get('content-security-policy')||'',/frame-ancestors 'none'/);
 await r.body?.cancel();
}
for(const host of [origin,www]){const r=await get(host.replace('https:','http:')+'/');assert.ok([301,302,307,308].includes(r.status));assert.equal(new URL(r.headers.get('location'),host).protocol,'https:');console.log(JSON.stringify({http:host.replace('https:','http:'),status:r.status,location:r.headers.get('location')}));await r.body?.cancel();}
console.log('HSTS one-month policy, no subdomain or preload directives, HTTPS redirects and existing security headers verified.');
