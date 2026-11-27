import assert from 'node:assert/strict';
const domain='chambersofak.in',tag=2371,digest='60A791745B8BB76B5B8A15E0BBA8E046151151FE851BEB07A0E221C98AD37E74';
const endpoints=['https://dns.google/resolve','https://cloudflare-dns.com/dns-query'];
for(const endpoint of endpoints){
 const query=async type=>{const u=new URL(endpoint);u.searchParams.set('name',domain);u.searchParams.set('type',type);u.searchParams.set('do','true');const r=await fetch(u,{headers:{Accept:'application/dns-json'},signal:AbortSignal.timeout(20000)});assert.equal(r.status,200);const d=await r.json();assert.equal(d.Status,0);assert.equal(d.AD,true,'Resolver did not authenticate '+type);return d.Answer||[];};
 const ds=await query('DS');assert.ok(ds.some(x=>x.type===43&&x.data.toUpperCase().replace(/\s+/g,' ').trim()===tag+' 13 2 '+digest),'DS mismatch');
 const keys=await query('DNSKEY');assert.ok(keys.some(x=>x.type===48&&/^257 3 13 /.test(x.data)),'No signing key');
 const a=await query('A'),mx=await query('MX');
 assert.ok(a.some(x=>x.type===1));assert.ok(mx.some(x=>x.type===15));
 console.log(JSON.stringify({resolver:endpoint,authenticated:['DS','DNSKEY','A','MX'],ds:ds.filter(x=>x.type===43),mx:mx.filter(x=>x.type===15)}));
}
const r=await fetch('https://'+domain+'/',{signal:AbortSignal.timeout(20000)});assert.equal(r.status,200);assert.match(await r.text(),/data-ak-release="production"/);console.log('DNSSEC and HTTPS verified.');
