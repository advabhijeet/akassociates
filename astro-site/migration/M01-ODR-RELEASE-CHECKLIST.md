# AK-018.5 M01 — ODR editorial correction and release checklist

Baseline 270c3085497973b482aa2fd6032b28ab0409ae6b. The native M01 draft is astro-site/src/content/articles/msme-odr-portal-filing-procedure.md. Draft remains true. Dates and existing image references are provisional and must be replaced/approved before publication; existing art is not approved for reuse. No claim of authenticated portal access. Direct portal fetch returned 502; scheme text available but PDF screenshot fetch failed. Both parliamentary reply pages visually inspected. India Code principal statute text retrieved; official 2026 Gazette PDFs could not be fetched, secondary transcriptions used only as research leads. Reconfirm current law and portal requirements before release.

## Correct the filing channel before publishing
Primary source: Lok Sabha Q2139 (12 Feb 2026), answer (a)–(b), https://sansad.in/getFile/loksabhaquestions/annex/187/AU2139_aA64vJ.pdf?source=pqals ; corroborated by Rajya Sabha Q96 (9 Feb 2026), answer (c)(iv), https://sansad.in/getFile/annex/270/AS96_I2swCc.pdf?source=pqars .

Approved-for-review replacement concept (not yet published):
“Fresh central online delayed-payment filings moved from MSME Samadhaan to the MSME ODR portal (https://odr.msme.gov.in/) on 15 October 2025, as confirmed by the Ministry of MSME in its February 2026 parliamentary replies. Preserve earlier Samadhaan acknowledgements and follow the concerned Council's directions for the status or migration of pending references. Do not duplicate a pending case. Verify the current ODR interface and applicable State procedural requirements.”

## Verified affected legacy source files
| Path | Observed issue | Proposed correction |
| --- | --- | --- |
| updates/msme-samadhaan-filing-checklist.html | Summary and headings present legacy Samadhaan as current filing interface; ODR described as developing; legacy FAQ upload/physical filing rules presented as current | Preserve historical query intent and URL; make clear distinction between fresh ODR filings and existing Samadhaan files; separate legacy FAQ from current verified instructions; add primary source and contextual M01 link after it exists. |
| updates/delhi-msefc-filing-procedure-msme-delayed-payment.html | Summary, checklist, online filing section, FAQ, conclusion and legal context repeatedly direct fresh cases to Samadhaan | Update all fresh-filing references; preserve Council-specific procedure subject to separate current rules review; qualify legacy FAQ and physical filing assertions; distinguish actual notices and portal process. |
| updates/bihar-msefc-filing-procedure-msme-delayed-payment.html | Summary, eligibility, filing, physical service, FAQs and conclusion describe current Samadhaan route | Update current filing channel; distinguish old acknowledgement vs new reference; retain State rules subject to verification; do not imply old upload rules are current. |
| updates/prepare-msme-delayed-payment-claim.html | Portal heading/FAQ and October 5 status note treat Samadhaan as current | Replace with ODR-first filing guidance; separate evidence advice from technical upload rules; recheck statutory transition. |
| updates/msme-facilitation-council-process.html | Opening eligibility paragraph links old Samadhaan page; references omit current ODR | Add ODR transition and primary source, distinguish old cases, link M01 once approved. |

Source review did not exhaustively enumerate every occurrence across the repository. Before release search legacy article HTML, practice/service pages, FAQs, calculators, registry metadata and Astro content/data for Samadhaan, ODR, portal filing, application and acknowledgement. Classify matches: historic fact, useful legacy reference, inaccurate current instruction, ambiguous. Do not blindly replace “Samadhaan” with “ODR” or assert old UI fields are unchanged. Preserve canonical routes and old publication dates/GUIDs. Align metadata, registry and root sitemap lastmod for substantive revisions; actual approved date only. Review unrelated inaccuracies separately.

## Draft-specific release gates
- Owner legal review of M01 and all legacy corrections. Official ODR screen verification optional for scheme-level guide but required before specific current UI claims; no credentials or client data in repo.
- Confirm operative amendments/notifications (including whether any later commencement has occurred), verify source links and timing. Avoid unverified rules on grouping claims, required upload fields, exact fees, service, hearing mode and filing dates.
- Produce article-specific Citadel artwork (1200x675 and 640x360) and alt text; no reuse of provisional template image without approval. Update approved publication/modified timestamps. Confirm draft flag remains true until approved.
- Apply correction edits in a reviewed candidate; do not publish dead M01 links while draft true. If corrections need to precede M01, link only official portal and already-live articles.
- Run exact candidate isolated CI and live audit per PUBLISHING.md and OPERATIONS.md. No production merge from this draft commit. Check all original canonical URLs remain; if one new article alone approved, counts expected 52 RSS, 88 sitemap, 54 Markdown (assuming baseline remains unchanged). Verify actual counts and output, not predicted results.
- IndexNow after live audit and explicit approved scope only; current script sends entire manifest diff and requires subset support if broader than approval. No new submissions now.
