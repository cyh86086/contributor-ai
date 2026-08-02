# D15 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Result

**The expected D15 application failure was observed** for the exact scoped
execution described below.

This is not a D15 PASS claim. The formal D15 result is the stable public
application failure `IMAGE_READ_FAILED`, retained with `status: "FAIL"` exactly
as reported.

## Evidence scope

- **Case:** `D15_READER_SAFETY_CEILING_OVERFLOW`
- **Authoritative repository SHA:**
  `9826a438b41582b594a692e9ff88214b2f75193b`
- **Repository state:** clean `main`, synchronized with `origin/main`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0 `arm64-v8a`
- **Fixture ID:** `OVER_READER_CEILING`
- **Independently verified size:** 6,406 bytes
- **Reader safety limit:** 6,405 bytes
- **Portable limit:** 6,406 bytes
- **Execution date:** 2026-08-02

## Sanitized output

```json
{
  "testCaseId": "D15_READER_SAFETY_CEILING_OVERFLOW",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "uiResponsive": true
}
```

The public `FAIL` status is the reviewed expected D15 result and was not
rewritten as PASS.

## What this proves

The reviewed generated D15 bundle executed on the recorded device and runtime.
The fresh Android system-picker selection passed through the existing
production reader, portable core, sanitized reporter, and off-UI-thread
responsiveness path. The independently counted 6,406-byte controlled JPEG was
above the 6,405-byte reader safety limit while remaining equal to the
6,406-byte portable limit. The scoped execution returned the stable public
result `IMAGE_READ_FAILED` with positive UI responsiveness and returned no
truncated success metadata.

The public result is shared by multiple non-permission read failures. It is not
unique internal branch telemetry. This observation is therefore valid only in
combination with the reviewed static limit ordering, independent pre-execution
measurement, controlled fixture provenance, clean authoritative SHA, and fresh
picker grant. It does not independently prove which internal read-failure
branch produced the public code.

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
non-sensitive JPEG fixture. It establishes only that the expected D15 public
result was observed under the reviewed configuration. It is not a PASS claim
and does not establish a unique internal cause, D13 equality, D14 portable
overflow, repeated-read behavior, other matrix cases, complete device
compatibility, provider behavior, queue behavior, Contributor app automation,
production workflow completion, or complete Android Image Input Adapter V1.0
migration.
