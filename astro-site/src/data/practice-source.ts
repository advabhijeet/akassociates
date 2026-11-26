import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import inventory from '../../migration/legacy-inventory.json';
const origin='https://chambersofak.in';
const core=["about.html","case-enquiry.html","contact.html","courts.html","disclaimer.html","document-checklists.html","faq.html","privacy-policy.html","process.html","terms.html"];
const routes=inventory.routes.filter(r=>core.includes(r.source)||r.source==='practice.html'||/^(practice|services)\/.+\.html$/.test(r.source));
const localPaths=new Set(['/', '/legal-updates.html', ...routes.map(r=>r.path), ...inventory.routes.filter(r=>r.source.startsWith('updates/')).map(r=>r.path)]);
const root=resolve(process.cwd(),'..');
const read=(file:string)=>readFileSync(resolve(root,file),'utf8');
function decode(s:string){return s.replace(/&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[0-9a-f]+);/gi,e=>{const m:Record<string,string>={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' '};if(e in m)return m[e];const n=e.startsWith('&#x')?parseInt(e.slice(3,-1),16):parseInt(e.slice(2,-1),10);return Number.isFinite(n)?String.fromCodePoint(n):e;});}
function attr(tag:string,name:string){return tag.match(new RegExp('(?:^|\\s)'+name+'\\s*=\\s*(["\x27])(.*?)\\1','i'))?.[2]||'';}
function metadata(source:string,key:string,property='name'){const tag=[...source.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).find(t=>attr(t,property)===key);return tag?decode(attr(tag,'content')):'';}
function escapeAttr(s:string){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function localize(body:string,path:string){return body.replace(/\b(href|src)\s*=\s*(["'])(.*?)\2/gi,(whole,key,q,href)=>{
 const decoded=decode(href);if(decoded.startsWith('#')||/^(mailto:|tel:)/i.test(decoded))return whole;
 const u=new URL(decoded,origin+path);if(!['http:','https:'].includes(u.protocol))throw Error('Unexpected link protocol: '+path);
 if(u.origin!==origin)return whole;
 return key+'="'+escapeAttr((localPaths.has(u.pathname)||u.pathname.startsWith('/assets/img/')?u.pathname:origin+u.pathname)+u.search+u.hash)+'"';
});}
export function loadPracticePages(){return routes.map(r=>{
 const source=read(r.source);
 const title=decode(source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'');
 const canonical=decode([...source.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href'))[0]||'');
 if(!title||!canonical)throw Error('Missing title/canonical: '+r.source);
 const redirect=canonical!==origin+r.path;
 if(redirect){
   const dest=new URL(canonical);
   if(dest.origin!==origin||!localPaths.has(dest.pathname)||!metadata(source,'robots').includes('noindex'))throw Error('Unexpected canonical exception: '+r.source);
   return {slug:r.source.replace(/\.html$/,''),path:r.path,title,canonical,description:'This page has moved.',redirect:dest.pathname,heading:'Page moved',eyebrow:'Practice information',intro:'',sections:[],schemas:[],ogTitle:'',ogDescription:'',ogImage:'',ogType:'',twitterTitle:'',twitterDescription:'',twitterImage:''};
 }
 let main=source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
 if(r.source==='contact.html'&&main)main=main.replace(/<form\b[\s\S]*?<\/form>/i,'<div class="preview-enquiry"><p><strong>Preview mode:</strong> online enquiry delivery is disabled. Use the local message builder below to prepare a message without sending it.</p><p><a href="#preview-message">Prepare a message</a></p></div>');
 if(!main||/<(?:script|iframe|object|embed|form|style)\b|\son\w+\s*=/i.test(main))throw Error('Missing or unsupported legacy main: '+r.source);
 const hero=main.match(/<section\b[^>]*class="page-hero"[^>]*>([\s\S]*?)<\/section>/i);
 if(!hero)throw Error('Missing hero: '+r.source);
 const heading=decode(hero[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'');
 const eyebrow=decode(hero[1].match(/<div[^>]*class="hero-eyebrow"[^>]*>([\s\S]*?)<\/div>/i)?.[1]||'');
 const intro=localize(hero[1].replace(/<div[^>]*class="hero-eyebrow"[^>]*>[\s\S]*?<\/div>/i,'').replace(/<h1[^>]*>[\s\S]*?<\/h1>/i,''),r.path);
 const body=main.replace(hero[0],'');
 const sectionMatches=[...body.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/gi)];
 const remainder=body.replace(/<section\b[^>]*>[\s\S]*?<\/section>/gi,'').replace(/<!--[\s\S]*?-->/g,'').trim();
 if(remainder||!sectionMatches.length||!heading)throw Error('Unmapped content: '+r.source+' '+remainder.slice(0,100));
 const sections=sectionMatches.map((m,i)=>{
  const label=m[1].match(/<div[^>]*class="sec-label"[^>]*>([\s\S]*?)<\/div>/i);
  if(!label)throw Error('Missing section label: '+r.source+' '+i);
  const html=localize(m[1].replace(label[0],'').replace(/<(\/?)h2(?=[\s>])/gi,'<$1h3'),r.path);
  return {id:'section-'+(i+1),label:decode(label[1].replace(/<[^>]*>/g,'')),html};
 });
 const schemas=[...source.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.stringify(JSON.parse(m[1])).replace(/</g,'\\u003c'));
 return {slug:r.source.replace(/\.html$/,''),path:r.path,title,canonical,description:metadata(source,'description'),redirect:'',heading,eyebrow,intro,sections,schemas,ogTitle:metadata(source,'og:title','property'),ogDescription:metadata(source,'og:description','property'),ogImage:metadata(source,'og:image','property'),ogType:metadata(source,'og:type','property'),twitterTitle:metadata(source,'twitter:title'),twitterDescription:metadata(source,'twitter:description'),twitterImage:metadata(source,'twitter:image')};
});}
