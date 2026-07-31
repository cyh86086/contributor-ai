# D09 permission-revoked evidence-gap review

## Review result

D09 is defined by the authoritative device-verification matrix as:

- **Case:** permission revoked before `canAccess()`
- **Procedure:** revoke the temporary Android URI grant before invoking the
  harness
- **Required result:** `URI_ACCESS_DENIED`

The repository does not currently contain a D09 one-click AutoJs6 launcher,
D09 user guide, generated D09 bundle, or scoped D09 device evidence. Therefore,
no D09 PASS or FAIL claim is authoritative.

## Authoritative scope

- **Preflight live `main` SHA:**
  `ff54c9ada541d2ba50f1b82068f4384d99e5322d`
- **Production runtime:** Vivo X Fold5 with Android and AutoJs6
- **Target behavior:** the existing production reader must deny access when the
  temporary grant has already been revoked before `canAccess()`
- **Expected public code:** `URI_ACCESS_DENIED`
- **Output:** sanitized metadata only

This review introduces no production behavior and does not execute a device
case.

## What the repository already proves offline

The existing production-reader tests prove, with injected resolver behavior,
that:

1. a `content://` URI is inaccessible when the probe cannot open a stream;
2. a classified `SecurityException` during `canAccess()` is converted to a
   denied result without exposing exception details;
3. the portable integration maps an inaccessible source to the stable public
   code `URI_ACCESS_DENIED`;
4. sanitized output contracts prohibit URI, path, filename, bytes, Base64,
   exception detail, stack, credentials, and unrelated metadata.

These are deterministic offline contracts. They do not prove that revoking a
real temporary Android picker grant on Vivo X Fold5 produces the same behavior
through AutoJs6.

## Production evidence gap

A scoped D09 result still requires all of the following:

1. a reviewed evidence-only D09 launcher derived from the existing picker,
   production reader, portable error mapping, and sanitized reporter;
2. a controlled device procedure that obtains a temporary picker grant and
   revokes it before the launcher invokes `canAccess()`;
3. proof that the revocation happened before `canAccess()`, without recording
   the URI or other sensitive source data;
4. one sanitized result containing only:
   - `testCaseId: "D09_PERMISSION_REVOKED_BEFORE_ACCESS"`;
   - `status: "PASS"` only when the observed stable code is
     `URI_ACCESS_DENIED`;
   - `errorCode: "URI_ACCESS_DENIED"`;
   - `uiResponsive: true`;
5. exact device, Android version, AutoJs6 version and ABI, authoritative launcher
   SHA, execution date, and sanitized notes.

If Android or the picker does not expose a deterministic way to revoke the
temporary grant before `canAccess()`, the result must be recorded as a platform
or harness blocker. It must not be replaced with a fake-only PASS.

## Smallest governed next step

Prepare a D09 evidence-only launcher and Traditional Chinese execution guide.
The implementation must reuse the existing production reader and sanitized
reporting path. It may add only the minimum controlled hook required to prove
that revocation occurs before `canAccess()`.

The launcher-preparation task must include deterministic offline tests,
build-freshness checks, legacy AutoJs6 syntax checks, privacy checks, repository
state updates, a commit, and a pull request. Offline checks still will not count
as D09 Android evidence.

## Prohibited scope

Do not add broad storage permission, persistable grants, a general permission
manager, a second production reader, provider or network behavior, queue logic,
Contributor app automation, credentials, or automatic submission.

Do not record or emit a complete URI, query string, path, filename, image bytes,
Base64, image content, exception detail, stack, credential, or unrelated
metadata.

## Stop conditions

Stop without claiming D09 PASS when:

- the temporary grant cannot be deterministically revoked before `canAccess()`;
- revocation timing cannot be proven;
- the returned code differs from `URI_ACCESS_DENIED`;
- UI responsiveness is not proven;
- output contains prohibited data;
- the launcher requires new production permission architecture rather than an
  evidence-only controlled hook.
