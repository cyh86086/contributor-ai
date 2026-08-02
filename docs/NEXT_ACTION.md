# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-AGGREGATE-SEMANTICS-CLARIFICATION`

**Objective:** Write the user-approved `attemptedIterations`,
`successfulIterations`, `allMetadataEqual`, and failure-precedence semantics
into the formal D16 contract through a separate documentation-only change.

The readiness review still concludes that test-only coverage is required, but
tests must not begin until this clarification is independently reviewed and
merged.

## Required work

1. Complete mandatory preflight and re-read the D16 formal contract, original
   evidence-gap review, and post-clarification readiness review.
2. Update only the formal D16 documentation and required repository state to
   record the approved aggregate-semantics addendum exactly.
3. Define `attemptedIterations` as incrementing when an iteration starts the
   complete path, including the iteration that fails, while excluding later
   iterations skipped by fail-fast.
4. Define `successfulIterations` as incrementing only when the iteration is a
   JPEG `PASS`, matches the independently verified count, and matches iteration
   1 metadata.
5. Define `allMetadataEqual` for complete success, early public/metadata
   failure, successful reads followed by UI failure, and UI precedence after an
   earlier failure.
6. Record the exact UI, stable-public-error, and metadata-mismatch precedence,
   including when `errorCode` must be present or absent.
7. Record the approved iteration-4 public-error, iteration-4 metadata-mismatch,
   and 10-success-plus-UI-failure examples.
8. Preserve the existing fixture, grant, iteration, privacy, claim, and
   evidence boundaries, then publish the documentation-only clarification for
   independent review.

## Acceptance criteria

- The formal D16 contract contains the exact user-approved counter timing,
  successful-iteration conditions, equality rules, and failure precedence.
- UI non-responsiveness has highest priority and never exposes `errorCode`.
- A responsive stable public error preserves its original stable public code.
- A responsive metadata mismatch has no `errorCode`.
- The three approved examples have exact attempted/successful counters,
  equality values, failure reasons, and error-code presence rules.
- The clarification remains documentation-only and makes no implementation,
  offline PASS, Android, AutoJs6, temporary-grant lifetime, or device claim.
- The repository state and sole next-action register are updated consistently,
  all checks and privacy/scope scans pass, and the change is reviewed through a
  pull request.

## Prohibited scope

Do not add or modify tests, a D16 launcher, generated bundles, production code,
a device procedure, binary fixture, permission behavior, or application
architecture. Do not execute a phone or claim D16 PASS.

Do not add persistable access, broad storage permission, a permission manager,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work.

## Stop conditions

Stop and report when:

- the approved addendum conflicts with the formal D16 fixture, grant,
  iteration, privacy, or evidence boundaries;
- another pull request or branch already owns the clarification task;
- repository state or the approved semantics are ambiguous;
- the clarification would require tests, production behavior, generated code,
  device execution, or sensitive values;
- required checks fail outside the authorized documentation-only scope;
- GitHub write access is unavailable.
