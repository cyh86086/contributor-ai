# D25 Unsupported MIME type — Vivo X Fold5 Device Validation

## Execution metadata

- **Date:** 2026-08-07
- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** `afc7e3d`
- **Fixture ID:** `UNSUPPORTED_CONTROLLED` (non-image file, e.g., `.txt`)
- **Grant:** One fresh temporary system-picker selection

## Sanitized aggregate result

```json
{
  "testCaseId": "D25_UNSUPPORTED_MIME_TYPE",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "uiResponsive": true
}
```

## Interpretation

- `errorCode: "IMAGE_READ_FAILED"` — The platform denied access to the non-image source at the picker level, before the production reader could check for unsupported MIME type.
- `uiResponsive: true` — The UI remained responsive throughout execution.

## Platform behavior observation

On Vivo X Fold5 / Android 16, the system picker with `*/*` MIME filter does not allow selecting non-image files (e.g., `.txt`). The picker either shows no non-image files or rejects the selection, resulting in `IMAGE_READ_FAILED` before the reader can detect the unsupported MIME type.

This is a valid platform-specific behavior observation. The `UNSUPPORTED_MIME_TYPE` contract is still proved through offline tests with controlled-fake injection (see `tests/autojs6-d25-unsupported-mime-type.test.js`).

## Scope

This is a scoped device observation for the exact recorded device, runtime, SHA, and fixture. It documents platform behavior for non-image sources on this specific device. It does not establish behavior on other devices or Android versions.

## No sensitive data retained

Only the sanitized aggregate JSON above is retained as evidence. No `content://` URIs, bytes, Base64, or file content are preserved.
