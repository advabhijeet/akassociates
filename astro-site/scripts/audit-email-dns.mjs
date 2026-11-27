import assert from 'node:assert/strict';
const domain='chambersofak.in';
for(const resolver of ['https://dns.google/resolve','https://cloudflare-dns.com/dns-query']){
 const q=async(name,type)=>{const u=new URL(resolver);u.searchParams.set('name',name);u.searchParams.set('type',type);u.searchParams.set('do','true');const r=await fetch(u,{headers:{Accept:'application/dns-json'},signal:AbortSignal.timeout(20000)});assert.equal(r.status,200);const j=await r.json();assert.ok([0,3].includes(j.Status));return {status:j.Status,authenticated:j.AD,records:(j.Answer||[]).filter(x=>[15,16,5].includes(x.type)).map(x=>({type:x.type,data:x.data}))};};
 const root=await q(domain,'TXT');
 const spf=root.records.filter(x=>/^"?v=spf1\b/i.test(x.data));
 const dmarc=await q('_dmarc.'+domain,'TXT');
 const dkim=await q('google._domainkey.'+domain,'TXT');
 const mx=await q(domain,'MX');
 console.log(JSON.stringify({resolver,root:{status:root.status,authenticated:root.authenticated,spf,otherTxtCount:root.records.length-spf.length},dmarc:{...dmarc,records:dmarc.records.map(x=>({...x,data:x.data.replace(/mailto:[^;"\s]+/g,'mailto:[redacted]')}))},defaultGoogleDkim:{status:dkim.status,authenticated:dkim.authenticated,recordCount:dkim.records.length,hasKey:dkim.records.some(x=>/p=[A-Za-z0-9+/]{20}/.test(x.data))},mx}));
}
console.log('Read-only email DNS inventory complete. MX alone does not establish outbound sender authorization; unknown DKIM selectors not tested.');
