import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import {parse,TEXT_NODE,ELEMENT_NODE} from 'ultrahtml';
import {querySelector,querySelectorAll} from 'ultrahtml/selector';
import {decodeHTML} from 'entities';

const compact=s=>s.replace(/\s+/g,' ').trim();
const text=n=>n.type===TEXT_NODE?decodeHTML(n.value): (n.children||[]).map(text).join('');
const escape=s=>s.replace(/[\\[\]*_\x60<>|]/g,'\\$&');
const skip=new Set(['script','style','svg','noscript','template','button','input','select','textarea','form','nav']);
const link=(href,url)=>{try{const u=new URL(decodeHTML(href),url);return ['https:','http:','mailto:','tel:'].includes(u.protocol)?u.href.replace(/[()<> ]/g,c=>encodeURIComponent(c)==='('? '%28':encodeURIComponent(c)===')'? '%29':encodeURIComponent(c)):'';}catch{return '';}};
function markdown(n,url){
 if(n.type===TEXT_NODE)return escape(decodeHTML(n.value).replace(/\s+/g,' '));
 if(n.type!==ELEMENT_NODE)return (n.children||[]).map(c=>markdown(c,url)).join('');
 const tag=n.name.toLowerCase(), a=n.attributes||{}, cs=n.children||[];
 if(skip.has(tag)||a['aria-hidden']==='true'||'hidden' in a)return '';
 const inside=()=>cs.map(c=>markdown(c,url)).join('');
 if(/^h[1-6]$/.test(tag))return '\n\n'+'#'.repeat(Number(tag[1]))+' '+compact(inside())+'\n\n';
 if(tag==='a'){const label=compact(inside()),href=link(a.href||'',url);return a.href&&href&&label?'['+label+']('+href+')':label;}
 if(tag==='img'){const alt=escape(decodeHTML(a.alt||'')),href=link(a.src||'',url);return alt&&a.src&&href?'\n\n!['+alt+']('+href+')\n\n':'';}
 if(tag==='br')return '\n';
 if(tag==='hr')return '\n\n---\n\n';
 if(tag==='strong'||tag==='b')return '**'+inside().trim()+'**';
 if(tag==='em'||tag==='i')return '*'+inside().trim()+'*';
 if(tag==='code')return '\x60'+text(n).replace(/\x60/g,'\\\x60')+'\x60';
 if(tag==='pre')return '\n\n~~~\n'+text(n).replace(/^~~~/gm,' ~~~')+'\n~~~\n\n';
 if(tag==='blockquote')return '\n\n'+inside().trim().split('\n').map(s=>'> '+s).join('\n')+'\n\n';
 if(tag==='ul'||tag==='ol'){
  let i=Number(a.start)||1;
  return '\n\n'+cs.filter(c=>c.type===ELEMENT_NODE&&c.name==='li').map(c=>{const marker=tag==='ol'?String(i++)+'. ':'- ';return marker+markdown(c,url).trim().replace(/\n/g,'\n'+' '.repeat(marker.length));}).join('\n')+'\n\n';
 }
 if(tag==='table'){
  const rows=querySelectorAll(n,'tr').map(r=>r.children.filter(c=>c.type===ELEMENT_NODE&&['td','th'].includes(c.name)).map(c=>compact(markdown(c,url))));
  if(!rows.length)return inside();
  const width=Math.max(...rows.map(r=>r.length)),row=r=>'| '+Array.from({length:width},(_,i)=>r[i]||'').join(' | ')+' |';
  const caption=querySelector(n,'caption');
  return '\n\n'+(caption?compact(markdown(caption,url))+'\n\n':'')+row(rows[0])+'\n'+row(Array(width).fill('---'))+'\n'+rows.slice(1).map(row).join('\n')+'\n\n';
 }
 if(['p','div','section','article','header','footer','figure','figcaption','aside','li','dl','dt','dd','details','summary'].includes(tag))return '\n\n'+inside()+'\n\n';
 return inside();
}
export const markdownPath=pathname=>'/_ak-markdown'+(pathname==='/'?'/index.html':pathname)+'.md';
export const eligible=pathname=>pathname==='/'||pathname==='/legal-updates.html'||/^\/updates\/[a-z0-9-]+\.html$/.test(pathname);
export async function generateMarkdown(out,urls){
 let count=0;
 for(const url of urls){
  const {pathname}=new URL(url);
  if(!eligible(pathname))continue;
  const html=await readFile(resolve(out,'.'+(pathname==='/'?'/index.html':pathname)),'utf8');
  const doc=parse(html), main=querySelector(doc,'main');
  assert.ok(main,'Missing main '+url);
  const article=querySelector(main,'[data-reading-body]');
  const nodes=article?[querySelector(main,'.article-hero-content'),querySelector(main,'.byline'),article,querySelector(main,'.reader-notice')]:[main];
  assert.ok(!article||nodes.every(Boolean),'Incomplete article '+url);
  const body=nodes.filter(Boolean).map(n=>markdown(n,url)).join('\n\n').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  assert.ok(body.length>200,'Empty Markdown '+url);
  assert.ok(body.includes('# '),'Missing heading '+url);
  const content='Source: '+url+'\n\n'+body+'\n';
  const dest=resolve(out,'.'+markdownPath(pathname));
  await mkdir(resolve(dest,'..'),{recursive:true});await writeFile(dest,content);count++;
 }
 console.log('Generated '+count+' canonical Markdown representations.');
}
