# D18 Stream cleanup after success — evidence-gap review

## Purpose

D18 proves that the production reader closes the stream exactly once after a
successful read. The existing `closeQuietly()` is called in the `finally` block
of `read()`, but no device evidence demonstrates that the close actually
occurred. D18 instruments the stream wrapper to count close invocations and
outputs the count in the sanitized aggregate.

## Contract

- **Case ID:** `D18_STREAM_CLEANUP_SUCCESS`
- **Fixture:** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by
  D13-D17)
- **Picker MIME:** `image/jpeg`
- **Expected MIME:** `image/jpeg`
- **Expected size:** 6,406 bytes
- **maxSizeBytes:** 6,406
- **readerSafetyLimitBytes:** 12,582,912
- **Grant:** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `stream-cleanup-success`

### Success shape

```json
{
  "testCaseId": "D18_STREAM_CLEANUP_SUCCESS",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "closeCount": 2,
  "uiResponsive": true
}
```

The `closeCount: 2` reflects one close from `canAccess()` probe and one close
from `read()`. Both are required cleanup invocations.

### Failure shapes

- **Close count mismatch:** `status: "FAIL"`, `errorCode: "CLEANUP_FAILED"`,
  `closeCount` recorded
- **Public error:** standard fail-fast with `closeCount` recorded
- **Metadata mismatch:** standard mismatch shape with `closeCount` recorded

## Approach

The D18 wrapper wraps the production reader's `read()` result and instruments
the stream's `close()` method before the read begins. After the read completes,
the wrapper reports the close count alongside the standard sanitized metadata.

The instrumentation must:

1. Not modify the production reader source
2. Not alter the read behavior or byte count
3. Count exactly the close invocations on the stream used by `read()`
4. Report the count in the sanitized output

### Instrumentation strategy

The wrapper creates a stream proxy that:

- Delegates all methods to the real stream
- Increments a counter on each `close()` call
- Passes the proxied stream to the reader via a controlled dependency injection

However, the current reader opens the stream internally via `openSourceStream()`.
To instrument without modifying the reader, the wrapper must either:

- (a) Inject a proxied resolver that returns instrumented streams, or
- (b) Wrap the reader's returned result and verify close happened externally

Option (a) is cleaner: the wrapper provides a resolver wrapper that instruments
`openInputStream()` to return a proxied stream with close counting.

## Acceptance criteria

1. Exactly one `close()` invocation is recorded after a successful read
2. The close count is included in the sanitized output
3. The read behavior is unchanged (same bytes, same MIME)
4. No modification to the production reader source
5. The instrumentation does not leak stream references or bytes
6. Fail-fast behavior is preserved for all error codes
7. The close count is recorded even on failure paths

## Scope limits

- D18 proves cleanup after **success** only
- D19 separately governs cleanup after **failure**
- D18 does not prove memory behavior (D20), UI blocking (D21), or persistence
  guarantees (D22-D23)
- This is preparation and offline evidence only until device execution

## Files to create

1. `scripts/autojs6/stream-cleanup-success-device-check.js` — D18 wrapper
2. `scripts/autojs6/source/d18-stream-cleanup-success-device-check.entry.js`
3. `tests/support/d18-offline-stream-cleanup-harness.js`
4. `tests/autojs6-d18-stream-cleanup-success.test.js`
5. `docs/user-guides/autojs6-d18-stream-cleanup-success-check-zh-tw.md`
6. `docs/testing/d18-stream-cleanup-success-evidence-gap-review.md` (this file)
