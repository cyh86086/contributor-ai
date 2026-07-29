# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D07-HARNESS-PREPARATION`

**Objective:** Prepare one minimal evidence-only AutoJs6 launcher that proves
the existing portable JPEG signature fallback under a deterministic absent-MIME
condition, without adding a second reader or MIME detector.

## Required work

1. Complete the mandatory repository preflight.
2. Follow
   `docs/testing/d07-mime-fallback-evidence-gap-review.md` as the reviewed design
   boundary.
3. Reuse `createAutoJs6AndroidImageReader()` for access and exact byte reading.
4. Add an evidence-only reader wrapper that preserves `canAccess()` and bytes
   but returns an explicitly absent `mimeType` to `prepareImageInput()`.
5. Reuse the existing portable `prepareImageInput()` and
   `detectImageMimeType()` implementation; do not copy either algorithm.
6. Add a deterministic D07 manifest case, source entry, generated bundle,
   offline contract tests, build/freshness checks, legacy-syntax coverage, and
   a Traditional Chinese device guide.
7. Update project state and advance the active task to D07 device verification
   only after the harness PR is reviewed and merged.

## Acceptance criteria

- The controlled absent-MIME hook changes only the reader MIME result and
  preserves the exact production-reader bytes.
- A PASS requires final `mimeType: "image/jpeg"`, exact positive `sizeBytes`, and
  `uiResponsive: true`.
- Tests prove that a present or manipulated resolver MIME cannot bypass the
  controlled absent-MIME condition used by the D07 case.
- The implementation contains no duplicate reader, signature detector, MIME
  map, Base64 encoder, or production configuration switch.
- Generated AutoJs6 output is deterministic, current, parseable, and compatible
  with the recorded legacy runtime.
- Output excludes URI, path, filename, bytes, Base64, image content, exception
  details, stack, credentials, and unrelated metadata.
- Node.js checks are not represented as Android proof.
- No D07 device PASS is claimed in the preparation PR.

## Prohibited scope

Do not add provider, network, queue, Contributor app, automatic submission,
credentials, broad storage permission, unrelated format support, or complete
module-migration claims.

## Stop conditions

Stop and report without claiming completion when:

- repository facts relevant to D07 changed and are not reconciled;
- an open pull request already owns D07 preparation;
- the wrapper cannot preserve exact reader bytes;
- the implementation would require a production API switch or duplicate MIME
  logic;
- bundle freshness, syntax, lint, formatting, privacy, or tests fail;
- user/device action is required before the launcher is prepared;
- repository write capability is unavailable.
