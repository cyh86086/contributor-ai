# D15 reader safety-ceiling overflow evidence-gap review

## Review result

**The repository is ready for governed D15 device-procedure preparation.**

The formal matrix contract is clear: `OVER_READER_CEILING` must have an
independently verified complete size greater than a deliberately lower recorded
`readerSafetyLimitBytes`. The production reader must return the stable public
result `IMAGE_READ_FAILED` and must not return truncated success.

The production ordering and existing offline coverage are sufficient to prepare
a separately reviewed D15 package. They are not Android or device evidence. No
D15 launcher, fixture mapping, device result, or PASS claim was created by this
review.

## Authoritative scope

- **Review preflight live `main` SHA:**
  `f828aab1780aa815d5f33bb3fcf7d562e16f1912`
- **Formal case:** reader safety-ceiling overflow
- **Fixture ID:** `OVER_READER_CEILING`
- **Required ordering:**
  `readerSafetyLimitBytes < independently verified source size <= maxSizeBytes`
- **Expected stable public result:** `IMAGE_READ_FAILED`; no truncated success
- **Evidence class still required:** scoped Android and AutoJs6 device evidence

Keeping `maxSizeBytes` at or above the independently verified source size is a
D15 preparation safeguard. It prevents a portable `IMAGE_TOO_LARGE` condition
from being mistaken for the deliberately earlier reader-ceiling failure.

The Android Image Input Adapter V1.0 remains **NOT YET MIGRATED**.

## Production sequence

The reviewed implementation performs the D15 boundary in this order:

1. The portable core calls the production reader's `canAccess()` first. The
   reader opens and closes a probe stream. A failed probe becomes
   `URI_ACCESS_DENIED` and is not D15.
2. `read()` resolves the same in-memory source reference, obtains MIME metadata
   where available, opens a new stream, and allocates one bounded read buffer.
3. `readCompleteStream()` maintains local `chunks` and `sizeBytes` values. Each
   successful positive stream read produces a candidate `count`.
4. Before converting that read buffer, appending a chunk, or increasing
   `sizeBytes`, the reader checks whether
   `sizeBytes + count > readerSafetyLimitBytes`.
5. If the next chunk would cross the ceiling, the reader immediately throws a
   classified `IMAGE_READ_FAILED`. The crossing chunk is not copied, the local
   count is not advanced, and `combineChunks()` is never called.
6. The `read()` `finally` block closes the stream. A cleanup failure is logged
   only through the fixed logger message and cannot replace the primary result.
7. The portable core maps the non-permission classified reader failure to the
   stable public `IMAGE_READ_FAILED` before byte normalization, portable size
   validation, MIME fallback, or encoding can run.
8. The shared harness freezes a failure record containing only the opaque case
   ID, `FAIL`, and the stable error code. The outer off-UI-thread boundary adds
   only the reviewed responsiveness boolean and serializes that sanitized
   record.

No partial array escapes the reader on ceiling overflow. Earlier accepted
chunks remain local to the failed invocation and are never combined or returned
to the portable core.

## Error-code specificity

`IMAGE_READ_FAILED` is intentionally a stable public category shared by reader
ceiling overflow, ordinary I/O failure, a read-stage null stream, and other
non-permission read failures. A future device record therefore cannot claim
that the public code uniquely identifies the internal ceiling branch.

The governed D15 procedure can still test the formal black-box contract by
combining all of these controlled facts:

- an independently counted supported source whose complete size is greater
  than the static reader ceiling;
- a portable limit at or above that complete size;
- an unchanged reviewed launcher and clean authoritative SHA;
- a fresh system-picker selection and active temporary grant;
- the exact sanitized `IMAGE_READ_FAILED` result with responsive UI; and
- no success metadata or other public code.

The future D15 wrapper must preserve accidental success and non-target public
failures honestly. It must not convert success, malformed output, permission
denial, or an uncontrolled result into the target `IMAGE_READ_FAILED`, because
that would manufacture an expected observation.

If the exact controlled facts cannot be established, the execution must not be
accepted as D15 evidence. Even when they are established, the record may state
only that the expected D15 result was observed for the exact scope; it must not
call that application failure PASS or claim unique internal-cause telemetry.

## Existing offline evidence

