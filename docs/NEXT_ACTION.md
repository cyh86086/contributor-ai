# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D07-DEVICE-VERIFICATION`

**Objective:** Execute the generated D07 evidence-only launcher on Vivo X Fold5
and record whether the existing portable core derives `image/jpeg` from the
fixture byte signature when the reader MIME is deterministically absent.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm a clean authoritative `main` and record its exact SHA.
3. Run `npm run build:autojs6:d07:check` and `npm run scan:autojs6:d07`.
4. Follow
   `docs/user-guides/autojs6-d07-mime-fallback-check-zh-tw.md`.
5. Execute `scripts/autojs6/d07-mime-fallback-device-check.js` once with the
   approved non-sensitive JPEG fixture.
6. Return only the scoped, sanitized result required by the guide.
7. Add reviewed evidence, update project state, and advance this file through a
   documentation pull request.

## Acceptance criteria

- A PASS requires `testCaseId: "D07_MIME_FALLBACK"`, `status: "PASS"`, final
  `mimeType: "image/jpeg"`, exact positive fixture `sizeBytes`, and
  `uiResponsive: true`.
- Evidence identifies exact authoritative SHA, Vivo X Fold5, Android version,
  AutoJs6 version and ABI, opaque fixture ID, expected byte count, result, and
  sanitized notes.
- The selected fixture is a valid JPEG and its byte count is independently
  confirmed before execution.
- The evidence-only wrapper preserves production-reader bytes and removes only
  MIME before the existing portable fallback path.
- Output contains no URI, path, filename, bytes, Base64, image content, error
  detail, stack, credential, or unrelated metadata.
- Node.js checks are not represented as Android proof.
- The evidence task has a GitHub commit and pull request before completion.

## Prohibited scope

Do not add a second reader, signature detector, MIME map, production switch,
provider, network, queue, Contributor app, automatic submission, credentials,
or unrelated validation behavior.

## Stop conditions

Stop and report without claiming PASS when:

- repository facts relevant to D07 changed and are not reconciled;
- an open pull request already owns D07 evidence;
- the generated bundle is stale or syntax checks fail;
- the fixture byte count is unknown;
- Android or AutoJs6 cannot expose or read the fixture;
- final MIME differs from `image/jpeg`;
- exact byte count or UI responsiveness is not proven;
- output contains prohibited data.
