# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D13-DEVICE-VALIDATION`

**Objective:** Execute the separately reviewed D13 exact portable-limit
procedure on Vivo X Fold5 and record only scoped, sanitized Android and AutoJs6
evidence.

The reviewed launcher uses fixture ID `AT_PORTABLE_LIMIT`, independently
verified size `6406`, `maxSizeBytes: 6406`, and
`readerSafetyLimitBytes: 12582912`. It must use the existing Android system
picker, fresh temporary grant, production reader, portable core, shared
reporter, and off-UI-thread responsiveness path without modification.

## Required work

1. Complete mandatory preflight from live `main` and confirm the reviewed D13
   launcher, generated bundle, procedure, and configuration are unchanged.
2. Confirm all repository checks pass against the exact execution SHA.
3. Have the user place the privately mapped, unchanged `AT_PORTABLE_LIMIT`
   fixture where the Vivo X Fold5 system picker can select it.
4. Have the user import the committed generated D13 bundle into AutoJs6 v6.7.0
   `arm64-v8a` without editing it.
5. Use the Android system picker opened by that run to select the fixture and
   execute with a fresh temporary grant.
6. Retain only the exact repository SHA, device/runtime scope, opaque fixture
   ID, numeric limits, one sanitized metadata record, responsiveness, result,
   and non-sensitive notes.
7. If and only if the record is the exact approved PASS shape, add a scoped
   device-validation evidence document and advance to the next governed matrix
   review. Otherwise record the sanitized failure honestly without inventing a
   classification.

## Acceptance criteria

- Execution uses the reviewed generated bundle from a clean authoritative SHA.
- The selected private fixture mapping remains outside Git and the source is
  unchanged after its independent count was established.
- The only accepted PASS record is:

  ```json
  {
    "testCaseId": "D13_EXACT_PORTABLE_LIMIT",
    "status": "PASS",
    "mimeType": "image/jpeg",
    "sizeBytes": 6406,
    "uiResponsive": true
  }
  ```

- No URI, path, filename, bytes, Base64, image content, exception detail,
  stack, credential, or uncontrolled runtime value is retained.
- D13 evidence is not reused for D14 or D15.

## Prohibited scope

Do not edit the launcher on the device, change either numeric limit, reuse a
saved URI, request persistable access, add broad storage permission, copy the
source into repository or application storage, or infer PASS from offline
tests.

Do not add production reader or portable-core behavior, permission manager,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work. Do not begin D14-D26 before D13 is dispositioned through reviewed
evidence.

## Stop conditions

Stop and report when:

- the user is not available to operate the Vivo X Fold5, AutoJs6, or Android
  system picker;
- the private fixture cannot be selected unchanged;
- the execution SHA or generated bundle is not clean and authoritative;
- the returned record is incomplete, unsanitized, or not one of the reviewed
  stable shapes;
- an open pull request or branch already owns D13 device evidence;
- repository state conflicts;
- sensitive data may have appeared;
- write access is unavailable.
