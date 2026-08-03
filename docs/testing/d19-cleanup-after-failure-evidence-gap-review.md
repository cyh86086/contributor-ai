# D19 Cleanup after failure — evidence-gap review

## Purpose

D19 proves that the production reader closes the stream exactly once after a
failed read. D18 proved cleanup after success (`closeCount: 2` from
`canAccess()` probe + `read()`). D19 injects a controlled mid-read failure and
verifies that the read-stage stream is still properly closed in the `finally`
block.

## Contract

- **Case ID:** `D19_CLEANUP_AFTER_FAILURE`
- **Fixture:** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by
  D13-D18)
- **Picker MIME:** `image/jpeg`
- **Expected MIME:** `image/jpeg`
- **Expected size:** 6,406 bytes
- **maxSizeBytes:** 6,406
- **readerSafetyLimitBytes:** 12,582,912
- **Grant:** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `cleanup-after-failure`

### Success shape

The D19 wrapper calls `reader.read()` directly (without a separate
`canAccess()` probe). The instrumented resolver counts `close()` invocations.
When the read fails mid-stream, the reader's `finally` block closes the
read-stage stream exactly once.

```json
{
  "testCaseId": "D19_CLEANUP_AFTER_FAILURE",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "closeCount": 1,
  "uiResponsive": true
}
```

The `closeCount: 1` reflects exactly one close from the `read()` finally
block. No `canAccess()` probe stream is opened, so only the read-stage stream
is counted.

### Failure shapes

- **Close count mismatch:** `closeCount !== 1`, `errorCode: "CLEANUP_FAILED"`
- **UI not responsive:** `uiResponsive: false`
- **Public error:** standard fail-fast with `closeCount` recorded

## Approach

The D19 wrapper wraps the production reader's resolver with an instrumented
resolver that:

1. Counts `close()` invocations on all streams
2. Injects a failure during `read()` after some bytes have been successfully
   read (mid-read failure)

The failure injection uses a controlled byte threshold. The stream's `read()`
succeeds for the first N bytes, then throws on the next call. This simulates
a real mid-read failure (e.g., I/O error, provider timeout).

### Instrumentation strategy

The wrapper creates a stream proxy that:

- Delegates `read()` to the real stream
- Tracks cumulative bytes read
- Throws after the threshold is exceeded
- Counts `close()` invocations

The threshold is set to half the fixture size (3,203 bytes for the 6,406-byte
fixture), ensuring at least one successful `read()` call before the failure.

### Wrapper design

The D19 wrapper calls `reader.read()` directly without a `canAccess()` probe.
This ensures:

- Only one stream is opened (the read-stage stream)
- The close count reflects exactly the read-stage cleanup
- The result is `IMAGE_READ_FAILED` with `closeCount: 1`

This is intentionally different from D18, which calls both `canAccess()` and
`read()` to prove cleanup after success (`closeCount: 2`).

## Acceptance criteria

1. The read fails with `IMAGE_READ_FAILED` after a controlled mid-read failure
2. Exactly one `close()` invocation is recorded (the read-stage stream)
3. The close count is included in the sanitized output
4. No modification to the production reader source
5. The instrumentation does not leak stream references or bytes
6. The partial bytes read before the failure are not included in the output
7. The wrapper preserves the reader's `finally` cleanup behavior

## Scope limits

- D19 proves cleanup after **read failure** only
- D18 separately governs cleanup after **success**
- D19 does not prove memory behavior (D20), UI blocking (D21), or persistence
  guarantees (D22-D23)
- This is preparation and offline evidence only until device execution

## Files to create

1. `scripts/autojs6/cleanup-after-failure-device-check.js` — D19 wrapper
2. `scripts/autojs6/source/d19-cleanup-after-failure-device-check.entry.js`
3. `tests/support/d19-offline-cleanup-after-failure-harness.js`
4. `tests/autojs6-d19-cleanup-after-failure.test.js`
5. `docs/user-guides/autojs6-d19-cleanup-after-failure-check-zh-tw.md`
6. `docs/testing/d19-cleanup-after-failure-evidence-gap-review.md` (this file)
