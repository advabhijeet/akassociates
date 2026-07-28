from pathlib import Path
import json

ROOT = Path('.')
REGISTRY_PATH = ROOT / 'assets/data/insights-registry.json'
SITEMAP_PATH = ROOT / 'sitemap.xml'
CHANGELOG_PATH = ROOT / 'CHANGELOG.md'
HREF = 'updates/arbitration-notice-before-claim.html'

registry = json.loads(REGISTRY_PATH.read_text(encoding='utf-8'))
matched = [item for item in registry if item.get('href') == HREF]
if len(matched) != 1:
    raise SystemExit(f'Expected one registry entry for {HREF}, found {len(matched)}')
entry = matched[0]
entry.update({
    'category': 'Procedure Note',
    'title': 'Section 21 Arbitration Act: notice, receipt and commencement',
    'excerpt': 'When arbitration commences by receipt, what the invocation request should identify, and how Section 21 interacts with limitation and Section 11.',
    'date': 'May 2026',
    'tags': ['Arbitration', 'Section 21', 'Invocation Notice', 'Commencement', 'Limitation', 'Section 11'],
    'thumbnail': 'assets/img/citadel/citadel-thumb-arbitration-notice-before-claim-painted-bw-v2.jpg',
    'cardThumbnail': 'assets/img/citadel/cards/citadel-thumb-arbitration-notice-before-claim-painted-bw-v2-640.jpg',
})
REGISTRY_PATH.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')

sitemap = SITEMAP_PATH.read_text(encoding='utf-8')
needle = '<loc>https://chambersofak.in/updates/arbitration-notice-before-claim.html</loc><lastmod>2026-05-21</lastmod>'
replacement = '<loc>https://chambersofak.in/updates/arbitration-notice-before-claim.html</loc><lastmod>2026-07-28</lastmod>'
if needle not in sitemap:
    raise SystemExit('Expected arbitration notice sitemap marker was not found')
sitemap = sitemap.replace(needle, replacement, 1)
SITEMAP_PATH.write_text(sitemap, encoding='utf-8', newline='\n')

changelog = CHANGELOG_PATH.read_text(encoding='utf-8')
entry_text = '''## 2026-07-28 IST - Rewrite Section 21 arbitration commencement guide
- Rewrote the established `updates/arbitration-notice-before-claim.html` page instead of creating a competing Section 21 URL.
- Distinguished statutory commencement from tribunal constitution and the Section 11 appointment-failure timeline.
- Added receipt and service-proof guidance, limitation analysis, party-agreed commencement rules, later-claim and counterclaim treatment, and current Supreme Court cautions.
- Preserved the original publication date, canonical URL and approved article/card images while updating the modification date and sitemap freshness.
- Refreshed registry metadata and regenerated static Insights and RSS outputs.

'''
if entry_text.splitlines()[0] not in changelog:
    changelog = entry_text + changelog
CHANGELOG_PATH.write_text(changelog, encoding='utf-8', newline='\n')

print('Section 21 registry, sitemap and changelog updates prepared.')
