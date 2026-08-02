# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D12-EVIDENCE-GAP-REVIEW`

**Objective:** Review the repository evidence for verification-matrix D12: a
controlled fake resolver returns `null`, with expected stable result
`IMAGE_READ_FAILED`.

The review must keep D12 explicitly fake-only, determine whether existing
offline coverage already proves the required contract, and prevent the result
from being presented as real Android, provider, missing-source, or D11 evidence.

## Required work

1. Complete the mandatory repository preflight.
2. Re-read the formal D12 row and production `canAccess()` / `read()` null-stream
   behavior.
3. Inventory every existing fake-resolver null-stream test and its portable
   error-mapping coverage.
4. Determine whether the existing tests already satisfy the controlled
   fake-only D12 contract or whether a separately governed test-only gap remains.
5. Record the evidence conclusion and smallest governed next step in a
   documentation-only pull request.

## Acceptance criteria

- The review preserves D12 as a controlled fake-only null-stream case with
  expected `IMAGE_READ_FAILED`.
- Existing coverage is traced through the production reader and portable error
  boundary without claiming Android or provider behavior.
- The review explicitly distinguishes D12 from D11 real-source deletion and all
  device evidence.
- No launcher, production behavior, broad storage permission, persistable grant,
  permission manager, or source-copy architecture is introduced.
- The result is committed and reviewed through a pull request.

## Prohibited scope

Do not implement a D12 launcher or claim a device PASS. Do not use D12 to replace
D11, missing-source evidence, permission evidence, or the private-cache
exploration. Do not add a permission manager, persistable grants, broad storage
permissions, source-copy architecture, or production reader changes.

Do not begin queue, provider, network, Contributor app, credential, submission,
or unrelated module work.

## Stop conditions

Stop and report when:

- the formal D12 fake-only case or expected error classification is ambiguous;
- existing tests cannot be attributed to the production reader and portable
  boundary without changing code;
- the review would require device evidence, sensitive values, or production
  architecture;
- an open pull request already owns D12;
- repository state conflicts;
- write access is unavailable.
