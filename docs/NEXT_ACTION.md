# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-CONTRACT-CLARIFICATION`

**Objective:** Obtain an explicit user-approved, repository-authoritative D16
contract before any test, launcher, procedure, or device execution is created.

## Required decisions

The user must explicitly approve all of the following:

1. the exact bounded number of complete read iterations;
2. the dedicated opaque fixture ID, supported format, independent count rule,
   and non-sensitive provenance;
3. whether one fresh temporary system-picker grant must remain active for the
   complete loop;
4. the exact per-iteration fields that must remain equal;
5. whether responsiveness is one loop-level field or a per-iteration field;
6. the fail-fast and public-result rule for an inaccessible, failed, unequal,
   or non-responsive iteration;
7. the sanitized console/evidence shape that proves the recorded count and
   equality without retaining source data.

After approval, update the formal matrix and any affected evidence contract in
a documentation-only change. Only a later governed task may decide whether
test-only coverage or device-procedure preparation comes next.

## Acceptance criteria

- The approved values are explicit and leave no implementation-defined
  acceptance rule.
- The clarification remains scoped to formal D16 and does not alter D17-D26.
- The formal matrix and evidence rules agree on iteration count, fixture,
  grant, equality, failure, responsiveness, and reporting.
- No URI, source location, source name, source bytes, Base64, image content,
  exception detail, stack, credential, or uncontrolled runtime value is
  retained.
- Project state and the single next task are updated in the same reviewed
  documentation-only change.

## Prohibited scope

Do not choose the missing values without explicit user approval. Do not create
or run a launcher, add tests, operate a device, claim PASS, assign a new
classification name, or infer Android behavior from offline evidence.

Do not add production behavior, persistable access, broad storage permission,
permission manager, source-copy architecture, provider, network, queue,
Contributor app, credential, submission, or unrelated module work.

## Stop conditions

Stop until the user explicitly approves the complete D16 contract. Also stop
for repository drift, conflicting governance, an existing owning pull request,
sensitive data, failed verification outside scope, or unavailable GitHub write
access.
