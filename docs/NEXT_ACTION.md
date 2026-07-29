# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D08-EVIDENCE-GAP-REVIEW`

**Objective:** Read the authoritative D08 verification-matrix row and determine
whether existing repository evidence independently satisfies it or whether a
minimal additional harness and user-assisted device execution are required.

## Required work

1. Complete the mandatory repository preflight.
2. Read the exact D08 row in
   `docs/testing/autojs6-image-reader-device-verification-v1.md`.
3. Inspect the production reader, portable core, existing D01-D07 harnesses,
   tests, device records, build system, and privacy contracts relevant to D08.
4. Identify the exact source and runtime boundary D08 is intended to prove.
5. Determine whether existing evidence already proves D08 or document the
   smallest non-duplicative evidence path required.
6. Record one reviewed conclusion in repository documentation.

## Acceptance criteria

- The review quotes or precisely identifies the authoritative D08 requirement.
- Existing D01-D07 evidence is not reused beyond its actual scope.
- Node.js checks are not represented as Android proof.
- Any proposed harness reuses existing production and portable components and
  avoids duplicate readers, MIME detectors, validation logic, or mappings.
- Output and evidence remain metadata-only and exclude URI, path, filename,
  bytes, Base64, image content, exception details, stack, credentials, and
  unrelated metadata.
- No D08 PASS is claimed without distinct reviewed evidence.
- The review has a GitHub commit and pull request before completion.

## Prohibited scope

Do not add provider, network, queue, Contributor app, automatic submission,
credentials, broad storage permission, unrelated format support, or complete
module-migration claims.

## Stop conditions

Stop and report without implementation when:

- repository facts relevant to D08 changed and are not reconciled;
- an open pull request already owns D08 work;
- the authoritative D08 row is missing or ambiguous;
- the source cannot identify one precise evidence boundary;
- proving D08 requires unreviewed production API expansion;
- user/device action is required before an evidence path is prepared;
- repository checks or write operations fail.
