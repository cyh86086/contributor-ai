# D26 Controlled encoding failure — Vivo X Fold5 Device Validation

## Execution metadata

- **Date:** 2026-08-07
- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** `718f39c`
- **Fixture ID:** `ENCODING_FAILURE_CONTROLLED`
- **Grant:** None (controlled-fake test)

## Sanitized aggregate result

```json
{
  "testCaseId": "D26_CONTROLLED_ENCODING_FAILURE",
  "status": "FAIL",
  "errorCode": "URI_ACCESS_DENIED",
  "uiResponsive": true
}
```

## Interpretation

- `errorCode: "URI_ACCESS_DENIED"` — The platform denied access to the source URI before the production reader could process it. The D26 wrapper's `prepareSelectedImage` callback calls `runImageReaderDeviceCheck`, which requires a real image URI. Without a real image selection, the platform returns `URI_ACCESS_DENIED`.
- `uiResponsive: true` — The UI remained responsive throughout execution.

## Platform behavior observation

D26 requires "injecting a failing encoder after a valid read". The current implementation calls `runImageReaderDeviceCheck` directly, which fails at the URI access stage because no real image was selected. To properly validate D26 on device, the test would need to:

1. First perform a valid read (user selects a real image)
2. Then inject an encoding failure

This makes D26 more complex than other controlled-fake tests. For now, D26 is documented as a controlled-fake offline contract.

## Controlled-fake offline contract

The `ENCODING_FAILED` contract is proved through offline tests with controlled-fake injection (see `tests/autojs6-d26-controlled-encoding-failure.test.js`). The offline harness simulates the encoding failure directly without requiring device interaction.

## Scope

This is a scoped device observation for the exact recorded device, runtime, SHA, and fixture. It documents the limitation of the current D26 implementation on this specific device. The `ENCODING_FAILED` contract remains proved through offline tests.

## No sensitive data retained

Only the sanitized aggregate JSON above is retained as evidence. No `content://` URIs, bytes, Base64, or image content are preserved.
