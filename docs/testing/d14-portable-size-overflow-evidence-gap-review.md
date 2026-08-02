# D14 portable size-overflow evidence-gap review

## Review result

**The repository is ready for governed D14 device-procedure preparation.**

The existing production reader, portable core, shared harness, and reporter
have the required ordering for formal D14. With a reader safety limit above the
complete controlled source size, the reader consumes the source through EOF
and returns its complete in-memory byte array. The portable core then compares
that array's actual `byteLength` with `maxSizeBytes` and returns the stable
public result `IMAGE_TOO_LARGE` only when the byte length is greater.

Existing offline tests cover this composition sufficiently for preparation.
They are not Android or device evidence, and no D14 launcher, fixture mapping,
device result, or PASS claim existed or was created by this review.

## Authoritative scope

- **Review preflight live `main` SHA:**
  `00945d3b94235580ceaa69427e8d654a2b9ec385`
- **Formal case:** portable size overflow
- **Fixture ID:** `OVER_PORTABLE`
- **Required ordering:**
  `maxSizeBytes < independently verified source size < readerSafetyLimitBytes`
- **Expected stable public result:** `IMAGE_TOO_LARGE`
- **Evidence class still required:** scoped Android and AutoJs6 device evidence

The strict upper inequality is a preparation safeguard: the matrix permits a
source not above the reader ceiling, but choosing a strictly higher reader
ceiling keeps D14 visibly separate from the D15 reader-overflow boundary.

The Android Image Input Adapter V1.0 remains **NOT YET MIGRATED**.

## Production sequence

The reviewed implementation performs the D14 boundary in this order:

1. The shared device harness constructs the existing production Android reader
   with the configured `readerSafetyLimitBytes`, then invokes the existing
   portable core with the separately configured `maxSizeBytes`.
2. `canAccess()` opens and closes a probe stream. A false or failed probe maps
   to `URI_ACCESS_DENIED` and is not D14.
3. `read()` opens a new stream, reads chunks until EOF, tracks the accumulated
   count, and rejects with `IMAGE_READ_FAILED` only if the next chunk would make
   that count exceed `readerSafetyLimitBytes` or another read failure occurs.
4. When the complete controlled source remains below the reader ceiling, the
   reader combines every chunk into one array whose length is the accumulated
   count. It does not use URI metadata or a displayed rounded size.
5. `prepareImageInput()` normalizes the returned array, rejects empty content,
   and then compares its actual `byteLength` with `maxSizeBytes`. A greater
   value produces `IMAGE_TOO_LARGE` before MIME fallback or encoding.
6. The shared harness catches that allowlisted public code and freezes a record
   containing only the opaque case ID, `FAIL`, and `IMAGE_TOO_LARGE`.
7. The outer off-UI-thread launcher boundary adds only the reviewed
   responsiveness boolean and serializes the sanitized record.

The failure record intentionally does not expose `sizeBytes`. Device evidence
must therefore pair the reviewed static limits with an independent exact count
established before execution; the runtime error record alone cannot prove
fixture provenance.

## Existing offline evidence

| Repository evidence                                                                     | What it proves                                                                                                                                 | D14 limit                                                                                   |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `tests/image-input-core.test.js`: above-limit case                                      | Portable `prepareImageInput()` returns stable `IMAGE_TOO_LARGE` when a fake reader returns bytes whose length is greater than `maxSizeBytes`.  | Uses a fake reader and is not Android evidence.                                             |
| `tests/autojs6-android-image-reader.test.js`: reads through EOF and reconstructs chunks | The production reader consumes all successful chunks and returns an array with the accumulated complete length while under its safety ceiling. | Uses fake streams and does not invoke the device picker or reporter.                        |
| `tests/autojs6-android-image-reader.test.js`: reader-ceiling cases                      | Equality at the reader ceiling is accepted; exceeding it becomes `IMAGE_READ_FAILED`.                                                          | Proves the D14/D15 ordering contract offline, not a D14 device result.                      |
| `tests/autojs6-android-image-reader.test.js`: portable size ownership                   | A production-reader result within its higher ceiling reaches the portable core and becomes `IMAGE_TOO_LARGE` at the lower portable limit.      | Does not invoke the outer AutoJs6 launcher reporter.                                        |
| `tests/autojs6-d13-exact-portable-limit.test.js`: controlled overflow branch            | The production reader, portable core, and shared harness preserve `IMAGE_TOO_LARGE` for an over-limit fake stream.                             | Uses the D13 wrapper and case ID; it supports readiness but is not formal D14 evidence.     |
| `tests/autojs6-d02-d05-format-checks.test.js`: allowlisted failure and privacy cases    | The outer reporter preserves `IMAGE_TOO_LARGE`, attaches responsiveness, drops uncontrolled fields, and fails closed on malformed results.     | Uses injected results and does not prove the production reader or a real Android execution. |
| D13 scoped device evidence                                                              | The reviewed path accepts equality at the lower portable boundary on one scoped device execution.                                              | Equality is not overflow; the D13 result cannot be relabeled or reused for D14.             |

