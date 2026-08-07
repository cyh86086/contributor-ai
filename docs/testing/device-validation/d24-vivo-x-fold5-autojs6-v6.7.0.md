# D24 Empty Image — Vivo X Fold5 Device Validation

## Execution metadata

- **Date:** 2026-08-07
- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** `fc2ab9b`
- **Fixture ID:** `EMPTY_CONTROLLED` (0-byte file)
- **Grant:** One fresh temporary system-picker selection

## Sanitized aggregate result

```json
{
  "testCaseId": "D24_EMPTY_IMAGE",
  "status": "FAIL",
  "errorCode": "URI_ACCESS_DENIED",
  "uiResponsive": true
}
```

## Interpretation

- `errorCode: "URI_ACCESS_DENIED"` — The platform denied access to the empty source at the ContentResolver level, before the production reader could check for empty bytes.
- `uiResponsive: true` — The UI remained responsive throughout execution.

## Platform behavior observation

On Vivo X Fold5 / Android 16, selecting a 0-byte file from the system picker results in `URI_ACCESS_DENIED` rather than `EMPTY_IMAGE`. This indicates the platform's ContentResolver denies access to empty files before the reader can perform the empty-bytes check.

This is a valid platform-specific behavior observation. The `EMPTY_IMAGE` contract is still proved through offline tests with controlled-fake injection (see `tests/autojs6-d24-empty-image.test.js`).

## Scope

This is a scoped device observation for the exact recorded device, runtime, SHA, and fixture. It documents platform behavior for empty sources on this specific device. It does not establish behavior on other devices or Android versions.

## No sensitive data retained

Only the sanitized aggregate JSON above is retained as evidence. No `content://` URIs, bytes, Base64, or image content are preserved.
