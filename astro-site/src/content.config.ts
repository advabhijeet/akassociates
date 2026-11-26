import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {z} from 'astro/zod';
import {loadArticlePages} from './data/article-source';
const meta=z.object({key:z.string(),property:z.boolean(),content:z.string()});
const toc=z.object({id:z.string(),label:z.string(),level:z.number()});
const legacyArticles=defineCollection({
 loader:async()=>loadArticlePages().map(p=>({id:p.slug,...p})),
 schema:z.object({slug:z.string(),href:z.string(),path:z.string(),title:z.string().min(1),canonical:z.string().url(),description:z.string().min(1),category:z.string().min(1),excerpt:z.string().min(1),date:z.string(),tags:z.array(z.string()).min(1),thumbnail:z.string(),cardThumbnail:z.string(),published:z.string(),modified:z.string(),author:z.string(),meta:z.array(meta),schemas:z.array(z.string()).min(1),hero:z.string(),body:z.string(),toc:z.array(toc)})
});
const date=z.string().refine(s=>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(s)&&Number.isFinite(Date.parse(s)), 'Use ISO date-time with timezone, in quotes');
const imagePath=z.string().regex(/^assets\/img\/[a-zA-Z0-9_./-]+\.(jpg|jpeg|png|webp)$/i).refine(s=>!s.includes('..'));
const articles=defineCollection({
 loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),
 schema:z.object({slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),title:z.string().min(1),seoTitle:z.string().min(1),description:z.string().min(1),excerpt:z.string().min(1),category:z.string().min(1),tags:z.array(z.string().min(1)).min(1),author:z.string().min(1),published:date,modified:date,thumbnail:imagePath,cardThumbnail:imagePath,imageAlt:z.string().min(1),draft:z.boolean().default(true)}).refine(d=>Date.parse(d.modified)>=Date.parse(d.published),'Modified date cannot precede publication')
});
export const collections={legacyArticles,articles};
