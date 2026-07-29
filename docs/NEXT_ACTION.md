# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D08-LAUNCHER-PREPARATION`

**Objective:** Prepare one case-specific AutoJs6 launcher for the normal
permission-granted path, reusing the existing system picker, production Android
reader, portable core, and metadata-only reporter without adding permission
logic.

## Required work

1. Complete the mandatory repository preflight.
2. Follow
   `docs/testing/d08-permission-granted-evidence-gap-review.md` as the reviewed
   design boundary.
3. Add manifest case `D08_PERMISSION_GRANTED` with JPEG picker, expected
   `image/jpeg`, request code `6108`, and the existing normal verification path.
4. Add a source entry and deterministic generated bundle that delegate
   immediately to `runAutoJs6FormatCheck()`.
5. Add manifest, delegation, build-freshness, legacy-syntax, privacy, and
   normal-path contract coverage without duplicating the D01 implementation.
6. Add a Traditional Chinese D08 device guide.
7. Update project state and advance the single active task to D08 device
   verification only after the preparation pull request is reviewed and merged.

## Acceptance criteria

- D08 uses the same normal picker and `runImageReaderDeviceCheck()` path as D01.
- No new reader, permission API, MIME detector, MIME map, error classification,
  portable validation, or reporter is introduced.
- A future device PASS requires case ID `D08_PERMISSION_GRANTED`, final
  `mimeType: "image/jpeg"`, exact positive `sizeBytes`, and
  `uiResponsive: true`.
- Tests prove immediate delegation to the shared runtime and no D08-specific
  production behavior.
- Generated AutoJs6 output is deterministic, current, parseable, and compatible
  with the recorded legacy runtime.
- Output excludes URI, path, filename, bytes, Base64, image content, exception
  details, stack, credentials, and unrelated metadata.
- Node.js checks are not represented as Android permission evidence.
- No D08 device PASS is claimed in the preparation pull request.

## Prohibited scope

Do not add a permission manager, persistable-grant behavior, second picker,
second reader, provider, network, queue, Contributor app, automatic submission,
credentials, broad storage permission, or unrelated validation behavior.

## Stop conditions

Stop and report without claiming completion when:

- repository facts relevant to D08 changed and are not reconciled;
- an open pull request already owns D08 preparation;
- the implementation cannot remain a pure shared-runtime case alias;
- bundle freshness, syntax, lint, formatting, privacy, or tests fail;
- user/device action is required before the launcher is prepared;
- repository write operations fail.
