# Project state

Last updated: 2026-07-29

## Authority

`cyh86086/contributor-ai` is the single source of truth for Contributor AI.
Chat history, generated ZIP archives, local examples, and other uncommitted
artifacts are non-authoritative unless they are reviewed and committed to this
repository.

GitHub is the authoritative code history and release history. Codex performs
repository implementation, tests, commits, branch management, and pull request
work. Repository changes become authoritative only through Git history; Codex
conversation output by itself is not project state.

Every new development task must begin by reading this document,
[`DECISIONS.md`](DECISIONS.md), [`NEXT_ACTION.md`](NEXT_ACTION.md), and
[`PROJECT_GOVERNANCE.md`](PROJECT_GOVERNANCE.md). The mandatory preflight must
also verify the latest `main` SHA, open pull requests, existing implementation,
current blockers, and repository write access before any development begins.

## Product definition

Contributor AI is an Android AutoJs6 microstock automation application. It is
not a GitHub repository-contribution automation product.

The production flow is:

1. The user selects multiple photos from the Android gallery.
2. AutoJs6 reads Android `content://` image URIs.
3. Images are sent to an AI Vision provider.
4. The provider returns:
   - an English microstock description under 2,000 characters;
   - exactly seven English keywords.
5. AutoJs6 opens the Contributor Android app.
6. It fills the Description and Keywords fields.
7. The user reviews and manually confirms submission.

## Runtime architecture

- **Production runtime:** Android and AutoJs6.
- **Runtime-neutral modules:** portable business logic with no dependency on
  Android, AutoJs6, Node.js, a remote provider SDK, or the Contributor app.
- **Node.js:** offline tests, linting, formatting, local deterministic
  validation, and CI only. Node.js is not the production runtime.
- **Remote providers:** OpenAI or Gemini may supply AI Vision metadata through
  a future production adapter. No remote provider adapter is implemented yet.
- **Development environment:** GitHub stores authoritative code and release
  history; Codex carries out repository and version-control work.

See [`runtime-matrix.md`](runtime-matrix.md) for detailed boundaries.

## Current phase

**Phase: D01-D06 scoped device validation passed; D07-D26 and complete
module migration remain pending.**

PR #11 merged the deterministic D02 PNG, D03 WebP, D04 HEIC, and D05 HEIF
verification launchers as authoritative main SHA
`ad52d122e239e0431c9fd2d3c2cdedf383f8b0da`. All four launchers subsequently
passed on Vivo X Fold5 with AutoJs6 v6.7.0 `arm64-v8a` against that exact SHA.
The scoped evidence is recorded in
[`testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md).

D01 remains scoped to its recorded SHA and evidence file. D02-D05 are scoped to
`ad52d12...` and their evidence file. These five PASS results do not establish
MIME fallback, permission failure, missing source, size boundaries, cleanup,
repetition, memory behavior, complete device compatibility, provider behavior,
queue behavior, Contributor app automation, or module migration.

The D06 evidence-gap review found that D01-D05 final MIME records could not
prove MIME provenance because `prepareImageInput()` may use byte-signature
fallback. PR #14 added an evidence-only D06 launcher that calls the existing
production reader directly, and PR #15 reconciled every generated bundle.
D06 then passed on Vivo X Fold5 with Android 16 and AutoJs6 v6.7.0 `arm64-v8a`
against authoritative main SHA
`6704ed97553f1bba60b7bf9120d6ba84d44715ca`. The independently confirmed
6,406-byte JPEG fixture returned `image/jpeg` with `uiResponsive: true`. The
scoped evidence is recorded in
[`testing/device-validation/d06-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d06-vivo-x-fold5-autojs6-v6.7.0.md).

The D07 evidence-gap review then confirmed that the existing portable and
fake-resolver tests prove the fallback contract but do not constitute distinct
Android / AutoJs6 device evidence. The reviewed minimum is an evidence-only
wrapper around the existing production reader: preserve access and exact bytes,
remove only the returned MIME, and pass the wrapper into the existing
`prepareImageInput()` fallback path. The review is recorded in
[`testing/d07-mime-fallback-evidence-gap-review.md`](testing/d07-mime-fallback-evidence-gap-review.md).

The repository uses `NEXT_ACTION.md` as the single active-task register and
`PROJECT_GOVERNANCE.md` as the mandatory execution protocol.

## Current branch and pull request

