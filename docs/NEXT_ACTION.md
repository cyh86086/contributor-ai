# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D15-EVIDENCE-GAP-REVIEW`

**Objective:** Review the repository evidence gap for formal verification
matrix D15, where a controlled source exceeds a deliberately lower recorded
`readerSafetyLimitBytes` and the expected stable public result is
`IMAGE_READ_FAILED` with no truncated success.

The review must determine whether existing production-reader ordering,
offline tests, sanitized reporting, and a separately counted controlled source
are sufficient to prepare a safe Vivo X Fold5 procedure. It must not create or
execute a D15 launcher.

## Required work

1. Complete mandatory preflight from live `main`; confirm no open PR, branch,
   launcher, device evidence, or other implementation already owns D15.
2. Read the formal D15 matrix row and the production reader's stream loop,
   accumulated-count ceiling check, failure mapping, stream cleanup, and
   returned-byte behavior.
3. Inventory all related offline tests for exact reader-ceiling equality,
   reader-ceiling overflow, partial reads, cleanup after failure, public error
   mapping, stable reporter output, privacy, and UI responsiveness.
4. Determine whether D15 can prove that a source whose independently measured
   complete size exceeds the configured reader ceiling returns
   `IMAGE_READ_FAILED` before any truncated content can reach the portable core.
5. Define how a future procedure would keep D15 separate from D14: D14 requires
   a higher reader ceiling and portable `IMAGE_TOO_LARGE`; D15 requires a lower
   reader ceiling and reader-level `IMAGE_READ_FAILED`.
6. Determine whether one user-approved, non-sensitive controlled image can be
   privately mapped to `OVER_READER_CEILING`, independently counted outside the
   launcher and production reader, and selected through a fresh Android system
   picker grant without retaining source data.
7. State precisely what existing offline evidence proves and what scoped
   Android / AutoJs6 evidence remains missing.
8. Update the evidence-gap record, project state, and sole next task. If a safe
   procedure is supported, advance only to
   `D15-DEVICE-PROCEDURE-PREPARATION`; otherwise record the exact governed
   blocker or separately required test-only task without inventing PASS or a
   classification.

## Acceptance criteria

- The review identifies the exact production order in which
  `readerSafetyLimitBytes` is checked and confirms whether any truncated byte
  array can be returned after overflow.
- D15 is explicitly distinguished from D14 portable overflow, ordinary read
  failure, permission denial, D11 missing source, D12 null stream, and any
  private-cache observation.
- Offline tests are described only as offline evidence and are not expanded
  into Android, provider, or device claims.
- No D13 or D14 result is reused, relabeled, or treated as D15 evidence.
- No URI, path, filename, source bytes, Base64, image content, exception detail,
  stack, credential, or private fixture mapping is retained.
- The change is documentation-only and `NEXT_ACTION.md` contains exactly one
  Task ID.

## Prohibited scope

Do not create or execute a D15 launcher, perform a phone test, change the
production reader or portable core, or add test coverage during this review.
Do not manufacture a fake-only PASS or call `IMAGE_READ_FAILED` a PASS.

Do not add a permission manager, persistable grant, broad storage permission,
source-copy architecture, provider, network, queue, Contributor app,
credential, submission, or unrelated module work.

## Stop conditions

Stop and report when:

- an open pull request or branch already owns D15;
- the formal matrix, failure boundary, fixture provenance, or expected public
  contract is ambiguous;
- a safe device procedure would require retaining sensitive source data or
  changing production architecture;
- repository state conflicts;
- required checks fail outside the review scope;
- sensitive data may have appeared;
- write access is unavailable.