These tests already prove the required component boundaries and their
composition. A separate D14 test-only task is not required before preparation.
The preparation change must still test any new D14-only static configuration,
wrapper, entry, generated bundle, and failure-only acceptance guard that it
introduces.

## Fixture and count review

At this review baseline, `OVER_PORTABLE` appears only in the verification plan
and the governed task. No committed fixture manifest, independent numeric
count, D14 launcher, or D14 evidence record exists.

A preparation task can close that gap without storing sensitive data:

1. privately map `OVER_PORTABLE` to one user-approved, non-sensitive controlled
   supported image;
2. measure its complete exact count with a trusted read-only tool outside the
   launcher and production reader;
3. retain only the opaque fixture ID and positive numeric count;
4. choose a positive safe `maxSizeBytes` below that count;
5. choose a positive safe `readerSafetyLimitBytes` above that count; and
6. keep the private mapping, source name, source location, and content outside
   Git.

A rounded display size, URI metadata, filename, encoded length, provider
payload length, D13 count, or any earlier matrix result is not independent D14
fixture evidence. If an already controlled source is considered during
preparation, its count must be measured anew for the private `OVER_PORTABLE`
mapping, and D13's execution result must not be reused.

## Device-procedure feasibility

A safe and reproducible Vivo X Fold5 procedure is feasible with the existing
architecture:

1. start from a clean authoritative SHA and a separately reviewed D14-only
   execution package;
2. use the independently counted, privately mapped `OVER_PORTABLE` fixture;
3. statically enforce the reviewed numeric ordering in the evidence wrapper;
4. select the fixture through the Android system picker during that run and use
   only its fresh temporary grant;
5. execute the unchanged production reader, portable core, and sanitized
   reporter away from the UI thread;
6. accept only the stable `IMAGE_TOO_LARGE` failure record with demonstrated UI
   responsiveness; and
7. retain only the exact repository SHA, device/runtime scope, opaque fixture
   ID, numeric limits, independent count, sanitized result, responsiveness, and
   non-sensitive notes.

The public application result must remain `status: "FAIL"`; the evidence
procedure must not rewrite it to `PASS`. A review may later state only that the
expected D14 result was observed for the exact scoped execution.

No production change, source copy, persistable grant, broad storage permission,
permission manager, provider, network, queue, or Contributor app behavior is
required.

## D13, D14, and D15 boundary

- **D13:** complete source length equals `maxSizeBytes`; expected result is
  success with equal `sizeBytes`.
- **D14:** complete source length is greater than `maxSizeBytes` and remains
  below the separately higher reader safety ceiling; expected result is
  `IMAGE_TOO_LARGE` after the complete read.
- **D15:** source length exceeds `readerSafetyLimitBytes`; the reader stops with
  `IMAGE_READ_FAILED` and must not return truncated content.

Each case needs its own reviewed configuration and execution evidence. No
result from D13 or D15 may be copied, relabeled, or expanded into D14.

## Governed outcome

- Close `D14-EVIDENCE-GAP-REVIEW` as ready for device-procedure preparation.
- Do not create a separate D14 test-only task.
- Do not claim Android, AutoJs6, device, or D14 PASS from offline tests.
- Set the single active task to `D14-DEVICE-PROCEDURE-PREPARATION`.
- Do not execute the Vivo X Fold5 case until the D14-only package, independent
  fixture count, static numeric ordering, procedure, and clean authoritative
  SHA have been separately reviewed and merged.
