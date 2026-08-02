# D09 temporary-grant revocation feasibility blocker

## Status

D09 feasibility is complete with classification **BLOCKED_PLATFORM**. D09
launcher preparation remains blocked and must not be implemented.

The active D09 contract requires a real temporary Android picker grant to be
revoked before the existing production reader invokes `canAccess()`. The
scoped Vivo X Fold5 / AutoJs6 observation did not identify a platform-supported
mechanism that can invalidate the selected grant and prove completion before
that call.

No D09 launcher, PASS, `URI_ACCESS_DENIED`, or broader Android compatibility
claim is made by this record.

## Authoritative preflight scope

- Repository documentation baseline:
  `cd1e1e0fc49197a90dd9bae8d63091bd33c6d2b0`
- Case ID: `D09_PERMISSION_REVOKED_BEFORE_ACCESS`
- Required stable result: `URI_ACCESS_DENIED`
- Device: Vivo X Fold5
- Android version: 16
- Runtime: AutoJs6 v6.7.0, `arm64-v8a`
- Selection: Android system picker
- Persistable permission requested: no
- Broad storage permission added: no
- Scoped evidence:
  [`device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md`](device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md)

## What is already proven

Existing deterministic offline tests prove only that:

- inaccessible content sources are denied;
- `SecurityException` is sanitized;
- denied access maps to `URI_ACCESS_DENIED`;
- prohibited URI, path, byte, Base64, exception, stack, credential, and
  unrelated metadata are not emitted.

Those contracts do not prove that a real temporary Android picker grant was
revoked before `canAccess()`.

## Completed feasibility observation

The repository-external feasibility tool produced this sanitized
classification:

1. the temporary picker grant was initially readable;
2. the platform revocation call returned normally;
3. the following permission check was not denied;
4. a new read remained available after the call;
5. the UI remained responsive.

The tool was not a repository launcher or production implementation. Its result
does not satisfy the formal D09 expected result and cannot be converted into a
PASS claim.

## Governed outcome

- Close `D09-DEVICE-REVOCATION-FEASIBILITY` as `BLOCKED_PLATFORM`.
- Do not implement a D09 launcher or new permission architecture.
- Retain the existing injected offline tests only as contract coverage.
- Move the single active task to the formal D10 evidence-gap review.

The D10 review must first determine whether this platform limitation also
prevents revocation between `canAccess()` and `read()` for a real temporary
picker grant. A repository-external private-cache lifecycle exploration is not
formal D10 evidence and cannot replace that review.

Only a future reviewed repository decision with new platform evidence may
reopen D09 launcher feasibility.

## Prohibited substitutions

The feasibility check must not be replaced by:

- an injected fake resolver;
- deliberately throwing a synthetic `SecurityException`;
- selecting an unrelated inaccessible URI;
- clearing all app data or broadly removing storage access;
- adding persistable URI permissions;
- adding a general permission-management module;
- treating offline tests as Android evidence.

## Evidence discipline

The scoped evidence retains only its classification, sanitized boolean
observations, device/runtime scope, repository documentation baseline, and
known limitations. It contains no source value, source content, diagnostic
detail, or secret.
