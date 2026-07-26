from pathlib import Path

ROOT = Path('.')
OLD_CACHE = 'site-20260726-article-index-v24-1'
NEW_CACHE = 'site-20260726-article-index-v25-1'


def read(path: str) -> str:
    return Path(path).read_text(encoding='utf-8')


def write(path: str | Path, text: str) -> None:
    Path(path).write_text(text, encoding='utf-8', newline='\n')


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f'{label}: expected one marker, found {count}')
    return text.replace(old, new, 1)


# 1. Replace the desktop rail calculation with active-link-aware whole-tray movement.
article_js_path = 'assets/js/themes/citadel-of-kang/article-index-direct-rail.js'
article_js = read(article_js_path)
old_sync = '''  var syncRail = function () {
    if (toc.scrollTop !== 0) toc.scrollTop = 0;

    if (window.innerWidth <= 920) {
      toc.style.setProperty('transform', 'translate3d(0,0,0)', 'important');
      return;
    }

    var articleTop = getScrollY() + article.getBoundingClientRect().top;
    var maxTravel = Math.max(0, article.offsetHeight - toc.offsetHeight);
    var desired = getScrollY() + navSpace() + 18 - articleTop;
    desired = Math.min(maxTravel, Math.max(0, desired));
    toc.style.setProperty('transform', 'translate3d(0,' + Math.round(desired) + 'px,0)', 'important');
  };
'''
new_sync = '''  var syncRail = function () {
    if (toc.scrollTop !== 0) toc.scrollTop = 0;

    if (window.innerWidth <= 920) {
      toc.style.setProperty('transform', 'translate3d(0,0,0)', 'important');
      return;
    }

    var scrollY = getScrollY();
    var railRect = rail.getBoundingClientRect();
    var tocRect = toc.getBoundingClientRect();
    var railTop = scrollY + railRect.top;
    var maxTravel = Math.max(0, article.offsetHeight - toc.offsetHeight);
    var desired = scrollY + navSpace() + 18 - railTop;
    var currentTransform = tocRect.top - railRect.top;
    var currentActive = toc.querySelector('a.is-active');

    if (currentActive) {
      var activeRect = currentActive.getBoundingClientRect();
      var projectedShift = desired - currentTransform;
      var projectedTop = activeRect.top + projectedShift;
      var projectedBottom = activeRect.bottom + projectedShift;
      var safeTop = navSpace() + 56;
      var safeBottom = Math.max(safeTop + 72, window.innerHeight - 44);

      if (projectedBottom > safeBottom) {
        desired -= projectedBottom - safeBottom;
      } else if (projectedTop < safeTop) {
        desired += safeTop - projectedTop;
      }
    }

    desired = Math.min(maxTravel, Math.max(0, desired));
    toc.style.setProperty('transform', 'translate3d(0,' + Math.round(desired) + 'px,0)', 'important');
  };
'''
article_js = replace_once(article_js, old_sync, new_sync, 'Article Index syncRail')
write(article_js_path, article_js)

# 2. Roll only the JavaScript module to v25 and refresh the public bootstrap/config cache.
config_path = 'assets/js/config/chambers-public-config.js'
config = read(config_path)
config = replace_once(config, '"id": "citadel-article-index-v24"', '"id": "citadel-article-index-v25"', 'Public config article id')
config = replace_once(config, '"version": "article-index-v24"', '"version": "article-index-v25"', 'Public config article version')
write(config_path, config)

bootstrap_path = 'assets/js/script.js'
bootstrap = read(bootstrap_path)
bootstrap = replace_once(bootstrap, "version: 'config-v5'", "version: 'config-v6'", 'Bootstrap config version')
write(bootstrap_path, bootstrap)

