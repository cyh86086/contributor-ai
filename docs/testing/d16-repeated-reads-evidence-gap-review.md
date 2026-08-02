# D16 repeated-reads evidence-gap review

## Conclusion

**Aggregate semantics clarification complete; test-only coverage preparation
is required.**

The formal D16 row requires the same non-sensitive granted URI to be read
repeatedly in a recorded loop and expects the same success metadata from every
iteration. The original review found that the repository did not define the
required iteration count, controlled fixture, equality fields, grant lifetime,
or aggregate evidence shape. The user explicitly approved the complete
contract on 2026-08-02, and the formal verification plan now records it.

The governed readiness review subsequently found that repository offline
coverage does not prove the integrated D16 contract and that the aggregate
counter, equality, and precedence rules still needed formalization. The user
approved that addendum on 2026-08-02, and the formal verification plan now
records it. This documentation-only clarification assigns no new classification
name and authorizes no launcher, test-only PASS, Android claim, or device
execution. A separately governed test-only coverage change is required before
device-procedure preparation.

## Review scope

- **Review baseline:** clean authoritative `main` SHA
  `98c0cb78ec021e63fa475a19acc7ddfb13a434e3`
- **Formal case:** D16 repeated reads
- **Formal procedure:** repeatedly read one non-sensitive granted URI in a
  recorded loop
- **Formal expected result:** every iteration returns the same success metadata
- **Change scope:** documentation-only evidence-gap review

## Approved clarification

The approved contract is canonical in
[`autojs6-image-reader-device-verification-v1.md`](autojs6-image-reader-device-verification-v1.md).
Its binding terms are:

- exactly 10 complete reads using the same one system-picker selection and the
  full `canAccess() → read() → portable core → verification reporter path`;
- dedicated opaque fixture ID `JPEG_REPEAT_VALID`, a non-sensitive synthetic
  JPEG whose positive byte count must be independently re-measured with a
  read-only tool outside the launcher and production reader before a future
  procedure;
- one fresh temporary Android system-picker grant for the entire loop, with no
  reselection, persistable grant, broad storage permission, or permission
  manager;
- every successful iteration reports `PASS`, `image/jpeg`, and the independently
  verified count; iterations 2–10 must equal iteration 1 for MIME and byte
  count;
- one loop-level responsiveness assessment, which must complete after any
  fail-fast condition and must be true for success;
- immediate fail-fast on inaccessible source, read/public failure, non-PASS
  status, wrong MIME, wrong independently verified count, or MIME/count
  inequality;
- exactly one frozen sanitized aggregate record, not 10 per-iteration reports;
- evidence-only failure reasons `PUBLIC_ERROR`, `METADATA_MISMATCH`, and
  `UI_NOT_RESPONSIVE`; these are not new production errors or project
  classifications, and an existing stable public error is preserved unchanged
  only for `PUBLIC_ERROR`;
- attempted iterations count the iteration as soon as its complete path begins,
  successful iterations require all approved success and equality conditions,
  and fail-fast-skipped iterations count as neither;
- metadata equality is true only for 10 successful equal-metadata reads, except
  that it remains true when those reads are followed by a loop-level UI
  failure; an earlier public error or metadata mismatch makes it false;
- loop-level UI failure has priority over an earlier public error or metadata
  mismatch and omits `errorCode`; otherwise a responsive public error preserves
  its stable code, while a responsive metadata mismatch omits `errorCode`.

No selected identifier, source location, source name, source bytes, Base64,
image content, exception detail, stack, credential, or uncontrolled runtime
value may enter evidence.

## Closed contract gaps (historical review finding)

### Iteration count

At the review baseline, the matrix supplied neither an exact count nor a
minimum. The approved contract now fixes the count at 10 complete reads.

### Controlled fixture

At the review baseline, the required fixture table had no D16-specific fixture.
The approved contract now binds D16 to opaque `JPEG_REPEAT_VALID`, a
non-sensitive synthetic JPEG with an independently re-measured positive count.
Evidence from D01 or a size-boundary case still cannot be relabeled as D16.

