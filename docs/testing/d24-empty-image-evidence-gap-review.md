# D24 Empty Image — Evidence Gap Review

## Scope

D24 verifies that when the production reader encounters a zero-byte or controlled empty source, the portable core returns the stable public error code `EMPTY_IMAGE` with a frozen, sanitized failure record.

## Existing coverage

The portable core (`src/core/image-input.js`) checks `bytes.byteLength === 0` after reading and throws `IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE`. The production reader maps this to a FAIL record with `errorCode: "EMPTY_IMAGE"`.

Offline tests in `tests/core.test.js` and `tests/image-input-core.test.js` cover the empty-bytes path through the portable core.

## Gap

No single test combines:

1. A controlled empty source (0 bytes or injected empty read)
2. The production reader's stream handling
3. The portable core's empty check
4. The sanitized reporter path
5. A frozen FAIL record with `EMPTY_IMAGE`

## Feasibility

**Device validation feasibility:** The Android system picker may not allow selecting a 0-byte file. If the picker rejects empty files, D24 becomes a controlled-fake offline contract only (similar to D12).

**Controlled-fake approach:** Inject an empty read result into the production reader path, verifying the full sequence produces `EMPTY_IMAGE` with a frozen sanitized record.

## Proposed contract

D24 is a scoped device observation IF the Android picker permits selecting a 0-byte file. Otherwise, D24 is a controlled-fake offline contract proving the exact sequence:

1. Production reader opens the source
2. Read returns 0 bytes
3. Portable core throws `EMPTY_IMAGE`
4. Reporter produces one frozen FAIL record with `errorCode: "EMPTY_IMAGE"` and `uiResponsive: true`

## Next steps

1. Create D24 wrapper with controlled empty source injection
2. Create offline tests proving the contract
3. Attempt device validation on Vivo X Fold5
4. If picker rejects empty file, retain as controlled-fake offline contract only
