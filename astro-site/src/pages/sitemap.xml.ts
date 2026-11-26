import {getPublishedArticles} from '../data/publishing';
import inventory from '../../migration/legacy-inventory.json';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const origin=inventory.origin;
const legacy=readFileSync(resolve(process.cwd(),'../sitemap.xml'),'utf8');
const dates=new Map([...legacy.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>[m[1].match(/<loc>(.*?)<\/loc>/)?.[1],m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]]));
export async function GET(){
 const articles=await getPublishedArticles();
 const routes=new Map<string,string|undefined>();
 for(const url of inventory.sitemap){const p=new URL(url).pathname;if(["/about.html","/case-enquiry.html","/contact.html","/courts.html","/disclaimer.html","/document-checklists.html","/faq.html","/privacy-policy.html","/process.html","/terms.html"].includes(p)||p==='/'||p==='/practice.html'||p==='/legal-updates.html'||/^\/(practice|services)\//.test(p))routes.set(url,dates.get(url));}
 routes.set(origin+'/legal-tools.html',undefined);
 for(const a of articles)routes.set(a.canonical,a.nativeId?a.modified.slice(0,10):dates.get(a.canonical)||a.modified.slice(0,10));
 const xml=[...routes].map(([url,date])=>'<url><loc>'+url+'</loc>'+(date&&/^\d{4}-\d{2}-\d{2}$/.test(date)?'<lastmod>'+date+'</lastmod>':'')+'</url>').join('\n');
 return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+xml+'</urlset>\n',{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
