# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D15-DEVICE-VALIDATION`

**Objective:** Execute the separately reviewed D15 reader safety-ceiling
overflow procedure on Vivo X Fold5 and record only scoped, sanitized Android
and AutoJs6 evidence.

The reviewed launcher uses fixture ID `OVER_READER_CEILING`, independently
verified size `6406`, `readerSafetyLimitBytes: 6405`, and
`maxSizeBytes: 6406`. It must use the existing Android system picker, fresh
temporary grant, production reader, portable core, shared reporter, and
off-UI-thread responsiveness path without modification.

## Required work

1. Complete mandatory preflight from live `main` and confirm the reviewed D15
   launcher, generated bundle, procedure, and static numeric ordering are
   unchanged.
2. Confirm all repository checks pass against the exact execution SHA.
3. Have the user place the privately mapped, unchanged
   `OVER_READER_CEILING` fixture where the Vivo X Fold5 system picker can select
   it.
4. Have the user import the committed generated D15 bundle into AutoJs6 v6.7.0
   `arm64-v8a` without editing it.
5. Use the Android system picker opened by that run to select the fixture and
   execute with a fresh temporary grant.
6. Retain only the exact repository SHA, device/runtime scope, opaque fixture
   ID, independent count, numeric limits, one sanitized public result,
   responsiveness, and non-sensitive notes.
7. If and only if the record is the exact approved expected-result shape, add a
   scoped device-validation evidence document that says the expected result was
   observed, retains `status: "FAIL"`, and advances to the next governed matrix
   review. Otherwise record the sanitized result honestly without inventing
   PASS, a unique internal cause, or a classification.

## Acceptance criteria

- Execution uses the reviewed generated bundle from a clean authoritative SHA.
- The selected private fixture mapping remains outside Git and the source is
  unchanged after its independent count was established.
- The only accepted expected-result record is:

  ```json
  {
    "testCaseId": "D15_READER_SAFETY_CEILING_OVERFLOW",
    "status": "FAIL",
    "errorCode": "IMAGE_READ_FAILED",
    "uiResponsive": true
  }
  ```

- The public `status: "FAIL"` is retained exactly and is never rewritten to
  `status: "PASS"`.
- The record is scoped to the reviewed static ordering and fixture provenance;
  it does not claim that `IMAGE_READ_FAILED` uniquely identifies the internal
  reader-ceiling branch.
- No URI, path, filename, source bytes, Base64, image content, exception detail,
  stack, credential, or uncontrolled runtime value is retained.
- D13, D14, ordinary read-failure, D11, or D12 evidence is not reused for D15.

## Prohibited scope

Do not edit the launcher on the device, change any numeric value, reuse a saved
URI, request persistable access, add broad storage permission, copy the source
into repository or application storage, or infer the expected result from
offline tests.

Do not add production reader or portable-core behavior, permission manager,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work. Do not begin D16-D26 before D15 is dispositioned through reviewed
evidence.

## Stop conditions

Stop and report when:

- the user is not available to operate the Vivo X Fold5, AutoJs6, or Android
  system picker;
- the private fixture cannot be selected unchanged;
- the execution SHA or generated bundle is not clean and authoritative;
- the returned record is incomplete, unsanitized, or not one of the reviewed
  stable shapes;
- an open pull request or branch already owns D15 device evidence;
- repository state conflicts;
- sensitive data may have appeared;
- write access is unavailable.