| Repository evidence                                                                | What it proves                                                                                                                                    | D15 limit                                                                                    |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `tests/autojs6-android-image-reader.test.js`: exact reader-ceiling case            | Equality at `readerSafetyLimitBytes` returns the complete byte array.                                                                             | Establishes the adjacent boundary offline, not Android evidence.                             |
| `tests/autojs6-android-image-reader.test.js`: above reader-ceiling case            | A chunk that would cross the ceiling returns classified `IMAGE_READ_FAILED`, closes the stream, and returns no value.                             | Uses fake streams and does not execute the Android picker or outer reporter.                 |
| `tests/autojs6-android-image-reader.test.js`: partial reads and EOF reconstruction | Successful chunks are accumulated exactly and combined only after EOF.                                                                            | Does not by itself test the overflow branch.                                                 |
| `tests/autojs6-android-image-reader.test.js`: cleanup after read failure           | The stream closes after a read failure, and cleanup failure cannot replace the primary failure.                                                   | The failure is injected offline rather than caused by a real ceiling crossing.               |
| `tests/autojs6-android-image-reader.test.js`: integrated ordinary read failure     | A production-reader non-permission failure maps through the portable core to stable `IMAGE_READ_FAILED`.                                          | Uses an ordinary injected failure, showing mapping but not D15 cause provenance.             |
| `tests/autojs6-d14-portable-size-overflow.test.js`: reader-ceiling failure branch  | The production reader, portable core, and shared harness preserve `IMAGE_READ_FAILED` when the fake source exceeds the configured reader ceiling. | Uses the D14 wrapper and case ID; it supports composition readiness but is not D15 evidence. |
| `tests/autojs6-d02-d05-format-checks.test.js`: failure normalization and privacy   | The outer reporter emits only a fixed public code and responsiveness; malformed or uncontrolled data is sanitized.                                | Uses injected results and does not identify a real reader-ceiling branch.                    |
| D14 scoped device evidence                                                         | A separately higher reader ceiling allowed the source to reach the portable overflow boundary.                                                    | D14 configuration and result cannot be reused or relabeled as D15.                           |

The repository already proves the required component boundaries and their
composition. A separate D15 test-only task is not required before preparation.
The preparation change must still test any new D15-only wrapper, static numeric
ordering, entry, generated bundle, success preservation, target-result guard,
freshness, and AutoJs6 legacy syntax compatibility.

## Fixture and procedure feasibility

A safe Vivo X Fold5 procedure is feasible without storing source data:

1. privately map `OVER_READER_CEILING` to one user-approved, non-sensitive
   supported controlled image;
2. measure its complete exact count anew with a trusted read-only tool outside
   the launcher and production reader;
3. retain only the opaque fixture ID and positive numeric count;
4. choose a positive safe `readerSafetyLimitBytes` strictly below that count;
5. choose a positive safe `maxSizeBytes` at or above the count;
6. statically validate that ordering in the evidence-only package;
7. use the existing Android system picker and a fresh temporary grant;
8. execute the unchanged production reader and sanitized reporter off the UI
   thread; and
9. accept only the exact reviewed public failure shape when every controlled
   precondition remains true.

A rounded display size, URI metadata, filename, encoded length, provider
payload length, D13 count, D14 count, or an earlier matrix execution is not
independent D15 fixture evidence. If an already controlled source is considered
during preparation, it must be measured anew for the private
`OVER_READER_CEILING` mapping, and no earlier result may be reused.

No production change, source copy, persistable grant, broad storage permission,
permission manager, provider, network, queue, or Contributor app behavior is
required.

## Boundary distinctions

- **D14 portable overflow:** the complete source stays below a higher reader
  ceiling, reaches the portable core, and returns `IMAGE_TOO_LARGE`.
- **D15 reader-ceiling overflow:** the source crosses a deliberately lower
  reader ceiling inside the production read loop and returns
  `IMAGE_READ_FAILED` without a byte array.
- **Ordinary read failure:** shares the public D15 code but lacks the controlled
  independently counted ceiling ordering.
- **Permission denial:** the access probe or read maps to
  `URI_ACCESS_DENIED`, not D15.
- **D11 missing source:** has unresolved real-provider classification and is not
  a controlled size ceiling.
- **D12 null stream:** is an explicit fake-only read-stage contract and does not
  prove Android D15 behavior.
- **Private-cache lifecycle observation:** concerns a separate copied-source
  lifecycle and is not matrix D15 evidence.

## Governed outcome

- Close `D15-EVIDENCE-GAP-REVIEW` as ready for device-procedure preparation.
- Do not create a separate D15 test-only task.
- Do not claim Android, AutoJs6, device, or D15 PASS from offline tests.
- Set the single active task to `D15-DEVICE-PROCEDURE-PREPARATION`.
- Do not execute the Vivo X Fold5 case until the D15-only package, independent
  count, static numeric ordering, procedure, and clean authoritative SHA have
  been separately reviewed and merged.
