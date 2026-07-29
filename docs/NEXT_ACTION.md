# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D06-DEVICE-VERIFICATION`

**Objective:** Execute the generated D06 evidence-only launcher on Vivo X Fold5
and record whether Android `ContentResolver` directly returns the required JPEG
MIME with the exact fixture byte count.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm a clean authoritative `main` and record its exact SHA.
3. Run `npm run build:autojs6:d06:check` and `npm run scan:autojs6:d06`.
4. Follow
   `docs/user-guides/autojs6-d06-content-resolver-mime-check-zh-tw.md`.
5. Execute `scripts/autojs6/d06-resolver-mime-device-check.js` once with the
   approved non-sensitive JPEG fixture.
6. Return only the scoped, sanitized result required by the guide.
7. Add the reviewed device evidence, update project state, and advance this file
   through a documentation pull request.

## Acceptance criteria

- A PASS requires `testCaseId: "D06_RESOLVER_MIME"`, `status: "PASS"`,
  `mimeType: "image/jpeg"`, the exact positive fixture `sizeBytes`, and
  `uiResponsive: true`.
- Evidence identifies exact authoritative SHA, Vivo X Fold5, Android version,
  AutoJs6 version and ABI, opaque fixture ID, expected byte count, result, and
  sanitized notes.
- No URI, path, filename, bytes, Base64, image content, error detail, stack,
  credential, or unrelated metadata is recorded.
- A missing or wrong resolver MIME remains FAIL even when JPEG signature bytes
  are valid.
- Node.js checks are not represented as Android proof.
- The evidence task has a GitHub commit and pull request before it is complete.

## Prohibited scope

Do not add signature fallback to D06, a second image reader, queue, AI provider,
network, Contributor app, automatic submission, credentials, or unrelated
validation behavior.

## Stop conditions

Stop and report without claiming PASS when:

- repository facts relevant to D06 changed and are not reconciled;
- an open pull request already owns D06 evidence;
- the generated bundle is stale or syntax checks fail;
- the fixture byte count is unknown;
- Android or AutoJs6 cannot expose or read the fixture;
- the resolver MIME is absent or differs from `image/jpeg`;
- UI responsiveness is not proven;
- the output contains prohibited data.
