# Next action

Last reviewed: 2026-07-31
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D09-DEVICE-REVOCATION-FEASIBILITY`

**Objective:** Determine on Vivo X Fold5 with AutoJs6 whether a real temporary
Android picker grant can be invalidated reproducibly and privacy-safely before
the existing production reader invokes `canAccess()`.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm the exact authoritative repository SHA used for the feasibility
   procedure.
3. Use the existing Android system picker to obtain a temporary content grant.
4. Test only platform-supported or AutoJs6-supported ways to invalidate that
   exact temporary grant before the reader begins.
5. Record whether invalidation completion can be proven before `canAccess()`.
6. Return one sanitized classification:
   - `FEASIBLE`;
   - `BLOCKED_PLATFORM`;
   - `BLOCKED_UNPROVEN_ORDERING`.
7. Record exact device, Android version, AutoJs6 version and ABI, authoritative
   SHA, sanitized steps, and known limitations through a documentation PR.

## Acceptance criteria

- The selected source is obtained through the Android system picker.
- No broad storage permission or persistable grant is introduced.
- No full URI, path, filename, bytes, Base64, image content, exception detail,
  stack, credential, or unrelated metadata is recorded.
- `FEASIBLE` is allowed only when invalidation of the exact selected grant is
  reproducible and completion before `canAccess()` is proven.
- A platform limitation is recorded honestly rather than replaced by fake-only
  evidence.
- The result is committed and reviewed through a pull request.

## Prohibited scope

Do not implement the D09 launcher during this task. Do not inject a fake
resolver, synthesize `SecurityException`, add a permission manager, add
persistable grants, clear all application data, broaden storage permissions, or
change production reader behavior.

## Stop conditions

Stop and report when:

- the Vivo X Fold5 or AutoJs6 runtime is unavailable;
- Android or AutoJs6 offers no deterministic grant-invalidation mechanism;
- ordering before `canAccess()` cannot be proven;
- the procedure risks exposing prohibited source information;
- an open pull request already owns D09;
- repository state conflicts;
- write access is unavailable.
