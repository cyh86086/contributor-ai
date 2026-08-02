# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D12-TEST-COVERAGE-PREPARATION`

**Objective:** Implement the smallest test-only coverage change that proves the
formal D12 fake resolver sequence through the existing production Android image
reader, portable error boundary, and stable public reporter.

The test must keep D12 explicitly offline and fake-only. It must make the access
probe succeed, return `null` from the read-stage second resolver open, and prove
the final stable result is `IMAGE_READ_FAILED` without changing production
behavior.

## Required work

1. Complete the mandatory repository preflight.
2. Re-read the D12 evidence-gap review and confirm no open pull request or branch
   already owns the test-only change.
3. Add one minimal D12-specific offline test using the existing shared
   `runImageReaderDeviceCheck()` path.
4. Configure the fake resolver so the first open returns a closable probe stream
   and the second open returns `null`.
5. Assert exactly two opens, stable `IMAGE_READ_FAILED`, one identical frozen
   reporter record, and no uncontrolled output fields.
6. Run the full repository verification suite and publish the test-only change
   for review.

## Acceptance criteria

- The test executes the existing production reader, portable core, and shared
  reporter without altering them.
- `canAccess()` succeeds on the first fake stream and the second resolver open
  returns `null` during `read()`.
- The exact public result is `IMAGE_READ_FAILED`, reported once with no source or
  uncontrolled diagnostic fields.
- The change is test-only apart from required state and evidence updates.
- No Android, provider, device, or D11 claim is made.
- All repository checks pass and the change is committed and reviewed through a
  pull request.

## Prohibited scope

Do not implement a D12 launcher or run a device test. Do not change production
reader, portable core, reporter, generated bundles, Android permissions, or
application architecture. Do not use D12 to replace D11, permission evidence,
real provider behavior, or the private-cache exploration.

Do not begin queue, provider, network, Contributor app, credential, submission,
or unrelated module work.

## Stop conditions

Stop and report when:

- the test would require production or generated-runtime changes;
- the first-open and second-open order cannot be asserted deterministically;
- stable sanitized reporting cannot be proved without sensitive values;
- an open pull request already owns the D12 test-only change;
- repository state conflicts;
- write access is unavailable.
