#!/usr/bin/env node
/*
  Chambers of AK - full article body encoding fixer v2.

  Purpose:
  - repair mojibake across all updates/*.html files;
  - use ASCII-safe source code;
  - avoid line-by-line manual fixes;
  - run before full body validator.
*/

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const updatesDir = path.join(root, 'updates');
const cp = (...codes) => String.fromCodePoint(...codes);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full;
  });
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

const replacements = [
  // Common mojibake quote/dash/apostrophe sequences. Built by code points.
  [cp(0x00C3,0x0192,0x00C2,0x00A2,0x00C3,0x00A2,0x00E2,0x20AC,0x0161,0x00C2,0x00AC,0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C5,0x201C), '"'],
  [cp(0x00C3,0x0192,0x00C2,0x00A2,0x00C3,0x00A2,0x00E2,0x20AC,0x0161,0x00C2,0x00AC,0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C2,0x009D), '"'],
  [cp(0x00C3,0x0192,0x00C2,0x00A2,0x00C3,0x00A2,0x00E2,0x20AC,0x0161,0x00C2,0x00AC,0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x201E,0x00A2), "'"],
  [cp(0x00C3,0x0192,0x00C2,0x00A2,0x00C3,0x00A2,0x00E2,0x20AC,0x0161,0x00C2,0x00AC,0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x20AC,0x0153), '-'],

  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C5,0x201C), '"'],
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C2,0x009D), '"'],
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x201E,0x00A2), "'"],
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x20AC,0x0153), '-'],

  [cp(0x00E2,0x20AC,0x0153), '"'],
  [cp(0x00E2,0x20AC,0x009D), '"'],
  [cp(0x00E2,0x20AC,0x2122), "'"],
  [cp(0x00E2,0x20AC,0x201C), '-'],
  [cp(0x00E2,0x20AC,0x201D), '-'],
  [cp(0x00E2,0x20AC,0x00A6), '...'],

  [cp(0x00C2,0x00A0), ' '],
  [cp(0x00C2,0x00A7), 'Section ']
];

function applyDirectReplacements(text) {
  let out = text;
  let changed = true;
  let rounds = 0;

  while (changed && rounds < 8) {
    changed = false;
    rounds += 1;
    for (const [bad, good] of replacements) {
      if (out.includes(bad)) {
        out = out.split(bad).join(good);
        changed = true;
      }
    }
  }

  return out;
}

const suspiciousRun = /[\u00C3\u0192\u00C2\u00E2\u201A\u00AC\u201E\u00A2\u00C5\u009D\u20AC\u0153\u00A1\u0161\u00B9\u00A6\u02DC\u201C\u201D\u2122\u0080-\u009F]{2,}/g;

function residueReplacement(run, prevChar, nextChar) {
  // If a residue sits inside a possessive form, keep an apostrophe.
  if (/\w/.test(prevChar || '') && /[sS]/.test(nextChar || '')) return "'";

  // If residue appears immediately before an existing quote, do not duplicate punctuation.
  if ((nextChar || '') === '"' || (nextChar || '') === "'") return '';

  // If it looks like an opening/closing quote cluster, use a quote.
  if (/[\u201C\u201D\u0153\u009D\u00C5]/.test(run)) return '"';

  // If it looks like apostrophe cluster, use apostrophe.
  if (/[\u2122\u201E\u00A2]/.test(run) && /\w/.test(prevChar || '') && /\w/.test(nextChar || '')) return "'";

  // If it looks like dash cluster, use hyphen only between alphanumerics.
  if (/[\u201C\u201D\u0153]/.test(run) && /\w/.test(prevChar || '') && /\w/.test(nextChar || '')) return '-';

  // Otherwise remove the encoding debris.
  return '';
}

function stripResidualRuns(text) {
  return text.replace(suspiciousRun, (run, offset, full) => {
    const prev = offset > 0 ? full[offset - 1] : '';
    const next = full[offset + run.length] || '';
    return residueReplacement(run, prev, next);
  });
}

function normalizeSmartAscii(text) {
  return text
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2026/g, '...');
}

