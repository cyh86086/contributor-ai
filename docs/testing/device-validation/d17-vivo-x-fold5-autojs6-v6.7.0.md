# D17 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Result

**D17 PASS** for the exact scoped execution described below.

## Evidence scope

- **Case:** `D17_MULTI_IMAGE_SEQUENTIAL`
- **Authoritative repository SHA:**
  `1ef3dc4`
- **Repository state:** clean `main`, synchronized with `origin/main`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0 `arm64-v8a`
- **Fixture ID:** `JPEG_REPEAT_VALID`
- **Independently verified size:** 6,406 bytes
- **Reader safety limit:** 12,582,912 bytes
- **Portable limit:** 6,406 bytes
- **Requested images:** 3
- **Grant:** one fresh temporary system-picker multi-selection, no reselection
- **Execution date:** 2026-08-03
- **Execution duration:** ~16.054 seconds

## Sanitized output

```json
{
  "testCaseId": "D17_MULTI_IMAGE_SEQUENTIAL",
  "requestedImages": 3,
  "attemptedImages": 3,
  "successfulImages": 3,
  "status": "PASS",
  "images": [
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" }
  ],
  "uiResponsive": true
}
```

The aggregate exactly matches the approved PASS shape defined in the D17
evidence-gap review and procedure document.

## What this proves

The reviewed generated D17 bundle executed on the recorded device and runtime.
One fresh Android system-picker multi-selection (with `EXTRA_ALLOW_MULTIPLE`)
provided a single temporary grant for all three URIs. The script processed
exactly 3 complete `canAccess() → read() → portable core` sequences sequentially
under the same grant without reselection. Every image returned `image/jpeg` with
the independently verified 6,406-byte count. The script emitted exactly one
frozen sanitized aggregate record with per-image records and no extraneous
output.

This scoped execution proves that the same fresh temporary picker grant
supported 3 sequential production reader and portable core reads on the recorded
Vivo X Fold5, Android 16, and AutoJs6 v6.7.0 `arm64-v8a` against the recorded
authoritative SHA.

## Privacy review

Only the case ID, PASS status, image counters, MIME type, independently verified
byte count, UI responsiveness, opaque fixture ID, reviewed numeric limits,
device/runtime scope, and authoritative SHA were retained. No URI, query string,
source location, source name, image bytes, Base64, image content, exception
detail, stack trace, credential, screenshot, or unrelated runtime metadata was
recorded. The private fixture mapping remains outside Git.

## Scope limits

This is one scoped execution on one Vivo X Fold5, one Android version, one
AutoJs6 build, one authoritative repository SHA, and one privately mapped
non-sensitive JPEG fixture. It establishes only that the approved D17
multi-image sequential read contract was satisfied under the reviewed
configuration. It does not establish D18/D19 cleanup instrumentation, D20
memory, D21 UI-blocking, provider behavior, queue behavior, Contributor app
automation, complete production workflow, or complete Android Image Input
Adapter V1.0 migration.
