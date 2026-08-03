# Solo-project review exception

## Purpose and classification

This exception is a last-resort merge gate for a repository that has only one
eligible human maintainer. It provides an isolated second review with an exact,
auditable record. It is **not independent human review**, must never be
described as independent review, and must not be represented by the author's
own GitHub `Approve` review.

An independent human reviewer remains the preferred review path. This exception
does not lower a requirement imposed by branch protection, organization policy,
law, regulation, contract, or a third-party release process.

## Applicability

The exception may be considered only when every condition below is recorded in
the pull request:

1. the repository has one eligible human maintainer with write access;
2. no other eligible human is reasonably available for the pull request;
3. no external rule requires two-person or independent approval;
4. the pull request is narrow enough for one frozen base/head comparison to be
   reviewed in full;
5. the change is not in a prohibited category below;
6. the pull request remains unmerged while the exception review is performed;
7. the maintainer accepts that this is weaker than independent human review and
   records that limitation explicitly.

Convenience, urgency, reviewer delay, or a desire to satisfy a GitHub approval
count is not an applicability condition.

## Prohibited uses

The exception must not be used to:

- claim or replace Android, AutoJs6, provider, network, device, or production
  execution evidence;
- create, upgrade, or relabel a device-validation or production result as PASS;
- add, expose, rotate, or weaken controls for credentials, tokens, signing keys,
  authentication, authorization, secrets, or private user data;
- authorize a production release, package publication, billing change, final
  submission, or irreversible external action;
- approve destructive data operations, irreversible migrations, or changes
  whose rollback has not been proved;
- bypass branch protection, a required reviewer, CODEOWNERS, an organization
  rule, or any legal, contractual, regulatory, or audit requirement;
- conceal unresolved findings, failed checks, sensitive data, or scope drift;
- treat the author's own GitHub `Approve` action as independent evidence.

A pull request that changes this exception may use it only for initial
single-maintainer adoption or for a restriction that is at least as strict. The
record must identify the use as a **bootstrap solo-governance review**. A change
that weakens applicability, prohibited uses, isolation, evidence, invalidation,
or labeling requires independent human review.

## Freeze the candidate

Before the second review begins, record all of the following:

- repository and pull-request number;
- base branch and exact base SHA;
- head branch and exact head SHA;
- UTC review start time;
- the selected review path;
- the complete changed-file list from the exact base/head comparison.

The candidate is frozen at that head SHA. Any new commit, amended commit,
force-push, base-branch change, conflict resolution, generated-file change, or
manual edit after review begins invalidates the result. The complete exception
review must then start again against the new exact base/head pair.

## Required separation

Choose exactly one path. Both paths require a new context.

### Path A: cooling period

1. Stop authoring for at least 24 continuous hours after the candidate head was
   created.
2. Start a new review context that does not contain the authoring conversation,
   draft rationale, or earlier assistant memory.
3. Review a clean, read-only checkout of the frozen candidate.

### Path B: isolated second review

1. Start a separate, fresh review execution that does not inherit the authoring
   conversation, draft rationale, or earlier assistant memory.
2. Give that context only the repository governance, active-task contract, pull
   request metadata, exact base/head SHAs, and repository contents.
3. Use a clean, read-only checkout at the frozen head. The author may initiate
   the review but must not steer it toward a desired conclusion or suppress
   findings.

An ordinary reread in the authoring chat, hidden chain-of-thought, a summary
written by the author, or a second GitHub account controlled by the same person
does not create a fresh context or independent review.

## Mandatory second-review procedure

The fresh context must perform every step:

1. reread `AGENTS.md`, `PROJECT_GOVERNANCE.md`, `PROJECT_STATE.md`,
   `DECISIONS.md`, `NEXT_ACTION.md`, and this exception;
2. confirm the pull request still owns the authorized active task and list its
   prohibited scope;
3. inspect the complete `base...head` diff for every changed file, including
   tests, documentation, configuration, generated artifacts, and deletions;
4. for generated artifacts, verify reproducibility and freshness rather than
   trusting a shortened or ignored diff;
5. check correctness, regression risk, runtime boundaries, privacy, secrets,
   sensitive data, scope, rollback, and claim discipline;
6. run `npm run check`, `git diff --check`, and the repository secret-pattern
   scan against the frozen candidate;
7. record every finding with severity, affected path, disposition, and residual
   risk; silence is not evidence that a category was considered;
8. fail the gate when any finding remains unresolved, a required check fails,
   the diff cannot be reviewed completely, or the candidate changes;
9. produce exactly one pull-request record in the format below.

The second review may conclude only `SOLO EXCEPTION GATE: PASS` or
`SOLO EXCEPTION GATE: FAIL`. PASS means only that this documented substitute
gate was satisfied for the exact SHAs. It is not an independent approval and
does not prove production or device behavior.

## Required pull-request record

Post a top-level pull-request comment beginning with this exact banner:

> **SOLO-PROJECT EXCEPTION — NOT INDEPENDENT HUMAN REVIEW**

The comment must include:

- exception type, including `bootstrap solo-governance review` when applicable;
- repository, pull request, base branch/SHA, head branch/SHA, start/end time,
  and Path A or Path B;
- applicability evidence and every prohibited-use check;
- the complete changed-file list or an exact command that reproduces it;
- confirmation that the entire diff, including generated artifacts and
  deletions, was reviewed;
- exact commands and outcomes for full checks, diff checks, and secret review;
- a risk table containing risk, evidence, mitigation, and residual risk;
- findings and dispositions, including an explicit `none` when applicable;
- the isolated reviewer's classification and the statement that it is not an
  independent human reviewer;
- `SOLO EXCEPTION GATE: PASS` or `SOLO EXCEPTION GATE: FAIL`;
- the invalidation and expiry conditions below.

Do not submit a self-approval review. The top-level comment is the audit record
and must remain visibly distinct from GitHub's independent-review controls.

## Invalidation, expiry, and loss of eligibility

An exception record is valid only for the named pull request and exact
base/head SHAs. It becomes invalid immediately when:

- either SHA changes or the branch is force-pushed;
- any required check no longer passes;
- a new finding, sensitive-data concern, or scope expansion appears;
- the pull request enters a prohibited category;
- an external independent-review requirement becomes applicable;
- another eligible human maintainer or reviewer becomes reasonably available
  before merge;
- seven days pass after the recorded review end time without merge.

When another eligible human becomes available, this exception is unavailable
for new pull requests and any unmerged exception record expires. Return to
independent human review. A merged historical record remains part of the audit
trail but is not precedent for later pull requests.

## Merge and claim discipline

The maintainer may merge only after a current PASS record exists, all other
repository gates pass, and no invalidation condition applies. The pull-request
description and merge report must say that the change used the solo-project
exception and did not receive independent human review.

The exception never authorizes phone interaction, Android picker use, device
execution, production execution, or a PASS claim that requires such evidence.
