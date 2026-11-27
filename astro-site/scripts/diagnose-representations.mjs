import {createHash} from 'node:crypto';
const origin='https://chambersofak.in';
const headers={'User-Agent':'Chambers-of-AK-post-launch-audit/1.0'};
const hash=s=>createHash('sha256').update(s).digest('hex');
const manifest=await (await fetch(origin+'/release-manifest.json')).json();
console.log('Release',manifest.release);
for(const path of ['/','/legal-updates.html','/updates/cheque-bounce-30-days.html']){
 const variants={};
 for(const accept of ['*/*','text/html','text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','text/markdown','text/html','*/*']){
  const r=await fetch(origin+path,{headers:{...headers,Accept:accept},redirect:'manual'});const body=await r.text();
  console.log(JSON.stringify({path,accept,status:r.status,hash:hash(body),expected:manifest.urls[origin+path],length:body.length,headers:Object.fromEntries([...r.headers].filter(([k])=>['content-type','content-encoding','cf-cache-status','vary','etag','cache-control','server','cf-ray','content-length'].includes(k))),obfuscation:body.includes('/cdn-cgi/l/email-protection'),emailScript:body.includes('email-decode.min.js')}));
  if(accept==='*/*'||accept==='text/html')variants[accept]=body;
 }
 const a=variants['*/*'],b=variants['text/html'];let i=0;while(i<Math.min(a.length,b.length)&&a[i]===b[i])i++;let j=0;while(j<Math.min(a.length,b.length)-i&&a[a.length-1-j]===b[b.length-1-j])j++;
 console.log(JSON.stringify({path,firstDiff:i,commonSuffix:j,wildcard:a.slice(Math.max(0,i-70),i+450),html:b.slice(Math.max(0,i-70),i+450)}));
}
