# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D14-DEVICE-PROCEDURE-PREPARATION`

**Objective:** Prepare, but do not execute, a minimal reviewed D14 package that
can demonstrate formal portable size overflow on Vivo X Fold5 while retaining
only sanitized evidence.

Formal D14 uses fixture ID `OVER_PORTABLE`. Its independently verified complete
size must be greater than `maxSizeBytes` and lower than a separately higher
`readerSafetyLimitBytes`. The expected stable public result is
`IMAGE_TOO_LARGE`.

## Required work

1. Complete mandatory preflight from live `main` and confirm no open PR,
   branch, launcher, private mapping, or device evidence already owns D14.
2. Privately map `OVER_PORTABLE` to one user-approved, non-sensitive controlled
   supported image and independently measure its complete exact count with a
   trusted read-only tool outside the launcher and production reader. Retain
   only the opaque fixture ID and numeric count.
3. Choose and statically validate positive safe integers satisfying
   `maxSizeBytes < verified source size < readerSafetyLimitBytes`.
4. Add the smallest D14-only evidence wrapper, immutable manifest entry, source
   entry, generated AutoJs6 v6.7.0 bundle, and deterministic build wiring needed
   to delegate to the existing system picker, production reader, portable core,
   shared reporter, and off-UI-thread path.
5. Fail closed unless the underlying sanitized result is exactly
   `IMAGE_TOO_LARGE`. A smaller or wrong fixture, reader-ceiling failure,
   permission failure, picker cancellation, malformed result, or accidental
   success must not become the accepted D14 result.
6. Add offline tests for D14 static numeric ordering, production-path
   delegation, failure-only normalization, output sanitization, deterministic
   bundle freshness, and AutoJs6 legacy syntax compatibility. These tests are
   not Android or device evidence.
7. Add a Traditional Chinese Vivo X Fold5 execution guide that requires a
   fresh Android system-picker selection and preserves the private fixture
   mapping outside Git.
8. Update project state and set the sole next task to D14 device validation only
   after the unexecuted package passes review.

## Acceptance criteria

- The retained configuration contains only `OVER_PORTABLE`, its independently
  verified positive count, the lower `maxSizeBytes`, the higher
  `readerSafetyLimitBytes`, and non-sensitive static launcher metadata.
- The package delegates to existing production and shared verification layers;
  no image-reader or portable-core behavior is duplicated or changed.
- The only device record that a later validation may accept is:

  ```json
  {
    "testCaseId": "D14_PORTABLE_SIZE_OVERFLOW",
    "status": "FAIL",
    "errorCode": "IMAGE_TOO_LARGE",
    "uiResponsive": true
  }
  ```

- The package and guide explicitly state that this expected application failure
  must not be rewritten as `status: "PASS"` and is not D13 or D15 evidence.
- No URI, path, filename, source bytes, Base64, image content, exception detail,
  stack, credential, or private fixture mapping is retained.
- Repository checks, D14 bundle freshness, D14 legacy syntax scan, secret scan,
  sensitive-value scan, and `git diff --check` pass.

## Prohibited scope

Do not execute the phone case, create device evidence, or claim that D14 has
been observed on Android. Do not reuse the D13 device result, relabel D15
reader-ceiling behavior, or infer device completion from offline tests.

Do not add production reader or portable-core behavior, source-copy
architecture, permission manager, persistable grant, broad storage permission,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work.

## Stop conditions

Stop and report when:

- an open pull request or branch already owns D14 preparation;
- repository state conflicts;
- no approved controlled source can be independently counted without retaining
  sensitive data;
- the required numeric ordering cannot be represented with positive safe
  integers;
- the package would require production architecture or permission changes;
- tests fail outside the preparation scope;
- sensitive data may have appeared;
- write access is unavailable.
