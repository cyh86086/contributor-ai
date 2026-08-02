# D09 Vivo X Fold5 / AutoJs6 revocation feasibility

## Classification

**BLOCKED_PLATFORM** for the exact scoped feasibility observation recorded
below.

This is not a D09 PASS, does not establish `URI_ACCESS_DENIED`, and does not
authorize a D09 launcher. The feasibility tool was external to this repository
and is not a repository launcher or production implementation.

## Evidence scope

- **Task:** `D09_DEVICE_REVOCATION_FEASIBILITY`
- **Repository documentation baseline:**
  `cd1e1e0fc49197a90dd9bae8d63091bd33c6d2b0`
- **Device:** Vivo X Fold5
- **Android version:** 16
- **Runtime:** AutoJs6 v6.7.0, `arm64-v8a`
- **Selection:** Android system picker
- **Persistable permission requested:** no
- **Broad storage permission added:** no
- **UI remained responsive:** yes

The repository SHA identifies the authoritative state used to review and record
this result. The external feasibility tool is not derived from or committed at
that SHA.

## Sanitized result

```json
{
  "taskId": "D09_DEVICE_REVOCATION_FEASIBILITY",
  "classification": "BLOCKED_PLATFORM",
  "grantInitiallyReadable": true,
  "revokeReturned": true,
  "postRevokePermissionDenied": false,
  "postRevokeReadDenied": false,
  "uiResponsive": true
}
```

## Interpretation

The temporary picker grant was initially readable. The
`revokeUriPermission()` call returned normally, but the following permission
check was not denied and a new read remained available. The observation
therefore did not identify a platform-supported mechanism that can reproducibly
invalidate the selected temporary grant and prove completion before the
existing production reader invokes `canAccess()`.

The required D09 precondition cannot be established on this scoped device and
runtime. D09 is therefore closed as `BLOCKED_PLATFORM`; no D09 launcher may be
implemented from this result.

## Claim and privacy boundaries

- No D09 PASS, FAIL, stable public error, or broader Android compatibility claim
  is made.
- Existing injected offline tests remain contract tests only and are not this
  device evidence.
- Only the sanitized fields above and the stated device/runtime scope were
  retained. No source value, source content, diagnostic detail, or secret was
  recorded.
- This one observation does not prove behavior on another device, Android
  version, AutoJs6 version, or selection flow.

## D10 boundary

The formal verification-matrix D10 case remains permission revocation between
`canAccess()` and `read()`. Its evidence-gap review must first determine whether
this same platform limitation prevents a real temporary picker grant from
satisfying that timing requirement.

A repository-external private-cache lifecycle exploration is not formal D10
evidence, is not a D10 PASS, and cannot replace the verification-matrix case.
