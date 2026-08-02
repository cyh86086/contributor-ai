# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-EVIDENCE-GAP-REVIEW`

**Objective:** Perform a documentation-only repository evidence-gap review of
formal matrix D16: read the same non-sensitive URI repeatedly in a recorded
loop, with every iteration expected to return the same success metadata.

## Required review

1. Read the formal D16 matrix row, fixture requirements, and all adjacent
   safeguards without inventing an iteration count or acceptance rule.
2. Trace each iteration through the production reader's `canAccess()` and
   `read()` sequence, stream-open and cleanup behavior, portable core, stable
   reporter, and off-UI-thread responsiveness path.
3. Inventory existing fake, injected, integration, cleanup, repetition, and
   sanitization tests, stating exactly which behavior each proves and which
   Android behavior remains unproved.
4. Determine whether the repository already defines a reproducible loop count,
   metadata-equality fields, grant lifetime, fixture provenance, and failure
   handling for a future device procedure.
5. Distinguish repeated reads of one fresh picker grant from single-read D13,
   D14, or D15 evidence, private-cache observations, multiple-image cases, and
   provider-specific behavior.
6. Decide whether existing evidence fully proves an offline prerequisite,
   whether a separately governed test-only task is required, whether device
   procedure preparation is feasible, or whether the formal contract is
   ambiguous or otherwise blocked under repository terminology.
7. Update project state and select exactly one governed next task from the
   review conclusion.

## Acceptance criteria

- The change is documentation-only and creates no launcher or test.
- The review identifies the exact production path and existing evidence without
  treating fake or single-read evidence as Android repeated-read evidence.
- Any missing iteration count, equality field, grant rule, or fixture rule is
  recorded honestly rather than supplied by assumption.
- No URI, source location, source name, source bytes, Base64, image content,
  exception detail, stack, credential, or uncontrolled runtime value is
  retained.
- Repository verification, formatting, secret scanning, sensitive-value
  scanning, and Markdown-only scope checks pass.
- This file contains one active Task ID.

## Prohibited scope

Do not create or execute a D16 launcher, operate a device, add production
reader behavior, alter the verification matrix, manufacture a loop count, or
claim Android or device evidence from offline tests.

Do not add persistable access, broad storage permission, permission manager,
source-copy architecture, provider, network, queue, Contributor app,
credential, submission, or unrelated module work.

## Stop conditions

Stop and report when the formal contract or fixture provenance remains
ambiguous, an existing pull request or branch already owns the work,
repository state conflicts, required verification fails outside scope,
sensitive data may have appeared, or GitHub write access is unavailable.
