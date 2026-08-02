# D13 exact portable size-limit evidence-gap review

## Review result

**The repository is ready for governed D13 device-procedure preparation.**

Existing offline tests prove the portable equality boundary, the production
reader's complete in-memory byte count, the portable overflow result, and the
shared reporter's sanitized success contract. No single offline test combines
all three layers with `sizeBytes === maxSizeBytes`, but the existing
production-reader-to-core exact-boundary test and the existing complete
success-reporting test cover that composition sufficiently for device-procedure
preparation. A separately governed D13 test task is not required.

The repository does not yet contain an independently verified numeric byte
count for `AT_PORTABLE_LIMIT`. That count is required before device execution,
but it can be established safely during procedure preparation. This review
does not create a launcher, fixture, test, device result, or PASS claim.

## Authoritative scope

- **Review preflight live `main` SHA:**
  `764f0e9b13d61bc2d706f214cc87d69569ea4695`
- **Formal case:** exact portable size limit
- **Fixture ID:** `AT_PORTABLE_LIMIT`
- **Required portable limit:** the fixture's independently verified numeric
  byte count
- **Required reader ceiling:** not lower than that numeric byte count
- **Expected result:** success with `sizeBytes === maxSizeBytes`
- **Evidence class still required:** scoped Android and AutoJs6 device evidence

The Android Image Input Adapter V1.0 remains **NOT YET MIGRATED**.

## Production sequence

The reviewed implementation has the required boundary semantics:

1. `runImageReaderDeviceCheck()` constructs the existing production Android
   image reader and passes the configured limits to the existing layers.
2. The production reader opens and consumes the source stream, accumulates the
   count from every successful read, rejects only when the accumulated count
   would exceed `readerSafetyLimitBytes`, and returns an array whose length is
   that accumulated count. It does not obtain the count from URI metadata.
3. `prepareImageInput()` uses the returned array's `byteLength`. Empty content
   is rejected first; `IMAGE_TOO_LARGE` occurs only when `byteLength` is greater
   than `maxSizeBytes`.
4. Equality therefore remains a success path. The portable result reports
   `sizeBytes` from the same `byteLength` used by the comparison.
5. The shared harness freezes a success record containing only the opaque case
   ID, status, normalized MIME, and `sizeBytes`, then supplies that same record
   to the metadata reporter.

The device procedure must keep `readerSafetyLimitBytes` at or above the
independently verified count so a D15 reader-ceiling failure cannot occur
before the D13 portable boundary is evaluated.

## Existing offline evidence

| Repository evidence                                                                                | What it proves                                                                                                                               | D13 limit                                                                          |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `tests/image-input-core.test.js`: exact size-limit case                                            | Portable `prepareImageInput()` accepts a supported byte array whose length equals `maxSizeBytes` and reports the same `sizeBytes`.           | Uses a fake reader and is not Android evidence.                                    |
| `tests/image-input-core.test.js`: above-limit case                                                 | A byte length greater than `maxSizeBytes` produces stable `IMAGE_TOO_LARGE`.                                                                 | Uses a fake reader and does not exercise the production stream reader.             |
| `tests/autojs6-android-image-reader.test.js`: partial-read reconstruction and exact reader ceiling | The production reader consumes complete stream chunks, reconstructs their exact length, and accepts equality at its separate safety ceiling. | Reader-ceiling equality is D15-adjacent, not the D13 portable limit.               |
| `tests/autojs6-android-image-reader.test.js`: reader result integrates with `prepareImageInput()`  | The production reader and portable core succeed together when `maxSizeBytes` equals the production reader's returned array length.           | It does not invoke the shared reporter.                                            |
| `tests/autojs6-android-image-reader.test.js`: portable size ownership                              | With a higher reader ceiling, a production-reader result above the portable limit becomes `IMAGE_TOO_LARGE`.                                 | It is the D14-side negative boundary, not device evidence.                         |
| `tests/autojs6-d08-permission-granted.test.js`: normal shared-harness path                         | Production reader, portable core, and shared reporter produce one sanitized success record from a two-open fake resolver sequence.           | Its configured portable limit is above the fake fixture length, not exactly equal. |
| `tests/autojs6-d06-resolver-mime.test.js`: exact configured boundary                               | A production-reader-based D06 harness emits sanitized success at its configured equality boundary.                                           | D06 intentionally bypasses `prepareImageInput()` and is not formal D13.            |

