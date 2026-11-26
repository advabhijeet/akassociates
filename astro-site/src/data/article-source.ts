import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {articles} from './insights';
import inventory from '../../migration/legacy-inventory.json';
const origin='https://chambersofak.in';
const root=resolve(process.cwd(),'..');
const localPaths=new Set(['/', '/legal-updates.html', ...inventory.routes.filter(r=>/^(practice|services|updates)\//.test(r.source)||r.source==='practice.html').map(r=>r.path),...articles.map(a=>'/'+a.href)]);
const read=(file:string)=>readFileSync(resolve(root,file),'utf8');
function decode(s:string){return s.replace(/&(?:amp|quot|apos|lt|gt|nbsp|ndash|mdash|rsquo|lsquo|rdquo|ldquo|#\d+|#x[0-9a-f]+);/gi,e=>{const m:Record<string,string>={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' ','&ndash;':'–','&mdash;':'—','&rsquo;':'’','&lsquo;':'‘','&rdquo;':'”','&ldquo;':'“'};if(e in m)return m[e];const n=e.toLowerCase().startsWith('&#x')?parseInt(e.slice(3,-1),16):parseInt(e.slice(2,-1),10);return Number.isFinite(n)?String.fromCodePoint(n):e;});}
const plain=(s:string)=>decode(s.replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();
function attr(tag:string,name:string){return tag.match(new RegExp('(?:^|\\s)'+name+'\\s*=\\s*(["\\x27])(.*?)\\1','i'))?.[2]||'';}
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function localize(body:string,path:string){return body.replace(/\b(href|src)\s*=\s*(["'])(.*?)\2/gi,(whole,key,q,value)=>{
 const href=decode(value);if(href.startsWith('#')||/^(mailto:|tel:)/i.test(href))return whole;
 const u=new URL(href,origin+path);
 if(!['http:','https:'].includes(u.protocol))throw Error('Unexpected resource protocol: '+path);
 if(u.origin!==origin)return whole;
 const asset=/^\/assets\/(img|judgments)\//.test(u.pathname);
 if(asset&&!existsSync(resolve(process.cwd(),'public',u.pathname.slice(1))))throw Error('Missing article asset: '+u.pathname);
 return key+'="'+esc((asset||localPaths.has(u.pathname)?u.pathname:origin+u.pathname)+u.search+u.hash)+'"';
});}
function head(source:string){
 const meta=[...source.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).map(tag=>({key:attr(tag,'property')||attr(tag,'name'),property:!!attr(tag,'property'),content:decode(attr(tag,'content'))}));
 const value=(key:string)=>meta.find(m=>m.key===key)?.content||'';
 const canonical=decode([...source.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href'))[0]||'');
 const schemas=[...source.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
 return {title:plain(source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||''),canonical,description:value('description'),published:value('article:published_time'),modified:value('article:modified_time'),meta:meta.filter(m=>/^(og:|article:|twitter:)/.test(m.key)||m.key==='author'),schemas:schemas.map(s=>JSON.stringify(s).replace(/</g,'\\u003c')),author:schemas.find(s=>s['@type']==='BlogPosting')?.author?.name||''};
}
export function loadArticlePages(){return articles.map(entry=>{
 const path='/'+entry.href;const source=read(entry.href);const metadata=head(source);
 if(metadata.canonical!==origin+path||!metadata.title||!metadata.description)throw Error('Missing or mismatched metadata: '+path);
 const main=source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
 if(!main||/<(?:script|iframe|object|embed|form|style)\b|\son\w+\s*=/i.test(main))throw Error('Unsupported article markup: '+path);
 const hero=main.match(/<section\b[^>]*class="[^"]*\bpage-hero\b[^"]*"[^>]*>[\s\S]*?<\/section>/i);
 if(!hero)throw Error('Missing article hero: '+path);
 const body=main.replace(hero[0],'');
 const article=body.match(/<article\b[^>]*class="[^"]*\barticle-body\b[^"]*"[^>]*>[\s\S]*?<\/article>/i);
 if(!article)throw Error('Missing article body: '+path);
 const ids=new Set([...main.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]));
 const toc:{id:string;label:string;level:number}[]=[];
 const numbered=article[0].replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,(whole,level,attrs,content)=>{
  const label=plain(content);let id=attr(' '+attrs,'id');
  if(!id){const base=label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,70)||'section';id=base;let n=2;while(ids.has(id))id=base+'-'+n++;ids.add(id);}
  toc.push({id,label,level:Number(level)});
  return attr(' '+attrs,'id')?whole:'<h'+level+attrs+' id="'+esc(id)+'">'+content+'</h'+level+'>';
 });
 return {...entry,...metadata,path,slug:entry.href.replace(/^updates\//,'').replace(/\.html$/,''),hero:localize(hero[0],path),body:localize(body.replace(article[0],numbered),path),toc};
});}
export function loadInsightsHead(){return head(read('legal-updates.html'));}
