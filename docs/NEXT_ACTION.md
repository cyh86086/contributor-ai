# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D08-EVIDENCE-REVIEW`

**Objective:** Review the already supplied sanitized Vivo X Fold5 D08 result
against the reconciled byte-count criterion, record scoped evidence without
reconstructing missing values, update project state, and submit the evidence
through a documentation pull request.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm a clean authoritative `main` and record its exact SHA.
3. Run `npm run build:autojs6:d08:check` and `npm run scan:autojs6:d08`.
4. Review the supplied sanitized result for:
   `D08_PERMISSION_GRANTED`, `PASS`, `image/jpeg`, exact positive `sizeBytes`,
   and `uiResponsive: true`.
5. Record device/runtime fields only when supplied; mark any missing value as
   not supplied rather than reconstructing it.
6. Add reviewed evidence, update project state, and advance this file through a
   documentation pull request.

## Acceptance criteria

- A PASS requires `testCaseId: "D08_PERMISSION_GRANTED"`, `status: "PASS"`,
  final `mimeType: "image/jpeg"`, exact positive fixture `sizeBytes`, and
  `uiResponsive: true`.
- Evidence identifies exact authoritative SHA, Vivo X Fold5, Android version,
  AutoJs6 version and ABI, opaque fixture ID, expected byte count, result, and
  sanitized notes.
- The fixture is freshly selected during the D08 run and read immediately while
  its temporary grant is active.
- The fixture byte count is reported as an exact positive integer by the existing
  production reader during the same fresh-picker run. A rounded Android UI size
  such as `1.33 MB` is not treated as an independent exact-byte source.
- Output contains no URI, path, filename, bytes, Base64, image content, error
  detail, stack, credential, or unrelated metadata.
- Node.js checks are not represented as Android permission evidence.
- The evidence task has a GitHub commit and pull request before completion.

## Prohibited scope

Do not add a permission manager, persistable grant, second picker, second
reader, provider, network, queue, Contributor app, automatic submission,
credentials, broad storage permission, or unrelated validation behavior.

## Stop conditions

Stop and report without claiming PASS when:

- repository facts relevant to D08 changed and are not reconciled;
- an open pull request already owns D08 evidence;
- the generated bundle is stale or syntax checks fail;
- the fixture was not freshly selected in the D08 run;
- the production reader does not return an exact positive fixture byte count;
- Android or AutoJs6 cannot access or read the selected fixture;
- final MIME differs from `image/jpeg`;
- exact byte count or UI responsiveness is not proven;
- output contains prohibited data.
