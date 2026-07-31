# D09 temporary-grant revocation feasibility blocker

## Status

D09 launcher preparation is blocked before implementation.

The active D09 contract requires a real temporary Android picker grant to be
revoked before the existing production reader invokes `canAccess()`. The
repository currently contains no reviewed Android or AutoJs6 mechanism that can
perform and prove that ordering without introducing new production permission
architecture.

No D09 launcher, PASS, FAIL, or Android compatibility claim is made by this
record.

## Authoritative preflight scope

- Live `main` SHA at review:
  `f244474cb1f2e4c1ce3ae0816c004bfe4fded04e`
- Case ID: `D09_PERMISSION_REVOKED_BEFORE_ACCESS`
- Required stable result: `URI_ACCESS_DENIED`
- Production runtime: Android through AutoJs6
- Target device for later evidence: Vivo X Fold5

## What is already proven

Existing deterministic offline tests prove only that:

- inaccessible content sources are denied;
- `SecurityException` is sanitized;
- denied access maps to `URI_ACCESS_DENIED`;
- prohibited URI, path, byte, Base64, exception, stack, credential, and
  unrelated metadata are not emitted.

Those contracts do not prove that a real temporary Android picker grant was
revoked before `canAccess()`.

## Missing prerequisite

Before an evidence-only launcher can be implemented, one controlled device
procedure must be confirmed that:

1. obtains a real temporary picker grant;
2. invalidates that exact grant without broad permission changes;
3. guarantees invalidation completes before the production reader's
   `canAccess()` call;
4. permits the ordering to be evidenced without logging the URI or other
   sensitive source data;
5. does not add persistable grants, a general permission manager, a second
   production reader, or new production permission architecture.

The repository does not currently establish such a procedure.

## Smallest next action

Run a user-assisted Vivo X Fold5 / AutoJs6 feasibility check using a
documentation-only procedure. The check must determine whether Android or
AutoJs6 exposes a reproducible way to invalidate the selected temporary grant
before the existing reader begins.

The result must be one of:

- `FEASIBLE`: a reproducible, privacy-safe ordering mechanism is identified;
- `BLOCKED_PLATFORM`: the platform does not expose a deterministic mechanism;
- `BLOCKED_UNPROVEN_ORDERING`: invalidation may occur, but ordering before
  `canAccess()` cannot be proven.

Only a reviewed `FEASIBLE` result may reactivate D09 launcher implementation.

## Prohibited substitutions

The feasibility check must not be replaced by:

- an injected fake resolver;
- deliberately throwing a synthetic `SecurityException`;
- selecting an unrelated inaccessible URI;
- clearing all app data or broadly removing storage access;
- adding persistable URI permissions;
- adding a general permission-management module;
- treating offline tests as Android evidence.

## Evidence requirements

Record only:

- exact Vivo device model;
- Android version;
- AutoJs6 version and ABI;
- authoritative repository SHA;
- feasibility classification;
- sanitized steps and observations;
- whether ordering before `canAccess()` was proven.

Do not record a full URI, path, filename, image bytes, Base64, image content,
exception detail, stack, credentials, or unrelated metadata.