function repairKnownPhrases(text, relative) {
  let out = text;

  if (relative.includes('sabarimala-case-9-judge-bench-2026')) {
    out = out.replace(/Articles\s+25[\s\S]{0,120}?26/g, 'Articles 25 and 26');
  }

  if (relative.includes('uapa-bail-section-43d5-supreme-court-2026')) {
    out = out.replace(
      /Bail Is the Rule, Jail Is the Exception: Re-examining UAPA Bail Jurisprudence After the Supreme Court[\s\S]{0,80}?s 2026 Observations/g,
      "Bail Is the Rule, Jail Is the Exception: Re-examining UAPA Bail Jurisprudence After the Supreme Court's 2026 Observations"
    );
    out = out.replace(
      /UAPA bail jurisprudence after the Supreme Court[\s\S]{0,80}?s 2026 observations explained by Chambers of AK\./g,
      "UAPA bail jurisprudence after the Supreme Court's 2026 observations explained by Chambers of AK."
    );
    out = out.replace(
      /Can Section 43D\(5\) UAPA justify prolonged pre-trial incarceration\? Chambers of AK examines the Supreme Court[\s\S]{0,80}?s 2026 observations, Watali/g,
      "Can Section 43D(5) UAPA justify prolonged pre-trial incarceration? Chambers of AK examines the Supreme Court's 2026 observations, Watali"
    );
  }

  if (relative.includes('arbitration-notice-before-claim')) {
    out = out.replace(/such as\s+["']{0,2}all disputes["']{0,2}/g, 'such as "all disputes"');
  }

  return out;
}

function updateVisibleDates(text) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mi = pad(now.getMinutes());
  const iso = `${yyyy}-${mm}-${dd}`;
  const visible = `${dd}/${mm}/${yyyy} at ${hh}:${mi}`;

  let out = text;
  out = out.replace(/<meta property="article:modified_time" content="[^"]+">/g, `<meta property="article:modified_time" content="${iso}">`);
  out = out.replace(/"dateModified":"[^"]+"/g, `"dateModified":"${iso}"`);
  out = out.replace(/<p class="article-last-updated"><strong>Last updated on:<\/strong> [^<]+<\/p>/g, `<p class="article-last-updated"><strong>Last updated on:</strong> ${visible}</p>`);
  return out;
}

function residualMarkers(text) {
  const markers = [];
  const checks = [
    ['U+00C3', /\u00C3/],
    ['U+00C2', /\u00C2/],
    ['U+00E2', /\u00E2/],
    ['U+FFFD', /\uFFFD/]
  ];
  for (const [label, re] of checks) {
    if (re.test(text)) markers.push(label);
  }
  return markers;
}

function firstMarkerSnippet(text) {
  const index = [...text].findIndex((ch) => /[\u00C3\u00C2\u00E2\uFFFD]/.test(ch));
  if (index < 0) return '';
  const start = Math.max(0, index - 100);
  const end = Math.min(text.length, index + 220);
  return text.slice(start, end).replace(/\s+/g, ' ');
}

const articleFiles = walk(updatesDir).filter((file) => file.endsWith('.html'));
let changedCount = 0;
const unresolved = [];

for (const file of articleFiles) {
  const relative = rel(file);
  const before = fs.readFileSync(file, 'utf8');

  let after = before;
  after = applyDirectReplacements(after);
  after = stripResidualRuns(after);
  after = normalizeSmartAscii(after);
  after = repairKnownPhrases(after, relative);
  after = updateVisibleDates(after);

  const markers = residualMarkers(after);
  if (markers.length) {
    unresolved.push({ file: relative, markers, snippet: firstMarkerSnippet(after) });
  }

  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changedCount += 1;
    console.log('Fixed encoding in ' + relative);
  }
}

if (unresolved.length) {
  console.error('Unresolved mojibake markers remain:');
  for (const item of unresolved) {
    console.error('- ' + item.file + ' (' + item.markers.join(', ') + ')');
    if (item.snippet) console.error('  snippet: ' + item.snippet);
  }
  process.exit(1);
}

console.log('Full article-body encoding repair complete.');
console.log('Article files checked: ' + articleFiles.length);
console.log('Article files changed: ' + changedCount);
