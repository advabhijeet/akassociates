// Only explicitly requested Markdown is negotiated; wildcards default to HTML.
export const markdownPath=pathname=>'/_ak-markdown'+(pathname==='/'?'/index.html':pathname)+'.md';
export const eligible=pathname=>pathname==='/'||pathname==='/legal-updates.html'||/^\/updates\/[a-z0-9-]+\.html$/.test(pathname);
export function wantsMarkdown(accept=''){
 const values=accept.toLowerCase().split(',').map(x=>{const [type,...params]=x.trim().split(';');const q=params.find(p=>p.trim().startsWith('q='));const quality=q?Number(q.trim().slice(2)):1;return {type:type.trim(),q:Number.isFinite(quality)&&quality>=0&&quality<=1?quality:0};});
 const best=t=>Math.max(0,...values.filter(v=>v.type===t).map(v=>v.q));
 const md=best('text/markdown');
 const html=values.some(v=>v.type==='text/html')?best('text/html'):values.some(v=>v.type==='text/*')?best('text/*'):best('*/*');
 return md>0&&md>=html;
}
