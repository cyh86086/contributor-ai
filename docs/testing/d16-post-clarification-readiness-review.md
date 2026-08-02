# D16 post-clarification readiness review

## Conclusion

**Offline contract coverage is incomplete; a separately governed test-only
coverage change is required.**

The approved D16 contract is explicit and unchanged, but the repository has no
D16-specific orchestration, aggregate reporter, or offline test. Existing
component tests prove single invocations of the production reader, portable
core, and shared reporter. They do not prove one integrated 10-iteration loop,
its counters, fail-fast behavior, failure precedence, or its one aggregate
record.

The only next task is `D16-TEST-COVERAGE-PREPARATION`. This review adds no test,
launcher, procedure, fixture, production behavior, generated bundle, Android
claim, device evidence, or PASS.

## Authoritative scope

- **Preflight live `main` SHA:**
  `258ca0c84a006de267b704d17c127e8fd2dde791`
- **Approved fixture ID:** `JPEG_REPEAT_VALID`
- **Approved iteration count:** exactly 10
- **Grant contract:** one fresh temporary picker grant and no reselection
- **Review class:** documentation/repository-only readiness review

The canonical approved contract remains in
[`autojs6-image-reader-device-verification-v1.md`](autojs6-image-reader-device-verification-v1.md).
This review does not amend its fixture, grant, iteration, equality,
responsiveness, failure, aggregate, or privacy rules.

## Repository path reviewed

One current complete image-read invocation follows this path:

1. `runImageReaderDeviceCheck()` creates the production Android reader.
2. `prepareImageInput()` calls `reader.canAccess()`.
3. The production reader opens and closes one probe stream.
4. `prepareImageInput()` then calls `reader.read()`.
5. The production reader obtains MIME, opens and closes a new read stream, and
   returns the complete byte array.
6. The portable core validates the byte count and MIME, then returns its
   internal success result or a stable public error.
7. The verification harness freezes and reports one single-invocation record.

The shared format launcher selects once but calls `prepareSelectedImage()` only
once. Its normalizer supports one success/failure record with no iteration
counters or D16 failure reasons. Repository search found the D16 case ID,
aggregate counter names, equality flag, and evidence-only failure reasons only
in documentation; no source, test, launcher, or generated bundle implements
them.

## Required-coverage assessment

| #   | Approved D16 requirement                                                   | Repository finding                                                                                                                                | Readiness |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Exactly 10 complete-path iterations                                        | Every existing harness/test execution invokes the complete path once.                                                                             | Missing   |
| 2   | Reuse the same injected source/grant context                               | D08 proves one fresh selection only; no test repeats one injected source context.                                                                 | Missing   |
| 3   | Every iteration executes `canAccess() → read() → portable core`            | The order is proved for one invocation, including two resolver opens, but not across 10 iterations.                                               | Partial   |
| 4   | Every successful iteration is `PASS`, JPEG, and the independent byte count | D08 proves one JPEG success and D13 proves one exact-count success; neither is a D16 10-iteration test.                                           | Partial   |
| 5   | Iterations 2–10 equal iteration 1 for MIME and count                       | No cross-iteration comparison exists.                                                                                                             | Missing   |
| 6   | A stable public error fails fast                                           | Public codes are preserved in single-invocation tests, but no loop stops and counts the failed iteration.                                         | Partial   |
| 7   | A metadata mismatch fails fast                                             | No D16 MIME/count mismatch loop exists.                                                                                                           | Missing   |
| 8   | After fail-fast, safely finish loop-level responsiveness assessment        | Existing responsiveness coverage wraps one task and has no D16 post-failure assessment order.                                                     | Missing   |
| 9   | Preserve an existing stable public `errorCode` unchanged                   | Single-record reporters preserve allowlisted codes, but no D16 aggregate `PUBLIC_ERROR` path is tested.                                           | Partial   |
| 10  | Three D16 failure reasons remain evidence-only                             | `PUBLIC_ERROR`, `METADATA_MISMATCH`, and `UI_NOT_RESPONSIVE` are documentation-only and absent from executable/test coverage.                     | Missing   |
| 11  | Emit exactly one frozen aggregate record                                   | Existing tests freeze one single-read record, not the approved D16 aggregate.                                                                     | Partial   |
| 12  | Emit no 10 per-iteration records                                           | No D16 reporter path exists to prove per-iteration reporting is suppressed.                                                                       | Missing   |
| 13  | Correct requested, attempted, and successful counters                      | No aggregate counters exist in source or tests.                                                                                                   | Missing   |
| 14  | Test success and all failure shapes/precedence                             | The formal contract defines them, but no executable D16 success, public-error, metadata-mismatch, UI-failure, or combined-precedence case exists. | Missing   |
| 15  | Leak no source or uncontrolled value                                       | Reader/core/single-record tests prove local sanitization; no D16 aggregate allowlist or hostile-value case exists.                                | Partial   |