- Authoritative branch: `main`
- Governance baseline established by
  [#12 — Repair project governance and record D02-D05 evidence](https://github.com/cyh86086/contributor-ai/pull/12)
- PR #12 state: squash-merged
- Governance baseline merge SHA:
  `8eeef1642e33853e75938dd16d7bbbbc1627a9ee`
- PR #12 source branch `docs/project-governance-repair-v1`: deleted after merge
- Open pull-request snapshot immediately after PR #12 merge: none
- The live `main` SHA is fetched during every mandatory preflight; it is not
  duplicated here as a self-referential current-state invariant.
- Release status: no production release

Historical PR detail remains available in Git history and PRs #1-#11. This
snapshot records current state rather than repeating every completed branch.

## Historical target module status

All historical target modules are **NOT YET MIGRATED**:

| Historical target module                                                      | Status           |
| ----------------------------------------------------------------------------- | ---------------- |
| Launcher V1.3                                                                 | NOT YET MIGRATED |
| Queue Engine V1.0                                                             | NOT YET MIGRATED |
| AI Engine V1.0                                                                | NOT YET MIGRATED |
| Queue-AI Orchestrator V1.0                                                    | NOT YET MIGRATED |
| Contributor Engine V1.0                                                       | NOT YET MIGRATED |
| Mock UI Adapter                                                               | NOT YET MIGRATED |
| Vision Provider Interface V1.0                                                | NOT YET MIGRATED |
| AutoJs6 HTTP Adapter                                                          | NOT YET MIGRATED |
| [Android Image Input Adapter V1.0](modules/android-image-input-adapter-v1.md) | NOT YET MIGRATED |

No historical module may be marked complete unless all of the following exist
in GitHub:

1. the module source;
2. module tests;
3. an explicit runtime designation;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit.

A module mentioned in chat, a generated ZIP, or a local example does not
satisfy these requirements.

## Current blockers

- D06 has a scoped PASS for the exact recorded device, runtime, SHA, fixture,
  resolver MIME, byte count, and UI-responsiveness result.
- The D07 evidence-gap review concluded that existing Node.js fallback tests
  do not independently establish Android / AutoJs6 evidence. D07 requires one
  minimal controlled harness that removes only the reader MIME while preserving
  production-reader bytes and the existing portable fallback path; no D07 PASS
  exists yet.
- D08-D26 still require scoped review, preparation, and in several cases
  user-assisted Vivo X Fold5 evidence.
- Android Image Input Adapter V1.0 remains **NOT YET MIGRATED** until every
  repository migration and device-verification criterion is satisfied.
- Remote provider, network transport, queue, Contributor app integration, and
  submission behavior remain unimplemented and outside the current milestone.
- No provider credential strategy has been approved. Secrets must remain
  outside Git.
- Automation workflow blocker: the current ChatGPT GitHub Connector can read
  repository metadata, files, commits, and PRs, but branch and Contents writes
  returned HTTP 403 and the connector reported no installed accounts or
  installations. This is read-only authorization, not a GitHub disconnection.
  Automated branch, commit, and PR work through that connector must remain
  stopped until write authorization is restored or an approved local-repository
  workflow is used.

## Next planned actions

The only active task is defined in [`NEXT_ACTION.md`](NEXT_ACTION.md).
At this snapshot it is `D07-HARNESS-PREPARATION`.

No queue, provider, network, Contributor app, credential, submission, or other
unrelated feature work may begin while that task is active. If repository state
changes, an open PR already owns the work, or GitHub write access is unavailable,
stop and reconcile state rather than generating detached implementation.

## Verification rules

- Run `npm run check` for every repository change that affects code,
  configuration, or executable examples.
- Run the repository secret-pattern scan before every commit and pull request
  update.
- Keep runtime-neutral modules free of Node.js, AutoJs6, Android, provider SDK,
  and Contributor app dependencies.
- Keep Node.js code isolated as offline development and CI tooling.
- Verify production integrations in Android and AutoJs6; Node.js tests cannot
  establish production-runtime completion.
- Do not claim a historical module is migrated or complete unless it satisfies
  every requirement in the historical target module status section.
- Do not claim a release exists unless its source, version, checks, and release
  record exist in GitHub.
- Require user review and manual confirmation for every final submission.

## Future user intervention

The user must:

- assist with the remaining Vivo X Fold5 and AutoJs6 device-verification
  matrix and provide only sanitized results;
- grant Android permissions and select photos;
- choose and authorize any remote AI Vision provider;
- supply provider credentials outside the repository when provider support
  exists;
- review generated descriptions and keywords;
- manually confirm every final submission in the Contributor app;
- provide or approve authoritative historical module sources and
  specifications before migration;
- explicitly approve any future proposal to automate final submission, because
  it is outside the current approved scope.

## Required state maintenance

Update this document in the same pull request whenever any of the following
changes:

- module status;
- project phase;
- a blocker;
- runtime architecture;
- next milestone or planned action;
- release status.