The repository therefore has no single exact-boundary offline test that passes
through the production reader, portable core, and shared reporter together.
Adding one would repeat already integrated reader/core equality plus already
integrated reporter success behavior; it is not a prerequisite for preparing
the real D13 evidence procedure.

## Fixture and count review

`AT_PORTABLE_LIMIT` appears only in the verification plan's fixture table, the
D13 matrix row, and the current governance task. No committed fixture manifest
or device-evidence record assigns it a verified numeric byte count.

Other evidence cannot fill that gap:

- Repository fake-array lengths establish only offline contracts.
- D06 and D07 contain independently confirmed counts for different opaque
  fixture IDs and cases.
- D08 records a production-reader count from the same execution but explicitly
  lacks an independent exact count.
- D01-D08 results are scoped to their own cases and cannot be relabeled or
  expanded into D13.

Procedure preparation must therefore require a non-sensitive controlled image
whose exact count is measured independently before D13 execution. A trusted
local or device-side byte-count tool outside the launcher and production reader
may perform that measurement. The private fixture manifest must remain outside
Git; repository evidence may retain only `AT_PORTABLE_LIMIT` and the verified
positive numeric count. Displayed rounded size, URI metadata, a filename,
encoded length, compressed payload length, or provider payload length is not an
acceptable substitute.

## Device-procedure feasibility

A safe and reproducible Vivo X Fold5 procedure can be prepared with the
existing architecture:

1. use a clean authoritative repository SHA and reviewed D13-only execution
   package;
2. prepare one non-sensitive controlled supported image and independently
   confirm its exact numeric count before execution;
3. keep the private mapping between the controlled image and opaque fixture ID
   outside the repository;
4. select that fixture through the Android system picker in the same run and
   use only its fresh temporary grant;
5. configure `maxSizeBytes` to the independently verified count and
   `readerSafetyLimitBytes` to the same count or a higher reviewed value;
6. execute the existing shared production-reader, portable-core, and reporter
   path away from the UI thread;
7. require a success record whose `sizeBytes` equals `maxSizeBytes` and require
   demonstrated UI responsiveness;
8. retain only the exact repository SHA, device/runtime scope, opaque fixture
   ID, numeric limits, sanitized metadata record, responsiveness, and result.

No persistable grant, broad storage permission, source copy, permission
manager, provider, network, queue, or Contributor app behavior is required.
Device execution will require the user to prepare or approve the controlled
fixture, confirm the independent numeric count, select it in the system picker,
and return only sanitized evidence.

## D13, D14, and D15 boundary

- **D13:** complete source length equals `maxSizeBytes`; reader ceiling is not
  lower; the expected result is success with equal `sizeBytes`.
- **D14:** complete source length is greater than `maxSizeBytes` while remaining
  within the reader ceiling; the expected result is `IMAGE_TOO_LARGE`.
- **D15:** source length exceeds a deliberately lower
  `readerSafetyLimitBytes`; the reader stops with `IMAGE_READ_FAILED` and must
  not return truncated success.

The cases require separate configuration and evidence. A result from one must
not be reused for another.

## Governed outcome

- Close `D13-EVIDENCE-GAP-REVIEW` as ready for device-procedure preparation.
- Do not create an additional D13 offline test task.
- Do not claim D13 PASS or Android evidence from existing tests.
- Set the single active task to `D13-DEVICE-PROCEDURE-PREPARATION`.
- Do not execute the Vivo X Fold5 case until a separately reviewed procedure,
  exact independent fixture count, and clean authoritative SHA exist.
