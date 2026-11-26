import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const m=JSON.parse(await readFile(new URL('../migration/legacy-inventory.json',import.meta.url),'utf8'));
for(const [name,items] of Object.entries(m.checks)) assert.equal(items.length,0,name+': '+items.join(', '));
assert.equal(new Set(m.sitemap).size,m.sitemap.length);
assert.equal(m.articles.length,m.counts.feedItems);
assert.equal(new Set(m.articles.map(x=>x.href)).size,m.articles.length);
for(const a of m.articles) assert.ok(a.title&&a.thumbnail&&a.cardThumbnail&&a.tags?.length,a.href);
console.log('AK-002 baseline manifest checks passed. Not a live crawl.');
