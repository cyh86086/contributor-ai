# Next action

Last reviewed: 2026-07-31
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D09-EVIDENCE-GAP-REVIEW`

**Objective:** Inspect the authoritative repository validation plan and existing
implementation for D09, identify the exact production-runtime evidence gap, and
record the smallest governed next step without implementing unrelated behavior.

## Required work

1. Complete the mandatory repository preflight.
2. Confirm a clean authoritative `main` and record its exact SHA.
3. Locate the authoritative D09 definition, related source, tests, generated
   launchers, user guides, and existing evidence.
4. Determine precisely what offline checks already prove and what Android /
   AutoJs6 production evidence remains missing.
5. Search for duplicate implementation and open pull requests that already own
   D09.
6. Update project state and this file through a documentation pull request.

## Acceptance criteria

- The review cites repository source rather than chat history or temporary files.
- The exact D09 case, scope, expected result, required device/runtime fields,
  privacy limits, and stop conditions are recorded.
- Offline checks are not represented as Android or AutoJs6 device evidence.
- No new reader, permission manager, picker, provider, queue, network,
  Contributor app, credential, or submission behavior is introduced.
- Project state and the single active next action remain consistent.
- Applicable checks, diff review, and secret review pass.
- A GitHub commit and pull request exist before the review is complete.

## Prohibited scope

Do not execute a device case, add a launcher, change production behavior, add a
permission manager, persistable grant, second picker, second reader, provider,
network, queue, Contributor app automation, credentials, or automatic
submission during this evidence-gap review.

## Stop conditions

Stop and report when:

- the authoritative D09 definition cannot be located;
- repository facts conflict or an open pull request already owns D09;
- required source or specification is missing;
- the proposed work would infer production behavior from Node.js checks;
- write access is unavailable;
- sensitive information may have appeared.
