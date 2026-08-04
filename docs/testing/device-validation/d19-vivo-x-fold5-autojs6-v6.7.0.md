# D19 Cleanup After Failure — Vivo X Fold5 Device Validation

## Execution metadata

- **Date:** 2026-08-04
- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** `ad0e0d4`
- **Fixture ID:** `JPEG_REPEAT_VALID`
- **Independently verified size:** 6,406 bytes
- **Grant:** One fresh temporary system-picker selection, no reselection
- **Execution time:** ~22.102 seconds

## Sanitized aggregate result

```json
{
  "testCaseId": "D19_CLEANUP_AFTER_FAILURE",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "closeCount": 1,
  "uiResponsive": true
}
```

## Interpretation

- `status: "FAIL"` — the controlled mid-read failure was injected as designed.
- `errorCode: "IMAGE_READ_FAILED"` — the failure propagated correctly through the production reader.
- `closeCount: 1` — confirms that the read-stage stream was properly closed in the `finally` block after the mid-read failure. Only the `read()` stream was opened (no `canAccess()` probe), so exactly one `close()` invocation occurred.
- `uiResponsive: true` — the UI remained responsive throughout execution.

## Scope

This is a scoped device observation for the exact recorded device, runtime, SHA, fixture, byte count, close count, and UI-responsiveness result. It does not establish memory behavior, provider behavior, queue behavior, Contributor app automation, or module migration.

## No sensitive data retained

Only the sanitized aggregate JSON above is retained as evidence. No `content://` URIs, bytes, Base64, or image content are preserved.
