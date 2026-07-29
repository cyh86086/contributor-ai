# Next action

Last reviewed: 2026-07-29
Defined by merged governance PR: `#12`
Execution baseline: resolve the live `main` SHA during mandatory preflight. This
document does not attempt to predict the merge commit that introduces it.

## Active task

**Task ID:** `D06-EVIDENCE-GAP-REVIEW`

**Objective:** Determine whether the existing D01-D05 launcher and reader path
already exposes every distinct fact required by D06 (MIME returned through the
Android `ContentResolver`) or whether D06 needs a separate deterministic device
launcher or evidence procedure.

This is an evidence-gap review before implementation. It must not automatically
create a duplicate launcher.

## Required work

1. Complete the mandatory preflight in `PROJECT_GOVERNANCE.md`.
2. Inspect the current D01-D05 manifest, launcher core, AutoJs6 runtime adapter,
   production image reader, tests, and device-verification plan.
3. Identify the exact source of the MIME value reported by D01-D05.
4. Compare that source and evidence contract with the D06 row in the verification
   matrix.
5. Produce one reviewed conclusion:
   - existing evidence can satisfy D06 after a distinct scoped evidence record;
   - existing code needs a minimal evidence-only change; or
   - D06 requires user-assisted device action before any conclusion.
6. Add only the minimum documentation, tests, or launcher change required by the
   conclusion.
7. Run all applicable repository checks and update project state in the same PR.

## Acceptance criteria

- No duplicate MIME mapping or second image-reader implementation is introduced.
- The conclusion cites exact repository files and runtime boundaries.
- No D06 PASS is claimed without distinct reviewed evidence matching D-011.
- Node.js checks are not represented as Android proof.
- `npm run check` and `git diff --check` pass for repository changes.
- The task has a GitHub commit and pull request before it is called complete.
- `NEXT_ACTION.md` is updated to the next single task in the same completed PR.

## Prohibited scope

Do not add queue, AI provider, network, Contributor app, automatic submission,
credential handling, or unrelated image-validation modules during this task.

## Stop conditions

Stop and report without implementing when:

- repository facts relevant to this task changed after review and have not
  been reconciled;
- an open PR already owns D06 work;
- GitHub write access is unavailable;
- the repository cannot prove where the reported MIME originates;
- device action is required to distinguish the possible conclusions.
