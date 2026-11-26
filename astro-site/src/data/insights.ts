import registry from '../../../assets/data/insights-registry.json';
export const articles=registry;
export const categories=[...new Set(articles.map(a=>a.category))].sort();
export const articleUrl=(href:string)=>'/'+href.replace(/^\//,'');
export function relatedArticles(href:string,tags:string[],category:string){
 const keys=new Set(tags.map(t=>t.toLowerCase()));
 return articles.filter(a=>a.href!==href).map((a,i)=>({a,i,score:a.tags.filter(t=>keys.has(t.toLowerCase())).length*3+(a.category===category?1:0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,3).map(x=>x.a);
}
