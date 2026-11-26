import {getPublishedArticles} from '../data/publishing';
const origin='https://chambersofak.in';
const x=(s:string)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
export async function GET(){
 const articles=await getPublishedArticles();
 const last=new Date(Math.max(...articles.map(a=>Math.max(Date.parse(a.feedDate),Number.isFinite(Date.parse(a.modified))?Date.parse(a.modified):0))));
 const items=articles.map(a=>{const mime=a.thumbnail.endsWith('.webp')?'image/webp':a.thumbnail.endsWith('.png')?'image/png':'image/jpeg';return '<item><title>'+x(a.listingTitle)+'</title><link>'+x(a.canonical)+'</link><guid isPermaLink="true">'+x(a.canonical)+'</guid><description>'+x(a.excerpt)+'</description><pubDate>'+new Date(a.feedDate).toUTCString()+'</pubDate>'+[...new Set([a.category,...a.tags])].map(t=>'<category>'+x(t)+'</category>').join('')+'<media:content url="'+x(origin+'/'+a.thumbnail)+'" medium="image" type="'+mime+'" width="1200" height="675"/><media:thumbnail url="'+x(origin+'/'+a.cardThumbnail)+'" width="640" height="360"/></item>';}).join('\n');
 return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>Chambers of AK Legal Updates</title><link>'+origin+'/legal-updates.html</link><description>Legal updates, procedural guides, case notes and document checklists from Chambers of AK.</description><language>en-IN</language><lastBuildDate>'+last.toUTCString()+'</lastBuildDate><atom:link href="'+origin+'/feed.xml" rel="self" type="application/rss+xml"/>'+items+'</channel></rss>\n',{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
