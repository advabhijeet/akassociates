import {spawnSync} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const local=process.env.AK_LIGHTHOUSE_LOCAL==='1';
const origin=local?'http://127.0.0.1:4173':'https://chambers-of-ak-url-preview.abhikr917.workers.dev';
const pages={'home':'/','practice':'/practice/msme-disputes.html','archive':'/legal-updates.html','article':'/updates/msme-registration-benefits-eligibility.html','tools':'/legal-tools.html','contact':'/contact.html'};
await mkdir('qa-lighthouse',{recursive:true});
const results=[];
async function measure(name,path,mode,attempt){
 const output='qa-lighthouse/'+name+'-'+mode+'-'+attempt+'.json';
 const args=['--yes','lighthouse@13.6.0',origin+path,'--quiet','--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage','--only-categories=performance,accessibility,best-practices','--output=json','--output-path='+output];
 if(mode==='desktop')args.push('--preset=desktop');
 const r=spawnSync('npx',args,{stdio:'inherit',timeout:180000});
 if(r.status!==0)return {attempt,error:'Lighthouse exit '+r.status};
 const j=JSON.parse(await readFile(output,'utf8'));
 const scores=Object.fromEntries(Object.entries(j.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
 const audits=Object.values(j.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}));
 const shifts=j.audits['layout-shifts']?.details?.items||j.audits['cls-culprits-insight']?.details?.items||[];
 const diagnostics=Object.fromEntries(['long-tasks','bootup-time','mainthread-work-breakdown','third-party-summary'].map(k=>[k,j.audits[k]?.details?.items?.slice(0,10)||[]]));
 return {attempt,scores,LCP:j.audits['largest-contentful-paint']?.numericValue,CLS:j.audits['cumulative-layout-shift']?.numericValue,TBT:j.audits['total-blocking-time']?.numericValue,shifts:shifts.slice(0,5),audits,diagnostics};
}
const median=values=>[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
for(const [name,path] of Object.entries(pages))for(const mode of ['mobile','desktop']){
 // Predeclared sampling: three independent homepage mobile runs, one everywhere else.
 const count=name==='home'&&mode==='mobile'?3:1;
 const samples=[];
 for(let i=1;i<=count;i++)samples.push(await measure(name,path,mode,i));
 if(samples.some(s=>s.error)){results.push({name,mode,error:'One or more samples failed',samples});continue;}
 const scores={performance:median(samples.map(s=>s.scores.performance)),accessibility:Math.min(...samples.map(s=>s.scores.accessibility)),'best-practices':Math.min(...samples.map(s=>s.scores['best-practices']))};
 results.push({name,mode,scores,LCP:median(samples.map(s=>s.LCP)),CLS:Math.max(...samples.map(s=>s.CLS)),TBT:median(samples.map(s=>s.TBT)),samples});
}
await writeFile('qa-lighthouse/summary.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({samples,...r})=>({...r,samples:samples.map(s=>({attempt:s.attempt,scores:s.scores,CLS:s.CLS,TBT:s.TBT,error:s.error}))})),null,2));
const home=results.find(r=>r.name==='home'&&r.mode==='mobile');
console.log('Mobile homepage diagnostic samples: '+JSON.stringify(home?.samples?.map(s=>({attempt:s.attempt,diagnostics:s.diagnostics,audits:s.audits})),null,2));
if(results.some(r=>r.error||(local&&(r.CLS>0.1||r.scores?.performance<90||r.scores?.accessibility<90))))process.exitCode=1;
