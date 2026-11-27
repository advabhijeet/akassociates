import preview from './worker.mjs';
import {eligible,markdownPath,wantsMarkdown} from './markdown-negotiation.mjs';
const origin='https://chambersofak.in';
export default {async fetch(request,env){
 const u=new URL(request.url);
 if(u.origin!==origin){
  if(u.origin==='https://www.chambersofak.in'&&['GET','HEAD'].includes(request.method)){u.hostname='chambersofak.in';return new Response(null,{status:301,headers:{Location:u.href}});}
  return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow'}});
 }
 if(u.pathname==='/_ak-markdown'||u.pathname.startsWith('/_ak-markdown/'))return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'}});
 if(u.pathname==='/design-system.html'||u.pathname==='/design-system')return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow'}});
 const r=await preview.fetch(request,env);const headers=new Headers(r.headers);
 if((r.status===200&&u.pathname!=='/404.html'&&u.pathname!=='/google3164979181871a1d.html'&&!/\/services\/(?:cheque-bounce-lawyer-bihar|civil-litigation-lawyer-bihar|msme-recovery-lawyer-delhi|property-dispute-lawyer-bihar)\.html$/.test(u.pathname))||r.status===301)headers.delete('X-Robots-Tag');
 if(r.status===200&&eligible(u.pathname)&&['GET','HEAD'].includes(request.method)){
  headers.append('Vary','Accept');
  if(wantsMarkdown(request.headers.get('Accept')||'')){
   const target=new URL(markdownPath(u.pathname),origin);
   const md=await env.ASSETS.fetch(new Request(target,{method:request.method}));
   if(md.status===200){
    const h=new Headers({'Content-Type':'text/markdown; charset=utf-8','Vary':'Accept','Cache-Control':'no-store','Link':'<'+origin+u.pathname+'>; rel="canonical"','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    if(r.body)await r.body.cancel();
    return new Response(request.method==='HEAD'?null:md.body,{status:200,headers:h});
   }
  }
 }
 return new Response(r.body,{status:r.status,headers});
}};
