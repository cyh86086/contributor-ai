# D14 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Result

**The expected D14 application failure was observed** for the exact scoped
execution described below.

This is not a D14 PASS claim. The formal D14 result is the stable public
application failure `IMAGE_TOO_LARGE`, retained with `status: "FAIL"` exactly
as reported.

## Evidence scope

- **Case:** `D14_PORTABLE_SIZE_OVERFLOW`
- **Authoritative repository SHA:**
  `e648b57e8b756017b5716f3e8e145ff95de14683`
- **Repository state:** clean `main`, synchronized with `origin/main`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0 `arm64-v8a`
- **Fixture ID:** `OVER_PORTABLE`
- **Independently verified size:** 6,406 bytes
- **Portable limit:** 6,405 bytes
- **Reader safety limit:** 12,582,912 bytes
- **Execution date:** 2026-08-02

## Sanitized output

```json
{
  "testCaseId": "D14_PORTABLE_SIZE_OVERFLOW",
  "status": "FAIL",
  "errorCode": "IMAGE_TOO_LARGE",
  "uiResponsive": true
}
```

The public `FAIL` status is the reviewed expected D14 result and was not
rewritten as PASS.

## What this proves

The reviewed generated D14 bundle executed on the recorded device and runtime.
The fresh Android system-picker selection passed through the existing
production reader, portable core, sanitized reporter, and off-UI-thread
responsiveness path. The independently counted 6,406-byte controlled JPEG was
below the 12,582,912-byte reader ceiling but above the 6,405-byte portable
limit. The scoped execution returned the stable public result
`IMAGE_TOO_LARGE` with positive UI responsiveness.

The failure record intentionally contains no runtime `sizeBytes`. The exact
source count and numeric ordering therefore come from the separately reviewed
static configuration and independent pre-execution measurement, not from an
uncontrolled Android metadata value.

## Privacy review

Only the case ID, FAIL status, stable error code, UI responsiveness, opaque
fixture ID, reviewed numeric limits, independent count, device/runtime scope,
and authoritative SHA were retained. No URI, query string, source location,
source name, image bytes, Base64, image content, exception detail, stack trace,
credential, screenshot, or unrelated runtime metadata was recorded. The
private fixture mapping remains outside Git.

## Scope limits

This is one scoped execution on one Vivo X Fold5, one Android version, one
AutoJs6 build, one authoritative repository SHA, and one privately mapped
non-sensitive JPEG fixture. It establishes only that the expected D14 portable
overflow result was observed for this exact scope. It is not a PASS claim and
does not establish D13 equality, D15 reader-ceiling overflow, other matrix
cases, complete device compatibility, provider behavior, queue behavior,
Contributor app automation, production workflow completion, or complete
Android Image Input Adapter V1.0 migration.
