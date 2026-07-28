from pathlib import Path
import json

ROOT = Path('.')
ARTICLE_HREF = 'updates/section-12a-commercial-courts-pre-institution-mediation.html'
ARTICLE_URL = 'https://chambersofak.in/' + ARTICLE_HREF


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding='utf-8')


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding='utf-8', newline='\n')


# Correct accessible judgment links in the already drafted article.
article_path = ARTICLE_HREF
article = read(article_path)
article = article.replace(
    'https://indiankanoon.org/doc/189847781/',
    'https://indiankanoon.org/doc/164693074/'
)
article = article.replace(
    'https://indiankanoon.org/doc/77399484/',
    'https://indiankanoon.org/doc/65175185/'
)
for marker in (
    '<h1>Section 12A of the Commercial Courts Act Explained: Pre-Institution Mediation Before Suit</h1>',
    'data-citadel-article-index',
    '<h2>What qualifies as urgent interim relief?</h2>',
    '<h2>No separate exemption application is mandatory</h2>',
    '<h2>Settlement and enforceability</h2>',
    '<h2>References / Sources</h2>',
):
    if marker not in article:
        raise RuntimeError(f'Missing article marker: {marker}')
write(article_path, article)


# Add the new article as the latest Insights Registry entry.
registry_path = 'assets/data/insights-registry.json'
items = json.loads(read(registry_path))
if any(item.get('href') == ARTICLE_HREF for item in items):
    raise RuntimeError('Section 12A article already exists in the Insights Registry')

entry = {
    'href': ARTICLE_HREF,
    'category': 'Procedure Note',
    'title': 'Section 12A Commercial Courts Act: pre-institution mediation',
    'excerpt': 'When PIMS is mandatory before a commercial suit, the urgent-interim-relief exception, limitation protection and settlement effect.',
    'date': 'July 2026',
    'tags': [
        'Commercial Courts',
        'Section 12A',
        'Pre-Institution Mediation',
        'Commercial Suit',
        'Urgent Interim Relief',
        'Limitation',
    ],
    'thumbnail': 'assets/img/citadel/citadel-thumb-commercial-recovery-before-suit-batch6-v2.jpg',
    'cardThumbnail': 'assets/img/citadel/cards/citadel-thumb-commercial-recovery-before-suit-batch6-v2-640.jpg',
}
items.insert(0, entry)
write(registry_path, json.dumps(items, indent=2, ensure_ascii=False) + '\n')


# Add the canonical article URL to the sitemap.
sitemap_path = 'sitemap.xml'
sitemap = read(sitemap_path)
if ARTICLE_URL in sitemap:
    raise RuntimeError('Section 12A article already exists in sitemap.xml')
closing = '</urlset>'
if closing not in sitemap:
    raise RuntimeError('sitemap.xml closing marker not found')
sitemap_entry = f'<url><loc>{ARTICLE_URL}</loc><lastmod>2026-07-28</lastmod></url>'
sitemap = sitemap.replace(closing, sitemap_entry + closing, 1)
write(sitemap_path, sitemap)


# Record the publication in the changelog.
changelog_path = 'CHANGELOG.md'
changelog = read(changelog_path)
heading = '## 2026-07-28 IST - Publish Section 12A pre-institution mediation guide'
if heading in changelog:
    raise RuntimeError('Section 12A changelog entry already exists')
entry_text = '''## 2026-07-28 IST - Publish Section 12A pre-institution mediation guide
- Published `updates/section-12a-commercial-courts-pre-institution-mediation.html` as a standalone Section 12A authority page without replacing the broader commercial-recovery checklist.
- Explained mandatory PIMS, the urgent-interim-relief exception, non-starter procedure, limitation exclusion and settlement enforceability.
- Added current Supreme Court guidance from `Patil Automation` and `Yamini Manohar` and practical applicant/respondent document checklists.
- Reused the approved commercial-recovery article/card images and added the page to the Insights Registry and sitemap.
- Regenerated homepage/Insights static cards and the registry-driven RSS feed.

'''
write(changelog_path, entry_text + changelog)

print('Section 12A publication metadata prepared.')
