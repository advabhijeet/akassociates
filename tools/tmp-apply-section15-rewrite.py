from pathlib import Path

ROOT = Path('.')
ARTICLE = ROOT / 'updates/msme-45-days-payment-rule.html'
REGISTRY = ROOT / 'assets/data/insights-registry.json'
SITEMAP = ROOT / 'sitemap.xml'
CHANGELOG = ROOT / 'CHANGELOG.md'


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write(path: Path, text: str) -> None:
    path.write_text(text, encoding='utf-8', newline='\n')


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f'{label}: expected one marker, found {count}')
    return text.replace(old, new, 1)


article_html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5GMHQTJJ');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="google-site-verification" content="google3164979181871a1d.html">
  <meta name="author" content="Chambers of AK - Advocates &amp; Legal Consultants">
  <meta name="theme-color" content="#111111">
  <link rel="preconnect" href="https://www.googletagmanager.com">

  <title>Section 15 MSMED Act: 15-Day and 45-Day Payment Rules | Chambers of AK</title>
  <meta name="description" content="Section 15 MSMED Act explained: written payment dates, the 45-day ceiling, appointed day, acceptance, deemed acceptance and records buyers and MSE suppliers should preserve.">
  <link rel="canonical" href="https://chambersofak.in/updates/msme-45-days-payment-rule.html">

  <meta property="og:title" content="Section 15 MSMED Act: 15-Day and 45-Day Payment Rules | Chambers of AK">
  <meta property="og:description" content="Section 15 MSMED Act explained: written payment dates, the 45-day ceiling, appointed day, acceptance, deemed acceptance and practical transaction records.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://chambersofak.in/updates/msme-45-days-payment-rule.html">
  <meta property="og:site_name" content="Chambers of AK">
  <meta property="og:image" content="https://chambersofak.in/assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="Illustrated MSME payment timeline showing delivery records, written payment terms and the statutory 15-day and 45-day periods">
  <meta property="article:published_time" content="2026-05-05T00:00:00+05:30">
  <meta property="article:modified_time" content="2026-07-28T09:24:00+05:30">
  <meta property="article:section" content="Legal Update">
  <meta property="article:tag" content="MSME">
  <meta property="article:tag" content="MSMED Act">
  <meta property="article:tag" content="Section 15">
  <meta property="article:tag" content="Delayed Payment">
  <meta property="article:tag" content="45-Day Rule">
  <meta property="article:tag" content="MSEFC">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Section 15 MSMED Act: 15-Day and 45-Day Payment Rules | Chambers of AK">
  <meta name="twitter:description" content="Written payment dates, the 45-day ceiling, appointed day, acceptance, deemed acceptance and transaction records under Section 15 of the MSMED Act.">
  <meta name="twitter:image" content="https://chambersofak.in/assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg">
  <meta name="twitter:image:alt" content="Illustrated MSME payment timeline showing delivery records, written payment terms and the statutory 15-day and 45-day periods">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-512.png" type="image/png" sizes="512x512">
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">
  <!-- PERFORMANCE_PRELOADS:START -->
  <link rel="preload" href="../assets/css/themes/citadel-of-ak.css?v=theme-2" as="style">
  <link rel="preload" href="../assets/css/themes/citadel-of-kang/modules/article-index.css?v=article-index-v24" as="style">
  <link rel="preload" href="../assets/css/themes/citadel-of-kang/modules/pills.css?v=pills-v3" as="style">
  <!-- PERFORMANCE_PRELOADS:END -->
  <link rel="stylesheet" href="../assets/css/style.css?v=site-20260726-article-index-v25-1">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://chambersofak.in/updates/msme-45-days-payment-rule.html#article",
    "headline": "Section 15 of the MSMED Act Explained: When Must a Buyer Pay an MSE Supplier?",
    "description": "Section 15 MSMED Act explained: written payment dates, the 45-day ceiling, appointed day, acceptance, deemed acceptance and records buyers and MSE suppliers should preserve.",
    "image": "https://chambersofak.in/assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg",
    "author": {"@type": "Person", "name": "Abhijeet Kumar", "url": "https://chambersofak.in/about.html"},
    "publisher": {"@type": "LegalService", "name": "Chambers of AK", "url": "https://chambersofak.in/", "logo": {"@type": "ImageObject", "url": "https://chambersofak.in/assets/img/logo-navbar.png"}},
    "datePublished": "2026-05-05",
    "dateModified": "2026-07-28",
    "mainEntityOfPage": "https://chambersofak.in/updates/msme-45-days-payment-rule.html",
    "inLanguage": "en-IN",
    "articleSection": "Legal Update",
    "keywords": "MSME, MSMED Act, Section 15, delayed payment, appointed day, acceptance, deemed acceptance, 45-day rule, MSEFC"
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://chambersofak.in/updates/msme-45-days-payment-rule.html#breadcrumb",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://chambersofak.in/"},
      {"@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chambersofak.in/legal-updates.html"},
      {"@type": "ListItem", "position": 3, "name": "Section 15 MSMED Act Payment Rules", "item": "https://chambersofak.in/updates/msme-45-days-payment-rule.html"}
    ]
  }
  </script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GMHQTJJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div class="s">
    <nav class="nav">
      <a class="nav-brand" href="/" aria-label="Chambers of AK homepage"><img class="nav-logo" src="../assets/img/performance/logo-navbar-480.jpg?v=pa1" alt="Chambers of AK" width="480" height="89" decoding="async"></a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../practice.html">Practice</a></li>
        <li><a href="../case-enquiry.html">Enquiry</a></li>
        <li><a href="../courts.html">Courts</a></li>
        <li><a class="active" href="../legal-updates.html">Insights</a></li>
        <li><a href="../disclaimer.html">Disclaimer</a></li>
      </ul>
      <a class="nav-cta" href="../contact.html">Contact</a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>

    <main>
      <section class="page-hero">
        <div class="hero-eyebrow">MSME Delayed Payment / Section 15</div>
        <h1>Section 15 of the MSMED Act Explained: When Must a Buyer Pay an MSE Supplier?</h1>
        <p>Section 15 uses different payment rules depending on whether the buyer and supplier agreed to a payment date in writing. This guide explains the appointed day, the 45-day ceiling, acceptance, written objections and the transaction records needed for an invoice-wise review.</p>
      </section>

      <section class="sec">
        <div class="sec-label">Legal Update</div>
        <article class="article-body" data-citadel-article-index data-article-category="Legal Update" data-article-tags="MSME, MSMED Act, Section 15, Delayed Payment, 45-Day Rule, MSEFC">
          <div class="article-meta">
            <span>Published May 2026</span>
            <span>Updated July 2026</span>
            <span>Legal Update</span>
            <span>MSME</span>
            <span>Section 15</span>
          </div>

          <p class="article-summary">Section 15 is commonly called the MSME 45-day rule, but that label is incomplete. A written payment term governs subject to a 45-day statutory ceiling. Where no payment date is agreed in writing, the buyer must pay before the appointed day, which is linked to the Act's 15-day acceptance framework.</p>

          <figure class="article-featured-figure">
            <img src="../assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg" alt="Illustrated MSME payment timeline showing delivery records, written payment terms and the statutory 15-day and 45-day periods" width="1200" height="675" loading="eager">
          </figure>

          <p>Section 15 of the Micro, Small and Medium Enterprises Development Act, 2006 fixes the payment deadline where a statutory supplier supplies goods or renders services to a buyer. The correct date depends on the written payment arrangement, the day of acceptance or deemed acceptance, and any written objection raised within the statutory period.</p>

          <p>The provision should be applied invoice by invoice. An invoice date may be relevant, but the Act focuses on delivery of goods, rendering of services, acceptance, deemed acceptance and removal of a timely written objection.</p>

          <h2>What Section 15 requires</h2>

          <div class="content-panel">
            <p><strong>Where a payment date is agreed in writing:</strong> the buyer must pay on or before that date. The agreed period cannot exceed 45 days from the day of acceptance or deemed acceptance.</p>
            <p><strong>Where no payment date is agreed in writing:</strong> the buyer must pay before the appointed day.</p>
          </div>

          <p>The 45-day period is therefore an outer ceiling, not an automatic credit period for every transaction. If the written contract requires payment within 15 or 30 days, the shorter agreed period remains material. If there is no written payment arrangement, the appointed-day mechanism applies instead.</p>

          <h2>Who qualifies as a supplier under the delayed-payment chapter?</h2>

          <p>The delayed-payment framework does not apply merely because a business informally describes itself as an MSME. Section 2(n) principally covers a micro or small enterprise that has filed the required memorandum, together with the other statutory entities included in that definition.</p>

          <p>The Chapter V payment protection is directed to micro and small enterprises. A medium enterprise does not fall within the principal supplier definition merely because the legislation is called the MSMED Act.</p>

          <p>Registration timing also requires care. In <em>Silpi Industries v. Kerala State Road Transport Corporation</em>, the Supreme Court declined Chapter V relief where the contract and supplies preceded registration and held that later registration could not operate retrospectively for earlier supplies. A continuing commercial relationship may therefore require separate review of contract, registration and supply dates instead of treating one certificate as covering every historical invoice.</p>

          <h2>Written payment terms and the 45-day ceiling</h2>

          <p>Where the parties agreed to a payment date in writing, that date ordinarily governs the Section 15 obligation. The payment term may appear in a contract, purchase order, work order, accepted quotation, rate contract or another transaction document clearly recording the agreed credit period.</p>

          <p>The proviso to Section 15 nevertheless prevents the written period from exceeding 45 days from acceptance or deemed acceptance. A clause providing 60, 90 or more days of credit does not enlarge the statutory ceiling for the purpose of Section 15.</p>

          <div class="content-panel">
            <p><strong>First calculation:</strong> identify the written contractual due date.</p>
            <p><strong>Second calculation:</strong> identify the 45-day outer limit from acceptance or deemed acceptance.</p>
            <p><strong>Applicable date:</strong> where the written due date is earlier, payment is required by that earlier date; where the writing purports to go beyond 45 days, the statutory ceiling becomes material.</p>
          </div>

          <h2>No written payment term: the appointed-day rule</h2>

          <p>Where there is no written agreement fixing the payment date, Section 15 requires payment before the appointed day. Section 2(b) defines the appointed day as the day immediately following the expiry of 15 days from the day of acceptance or deemed acceptance.</p>

          <p>This is why it is inaccurate to assume that every MSE transaction automatically carries 45 days of credit. Without written payment terms, the statute uses the shorter appointed-day mechanism.</p>

          <p>The calculation should begin with the proved acceptance or deemed-acceptance date. It should not be based only on the invoice date where delivery or rendering of services occurred on another date.</p>

          <h2>Acceptance, written objections and deemed acceptance</h2>

          <p>The statutory definitions connect acceptance with actual delivery of goods or rendering of services. They also prescribe a specific effect where the buyer makes an objection in writing within 15 days.</p>

          <p>Where a written objection regarding acceptance is made within 15 days from delivery or rendering of services, the day of acceptance becomes the day on which the supplier removes that objection. The file should identify the objection, when it was communicated, the corrective action taken and the date on which the issue was removed.</p>

          <p>Where no written objection regarding acceptance is made within 15 days, the actual delivery or service-rendering date becomes the day of deemed acceptance. Contemporaneous correspondence and proof of transmission are therefore important for both sides.</p>

          <ul>
            <li>A buyer should preserve the written defect, shortage, quality, specification or completion objection and proof of when it was sent.</li>
            <li>A supplier should preserve delivery, completion and acceptance records and the communication trail showing whether a timely written objection was received.</li>
            <li>An oral complaint or a general assertion raised later should not automatically be treated as the statutory written objection without examining the complete record.</li>
          </ul>

          <h2>Why the invoice date may not control the timeline</h2>

          <p>The Act focuses on delivery, rendering of services, written objections and removal of objections. An invoice may evidence the transaction, but its date is not necessarily the day of acceptance.</p>

          <p>For goods, relevant records may include delivery challans, transport documents, goods-receipt notes, inspection reports, e-way records and acceptance emails. For services, the record may include milestone approvals, completion certificates, timesheets, reports, access logs, work acknowledgements or correspondence confirming performance.</p>

          <p>Where goods or services are supplied in stages, each invoice or milestone may require a separate Section 15 calculation rather than one combined date for the entire commercial relationship.</p>

          <h2>Practical payment-date worksheet</h2>

          <p>Prepare one row for each invoice or milestone and verify:</p>

          <ul>
            <li><strong>Invoice:</strong> number, date, taxable value and total amount.</li>
            <li><strong>Supply:</strong> delivery date or date the services were rendered.</li>
            <li><strong>Acceptance:</strong> goods receipt, inspection, approval or completion record.</li>
            <li><strong>Written objection:</strong> date, mode, contents and proof of delivery.</li>
            <li><strong>Removal of objection:</strong> corrective action and resolution date.</li>
            <li><strong>Written payment term:</strong> the relevant contract, purchase order, work order or accepted quotation.</li>
            <li><strong>Statutory date:</strong> the 45-day ceiling or appointed-day calculation, as applicable.</li>
            <li><strong>Payments:</strong> advance, part payment and final payment dates.</li>
            <li><strong>Adjustments:</strong> returns, credit notes, debit notes, deductions and set-off claims.</li>
            <li><strong>Balance:</strong> invoice-wise principal remaining unpaid.</li>
          </ul>

          <p>The worksheet should separate principal from statutory interest and distinguish admitted invoices from invoices affected by a documented quality, quantity, completion or reconciliation dispute.</p>

          <h2>What happens after the Section 15 deadline?</h2>

          <p>Section 15 fixes the payment obligation. The succeeding provisions address the consequences of default:</p>

          <ul>
            <li><strong>Section 16:</strong> compound interest with monthly rests at three times the bank rate notified by the Reserve Bank, from the appointed day or the day immediately following the agreed payment date, as applicable.</li>
            <li><strong>Section 17:</strong> liability for the amount due together with the statutory interest.</li>
            <li><strong>Section 18:</strong> a reference concerning the amount due to the Micro and Small Enterprises Facilitation Council.</li>
          </ul>

          <p>In <em>Gujarat State Civil Supplies Corporation Ltd. v. Mahakali Foods Pvt. Ltd.</em>, the Supreme Court held that an eligible party is not precluded from approaching the Facilitation Council merely because the contract contains an independent arbitration agreement. Eligibility, registration timing, limitation, jurisdiction and the transaction record must still be examined on the facts.</p>

          <p>Interest and forum strategy should be built from the underlying invoice and acceptance dates rather than from a single lump-sum ledger balance. The <a href="msme-facilitation-council-process.html">MSEFC process guide</a> addresses the later procedural stages separately.</p>

          <h2>Records the supplier should preserve</h2>

          <ul>
            <li>Udyam Registration and enterprise-status records relevant to the transaction period.</li>
            <li>Purchase orders, work orders, contracts and accepted quotations.</li>
            <li>Invoices and an invoice-wise outstanding statement.</li>
            <li>Delivery challans, goods-receipt records or service-completion proof.</li>
            <li>Inspection, acceptance and milestone records.</li>
            <li>Buyer objections and the supplier's corrective response.</li>
            <li>Reminders, acknowledgements and balance confirmations.</li>
            <li>Ledger extracts, bank statements and part-payment entries.</li>
            <li>Credit notes, debit notes and reconciliation statements.</li>
            <li>A date chart applying Section 15 separately to each invoice or milestone.</li>
          </ul>

          <h2>Records the buyer should preserve</h2>

          <ul>
            <li>The supplier's registration and enterprise-status documents.</li>
            <li>The written payment term relied upon by the parties.</li>
            <li>Delivery, inspection and acceptance records.</li>
            <li>Written objections sent within the statutory period and proof of transmission.</li>
            <li>Defect, shortage, delay or incomplete-performance evidence.</li>
            <li>Debit notes, credit notes, returns and contractual deduction records.</li>
            <li>Payment and part-payment proof.</li>
            <li>Correspondence concerning reconciliation or settlement.</li>
            <li>An invoice-wise calculation showing admitted, disputed and paid amounts.</li>
          </ul>

          <p>A general denial is not a substitute for a documented transaction analysis. Equally, supplier registration alone does not prove supply, acceptance or the amount outstanding.</p>

          <h2>Common mistakes</h2>

          <ol>
            <li>Treating 45 days as the automatic payment period in every transaction.</li>
            <li>Ignoring a shorter written contractual due date.</li>
            <li>Relying only on the invoice date instead of delivery, service and acceptance evidence.</li>
            <li>Treating an oral or belated objection as a timely written objection without proof.</li>
            <li>Combining several invoices into one balance without separate dates.</li>
            <li>Overlooking part payments, credit notes, returns or agreed deductions.</li>
            <li>Assuming every medium enterprise receives the delayed-payment protection given to statutory suppliers.</li>
            <li>Assuming a registration obtained later automatically covers earlier contracts and supplies.</li>
            <li>Calculating interest before fixing the correct Section 15 due date.</li>
          </ol>

          <h2>Conclusion</h2>

          <p>Section 15 should be applied in a fixed sequence. First verify whether the claimant falls within the statutory supplier framework. Next identify delivery or service performance, acceptance or deemed acceptance, and any written objection raised within 15 days. Then determine whether a payment date was agreed in writing. The written date governs subject to the 45-day ceiling; without written payment terms, payment is required before the appointed day.</p>

          <p>A reliable Section 15 analysis is document-led and invoice-specific. The contract, supply record, acceptance trail, objections, payments and adjustments should be arranged before statutory interest or forum strategy is assessed.</p>

          <p class="article-last-updated"><strong>Last updated on:</strong> 28/07/2026 at 09:24</p>

          <h2>Useful internal pages</h2>

          <div class="article-links">
            <a href="../practice/msme-disputes.html">MSME disputes practice overview</a>
            <a href="../services/msme-recovery-lawyer-patna.html">MSME recovery services in Patna</a>
            <a href="../services/msme-recovery-lawyer-bihar.html">MSME recovery services in Bihar</a>
            <a href="msme-facilitation-council-process.html">MSME Facilitation Council process</a>
            <a href="msme-documents-checklist.html">MSME delayed-payment documents checklist</a>
            <a href="msme-delayed-payment.html">MSME delayed-payment first review</a>
          </div>

          <h2>References / Sources</h2>

          <ol class="references-list">
            <li><a href="https://www.indiacode.nic.in/bitstream/123456789/19412/1/msme_act_2006.pdf" target="_blank" rel="noopener noreferrer">Micro, Small and Medium Enterprises Development Act, 2006 - official India Code PDF</a>.</li>
            <li><a href="https://www.indiacode.nic.in/show-data?actid=AC_CEN_46_77_00002_200627_1517807324919&amp;orderno=2&amp;sectionId=9884&amp;sectionno=2" target="_blank" rel="noopener noreferrer">Section 2 - appointed day, acceptance, deemed acceptance, buyer and supplier definitions</a>.</li>
            <li><a href="https://www.indiacode.nic.in/show-data?actid=AC_CEN_46_77_00002_200627_1517807324919&amp;orderno=15&amp;sectionId=9897&amp;sectionno=15" target="_blank" rel="noopener noreferrer">Section 15 - liability of buyer to make payment</a>.</li>
            <li><a href="https://www.indiacode.nic.in/show-data?actid=AC_CEN_46_77_00002_200627_1517807324919&amp;orderno=16&amp;sectionId=9898&amp;sectionno=16" target="_blank" rel="noopener noreferrer">Section 16 - statutory interest</a>.</li>
            <li><a href="https://www.indiacode.nic.in/show-data?actid=AC_CEN_46_77_00002_200627_1517807324919&amp;orderno=18" target="_blank" rel="noopener noreferrer">Section 18 - reference to the Facilitation Council</a>.</li>
            <li><a href="https://indiankanoon.org/doc/134928159/" target="_blank" rel="noopener noreferrer"><em>Silpi Industries v. Kerala State Road Transport Corporation</em>, Civil Appeal Nos. 1570-1578 of 2021, decided on 29 June 2021</a>.</li>
            <li><a href="https://indiankanoon.org/doc/78592269/" target="_blank" rel="noopener noreferrer"><em>Gujarat State Civil Supplies Corporation Ltd. v. Mahakali Foods Pvt. Ltd. (Unit 2)</em>, decided on 31 October 2022</a>.</li>
            <li><a href="https://ramp.msme.gov.in/ramp/RAMP-initiative/msme-samadhaan/msme-samadhaan" target="_blank" rel="noopener noreferrer">MSME Samadhaan - Ministry of Micro, Small and Medium Enterprises</a>.</li>
          </ol>

          <h2>Disclaimer</h2>

          <div class="article-note">This article provides general legal information about the statutory payment framework. It is not legal advice, advertisement or solicitation. Supplier status, registration timing, acceptance, contractual terms, objections, limitation, interest and forum strategy depend on the complete facts and documents of the transaction. Initial communication does not create an advocate-client relationship.</div>
        </article>
      </section>
    </main>

    <footer class="foot">
      <div class="foot-copy">&copy; 2026 Chambers of AK - Advocates &amp; Legal Consultants</div>
      <div class="foot-links foot-links-grouped" aria-label="Footer navigation">
        <div class="foot-link-group">
          <div class="foot-link-heading">Main</div>
          <a href="../about.html">About</a>
          <a href="../practice.html">Practice</a>
          <a href="../courts.html">Courts</a>
          <a href="../case-enquiry.html">Case Enquiry</a>
          <a href="../contact.html">Contact</a>
        </div>
        <div class="foot-link-group">
          <div class="foot-link-heading">Practice</div>
          <a href="../practice/msme-disputes.html">MSME Recovery</a>
          <a href="../practice/arbitration.html">Arbitration</a>
          <a href="../practice/commercial-recovery.html">Commercial Recovery</a>
          <a href="../practice/rera-property.html">RERA / Property</a>
          <a href="../practice/cheque-bounce.html">Cheque Bounce</a>
        </div>
        <div class="foot-link-group">
          <div class="foot-link-heading">Resources</div>
          <a href="../legal-updates.html">Insights</a>
          <a href="../document-checklists.html">Document Checklists</a>
          <a href="../faq.html">FAQ</a>
          <a href="../process.html">Process</a>
        </div>
        <div class="foot-link-group">
          <div class="foot-link-heading">Legal</div>
          <a href="../disclaimer.html">Disclaimer</a>
          <a href="../privacy-policy.html">Privacy Policy</a>
          <a href="../terms.html">Terms</a>
        </div>
      </div>
      <div class="foot-disc">For informational purposes only. Does not constitute legal advice or solicitation. Bar Council of India. Initial communication does not create an advocate-client relationship.</div>
    </footer>
  </div>

  <script src="../assets/js/script.js?v=site-20260726-article-index-v25-1"></script>
