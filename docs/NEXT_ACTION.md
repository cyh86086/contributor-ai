# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D11-EVIDENCE-GAP-REVIEW`

**Objective:** Review the repository evidence gap for verification-matrix D11:
the selected source is deleted after selection while authorization history
remains, with expected stable result `IMAGE_READ_FAILED`.

The review must distinguish a missing source from permission denial and confirm
whether a reproducible, privacy-safe Vivo X Fold5 / AutoJs6 device procedure can
establish the formal case before any launcher is proposed.

## Required work

1. Complete the mandatory repository preflight.
2. Re-read the formal D11 row in the device-verification matrix and the
   production reader's access and read-failure classifications.
3. Inventory existing missing-source, null-stream, ordinary read-failure, and
   permission-denial offline tests.
4. Determine whether the system picker and a non-sensitive controlled source
   support a reproducible delete-after-selection procedure without retaining or
   recording sensitive source information.
5. Determine how the production reader would distinguish a missing source from
   revoked permission on the scoped Android / AutoJs6 runtime.
6. Record the evidence gap, feasibility conclusion, and smallest governed next
   step in a documentation-only pull request.

## Acceptance criteria

- The review preserves formal D11 as a selected source deleted after selection,
  with expected `IMAGE_READ_FAILED` while authorization history remains.
- The review distinguishes missing-source behavior from permission denial and
  the D12 controlled null-stream case.
- No D11 launcher or production behavior is implemented before device
  feasibility and classification are established through review.
- Existing fake or injected tests are classified only as offline contract
  evidence.
- No private-cache copy, broad storage permission, or persistable grant is
  introduced as a substitute for the formal case.
- The result is committed and reviewed through a pull request.

## Prohibited scope

Do not implement a D11 launcher during this task. Do not substitute a null
stream, private-cache lifecycle, fake deletion, or injected error for real
device feasibility. Do not add a permission manager, persistable grants, broad
storage permissions, source-copy architecture, or production reader changes.

Do not begin queue, provider, network, Contributor app, credential, submission,
or unrelated module work.

## Stop conditions

Stop and report when:

- the formal D11 case or expected error classification is ambiguous;
- the selected source cannot be deleted reproducibly after selection;
- the platform cannot distinguish missing-source behavior from permission
  denial in the proposed procedure;
- the review would require sensitive source information or new production
  architecture;
- an open pull request already owns D11;
- repository state conflicts;
- write access is unavailable.
