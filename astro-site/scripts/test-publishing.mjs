import {readFile,writeFile,rm,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const fixture=new URL('../src/content/articles/ak-ci-publishing-smoke.md',import.meta.url);
const example=new URL('../src/content/articles/publishing-example.md',import.meta.url);
const output=new URL('../dist/',import.meta.url);
const slug='ak-ci-publishing-smoke';
let text=await readFile(example,'utf8');
text=text.replace('slug: publishing-example','slug: '+slug).replace('draft: true','draft: false').replace('Article title — replace before publishing','CI publishing smoke test').replace('Article SEO title | Chambers of AK','CI publishing smoke test | Chambers of AK').replace('## Article section','## CI fixture heading');
await writeFile(fixture,text,{flag:'wx'});
try{
 const build=spawnSync('npm',['run','build'],{stdio:'inherit',shell:process.platform==='win32'});
 assert.equal(build.status,0,'Markdown publication build failed');
 const page=await readFile(new URL('updates/'+slug+'.html',output),'utf8');
 assert.match(page,/CI fixture heading/);
 assert.match(page,/id="ci-fixture-heading"/);
 assert.match(page,/href="#ci-fixture-heading"/);
 assert.match(page,/name="robots" content="noindex,nofollow"/);
 for(const file of ['index.html','legal-updates.html','feed.xml','sitemap.xml'])assert.ok((await readFile(new URL(file,output),'utf8')).includes(slug),'Fixture missing from '+file);
 await assert.rejects(access(new URL('updates/publishing-example.html',output)));
 console.log('New Markdown publication smoke test passed. CI only; never deploy this fixture.');
}finally{
 await rm(fixture,{force:true});
 await rm(output,{recursive:true,force:true});
 await rm(new URL('../.astro/',import.meta.url),{recursive:true,force:true});
}
