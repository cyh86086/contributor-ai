# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D13-EVIDENCE-GAP-REVIEW`

**Objective:** Perform a repository-first evidence-gap review of formal D13,
the exact portable size-limit case.

The formal matrix requires `AT_PORTABLE_LIMIT` to use `maxSizeBytes` equal to
the fixture's independently verified byte count and expects success with
`sizeBytes === maxSizeBytes`. The review must determine what existing
repository evidence proves, what scoped device evidence is still needed, and
the smallest governed next step. It must not implement a launcher or test while
the review is active.

## Required work

1. Complete the mandatory repository preflight and confirm no pull request or
   branch already owns D13.
2. Read the formal verification-matrix D13 row and its controlled-fixture and
   evidence requirements.
3. Inspect the production reader's safety ceiling, portable `maxSizeBytes`
   validation and exact-boundary behavior, shared reporter, and all relevant
   offline tests.
4. Determine whether the verified byte count for `AT_PORTABLE_LIMIT` and a
   reproducible production-runtime procedure already exist without recording a
   source identifier, path, filename, bytes, image content, or diagnostics.
5. Distinguish offline exact-boundary contract evidence from Android and
   AutoJs6 device evidence.
6. Record the evidence gap, feasibility or blocker, and the single next task in
   project-state and D13 review documentation.

## Acceptance criteria

- The review traces the formal sequence from the production reader through the
  portable size check and stable reporter.
- The meaning and provenance of the `AT_PORTABLE_LIMIT` verified byte count are
  explicit and sanitized.
- Existing offline tests and missing device evidence are listed without
  expanding their claims.
- The review determines whether a later controlled device procedure is safe,
  deterministic, and necessary.
- No D13 result, launcher, fixture, production behavior, or device evidence is
  fabricated.
- All documentation checks and repository scans pass, and the review is
  committed and published for review.

## Prohibited scope

Do not create a D13 launcher, run a D13 device test, alter fixture data, or
change production reader, portable core, reporter, generated bundles, Android
permissions, or application architecture during this review. Do not infer
Android or AutoJs6 behavior from offline tests.

Do not begin D14-D26, queue, provider, network, Contributor app, credential,
submission, or unrelated module work.

## Stop conditions

Stop and report when:

- the formal D13 contract or verified fixture byte count is ambiguous;
- an open pull request or branch already owns D13;
- repository state conflicts;
- sensitive source or fixture data would need to be recorded;
- production or generated-runtime changes would be required for the review;
- write access is unavailable.
