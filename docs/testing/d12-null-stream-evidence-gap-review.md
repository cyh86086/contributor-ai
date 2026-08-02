# D12 controlled null-stream evidence-gap review

## Review result

**Coverage is incomplete; a separately governed test-only change is required.**

The repository proves the component contracts around null streams, ordinary
read failures, permission denial, public error mapping, and sanitized reporting.
It does not contain one test that establishes the exact formal D12 sequence
through the production Android image reader, portable error boundary, and
stable public reporter.

This review does not create a new status classification. It makes no Android,
provider, device, or D12 PASS claim and introduces no test or launcher.

## Authoritative scope

- **Preflight live `main` SHA:**
  `3866ade46397d769ccf27db837f43964d8d1e12d`
- **Formal case:** a controlled fake resolver returns `null`
- **Expected stable public result:** `IMAGE_READ_FAILED`
- **Evidence class:** fake-only offline contract

No device execution is required or permitted for formal D12.

## Required null-stream stage

The verification-matrix row does not state a call number. Its expected result
and the existing production sequence nevertheless allow only one
contract-consistent stage:

1. `prepareImageInput()` first calls the production reader's `canAccess()`.
2. `canAccess()` opens a probe stream. If that open returns `null`, it returns
   `false`.
3. The portable core maps `false` to `URI_ACCESS_DENIED` and never calls
   `read()`. A probe-stage null therefore does not satisfy D12.
4. After a non-null probe succeeds and closes, `read()` opens a second stream.
5. A controlled `null` from this second open is classified by the production
   reader as `IMAGE_READ_FAILED`.
6. The portable core preserves that non-permission read classification as
   `IMAGE_READ_FAILED`, and the shared reporter may emit only its stable failure
   record.

Formal D12 must therefore configure the fake resolver to return a valid,
closable probe stream on the first open and `null` on the read-stage second
open. This ordering records what is required to obtain the matrix's stated
result; it does not rewrite the matrix or claim real platform behavior.

## Existing coverage

| Repository evidence                                                                     | What it proves                                                                                                                                                          | D12 gap that remains                                                                 |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `tests/autojs6-android-image-reader.test.js`: reader-only null-stream case              | Calling production `reader.read()` with a fake null stream produces the internal `IMAGE_READ_FAILED` classification.                                                    | It does not run `canAccess()`, portable mapping, or the reporter.                    |
| `tests/autojs6-android-image-reader.test.js`: integrated ordinary read failure          | A fake probe succeeds, a later ordinary stream read fails, and `prepareImageInput()` produces public `IMAGE_READ_FAILED`.                                               | The second open does not return `null`, and the reporter is not exercised.           |
| `tests/autojs6-d08-permission-granted.test.js`: inaccessible source                     | A first-open null travels through the production reader, portable core, and reporter and becomes `URI_ACCESS_DENIED` without source leakage.                            | This is the negative control for the wrong D12 stage, not D12 success.               |
| `tests/autojs6-d07-mime-fallback.test.js`: ordinary read failure                        | A successful probe followed by an injected non-permission read failure travels through a production-reader wrapper, portable core, and reporter as `IMAGE_READ_FAILED`. | It injects a thrown failure rather than a second-open null and is scoped to D07.     |
| `tests/image-input-core.test.js`                                                        | Fake reader failures map to stable public codes, and diagnostic text or causes do not cross the portable boundary.                                                      | It does not use the production resolver or establish stream-open order.              |
| `tests/autojs6-d01-one-click.test.js` and reporter assertions in existing harness tests | Public records are allowlisted, metadata-only, emitted once, and do not retain uncontrolled fields.                                                                     | They do not couple those guarantees to a D12 second-open null.                       |
| Injected `FileNotFoundException` and permission-failure tests                           | Missing-source-like non-permission failures and access failures have distinct reader classifications.                                                                   | They are not real D11 deletion evidence and do not substitute for D12's null return. |

The components are individually covered, but evidence assembled from separate
tests is not an exact execution proof for the formal D12 sequence.

## Required test-only coverage

A separately governed test-only change must invoke the existing shared
`runImageReaderDeviceCheck()` path and demonstrate all of the following in one
case:

1. the fake resolver's first open returns a closable probe stream;
2. `canAccess()` succeeds and closes that stream;
3. the resolver's second open returns `null` during production `read()`;
4. exactly two stream opens occur;
5. the production reader classifies the null as a non-permission read failure;
6. the portable core returns stable public `IMAGE_READ_FAILED`;
7. the reporter receives exactly the same frozen, metadata-only failure record;
8. the record contains no source identifier, runtime diagnostic, cause, or
   uncontrolled field.

The change may add or modify tests only. It must not change the matrix,
production reader, portable core, reporter, generated launcher bundles, Android
permissions, or application architecture.

## Scope boundaries

- **D12:** deterministic fake resolver behavior at the read-stage second open;
  offline contract only.
- **D11:** real selected-source deletion and provider lifecycle; D12 cannot
  resolve D11's classification blocker.
- **Android/provider behavior:** not exercised or inferred by D12.
- **Permission denial:** a first-open null or classified permission failure maps
  to `URI_ACCESS_DENIED`, not formal D12.
- **Private-cache exploration:** concerns a different source lifecycle and is
  not D12 evidence.

## Governed outcome

- Close `D12-EVIDENCE-GAP-REVIEW` with the exact coverage gap recorded above.
- Do not claim that existing tests fully prove D12.
- Do not create a D12 launcher or perform a device test.
- Set the single active task to `D12-TEST-COVERAGE-PREPARATION`.
- Do not advance to D13 until the separately governed D12 test-only change is
  implemented, verified, committed, and reviewed.