`Partial` means a component or one-invocation contract is proved. It does not
mean the integrated D16 requirement is proved.

## Existing offline evidence and limits

| Repository evidence                       | What it proves                                                                                         | Why it does not close D16                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Production reader and portable-core tests | One call uses `canAccess()` before `read()`, preserves stable classifications, and sanitizes failures. | No bounded repeated orchestration, equality, aggregate, or loop-level UI result.        |
| D08 active-permission test                | One injected fresh source completes the production reader/core/reporter path with two stream opens.    | One read is not 10 reads and proves no temporary-grant lifetime beyond that invocation. |
| D13 exact-boundary test                   | One complete read can match one independently configured expected count.                               | Its fixture/boundary evidence cannot be relabeled as D16 iteration equality.            |
| D01/shared reporter tests                 | One allowlisted record is frozen, emitted once, and strips source and diagnostics.                     | The record has no D16 counters, equality flag, failure reason, or precedence.           |
| D15 reporter-path test                    | One stable public failure reaches the responsive single-record reporter unchanged.                     | It has no loop fail-fast, attempted/successful counters, or D16 aggregate.              |
| Repeated zero-length stream test          | One stream stops after a bounded count of zero-length low-level reads.                                 | It is an intra-stream safety loop, not repeated complete image reads.                   |

Offline fake/injected evidence cannot establish Android, AutoJs6, provider, or
real temporary-picker-grant lifetime behavior. A future device procedure still
needs its own governed preparation and scoped device execution after the
offline contract is proved.

## Exact test-only contract still required

A separately governed test-only coverage change must prove the following as
one D16 verification contract without modifying production behavior:

1. Use one injected synthetic source context for exactly 10 calls to the
   existing complete production reader/core path and prove 10 access probes and
   10 reads occur in order.
2. On the success path, require every result to be `PASS`, `image/jpeg`, and the
   independently configured positive count; compare iterations 2–10 with
   iteration 1; then assert the exact approved 10/10 aggregate.
3. Suppress per-iteration reporting and call the aggregate reporter exactly
   once with the identical frozen record returned to the caller.
4. At a controlled iteration, inject each stable public error class, assert
   immediate fail-fast, exact attempted/successful counters, unchanged
   `errorCode`, and `failureReason: "PUBLIC_ERROR"`.
5. Cover metadata fail-fast for wrong MIME, wrong independently configured
   count, and mismatch with iteration 1, using
   `failureReason: "METADATA_MISMATCH"` and no production `errorCode`.
6. Cover `uiResponsive: false` after a successful read loop, after public-error
   fail-fast, and after metadata fail-fast. Assert that the safe loop-level
   assessment still completes and `UI_NOT_RESPONSIVE` takes the approved
   precedence without a production `errorCode`.
7. Assert the exact success and failure field allowlists, counter bounds,
   boolean equality/responsiveness fields, one report only, and absence of all
   selected-source, per-iteration, diagnostic, and uncontrolled values.
8. Prove that `PUBLIC_ERROR`, `METADATA_MISMATCH`, and `UI_NOT_RESPONSIVE` stay
   local to the D16 evidence contract and do not enter the portable public-code
   or reader-classification sets.

If a reusable orchestration seam is required to make these tests meaningful,
it must be explicitly non-production and verification-only. It must not be a
device launcher, generated bundle, production reader/core/reporter change, or
permission implementation.

## Governed outcome

- Existing repository coverage does not fully prove the approved offline D16
  contract.
- Component tests must not be combined into a false integrated proof.
- Do not create a launcher, procedure, fixture, device result, or PASS in this
  review.
- Set the sole active task to `D16-TEST-COVERAGE-PREPARATION`.
- Do not advance to device-procedure preparation until the separate test-only
  change is implemented, verified, committed, and reviewed.
