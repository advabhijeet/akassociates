import preview from './worker.mjs';
const origin='https://chambersofak.in';
export default {async fetch(request,env){
 const u=new URL(request.url);
 if(u.origin!==origin){
  if(u.origin==='https://www.chambersofak.in'&&['GET','HEAD'].includes(request.method)){u.hostname='chambersofak.in';return new Response(null,{status:301,headers:{Location:u.href}});}
  return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow'}});
 }
 if(u.pathname==='/design-system.html'||u.pathname==='/design-system')return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow'}});
 const r=await preview.fetch(request,env);const headers=new Headers(r.headers);
 if((r.status===200&&u.pathname!=='/404.html'&&u.pathname!=='/google3164979181871a1d.html'&&!/\/services\/(?:cheque-bounce-lawyer-bihar|civil-litigation-lawyer-bihar|msme-recovery-lawyer-delhi|property-dispute-lawyer-bihar)\.html$/.test(u.pathname))||r.status===301)headers.delete('X-Robots-Tag');
 return new Response(r.body,{status:r.status,headers});
}};
