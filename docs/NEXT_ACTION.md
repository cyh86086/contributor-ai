# Next action

Last reviewed: 2026-08-03
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-DEVICE-VALIDATION`

**Objective:** After the D16 preparation change passes the repository review
gate and is merged, execute the approved repeated-read procedure on Vivo X
Fold5 and retain only scoped, sanitized Android and AutoJs6 evidence.

The reviewed package uses fixture ID `JPEG_REPEAT_VALID`, independently
verified size `6406`, `maxSizeBytes: 6406`,
`readerSafetyLimitBytes: 12582912`, and exactly 10 complete reads under one
fresh temporary system-picker grant without reselection.

This task may begin only after the preparation pull request is merged to `main`
following either independent human review or a current PASS record under the
strict solo-project exception. A solo exception record is explicitly not
independent human review and is valid only for its exact base/head SHAs. Until
then, no phone, Android picker, device execution, evidence record, or D16 PASS
claim is authorized.

## Required work

1. Complete mandatory preflight from live `main` and confirm the reviewed D16
   manifest, wrapper, launcher integration, generated bundle, tests, and
   Traditional Chinese procedure are unchanged.
2. Confirm the repository working tree is clean and all authoritative checks
   pass against the exact execution SHA.
3. Confirm the privately mapped `JPEG_REPEAT_VALID` fixture remains unchanged
   and independently verified as a 6,406-byte synthetic JPEG.
4. Have the user import the committed generated D16 bundle into AutoJs6 v6.7.0
   `arm64-v8a` without editing it.
5. Use the Android system picker opened by that run to select the fixture
   exactly once and obtain one fresh temporary grant.
6. Allow the launcher to perform exactly 10 complete
   `canAccess() → read() → portable core` iterations without reselection.
7. Retain only one frozen sanitized aggregate record, the exact repository SHA,
   device/runtime scope, opaque fixture ID, independent count, and
   non-sensitive notes.
8. If and only if the aggregate exactly matches the approved PASS shape, add a
   scoped device-validation evidence document. Otherwise retain the exact
   sanitized failure aggregate without inventing PASS or changing its reason.

## Acceptance criteria

- Execution uses the reviewed generated bundle from a clean authoritative
  `main` SHA.
- One system-picker selection and one fresh temporary grant are used for the
  entire loop.
- Exactly 10 complete production reader/core iterations occur without
  reselection.
- The only accepted PASS aggregate is:

  ```json
  {
    "testCaseId": "D16_REPEATED_READS",
    "status": "PASS",
    "requestedIterations": 10,
    "attemptedIterations": 10,
    "successfulIterations": 10,
    "mimeType": "image/jpeg",
    "sizeBytes": 6406,
    "allMetadataEqual": true,
    "uiResponsive": true
  }
  ```

- Any failure preserves the approved counter, equality, responsiveness, failure
  precedence, and stable public-error semantics.
- Exactly one aggregate record is emitted; no per-iteration records are
  retained.
- No URI, path, filename, source bytes, Base64, image content, exception detail,
  stack, credential, private fixture mapping, or uncontrolled runtime value is
  retained.
- The result is scoped only to the recorded device, Android version, AutoJs6
  build, repository SHA, fixture, grant, and execution.

## Prohibited scope

Do not begin this task before the preparation pull request passes the repository
review gate and merges. Do not treat a solo exception record as independent
human review or as device evidence.

Do not edit the generated bundle on the device, change any configured count or
limit, reselect the fixture, reuse a saved URI, request persistable access, add
broad storage permission, or copy the source into repository or application
storage.

Do not add production reader, portable-core, permission, provider, network,
queue, Contributor app, credential, submission, source-copy, or unrelated
module behavior.

Do not reuse D13-D15 evidence as D16 evidence, and do not claim D17-D26,
provider, queue, memory, cleanup instrumentation, or complete Android Image
Input Adapter migration.

## Stop conditions

Stop and report when:

- the D16 preparation pull request is not merged or lacks a current qualifying
  review-gate record;
- the execution SHA or generated bundle is not clean and authoritative;
- repository checks fail;
- fixture provenance, MIME, or independently verified count is ambiguous;
- the system picker does not open or more than one selection is required;
- the temporary grant cannot support the reviewed loop unchanged;
- the output is missing, malformed, unsanitized, duplicated, or contains
  per-iteration records;
- counters, equality, responsiveness, failure precedence, or public-error
  preservation differ from the approved contract;
- the UI becomes unresponsive;
- sensitive data may have appeared;
- an open pull request or branch already owns D16 device evidence;
- repository state conflicts or write access is unavailable.
