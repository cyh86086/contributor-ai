# D20 Memory Behavior — Vivo X Fold5 Device Validation

## Execution metadata

- **Date:** 2026-08-04
- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** `8e90c6e`
- **Fixture ID:** `JPEG_REPEAT_VALID`
- **Independently verified size:** 6,406 bytes
- **Grant:** One fresh temporary system-picker selection, no reselection
- **Execution time:** ~23.783 seconds

## Sanitized aggregate result

```json
{
  "testCaseId": "D20_MEMORY_BEHAVIOR",
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "memoryBefore": 128186888,
  "memoryAfterEach": [
    133618280,
    124001544,
    129252616,
    134503688,
    139754760,
    120573520,
    125840976,
    131092048,
    136343120,
    141594192
  ],
  "memoryAfterStabilization": 141659728,
  "peakMemory": 141659728,
  "memoryGrowth": 13472840,
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "allMetadataEqual": true,
  "uiResponsive": true
}
```

## Interpretation

- `status: "PASS"` — all 10 complete production-path reads succeeded.
- `requestedIterations: 10, attemptedIterations: 10, successfulIterations: 10` — all iterations completed without fail-fast.
- `allMetadataEqual: true` — every iteration returned identical MIME and size.
- `mimeType: "image/jpeg"` — MIME matches the expected fixture MIME.
- `sizeBytes: 6406` — exact byte count matches the independently verified fixture size.
- `memoryBefore: 128,186,888` — initial heap usage ~122 MB.
- `memoryAfterEach` — heap usage fluctuated between ~115 MB and ~135 MB during iterations, consistent with GC activity.
- `memoryAfterStabilization: 141,659,728` — heap usage ~135 MB after 500ms stabilization.
- `peakMemory: 141,659,728` — peak heap usage ~135 MB.
- `memoryGrowth: 13,472,840` — net growth ~12.8 MB, within reasonable bounds for 10 complete read cycles.
- `uiResponsive: true` — the UI remained responsive throughout execution.

## Scope

This is a scoped device observation for the exact recorded device, runtime, SHA, fixture, byte count, memory metrics, and UI-responsiveness result. It does not establish native memory behavior, GC profiling, provider behavior, queue behavior, Contributor app automation, or module migration.

## No sensitive data retained

Only the sanitized aggregate JSON above is retained as evidence. No `content://` URIs, bytes, Base64, or image content are preserved.
