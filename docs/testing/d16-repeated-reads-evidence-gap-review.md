# D16 repeated-reads evidence-gap review

## Conclusion

**Blocked pending explicit contract clarification.**

The formal D16 row requires the same non-sensitive granted URI to be read
repeatedly in a recorded loop and expects the same success metadata from every
iteration. The repository does not define the required iteration count, bind
the case to a controlled fixture, define the exact equality fields, select the
grant lifetime, or define a multi-iteration evidence shape compatible with the
current single-record reporter.

Those values are acceptance criteria, not implementation details. This review
does not invent them, does not assign a new classification name, and does not
authorize a launcher, offline PASS, Android claim, or device execution.

## Review scope

- **Review baseline:** clean authoritative `main` SHA
  `98c0cb78ec021e63fa475a19acc7ddfb13a434e3`
- **Formal case:** D16 repeated reads
- **Formal procedure:** repeatedly read one non-sensitive granted URI in a
  recorded loop
- **Formal expected result:** every iteration returns the same success metadata
- **Change scope:** documentation-only evidence-gap review

## Formal contract gaps

### Iteration count

The matrix says "repeatedly in a recorded loop" but supplies neither an exact
count nor a minimum. No other repository document defines a D16 loop count.
Choosing a number in a launcher or test would therefore create an unreviewed
acceptance rule.

### Controlled fixture

The required fixture table has no D16-specific fixture, and the D16 row does
not bind itself to `JPEG_VALID` or another listed supported source. Reusing a
source that previously established D01 or a size-boundary case would not turn
that earlier evidence into D16 evidence. A future contract must identify an
opaque fixture ID, format, independent count requirement, and provenance for
the repeated-read case.

### Grant lifetime

The common preconditions allow the approved picker flow to grant either
temporary or persistable access and require the chosen grant type to be
recorded. The D16 row says only "granted URI." It does not say whether one fresh
temporary selection must remain active for the complete loop or whether a
persistable grant is part of the case. No persistable request, broad storage
permission, or permission manager is authorized by this review.

### Equality fields and failure rule

The general sanitized success record permits case ID, status, normalized MIME,
byte count, and UI responsiveness. The D16 row does not state which of those
fields constitute "the same success metadata," whether responsiveness is
measured once for the complete loop or once per iteration, or whether a single
failed or unequal iteration stops immediately and determines the public result.

### Evidence and reporter shape

The shared launcher path currently selects once, executes one task, normalizes
one result, reports one frozen allowlisted record, and returns that record. The
formal plan permits metadata-only console output but defines no repeated-record
or aggregate D16 shape. A future contract must decide how the recorded count
and per-iteration equality are proved without adding uncontrolled fields or
retaining source data.

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

- Close the evidence-gap review as blocked pending contract clarification.
- Assign no new PASS or classification name.
- Do not create a D16 launcher, test-only implementation, or device procedure.
- Require an explicit repository-authoritative decision for loop count,
  fixture, grant type, equality fields, failure handling, and sanitized evidence
  shape before further D16 work.
- After clarification, perform a new mandatory preflight and decide whether a
  separately governed test-only coverage task is required before device
  procedure preparation.
