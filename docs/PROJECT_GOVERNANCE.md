# Contributor AI project governance

## Purpose

This document defines the mandatory execution protocol for repository work. It
exists to prevent stale state, duplicate implementation, detached artifacts,
unsupported completion claims, and repeated work caused by chat-memory drift.

## Authority

`cyh86086/contributor-ai` is the only authoritative source of project truth.
Chat history, temporary directories, generated ZIP archives, and local examples
are not project state unless reviewed and committed to this repository.

## Mandatory preflight

Before planning or changing anything, the executor must complete every item:

1. Read repository metadata and confirm `cyh86086/contributor-ai`.
2. Read the latest authoritative `main` SHA.
3. Read `docs/PROJECT_STATE.md`.
4. Read `docs/DECISIONS.md`.
5. Read `docs/NEXT_ACTION.md`.
6. Check all open pull requests and active branches relevant to the task.
7. Search the repository to prove the proposed work does not already exist.
8. Confirm blockers, user-intervention requirements, and available write access.

If any item cannot be completed, or the documents conflict with GitHub state,
feature development must stop. State reconciliation is the only permitted work.

A historical or evidence-scoped SHA does not conflict merely because `main`
advanced later. Only fields explicitly labeled as current live state must match
the preflight result.

## One active task

Only the single active task in `docs/NEXT_ACTION.md` may be executed. The task
must define its scope, acceptance criteria, stop conditions, and prohibited
scope. No second task may begin until the first is completed, blocked, replaced
through review, or explicitly cancelled.

## Repository-first execution

Implementation must begin from the current repository source. Temporary storage
may be used only for builds, tests, patches, or exported artifacts derived from
the repository. It must not be used to recreate modules from memory or to claim
project completion.

Before adding a module, helper, validator, adapter, or document, search for the
same responsibility in the existing source and tests. Prefer the smallest
change to the existing architecture. Historical chat-generated modules must
follow the migration requirements in `PROJECT_STATE.md` and `DECISIONS.md`.

## Definition of done

A repository task is complete only when all applicable items exist:

1. reviewed repository changes on a task branch, or an explicitly approved
   direct commit;
2. required tests, lint, formatting, build-freshness, and syntax checks pass;
3. `git diff --check` passes;
4. secret and sensitive-data review passes;
5. project state and next action are updated in the same change;
6. a commit exists in GitHub;
7. a pull request exists and accurately states scope and verification;
8. device claims have exact scoped evidence where production behavior is
   involved.

Anything missing these conditions is a draft, patch, test artifact, or proposal.
It must not be reported as a completed project feature.

## Stop conditions

Stop implementation and report status when any of the following applies:

- repository state and governance documents disagree;
- an open pull request already owns the active task;
- the active task is missing or ambiguous;
- required source, specification, credential, permission, fixture, or device
  action is unavailable;
- production behavior would be inferred only from Node.js or offline checks;
- the proposed work would broaden approved scope;
- write access is unavailable;
- tests fail and the cause is not yet understood;
- sensitive data may have appeared.

Do not improvise around a stop condition.

## GitHub connector classification

A successful repository read does not prove write authorization. Read and write
capabilities must be tested separately.

If metadata and files can be read but branch, contents, commit, or pull-request
writes return HTTP 403, classify the condition exactly as:

> GitHub Connector is connected for read access but lacks repository write
> authorization.

Do not call this a GitHub outage or disconnected repository. Do not repeatedly
retry the same write. Request reauthorization with repository Contents and Pull
requests write access, or use an approved local repository workflow.

## Evidence and claim discipline

Device-validation claims must identify the exact device, runtime, authoritative
SHA, case, sanitized result, and known limitations. A PASS applies only to that
scope. Missing values must be recorded as not supplied; they must never be
reconstructed.

Offline tests prove only their stated contracts. They cannot establish Android,
AutoJs6, provider, network, Contributor app, or submission behavior.

## State maintenance

Update `PROJECT_STATE.md`, `NEXT_ACTION.md`, and affected evidence documents in
the same change whenever the phase, blocker, open PR, active task, device result,
module status, or release status changes.

Do not encode the live `main` SHA as a self-referential invariant inside a pull
request that will create a new merge SHA. Fetch the live SHA during preflight.
Store exact SHAs only when they identify historical commits or scope device
evidence.

`PROJECT_STATE.md` is a current snapshot, not a chronological substitute for Git
history. Historical detail belongs in commits, pull requests, decisions, and
scoped evidence records.

## Required task report

Every proactive task report uses only these headings:

- Read state
- Executed task
- Modified files
- Verification
- Commit / PR
- Next action
- Blocker

If no repository change occurred, say so explicitly and state the stop condition.
If the same blocker occurs in two consecutive proactive tasks, provide two or
three resolution options, their trade-offs, and one recommended option.
