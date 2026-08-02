# D13 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Result

**PASS** for the exact scoped D13 execution described below.

## Evidence scope

- **Case:** `D13_EXACT_PORTABLE_LIMIT`
- **Authoritative repository SHA:**
  `a3de20a96ad326df921efa80dd264a4774e905a3`
- **Repository state:** clean `main`, synchronized with `origin/main`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0 `arm64-v8a`
- **Fixture ID:** `AT_PORTABLE_LIMIT`
- **Independently verified size:** 6,406 bytes
- **Portable limit:** 6,406 bytes
- **Reader safety limit:** 12,582,912 bytes
- **Execution date:** 2026-08-02

## Sanitized output

```json
{
  "testCaseId": "D13_EXACT_PORTABLE_LIMIT",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true
}
```

The production reader's returned `sizeBytes` exactly matched both the
independently verified fixture size and the configured portable limit.

## What this proves

The reviewed generated D13 bundle executed successfully on the recorded device
and runtime. The fresh Android system-picker selection passed through the
existing production reader, portable core, and sanitized reporter. A complete
6,406-byte JPEG remained accepted when its byte length was exactly equal to
`maxSizeBytes`, while the separately higher reader safety limit did not
preempt the portable boundary. The off-UI-thread execution also returned the
reviewed positive responsiveness result.

## Privacy review

Only the case ID, PASS status, normalized MIME, byte count, and UI
responsiveness from the result were retained. No URI, query string, source
location, source name, image bytes, Base64, image content, exception detail,
stack trace, credential, or unrelated runtime metadata was recorded. The
private fixture mapping remains outside Git.

## Scope limits

This is one scoped execution on one Vivo X Fold5, one Android version, one
AutoJs6 build, one authoritative repository SHA, and one privately mapped
non-sensitive JPEG fixture. It establishes only the D13 equality case. It does
not establish D14 portable overflow, D15 reader-ceiling overflow, other matrix
cases, complete device compatibility, provider behavior, queue behavior,
Contributor app automation, production workflow completion, or complete
Android Image Input Adapter V1.0 migration.
