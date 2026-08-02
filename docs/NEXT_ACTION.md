# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D13-DEVICE-PROCEDURE-PREPARATION`

**Objective:** Prepare the smallest reviewed, evidence-only D13 execution
package for the formal exact portable size-limit case without executing it.

The package must use the existing shared production-reader, portable-core, and
sanitized-reporter path. It must configure `maxSizeBytes` to the independently
verified numeric count for `AT_PORTABLE_LIMIT`, keep
`readerSafetyLimitBytes` at or above that count, and define a Vivo X Fold5
procedure whose only acceptable success has `sizeBytes === maxSizeBytes` and
demonstrated UI responsiveness.

## Required work

1. Complete the mandatory repository preflight and confirm no pull request,
   branch, launcher, or procedure already owns D13.
2. Re-read the D13 evidence-gap review, verification matrix, production
   reader, portable core, shared harness, and existing generated-entry
   conventions.
3. Require a non-sensitive controlled supported image whose exact positive
   byte count is measured independently before execution. Keep the private
   fixture manifest outside Git and retain only `AT_PORTABLE_LIMIT` plus the
   numeric count in reviewed evidence.
4. Prepare the minimal D13-specific evidence entry and user procedure by
   delegating to the existing system-picker and shared runtime path; do not add
   reader, permission, or application behavior.
5. Set `maxSizeBytes` to the independently verified count and
   `readerSafetyLimitBytes` to the same count or a higher reviewed value.
6. Require a fresh temporary picker grant, off-UI-thread execution, metadata-only
   output, `uiResponsive: true`, and exact equality between reported
   `sizeBytes` and `maxSizeBytes`.
7. Add deterministic build-freshness, legacy-syntax, delegation, sanitization,
   and configuration checks only as required by the established launcher
   pattern.
8. Publish the unexecuted procedure for review. Do not claim device evidence or
   PASS.

## Acceptance criteria

- The execution package is scoped only to formal D13 and the opaque
  `AT_PORTABLE_LIMIT` fixture.
- The independently verified numeric count is available before any launcher
  value or procedure is finalized; no rounded display size or reader output is
  used as the independent source.
- The package delegates unchanged to the existing production reader, portable
  core, shared reporter, system picker, and UI-responsiveness mechanism.
- `maxSizeBytes` equals the verified count and `readerSafetyLimitBytes` is not
  lower.
- The procedure retains only sanitized metadata and clearly separates D13 from
  D14 portable overflow and D15 reader-ceiling overflow.
- No device execution occurs in this task.
- All repository checks pass and the preparation is committed and published
  for review.

## Prohibited scope

Do not execute D13 on a device or claim PASS. Do not derive the fixture count
from URI metadata, a filename, rounded display size, encoded length, compressed
payload length, provider payload length, or the D13 production-reader result.
Do not reuse D01-D08 or fake-fixture counts as D13 evidence.

Do not add broad storage permission, a persistable grant, permission manager,
source-copy architecture, production reader behavior, portable-core behavior,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work. Do not begin D14-D26.

## Stop conditions

Stop and report when:

- no independently verified positive numeric count for `AT_PORTABLE_LIMIT` is
  available;
- the controlled fixture cannot be kept non-sensitive and privately mapped to
  its opaque ID;
- the reader ceiling would be lower than the portable limit;
- the package cannot delegate to the existing shared runtime without production
  changes;
- an open pull request or branch already owns D13;
- repository state conflicts;
- sensitive data may have appeared;
- write access is unavailable.
