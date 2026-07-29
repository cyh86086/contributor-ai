# Next action

Last reviewed: 2026-07-29
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D07-EVIDENCE-GAP-REVIEW`

**Objective:** Determine whether the existing runtime-neutral fallback tests and
Android reader boundaries can supply distinct, reviewable D07 evidence for an
absent `ContentResolver` MIME, or whether D07 needs a minimal controlled
AutoJs6 evidence harness.

## Required work

1. Complete the mandatory repository preflight.
2. Read the D07 row in
   `docs/testing/autojs6-image-reader-device-verification-v1.md`.
3. Inspect `src/core/image-input.js`, the production Android reader, existing
   fallback tests, D06 evidence harness, build system, and privacy contracts.
4. Identify the exact controlled hook that can return no MIME while preserving
   a valid fixture read.
5. Determine whether existing evidence already proves D07 or document the
   smallest non-duplicative launcher/test change required.
6. Record one reviewed conclusion in repository documentation.

## Acceptance criteria

- The review distinguishes D07 signature fallback from D06 resolver-MIME proof.
- Any proposed harness reuses the existing production reader and portable core;
  it must not create a second MIME detector or image reader.
- The controlled absent-MIME condition is deterministic and cannot be confused
  with a picker failure, permission denial, unsupported bytes, or wrong MIME.
- Output remains metadata-only and excludes URI, path, filename, bytes, Base64,
  image content, exception detail, stack, credentials, and unrelated metadata.
- Node.js evidence is not represented as Android proof.
- No D07 PASS is claimed without distinct reviewed evidence.

## Prohibited scope

Do not add provider, network, queue, Contributor app, automatic submission,
credential, broad storage permission, unrelated format support, or complete
module-migration claims.

## Stop conditions

Stop and report without implementation when:

- repository facts relevant to D07 changed and are not reconciled;
- an open pull request already owns D07 work;
- the source cannot identify one deterministic absent-MIME control point;
- proving the condition requires unreviewed production API expansion;
- user/device action is required before the evidence path is prepared;
- GitHub write capability is unavailable and repository changes are required.
