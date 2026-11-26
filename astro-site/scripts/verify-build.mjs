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
