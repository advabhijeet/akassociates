// Baseline protection for public pages; no speculative script/connection allowlist.
export const securityHeaders=Object.freeze({
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
 'Content-Security-Policy':"frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
});
export function secureResponse(response){
 const headers=new Headers(response.headers);
 for(const [name,value] of Object.entries(securityHeaders))headers.set(name,value);
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
