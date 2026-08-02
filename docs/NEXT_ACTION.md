# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D15-DEVICE-PROCEDURE-PREPARATION`

**Objective:** Prepare, but do not execute, a minimal reviewed D15 package that
can demonstrate formal reader safety-ceiling overflow on Vivo X Fold5 while
retaining only sanitized evidence.

Formal D15 uses fixture ID `OVER_READER_CEILING`. Its independently verified
complete size must be greater than a deliberately lower
`readerSafetyLimitBytes`, while `maxSizeBytes` remains at or above that source
size. The expected stable public result is `IMAGE_READ_FAILED` with no
truncated success.

## Required work

1. Complete mandatory preflight from live `main` and confirm no open PR,
   branch, launcher, private mapping, or device evidence already owns D15.
2. Privately map `OVER_READER_CEILING` to one user-approved, non-sensitive
   controlled supported image and independently measure its complete exact
   count anew with a trusted read-only tool outside the launcher and production
   reader. Retain only the opaque fixture ID and numeric count.
3. Choose and statically validate positive safe integers satisfying
   `readerSafetyLimitBytes < verified source size <= maxSizeBytes`.
4. Add the smallest D15-only evidence wrapper, immutable manifest entry, source
   entry, generated AutoJs6 v6.7.0 bundle, and deterministic build wiring needed
   to delegate to the existing system picker, production reader, portable core,
   shared reporter, and off-UI-thread path.
5. Preserve the underlying sanitized result honestly. In particular, an
   accidental success, permission denial, non-target public failure, malformed
   result, picker cancellation, or UI failure must not be converted into the
   target `IMAGE_READ_FAILED` observation.
6. Add offline tests for D15 static numeric ordering, production-path
   delegation, no-truncated-success behavior, success and non-target failure
   preservation, output sanitization, deterministic bundle freshness, and
   AutoJs6 legacy syntax compatibility. These tests are not Android or device
   evidence.
7. Add a Traditional Chinese Vivo X Fold5 execution guide that requires a fresh
   Android system-picker selection and preserves the private fixture mapping
   outside Git.
8. Update project state and set the sole next task to D15 device validation only
   after the unexecuted package passes review.

## Acceptance criteria

- The retained configuration contains only `OVER_READER_CEILING`, its
  independently verified positive count, the lower reader ceiling, the
  portable limit at or above the count, and non-sensitive static launcher
  metadata.
- The package delegates to existing production and shared verification layers;
  no image-reader or portable-core behavior is duplicated or changed.
- The only device record that a later validation may accept as the expected
  D15 observation is:

  ```json
  {
    "testCaseId": "D15_READER_SAFETY_CEILING_OVERFLOW",
    "status": "FAIL",
    "errorCode": "IMAGE_READ_FAILED",
    "uiResponsive": true
  }
  ```

- The package and guide state that this expected application failure must not
  be rewritten as `status: "PASS"` and does not uniquely identify an internal
  cause without the reviewed static ordering and fixture provenance.
- Accidental success or a non-target public failure remains distinguishable
  from the exact expected D15 observation.
- No URI, path, filename, source bytes, Base64, image content, exception detail,
  stack, credential, or private fixture mapping is retained.
- Repository checks, D15 bundle freshness, D15 legacy syntax scan, secret scan,
  sensitive-value scan, and `git diff --check` pass.

## Prohibited scope

Do not execute the phone case, create device evidence, or claim that D15 has
been observed on Android. Do not reuse D13 or D14 counts or device results,
relabel portable `IMAGE_TOO_LARGE`, or infer device completion from offline
tests.

Do not add production reader or portable-core behavior, source-copy
architecture, permission manager, persistable grant, broad storage permission,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work.

## Stop conditions

Stop and report when:

- an open pull request or branch already owns D15 preparation;
- no approved controlled source can be independently counted without retaining
  sensitive data;
- the required numeric ordering cannot be represented with positive safe
  integers;
- the wrapper cannot preserve success and non-target results without
  manufacturing the target code;
- the package would require production architecture or permission changes;
- tests fail outside the preparation scope;
- repository state conflicts;
- sensitive data may have appeared;
- write access is unavailable.
