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

const home=await readFile(new URL('index.html',root),'utf8');
for(const term of ['Chambers of AK','Areas of practice','Courts &amp; forums','Recent articles','Professional notice','MSME Recovery','Property &amp; Civil Suits'])assert.ok(home.includes(term),term);
for(const path of ["assets/img/performance/logo-navbar-480.jpg","assets/img/performance/logo-navbar-dark-480.jpg","assets/img/performance/primary-logo-720.jpg","assets/img/performance/primary-logo-dark-720.jpg","assets/img/citadel/citadel-hero-hall.webp","favicon-48.png","assets/img/citadel/cards/citadel-thumb-msme-documents-checklist-approved-style-640.jpg","assets/img/citadel/cards/citadel-thumb-msme-facilitation-council-process-batch6-v2-640.jpg","assets/img/citadel/cards/citadel-thumb-section34-limitation-640.jpg"]) await readFile(new URL(path,root));
console.log('AK-004 homepage content and local assets verified.');

for(const path of ["assets/img/citadel/citadel-tribunal-room.webp","assets/img/citadel/citadel-legal-documents-card.webp","assets/img/citadel/cards/citadel-thumb-rera-complaint-drafting-documents-reliefs-640.jpg","assets/img/citadel/cards/citadel-thumb-rera-refund-interest-delayed-possession-batch6-v2-640.jpg"]) await readFile(new URL(path,root));
for(const term of ['hero-image','practice-tile','journal-list','jurisdiction-art','resource-list']) assert.ok(home.includes(term),term);
console.log('AK-004R editorial redesign structure and assets verified.');

assert.match(home,/id="hero-title"/);assert.match(home,/footer-brand/);assert.match(home,/data-ack/);console.log('AK-004R2 brand and hero markup verified.');

assert.match(home,/<dialog[^>]*id="mobile-drawer"/);assert.match(home,/aria-controls="mobile-drawer"/);assert.match(home,/data-drawer-close/);assert.match(home,/aria-label="Mobile navigation"/);assert.doesNotMatch(home,/<details[^>]*class="mobile-nav"/);console.log('Mobile slide-out navigation markup verified.');

const inventory=JSON.parse(await readFile(new URL('../migration/legacy-inventory.json',import.meta.url),'utf8'));
const practiceRoutes=inventory.routes.filter(r=>r.source==='practice.html'||/^(practice|services)\/.+\.html$/.test(r.source));
assert.equal(practiceRoutes.length,27);
for(const r of practiceRoutes){
 const page=await readFile(new URL(r.source,root),'utf8');
 assert.match(page,/name="robots" content="noindex,nofollow"/);
 assert.match(page,/id="mobile-drawer"/);
 if(r.inSitemap){assert.ok(page.includes('href="'+inventory.origin+r.path+'"'),'canonical '+r.path);assert.match(page,/Page contents/);assert.match(page,/detail-section/);}
 else {assert.match(page,/http-equiv="refresh"/);assert.match(page,/Page moved/);}
}
const redirects=await readFile(new URL('_redirects',root),'utf8');
assert.equal(redirects.trim().split('\n').length,8);
console.log('AK-005: 23 content pages and four consolidated routes verified.');

const registry=JSON.parse(await readFile(new URL('../../assets/data/insights-registry.json',import.meta.url),'utf8'));
const archive=await readFile(new URL('legal-updates.html',root),'utf8');
assert.match(archive,/data-archive-controls/);
assert.equal((archive.match(/data-insight(?:\s|>)/g)||[]).length,registry.length);
for(const a of registry){
 const page=await readFile(new URL(a.href,root),'utf8');
 assert.match(page,/name="robots" content="noindex,nofollow"/);
 assert.ok(page.includes('href="'+inventory.origin+'/'+a.href+'"'),'canonical '+a.href);
 assert.match(page,/data-reading-body/);assert.match(page,/Article contents/);assert.match(page,/application\/ld\+json/);
 assert.ok(archive.includes('href="/'+a.href+'"'),'archive link '+a.href);
 for(const asset of [a.thumbnail,a.cardThumbnail])await readFile(new URL(asset,root));
}
for(const asset of ["assets/judgments/2017-gujhc-1698-non-reportable-judgments-online-publication.pdf","assets/judgments/2026-insc-303-sarfaesi-auction-sale.pdf"])await readFile(new URL(asset,root));
console.log('AK-006: '+registry.length+' article routes, archive links, metadata and assets verified.');
