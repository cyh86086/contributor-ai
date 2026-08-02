# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-TEST-COVERAGE-PREPARATION`

**Objective:** Add separately governed test-only offline coverage for the
approved D16 10-iteration aggregate contract through the production Android
reader, portable core, and stable verification reporter path.

The formal contract now records the user-approved aggregate counter, equality,
and failure-precedence semantics. This task may prove that offline contract only;
it may not claim Android, AutoJs6, provider, temporary-grant lifetime, device,
or D16 PASS evidence.

## Required work

1. Complete mandatory preflight and re-read the formal D16 contract, original
   evidence-gap review, readiness review, production reader/core/reporter path,
   and all related tests before changing coverage.
2. Add a test-only D16 orchestration seam only if needed. It must remain outside
   production behavior, launchers, generated bundles, permissions, and device
   procedures.
3. With one injected synthetic source context, execute exactly 10 complete
   `canAccess() → read() → portable core` iterations and prove the ordered
   access/read count, iteration-1 metadata comparison, and exact approved
   success aggregate.
4. Prove fail-fast counter semantics for a controlled stable public error and
   for MIME/count metadata mismatch, including the approved iteration-4
   examples and unchanged stable public `errorCode` only for `PUBLIC_ERROR`.
5. Prove loop-level UI assessment after success, public-error fail-fast, and
   metadata fail-fast. Assert the approved `UI_NOT_RESPONSIVE` precedence,
   equality value, and absence of `errorCode`.
6. Prove exactly one frozen allowlisted aggregate report, no per-iteration
   reports, no sensitive or uncontrolled fields, and identical returned and
   reported records.
7. Prove the three evidence-only D16 failure reasons do not enter production
   public-code or reader-classification sets.
8. Update repository state only as required, run all authoritative checks and
   scope/privacy scans, and publish the test-only change for independent review.

## Acceptance criteria

- Tests exercise the complete existing production reader and portable-core path
  exactly 10 times for one injected source context, then report one frozen
  aggregate through the stable reporter boundary.
- Success, public-error, metadata-mismatch, and UI-precedence cases assert the
  exact approved attempted/successful counters, equality values, failure
  reasons, and `errorCode` presence rules.
- Fail-fast-skipped iterations are not executed or counted, while the failing
  iteration is attempted but not successful.
- Aggregate reporting is allowlisted, sanitized, emitted once, and contains no
  source, per-iteration, diagnostic, or uncontrolled value.
- Evidence-only failure reasons remain outside production public-code and
  reader-classification sets.
- The change remains test-only and makes no Android, AutoJs6, provider,
  temporary-grant lifetime, device, or D16 PASS claim.
- The full authoritative test suite and all formatting, bundle, syntax,
  privacy, and scope checks pass, and the change is independently reviewed.

## Prohibited scope

Do not add a D16 launcher, generated bundle, production reader/core/reporter
behavior, device procedure, binary fixture, permission behavior, or application
architecture. Do not execute a phone or claim D16 PASS.

Do not add persistable access, broad storage permission, a permission manager,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work.

## Stop conditions

Stop and report when:

- another pull request or branch already owns the test-coverage task;
- the formal contract, classification, fixture provenance, or required
  production-path seam is ambiguous;
- meaningful offline coverage would require production behavior, generated
  code, device execution, or sensitive values;
- required checks fail outside the authorized test-only scope;
- GitHub write access is unavailable.