</body>
</html>
'''
write(ARTICLE, article_html)

registry_text = read(REGISTRY)
old_registry = '''  {
    "href": "updates/msme-45-days-payment-rule.html",
    "category": "Legal Update",
    "title": "MSME 45-day payment rule",
    "excerpt": "Document and date preparation for MSME delayed payment claims and buyer responses.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "Delayed Payment",
      "45-Day Rule",
      "Income Tax",
      "Udyam"
    ],
    "thumbnail": "assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg",
    "cardThumbnail": "assets/img/citadel/cards/citadel-thumb-msme-45-days-payment-rule-batch6-v2-640.jpg"
  },'''
new_registry = '''  {
    "href": "updates/msme-45-days-payment-rule.html",
    "category": "Legal Update",
    "title": "Section 15 MSMED Act: 15-day and 45-day payment rules",
    "excerpt": "Written payment dates, the 45-day ceiling, appointed day, acceptance, deemed acceptance and invoice-wise records under Section 15 of the MSMED Act.",
    "date": "May 2026",
    "tags": [
      "MSME",
      "MSMED Act",
      "Section 15",
      "Delayed Payment",
      "45-Day Rule",
      "MSEFC"
    ],
    "thumbnail": "assets/img/citadel/citadel-thumb-msme-45-days-payment-rule-batch6-v2.jpg",
    "cardThumbnail": "assets/img/citadel/cards/citadel-thumb-msme-45-days-payment-rule-batch6-v2-640.jpg"
  },'''
registry_text = replace_once(registry_text, old_registry, new_registry, 'Insights registry entry')
write(REGISTRY, registry_text)

sitemap_text = read(SITEMAP)
old_sitemap = '<url><loc>https://chambersofak.in/updates/msme-45-days-payment-rule.html</loc><lastmod>2026-05-10</lastmod></url>'
new_sitemap = '<url><loc>https://chambersofak.in/updates/msme-45-days-payment-rule.html</loc><lastmod>2026-07-28</lastmod></url>'
sitemap_text = replace_once(sitemap_text, old_sitemap, new_sitemap, 'Sitemap Section 15 entry')
write(SITEMAP, sitemap_text)

changelog_text = read(CHANGELOG)
entry = '''## 2026-07-28 IST - Rewrite Section 15 MSMED Act payment guide
- Rewrote the established `updates/msme-45-days-payment-rule.html` page instead of creating a competing Section 15 URL.
- Distinguished the written payment-date rule, the 45-day ceiling and the appointed-day mechanism where no payment date is agreed in writing.
- Added acceptance, deemed-acceptance, written-objection, registration-timing and invoice-wise record guidance.
- Preserved the original publication date, canonical URL and approved Batch 6 article/card images while updating the modification date and sitemap freshness.
- Removed the unrelated Income Tax tag, refreshed registry metadata, and regenerated static Insights and RSS outputs.

'''
if changelog_text.startswith(entry):
    raise RuntimeError('Changelog entry already exists')
write(CHANGELOG, entry + changelog_text)

print('Section 15 MSMED Act production rewrite prepared.')
