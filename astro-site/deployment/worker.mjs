const aliases=new Map(Object.entries({"/services/cheque-bounce-lawyer-bihar.html":"/services/cheque-bounce-lawyer-patna.html","/services/civil-litigation-lawyer-bihar.html":"/services/civil-litigation-lawyer-patna.html","/services/msme-recovery-lawyer-delhi.html":"/services/msme-recovery-lawyer-delhi-ncr.html","/services/property-dispute-lawyer-bihar.html":"/services/property-dispute-lawyer-patna.html"}));
const redirect=(url,path)=>{url.pathname=path;return new Response(null,{status:301,headers:{Location:url.href,'X-Robots-Tag':'noindex, nofollow'}});};
function safe(response,status=response.status){const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex, nofollow');headers.set('X-Content-Type-Options','nosniff');headers.set('Referrer-Policy','strict-origin-when-cross-origin');return new Response(response.body,{status,headers});}
export default {async fetch(request,env){
 const url=new URL(request.url),p=url.pathname;
 if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD','X-Robots-Tag':'noindex, nofollow'}});
 const asset=path=>{const u=new URL(url);u.pathname=path;return env.ASSETS.fetch(new Request(u,request));};
 if(p==='/index.html')return redirect(url,'/');
 if(p==='/')return safe(await asset('/index.html'));
 const candidate=p.endsWith('.html')?p:p.replace(/\/$/,'')+'.html';
 if(aliases.has(candidate))return redirect(url,aliases.get(candidate));
 const exact=await asset(p);if(exact.status!==404)return safe(exact);
 if(!p.includes('.')||p.endsWith('/')){const possible=await asset(candidate);if(possible.status===200)return redirect(url,candidate);}
 return safe(await asset('/404.html'),404);
}};
