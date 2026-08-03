# D16 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Result

**D16 PASS** for the exact scoped execution described below.

## Evidence scope

- **Case:** `D16_REPEATED_READS`
- **Authoritative repository SHA:**
  `9caf03c3532c2d051f4e8cd85a4c019cb35ce9e5`
- **Repository state:** clean `main`, synchronized with `origin/main`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0 `arm64-v8a`
- **Fixture ID:** `JPEG_REPEAT_VALID`
- **Independently verified size:** 6,406 bytes
- **Reader safety limit:** 12,582,912 bytes
- **Portable limit:** 6,406 bytes
- **Requested iterations:** 10
- **Grant:** one fresh temporary system-picker selection, no reselection
- **Execution date:** 2026-08-03

## Sanitized output

```json
{
  "testCaseId": "D16_REPEATED_READS",
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "allMetadataEqual": true,
  "uiResponsive": true
}
```

The aggregate exactly matches the approved PASS shape defined in
`docs/NEXT_ACTION.md`.

## What this proves

The reviewed generated D16 bundle executed on the recorded device and runtime.
One fresh Android system-picker selection provided a single temporary grant for
the entire loop. The script performed exactly 10 complete
`canAccess() → read() → portable core` iterations without reselection. Every
iteration returned `image/jpeg` with the independently verified 6,406-byte
count. Cross-iteration MIME and count equality held across all 10 reads. The
loop-level responsiveness assessment confirmed positive UI responsiveness. The
script emitted exactly one frozen sanitized aggregate record with no
per-iteration records.

This scoped execution proves that the same fresh temporary picker grant
supported 10 complete production reader and portable core iterations on the
recorded Vivo X Fold5, Android 16, and AutoJs6 v6.7.0 `arm64-v8a` against the
recorded authoritative SHA.

## Privacy review

Only the case ID, PASS status, iteration counters, MIME type, independently
verified byte count, metadata equality, UI responsiveness, opaque fixture ID,
reviewed numeric limits, device/runtime scope, and authoritative SHA were
retained. No URI, query string, source location, source name, image bytes,
Base64, image content, exception detail, stack trace, credential, screenshot,
or unrelated runtime metadata was recorded. The private fixture mapping remains
outside Git.

## Scope limits

This is one scoped execution on one Vivo X Fold5, one Android version, one
AutoJs6 build, one authoritative repository SHA, and one privately mapped
non-sensitive JPEG fixture. It establishes only that the approved D16 repeated
read contract was satisfied under the reviewed configuration. It does not
establish D17 multi-image, D18/D19 cleanup instrumentation, D20 memory,
D21 UI-blocking, provider behavior, queue behavior, Contributor app automation,
complete production workflow, or complete Android Image Input Adapter V1.0
migration.
