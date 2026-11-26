import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
for(const file of ['index.html','404.html','design-system.html']){
 const html=await readFile(new URL(file,root),'utf8');
 assert.match(html,/name="robots" content="noindex,nofollow"/);
 assert.match(html,/<main id="main"/);
 assert.match(html,/data-theme-toggle/);
}
const showcase=await readFile(new URL('design-system.html',root),'utf8');
for(const term of ['Colour &amp; typography','Practice-area cards','Legal insights','Buttons and form fields'])assert.ok(showcase.includes(term),term);
assert.match(await readFile(new URL('robots.txt',root),'utf8'),/Disallow: \/\s*$/);
assert.match(await readFile(new URL('_headers',root),'utf8'),/X-Robots-Tag: noindex, nofollow/);
const entries=await readdir(root);
for(const name of ['docs','tools','preview','.github','package.json','src','migration','design'])assert.ok(!entries.includes(name),'Unexpected public file: '+name);
console.log('AK-003 static output and preview safety checks passed.');
