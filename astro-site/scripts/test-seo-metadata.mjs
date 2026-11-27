import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const rows = [
  {
    "path": "updates/arbitration-notice-before-claim.html",
    "title": "Section 21 Arbitration Act: Notice & Limitation | Chambers of AK",
    "titleLength": 64,
    "description": "Section 21 of the Arbitration Act: when proceedings commence, notice requirements, receipt, limitation, Section 11 appointment and service records.",
    "descriptionChanged": true,
    "modified": null
  },
  {
    "path": "updates/delhi-msefc-filing-procedure-msme-delayed-payment.html",
    "title": "Delhi MSEFC Filing Procedure: MSME Claims | Chambers of AK",
    "titleLength": 58,
    "description": "Learn the Delhi MSEFC filing procedure, MSME Samadhaan requirements, claim documents, buyer response, conciliation, arbitration and Council rules.",
    "descriptionChanged": true,
    "modified": "2026-11-03T18:30:00+05:30"
  },
  {
    "path": "updates/property-title-search-before-purchase-india.html",
    "title": "Property Title Search in India: Document Checklist | Chambers of AK",
    "titleLength": 67,
    "description": "Property title search before purchase in India: check sale deeds, title chain, revenue and mutation records, encumbrances, litigation and state records.",
    "descriptionChanged": true,
    "modified": null
  },
  {
    "path": "updates/sabarimala-case-9-judge-bench-2026.html",
    "title": "Sabarimala Case 2026: Nine-Judge Bench Reference | Chambers of AK",
    "titleLength": 65,
    "description": "Sabarimala nine-judge reference explained: the 2018 temple-entry ruling, 2019 review, May 2026 hearings and case status checked on 11 October 2026.",
    "descriptionChanged": false,
    "modified": null
  },
  {
    "path": "updates/sarfaesi-auction-sale-challenge-documents.html",
    "title": "SARFAESI Auction Challenge: Rule 9(4) & Documents | Chambers of AK",
    "titleLength": 66,
    "description": "SARFAESI auction sale challenge guide: Rule 9(4) payment timeline, sale finality, redemption rights, borrower and lender documents, and DRT/DRAT records.",
    "descriptionChanged": false,
    "modified": null
  },
  {
    "path": "updates/section-12a-commercial-courts-pre-institution-mediation.html",
    "title": "Section 12A Commercial Courts Act: Mediation | Chambers of AK",
    "titleLength": 61,
    "description": "Section 12A of the Commercial Courts Act: pre-institution mediation, urgent interim relief, PIMS procedure, limitation and settlement enforcement.",
    "descriptionChanged": true,
    "modified": null
  },
  {
    "path": "updates/section-16-msmed-act-compound-interest.html",
    "title": "Section 16 MSMED Act: Compound Interest | Chambers of AK",
    "titleLength": 56,
    "description": "Section 16 MSMED Act explained: three times RBI Bank Rate, monthly rests, interest start date, rate changes, part payments and invoice-wise calculation.",
    "descriptionChanged": false,
    "modified": null
  },
  {
    "path": "updates/section-34-arbitration-limitation-3-months-30-days.html",
    "title": "Section 34 Arbitration Limitation: 3 Months+30 Days | Chambers of AK",
    "titleLength": 68,
    "description": "Section 34 arbitration limitation explained: 3 months + 30 days rule, delay condonation, court holidays and key Supreme Court cases.",
    "descriptionChanged": false,
    "modified": null
  },
  {
    "path": "updates/summary-judgment-commercial-suits-order-xiii-a.html",
    "title": "Summary Judgment in Commercial Suits: Order XIII-A | Chambers of AK",
    "titleLength": 67,
    "description": "Summary judgment in commercial suits under Order XIII-A CPC: the real prospect test, relevant pleadings, evidence, documents and preparation checklist.",
    "descriptionChanged": true,
    "modified": null
  },
  {
    "path": "updates/uapa-bail-section-43d5-supreme-court-2026.html",
    "title": "UAPA Bail: Section 43D(5), Article 21 & 2026 Update | Chambers of AK",
    "titleLength": 68,
    "description": "Updated legal analysis of UAPA bail, Section 43D(5), Watali, K.A. Najeeb, Gulfisha Fatima, Andrabi, Article 21 and prolonged pre-trial custody.",
    "descriptionChanged": false,
    "modified": null
  }
];
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const meta=(h,k)=>{const tags=[...h.matchAll(/<meta\\b[^>]*>/gi)].map(m=>m[0]);const found=tags.filter(t=>new RegExp('(?:name|property)="'+k+'"').test(t));assert.equal(found.length,1,k);return decode(found[0].match(/content="([^"]*)"/)[1]);};
const sitemap=await readFile('dist-production/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,87);
for(const row of rows){const h=await readFile('dist-production/'+row.path,'utf8');const title=decode(h.match(/<title>(.*?)<\\/title>/s)[1]);assert.equal(title,row.title);assert.ok(title.length<70);for(const k of ['og:title','twitter:title'])assert.equal(meta(h,k),title);assert.equal(meta(h,'description'),row.description);if(row.descriptionChanged){for(const k of ['og:description','twitter:description'])assert.equal(meta(h,k),row.description);assert.ok(row.description.length>=140&&row.description.length<=160);}
assert.ok(h.includes('href="https://chambersofak.in/'+row.path+'"'));assert.ok(h.includes('data-ak-release="production"'));assert.ok(urls.includes('https://chambersofak.in/'+row.path));const schemas=[...h.matchAll(/<script\\b[^>]*type="application\\/ld\\+json"[^>]*>([\\s\\S]*?)<\\/script>/g)].map(m=>JSON.parse(m[1]));const article=schemas.find(s=>['BlogPosting','Article'].includes(s['@type']));assert.ok(article,row.path);if(row.descriptionChanged)assert.equal(article.description,row.description);if(row.modified){assert.equal(meta(h,'article:modified_time'),row.modified);assert.equal(article.dateModified,row.modified);}console.log('PASS '+row.path+' title='+title.length+' description='+row.description.length);}
console.log('AK-014A: 10 titles, 5 descriptions, social metadata, schema, canonical URLs and 87 sitemap URLs verified.');