### Grant lifetime

At the review baseline, the common preconditions did not choose the D16 grant
lifetime. The approved contract now requires one fresh temporary picker grant
for all 10 iterations and forbids reselection, persistable access, broad
storage permission, and a permission manager.

### Equality fields and failure rule

The approved contract now defines `mimeType` and `sizeBytes` as the equality
fields, uses one loop-level responsiveness result, fixes the fail-fast and
failure-reason rules, and records exact counter timing, equality values, and
failure precedence. The fixed test case ID is not an equality field.

### Evidence and reporter shape

The approved contract now requires one frozen sanitized aggregate with exact
requested, attempted, and successful counts, equality and responsiveness
booleans, and allowlisted success or failure fields. It forbids 10
per-iteration reports and all source or uncontrolled runtime values.

## Production execution order

For one `prepareImageInput()` invocation, the current production path is:

1. validate the source and limits;
2. call `reader.canAccess()`;
3. parse the source, open a probe stream, and close it in `finally`;
4. call `reader.read()` only after the access probe succeeds;
5. obtain MIME, open a new read stream, read the complete source, and close the
   stream in `finally`;
6. validate the returned byte-array length, MIME, and portable size;
7. return the internal result to the verification harness, which emits only
   sanitized success metadata.

The reader stores no selected source, stream, or prior result between calls.
Repeating the complete production path would therefore create one probe stream
and one read stream per iteration, with each stream independently closed. That
static composition supports feasibility analysis, but it does not prove grant
stability, repeated provider behavior, or metadata equality on Android.

## Existing offline evidence

| Repository evidence                        | What it proves                                                                                                                                                    | D16 limit                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Production-reader access and cleanup tests | A successful access probe closes its stream; successful and failed reads close their read streams.                                                                | Each test invokes one reader operation; no same-grant loop is executed.                    |
| Production-reader/core integration success | One production reader result passes through `prepareImageInput()` with the expected MIME and count.                                                               | One invocation only.                                                                       |
| D08 permission-granted integration test    | One fresh selection follows `canAccess()` then `read()`, opens two streams, and produces one sanitized success record.                                            | It proves the single-read active-grant path, not repeated access to the same grant.        |
| D13 exact-boundary integration test        | One complete production path preserves an exact successful count.                                                                                                 | The D13 boundary and evidence cannot be relabeled as D16 equality across iterations.       |
| Shared launcher and reporter tests         | One execution produces one frozen allowlisted success or failure record, strips source and diagnostic fields, and fails closed when responsiveness is not proved. | They do not define multiple records, an aggregate iteration count, or equality comparison. |
| Repeated zero-length read test             | The reader stops after a bounded number of zero-length reads within one stream.                                                                                   | This is an intra-stream safety case, not repeated D16 image reads.                         |

No existing test runs the same granted source through the complete production
reader, portable core, and reporter more than once. No fake or injected test can
establish real Android temporary-grant lifetime or provider repeatability.

## Case boundaries

- D16 is repeated complete reads of one selected source; it is not D13 exact
  size equality, D14 portable overflow, or D15 reader-ceiling overflow.
- D17 uses multiple independently selected image sources and formats; it cannot
  replace same-source repetition.
- D18 and D19 instrument exact cleanup behavior; ordinary successful cleanup
  inside D16 does not close those cases.
- D20 and D21 separately govern memory behavior and UI blocking during repeated
  work; D16 must not claim those rows without their own evidence.
- A private-cache lifecycle observation, fake resolver, or injected stream is
  not D16 Android evidence.

## Disposition

- Close the aggregate-semantics contract blocker using the explicit user
  approval dated 2026-08-02.
- Assign no new PASS or classification name.
- Do not create a D16 launcher, test-only implementation, or device procedure.
- The completed readiness review requires a separately governed test-only
  coverage change. Set `D16-TEST-COVERAGE-PREPARATION` as the only next task.
- Do not add that test coverage in this documentation-only clarification.
