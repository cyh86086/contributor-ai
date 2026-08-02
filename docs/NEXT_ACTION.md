# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-TEST-COVERAGE-PREPARATION`

**Objective:** Implement the smallest separately governed verification-only
coverage change that proves the approved D16 offline 10-iteration contract
before any device-procedure preparation.

The change must exercise the existing production Android reader and portable
core through injected offline dependencies. It must add no production behavior
and must not claim Android, AutoJs6, temporary-grant lifetime, device, or PASS
evidence.

## Required work

1. Complete mandatory preflight and re-read the approved D16 contract and the
   post-clarification readiness review.
2. Add D16-specific offline coverage for exactly 10 complete-path iterations
   using the same injected source context.
3. Prove that each iteration executes the existing access probe, read, and
   portable-core validation in order.
4. Prove the exact success conditions, MIME/count equality against iteration 1,
   correct counters, and one frozen aggregate record with no per-iteration
   reports.
5. Prove immediate public-error and metadata-mismatch fail-fast, stable public
   code preservation, and exact attempted/successful counters.
6. Prove that the safe loop-level responsiveness assessment completes after
   fail-fast and that UI non-responsiveness has the approved precedence.
7. Prove all three evidence-only failure-reason shapes and privacy allowlists,
   including absence of selected-source, per-iteration, exception, diagnostic,
   and uncontrolled values.
8. Run the complete repository verification suite and publish the scoped
   coverage change for review.

## Acceptance criteria

- One integrated offline success case performs exactly 10 complete reads and
  returns the approved 10/10 aggregate.
- Public-error, metadata-mismatch, and UI-non-responsive cases prove fail-fast,
  precedence, counters, public-code preservation where applicable, and exact
  failure field shapes.
- The reporter is called exactly once with the same frozen aggregate returned
  to the caller; no per-iteration record is emitted.
- Evidence-only failure reasons remain outside production public error codes
  and reader classifications.
- The same injected source context is reused, but no Android, AutoJs6, provider,
  or real temporary-grant behavior is inferred.
- The change is limited to tests and, only if required, a minimal explicitly
  non-production verification-only orchestration seam plus required
  documentation/state updates.
- All checks and privacy/scope scans pass, and the change is committed and
  reviewed through a pull request.

## Prohibited scope

Do not create a D16 launcher, generated bundle, device procedure, fixture, or
device result. Do not run a phone or claim D16 PASS.

Do not change the production reader, portable core, production reporter,
Android permissions, persistable access, broad storage permission, permission
manager, application architecture, provider, network, queue, Contributor app,
credential, submission, or unrelated module work.

## Stop conditions

Stop and report when:

- meaningful integrated coverage would require a production or generated
  runtime change;
- the approved iteration, counter, failure, precedence, or privacy contract
  cannot be tested deterministically with injected offline dependencies;
- a pull request or branch already owns the D16 coverage task;
- repository state conflicts or the formal contract becomes ambiguous;
- sensitive values would need to be retained;
- required checks fail outside the authorized test-only scope;
- GitHub write access is unavailable.
