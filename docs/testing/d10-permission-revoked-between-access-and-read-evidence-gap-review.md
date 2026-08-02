# D10 permission-revoked-between-access-and-read evidence-gap review

## Review result

**BLOCKED_PLATFORM** for a real temporary Android system-picker grant in the
reviewed Vivo X Fold5 / AutoJs6 scope.

No D10 launcher was created. This review makes no D10 PASS or
`URI_ACCESS_DENIED` device claim and introduces no production behavior.

## Authoritative scope

- **Preflight live `main` SHA:**
  `4241e52274e4ec0464aa5de7e71fba97f462f4e6`
- **Formal case:** permission revoked between `canAccess()` and `read()`
- **Formal procedure:** revoke after the access probe closes and before the
  production read opens
- **Expected public code:** `URI_ACCESS_DENIED`
- **Relevant scoped platform evidence:** Vivo X Fold5, Android 16, AutoJs6
  v6.7.0, `arm64-v8a`

This was a repository evidence review, not a new device execution.

## Production sequence

The current repository establishes this order:

1. `prepareImageInput()` awaits the portable access check.
2. The access check awaits `reader.canAccess()` and stops when it does not
   return `true`.
3. The production reader's `canAccess()` resolves the source, opens a probe
   stream, records whether it opened, and closes it in `finally` before the
   method completes.
4. Only after `canAccess()` completes does `prepareImageInput()` call
   `reader.read()`.
5. The production reader's `read()` resolves the source again, obtains MIME
   metadata for a content source, and opens a new stream for the actual read.

There is therefore a real sequencing boundary after the probe stream closes and
before the production read opens. The repository has no reviewed production or
verification hook at that boundary. A D10 device procedure would still require
a platform-supported operation that invalidates the exact temporary grant and
proves completion within that boundary.

## Applicability of the D09 platform result

The scoped D09 feasibility observation used the Android system picker without a
persistable grant or broad storage permission. The temporary grant was initially
readable. The platform revocation call returned normally, but the following
permission check was not denied and a new read remained available.

D10 changes the timing of the same required invalidation; it does not provide a
different platform mechanism. Moving an ineffective revocation call between
`canAccess()` and `read()` cannot prove that the grant became invalid before the
second stream open. No other deterministic Android / AutoJs6 mechanism is
reviewed in the repository.

The D09 `BLOCKED_PLATFORM` result therefore also blocks formal D10 for a real
temporary picker grant in this scoped environment.

## Existing offline evidence

| Repository evidence                            | What it proves                                                                                                                     | What it does not prove                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `tests/autojs6-android-image-reader.test.js`   | A fake first stream can make `canAccess()` succeed; an injected classified failure on the second open maps to `URI_ACCESS_DENIED`. | Real grant invalidation or platform timing.                                |
| `tests/image-input-core.test.js`               | Fake access denial and injected classified read failures map to fixed public codes without leaking diagnostic detail.              | Android, AutoJs6, or system-picker behavior.                               |
| `tests/autojs6-d06-resolver-mime.test.js`      | An injected read-time access error is preserved as `URI_ACCESS_DENIED` in sanitized verification output.                           | Revocation of a real grant between the two production calls.               |
| `tests/autojs6-d07-mime-fallback.test.js`      | The MIME-fallback wrapper preserves an injected read-time access-denial classification and sanitized reporting.                    | A platform revocation operation or device evidence.                        |
| `tests/autojs6-d08-permission-granted.test.js` | A fake resolver observes two stream opens on the success path and fails closed when its injected source is inaccessible.           | That Android can invalidate the selected grant between those stream opens. |

These tests are valuable contract coverage. They use fake resolvers, fake
streams, or injected classified failures and cannot be promoted into D10 Android
evidence.

## Private-cache exploration boundary

The repository-external `D10_PRIVATE_CACHE_LIFECYCLE` exploration concerns
copying into, reading from, and cleaning up application-private cache. It does
not revoke the selected temporary picker grant between the production
`canAccess()` and `read()` calls.

It is not formal D10 evidence, is not a D10 PASS, and does not change this
review result. It may be considered only by a future, separately governed
architecture decision.

## Governed outcome

- Close `D10-EVIDENCE-GAP-REVIEW` as `BLOCKED_PLATFORM` for the reviewed real
  temporary picker-grant path.
- Do not implement a D10 launcher or add a boundary hook, permission manager,
  persistable grant, broad storage permission, or alternate production reader.
- Retain the existing fake and injected tests only as offline contract
  evidence.
- Move the single active task to `D11-EVIDENCE-GAP-REVIEW`.

Only a future reviewed repository decision supported by a newly demonstrated
platform invalidation mechanism may reopen D10 launcher feasibility.