manifest_path = 'assets/data/citadel-module-manifest.json'
manifest = read(manifest_path)
manifest = replace_once(manifest, '"version": "config-v5",\n      "loadedBy": "assets/js/script.js"', '"version": "config-v6",\n      "loadedBy": "assets/js/script.js"', 'Manifest public config version')
manifest = replace_once(
    manifest,
    '"id": "citadel-article-index-v24",\n      "path": "assets/js/themes/citadel-of-kang/article-index-direct-rail.js",\n      "version": "article-index-v24"',
    '"id": "citadel-article-index-v25",\n      "path": "assets/js/themes/citadel-of-kang/article-index-direct-rail.js",\n      "version": "article-index-v25"',
    'Manifest Article Index module block',
)
manifest = replace_once(
    manifest,
    f'"path": "assets/css/style.css",\n      "version": "{OLD_CACHE}"',
    f'"path": "assets/css/style.css",\n      "version": "{NEW_CACHE}"',
    'Manifest public cache key',
)
write(manifest_path, manifest)

# 3. Refresh the bootstrap cache key in every public HTML file.
public_html = []
for pattern in ('*.html', 'practice/*.html', 'services/*.html', 'updates/*.html'):
    public_html.extend(ROOT.glob(pattern))

updated_html = 0
for target in sorted(set(public_html)):
    if target.name in {'google3164979181871a1d.html', 'theme-preview-citadel-of-ak.html'}:
        continue
    html = target.read_text(encoding='utf-8')
    if OLD_CACHE in html:
        html = html.replace(OLD_CACHE, NEW_CACHE)
        write(target, html)
        updated_html += 1

if updated_html < 60:
    raise RuntimeError(f'Expected at least 60 public HTML cache updates, found {updated_html}')

# 4. Keep validators aligned and require the long-index behavior markers.
for validator_path in ('tools/validate-public-assets.js', 'tools/validate-performance-remediation.js'):
    validator = read(validator_path)
    if OLD_CACHE not in validator:
        raise RuntimeError(f'{validator_path}: old cache key missing')
    validator = validator.replace(OLD_CACHE, NEW_CACHE)
    if validator_path.endswith('validate-performance-remediation.js'):
        validator = validator.replace('"config-v5"', '"config-v6"')
    write(validator_path, validator)

public_validator_path = 'tools/validate-public-assets.js'
public_validator = read(public_validator_path)
validator_marker = 'const globalShell = read("assets/js/themes/citadel-of-kang/modules/shell/global-shell.js");\n'
validator_block = '''const articleIndex = read("assets/js/themes/citadel-of-kang/article-index-direct-rail.js");
for (const marker of [
  "var currentActive = toc.querySelector('a.is-active');",
  "var projectedShift = desired - currentTransform;",
  "projectedBottom > safeBottom",
  "projectedTop < safeTop"
]) {
  if (!articleIndex.includes(marker)) {
    errors.push(`Article Index active-visibility marker is missing: ${marker}`);
  }
}

'''
if 'Article Index active-visibility marker is missing' not in public_validator:
    public_validator = replace_once(public_validator, validator_marker, validator_block + validator_marker, 'Public validator insertion')
write(public_validator_path, public_validator)

# 5. Update the module contract without changing the unchanged CSS version.
docs_path = 'docs/maintenance/modules/article-index.md'
docs = read(docs_path).replace('article-index-v24', 'article-index-v25')
old_contract = ('Above `920px`, the complete tray moves through `.article-index-rail` with the article. '
                'The tray begins aligned with the article, remains below the measured topbar/navigation area while room remains, '
                'stops at the article bottom, and leaves with the article. Page scroll is the only scrolling mechanism: the tray '
                'has no fixed maximum height, no independent vertical scrolling, and `toc.scrollTop` remains `0`.')
new_contract = ('Above `920px`, the complete tray moves through `.article-index-rail` with the article. '
                'The tray begins aligned with the article, remains below the measured topbar/navigation area while room remains, '
                'and shifts as one unit when necessary to keep the active heading link inside a safe viewport band. That movement '
                'reverses while scrolling upward. The tray stops at the article bottom and leaves with the article. Page scroll is '
                'the only scrolling mechanism: the tray has no fixed maximum height, no independent vertical scrolling, and '
                '`toc.scrollTop` remains `0`.')
docs = replace_once(docs, old_contract, new_contract, 'Article Index direct-rail contract')
docs = docs.replace(
    'Desktop: active item reaches the last heading.',
    'Desktop: active item reaches the last heading and remains visible when the complete index is taller than the viewport.',
)
write(docs_path, docs)

print(f'Article Index v25 patch prepared; updated {updated_html} public HTML files.')
