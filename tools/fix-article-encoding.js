#!/usr/bin/env node
/*
  Chambers of AK - article encoding fixer.

  This is intentionally ASCII-safe source code. It builds known mojibake
  sequences from Unicode code points, repairs article files, and then leaves
  validation to tools/validate-article-encoding.js.
*/

const fs = require('fs');
const path = require('path');

const root = process.cwd();

const targets = [
  'updates/sabarimala-case-9-judge-bench-2026.html',
  'updates/uapa-bail-section-43d5-supreme-court-2026.html'
];

const cp = (...codes) => String.fromCodePoint(...codes);

const knownReplacements = [
  // Double-encoded apostrophe / right single quote: mojibake for U+2019.
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x201E,0x00A2), "'"],

  // Single-encoded apostrophe / right single quote.
  [cp(0x00E2,0x20AC,0x2122), "'"],

  // Double-encoded left double quote: mojibake for U+201C.
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C5,0x201C), '"'],

  // Single-encoded left double quote.
  [cp(0x00E2,0x20AC,0x0153), '"'],

  // Double-encoded right double quote: mojibake for U+201D.
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C2,0x009D), '"'],

  // Single-encoded right double quote.
  [cp(0x00E2,0x20AC,0x009D), '"'],

  // Double-encoded en dash: mojibake for U+2013.
  [cp(0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00E2,0x20AC,0x0153), '-'],

  // Sabarimala-specific triple-looking dash cluster observed in metadata.
  [cp(0x00C3,0x0192,0x00C2,0x00A2,0x00C3,0x00A2,0x00E2,0x20AC,0x0161,0x00C2,0x00AC,0x00C3,0x00A2,0x00E2,0x201A,0x00AC,0x00C5,0x201C), '-'],

  // Single-encoded en dash / em dash variants.
  [cp(0x00E2,0x20AC,0x201C), '-'],
  [cp(0x00E2,0x20AC,0x201D), '-'],

  // Ellipsis mojibake.
  [cp(0x00E2,0x20AC,0x00A6), '...']
];

function applyKnownReplacements(text) {
  let out = text;
  let changed = true;
  let rounds = 0;

  while (changed && rounds < 6) {
    changed = false;
    rounds += 1;
    for (const [bad, good] of knownReplacements) {
      if (out.includes(bad)) {
        out = out.split(bad).join(good);
        changed = true;
      }
    }
  }

  return out;
}

function normalizeAsciiPunctuation(text) {
  return text
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2026/g, '...');
}

function fixSabarimala(text) {
  let out = text;
  out = applyKnownReplacements(out);
  out = normalizeAsciiPunctuation(out);

  // Clean the exact visible article-card issue without depending on the broken dash bytes.
  out = out.replace(/Articles\s+25[\s\S]{0,120}?26/g, 'Articles 25 and 26');

  return out;
}

function fixUapa(text) {
  let out = text;
  out = applyKnownReplacements(out);
  out = normalizeAsciiPunctuation(out);

  // Clean critical metadata/title fields deterministically.
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

  // Clean common quote phrases in the body after general replacement.
  out = out.replace(/"prima facie true"/g, '"prima facie true"');
  out = out.replace(/"Bail is the rule, jail is the exception"/g, '"Bail is the rule, jail is the exception"');

  return out;
}

function updateDates(text, articleKind) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());

  const iso = `${yyyy}-${mm}-${dd}`;
  const visible = `${dd}/${mm}/${yyyy} at ${hh}:${min}`;

  let out = text;
  out = out.replace(/<meta property="article:modified_time" content="[^"]+">/g, `<meta property="article:modified_time" content="${iso}">`);
  out = out.replace(/"dateModified":"[^"]+"/g, `"dateModified":"${iso}"`);

  if (/<p class="article-last-updated"><strong>Last updated on:<\/strong> [^<]+<\/p>/.test(out)) {
    out = out.replace(/<p class="article-last-updated"><strong>Last updated on:<\/strong> [^<]+<\/p>/g, `<p class="article-last-updated"><strong>Last updated on:</strong> ${visible}</p>`);
  }

  return out;
}

function scanBadMarkers(text) {
  const bad = [];
  const markers = [
    ['U+00C3', /\u00C3/],
    ['U+00C2', /\u00C2/],
    ['U+00E2', /\u00E2/],
    ['U+FFFD', /\uFFFD/]
  ];

  for (const [label, re] of markers) {
    if (re.test(text)) bad.push(label);
  }

  return bad;
}

let changedCount = 0;

for (const relPath of targets) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    console.log(`Skipped missing file: ${relPath}`);
    continue;
  }

  const before = fs.readFileSync(full, 'utf8');
  let after = before;

  if (relPath.includes('sabarimala')) after = fixSabarimala(after);
  if (relPath.includes('uapa')) after = fixUapa(after);

  after = updateDates(after, relPath);

  const badMarkers = scanBadMarkers(after);
  if (badMarkers.length) {
    console.error(`Still found encoding markers in ${relPath}: ${badMarkers.join(', ')}`);
    const firstIndex = [...after].findIndex((ch) => /[\u00C3\u00C2\u00E2\uFFFD]/.test(ch));
    const start = Math.max(0, firstIndex - 80);
    const end = Math.min(after.length, firstIndex + 160);
    console.error(after.slice(start, end));
    process.exit(1);
  }

  if (after !== before) {
    fs.writeFileSync(full, after, 'utf8');
    changedCount += 1;
    console.log(`Fixed article encoding: ${relPath}`);
  } else {
    console.log(`No article encoding changes needed: ${relPath}`);
  }
}

console.log(`Article encoding fix complete. Files changed: ${changedCount}`);
