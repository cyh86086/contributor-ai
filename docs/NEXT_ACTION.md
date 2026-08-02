# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D16-POST-CLARIFICATION-READINESS-REVIEW`

**Objective:** Perform a documentation/repository-only readiness review of the
approved D16 repeated-read contract and decide the next governed preparation
stage.

## Required review

1. Re-read the approved D16 contract in
   `docs/testing/autojs6-image-reader-device-verification-v1.md` and the closed
   evidence-gap review.
2. Inspect the existing production reader, portable core, verification reporter
   path, and relevant offline tests without modifying them.
3. Determine whether repository coverage already proves the required
   10-iteration orchestration, fail-fast rules, equality checks, loop-level
   responsiveness handling, public-error preservation, and one frozen
   aggregate record.
4. If coverage is incomplete, set the next sole task to
   `D16-TEST-COVERAGE-PREPARATION` and identify the exact test-only gap.
5. If coverage is complete, set the next sole task to
   `D16-DEVICE-PROCEDURE-PREPARATION` and document why no test-only preparation
   is needed.

## Acceptance criteria

- The review uses the approved exact count of 10 and opaque fixture ID
  `JPEG_REPEAT_VALID` without changing the contract.
- It distinguishes offline repository evidence from Android/device evidence
  and does not claim D16 PASS.
- It reaches exactly one of the two governed next-task outcomes above using
  repository evidence.
- It updates project state, this single-task register, and a scoped review
  document in one documentation-only change.
- It records no selected identifier, source location, source name, source
  bytes, Base64, image content, exception detail, stack, credential, or
  uncontrolled runtime value.

## Prohibited scope

Do not add tests, create a D16 launcher or procedure, run a device, measure or
commit a binary fixture, claim PASS, or assign a new classification name during
this review.

Do not add production behavior, persistable access, broad storage permission,
permission manager, source-copy architecture, provider, network, queue,
Contributor app, credential, submission, or unrelated module work.

## Stop conditions

Stop for repository drift, an existing owning pull request or branch,
conflicting governance, ambiguous approved-contract text, sensitive data,
failed verification outside scope, or unavailable GitHub write access.
