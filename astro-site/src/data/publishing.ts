import {getCollection} from 'astro:content';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import registry from '../../../assets/data/insights-registry.json';
const origin='https://chambersofak.in';
const legacyFeed=readFileSync(resolve(process.cwd(),'../feed.xml'),'utf8');
const oldDates=new Map([...legacyFeed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>[m[1].match(/<guid[^>]*>(.*?)<\/guid>/)?.[1],m[1].match(/<pubDate>(.*?)<\/pubDate>/)?.[1]]));
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const safeJson=(x:unknown)=>JSON.stringify(x).replace(/</g,'\\u003c');
export const articleUrl=(href:string)=>'/'+href.replace(/^\//,'');
export async function getPublishedArticles(){
 const old=(await getCollection('legacyArticles')).map(e=>{
  const p=e.data;const rank=registry.findIndex(a=>a.href===p.href);if(rank<0)throw Error('Unknown legacy article '+p.href);
  const feedDate=oldDates.get(p.canonical);if(!feedDate||!Number.isFinite(Date.parse(feedDate)))throw Error('Missing legacy RSS date '+p.href);
  return {...p,listingTitle:registry[rank].title,nativeId:'',imageAlt:p.meta.find(m=>m.key==='og:image:alt')?.content||'',feedDate,rank};
 });
 const fresh=(await getCollection('articles',({data})=>!data.draft)).map((e,i)=>{
  const d=e.data;
  if(d.slug==='publishing-example')throw Error('Do not publish example');
  for(const asset of [d.thumbnail,d.cardThumbnail])if(!existsSync(resolve(process.cwd(),'public',asset)))throw Error('Missing publishing asset '+asset);
  if(!e.body?.trim())throw Error('Empty article '+d.slug);
  const href='updates/'+d.slug+'.html',path='/'+href,canonical=origin+path,image=origin+'/'+d.thumbnail;
  const meta=[['og:type','article'],['og:site_name','Chambers of AK'],['og:title',d.seoTitle],['og:description',d.description],['og:url',canonical],['og:image',image],['og:image:width','1200'],['og:image:height','675'],['og:image:alt',d.imageAlt],['article:published_time',d.published],['article:modified_time',d.modified],['article:section',d.category],...d.tags.map(t=>['article:tag',t]),['twitter:card','summary_large_image'],['twitter:title',d.seoTitle],['twitter:description',d.description],['twitter:image',image],['author',d.author]].map(([key,content])=>({key,content,property:key.startsWith('og:')||key.startsWith('article:')}));
  const schemas=[safeJson({'@context':'https://schema.org','@type':'BlogPosting','@id':canonical+'#article',headline:d.title,description:d.description,image,author:{'@type':d.author==='Chambers of AK'?'Organization':'Person',name:d.author},publisher:{'@type':'Organization',name:'Chambers of AK',url:origin,logo:{'@type':'ImageObject',url:origin+'/assets/img/logo-navbar.png'}},datePublished:d.published,dateModified:d.modified,mainEntityOfPage:canonical,inLanguage:'en-IN',articleSection:d.category,keywords:d.tags.join(', ')}),safeJson({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{ '@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:'Legal Insights',item:origin+'/legal-updates.html'},{'@type':'ListItem',position:3,name:d.title,item:canonical}]})];
  return {...d,title:d.seoTitle,listingTitle:d.title,href,path,canonical,date:new Date(d.published).toLocaleDateString('en-IN',{month:'long',year:'numeric',timeZone:'Asia/Kolkata'}),feedDate:d.published,rank:old.length+i,meta,schemas,hero:'<section class="page-hero"><div class="hero-eyebrow">'+esc(d.category)+'</div><h1>'+esc(d.title)+'</h1><p>'+esc(d.excerpt)+'</p></section>',body:'',toc:[],nativeId:e.id};
 });
 const entries=[...old,...fresh];const seen=new Set<string>();
 for(const a of entries){if(seen.has(a.slug))throw Error('Duplicate article slug '+a.slug);seen.add(a.slug);}
 return entries.sort((a,b)=>Date.parse(b.feedDate)-Date.parse(a.feedDate)||a.rank-b.rank);
}
export function relatedArticles<T extends {href:string;tags:string[];category:string}>(articles:T[],href:string,tags:string[],category:string){const keys=new Set(tags.map(t=>t.toLowerCase()));return articles.filter(a=>a.href!==href).map((a,i)=>({a,i,score:a.tags.filter(t=>keys.has(t.toLowerCase())).length*3+(a.category===category?1:0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,3).map(x=>x.a);}
