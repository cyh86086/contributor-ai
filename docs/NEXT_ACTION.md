# Next action

Last reviewed: 2026-07-31
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D09-LAUNCHER-PREPARATION`

**Objective:** Prepare the smallest evidence-only AutoJs6 D09 launcher and
Traditional Chinese guide needed to verify that a temporary Android picker grant
revoked before `canAccess()` produces the stable public code
`URI_ACCESS_DENIED`, without adding production permission architecture.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm a clean authoritative `main` and record its exact SHA.
3. Reuse the existing production reader, portable error mapping, shared
   launcher core, and sanitized reporter.
4. Add only the minimum controlled evidence hook needed to establish that
   revocation occurs before `canAccess()`.
5. Add deterministic offline tests for delegation, ordering, stable error
   mapping, privacy, and fail-closed behavior.
6. Add a deterministic generated AutoJs6 bundle, build-freshness check, legacy
   syntax scan, and Traditional Chinese execution guide.
7. Update project state and this file through a pull request.

## Acceptance criteria

- The case ID is `D09_PERMISSION_REVOKED_BEFORE_ACCESS`.
- A PASS is possible only when the observed stable result is
  `URI_ACCESS_DENIED` and `uiResponsive: true`.
- Revocation is demonstrably ordered before the existing production reader's
  `canAccess()` call.
- The launcher is evidence-only and does not become a general permission
  manager.
- Output contains no URI, path, filename, bytes, Base64, image content,
  exception detail, stack, credential, or unrelated metadata.
- Offline tests are not represented as Android device evidence.
- Build freshness, legacy syntax, repository checks, diff review, and secret
  review pass.
- A GitHub commit and pull request exist before the task is complete.

## Prohibited scope

Do not add broad storage permission, persistable grants, a second production
reader, provider, network, queue, Contributor app automation, credentials, or
automatic submission.

## Stop conditions

Stop and report when:

- Android/AutoJs6 cannot provide a controlled evidence-only revocation hook
  without adding production permission architecture;
- revocation ordering before `canAccess()` cannot be established;
- an open pull request already owns D09;
- repository state or authoritative source conflicts;
- tests or generated-bundle checks fail;
- sensitive information may have appeared;
- write access is unavailable.
