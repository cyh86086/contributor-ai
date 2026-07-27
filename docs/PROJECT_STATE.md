# Project state

Last updated: 2026-07-27

## Authority

`cyh86086/contributor-ai` is the single source of truth for Contributor AI.
Chat history, generated ZIP archives, local examples, and other uncommitted
artifacts are non-authoritative unless they are reviewed and committed to this
repository.

GitHub is the authoritative code history and release history. Codex performs
repository implementation, tests, commits, branch management, and pull request
work. Repository changes become authoritative only through Git history; Codex
conversation output by itself is not project state.

Every new development task must begin by reading this document and
[`DECISIONS.md`](DECISIONS.md).

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

**Phase: D01 validated; remaining Android device verification pending.**

The repository contains product scope and architecture documentation,
runtime-neutral validation for the current metadata contract, and a Node.js
offline harness. The Android Image Input Core V1.0 portable implementation is
merged. The AutoJs6 Android Image Reader V1.0 specification is merged. The
classified reader-error boundary, AutoJs6 Android Image Reader V1.0 production
source, general device-verification package, and one-click D01 JPEG launcher
are merged. The first Vivo X Fold5 and AutoJs6 v6.7.0 `arm64-v8a` execution
stopped at bundle parsing before the Android picker opened. PR #9 merged the
reviewed deterministic legacy-syntax correction and passed the complete
offline verification suite. D01 subsequently passed on Vivo X Fold5 with
AutoJs6 v6.7.0 `arm64-v8a` against authoritative main SHA
`5720caa5015eaee9277c9ec6b8d38dc85e5ed2c9`. The scoped evidence is recorded
in
[`testing/device-validation/d01-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d01-vivo-x-fold5-autojs6-v6.7.0.md).
The active milestone documents this result and prepares for the remaining
formats, failures, limits, cleanup, repetition, and memory cases, which remain
unverified.

## Current branch and pull request

- Authoritative branch: `main`
- Pull request: [#1 — Bootstrap Contributor AI AutoJs6 project](https://github.com/cyh86086/contributor-ai/pull/1)
- Target branch: `main`
- Pull request state for this baseline: squash-merged
- Source branch: `feature/bootstrap-project` deleted after merge
- Active specification branch:
  `feature/spec-android-image-input-adapter-v1`
- Active specification pull request:
  [#2 — Specify Android Image Input Adapter V1.0](https://github.com/cyh86086/contributor-ai/pull/2)
- Specification pull request state: squash-merged
- Active implementation branch: `feature/implement-image-input-core-v1`
- Active implementation pull request:
  [#3 — Implement Android Image Input Core V1.0](https://github.com/cyh86086/contributor-ai/pull/3)
- Implementation pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `234a7ff02d0451ba014a2219147a41366357a3a6`
- Active reader-specification branch:
  `feature/spec-autojs6-image-reader-v1`
- Active reader-specification pull request:
  [#4 — Specify AutoJs6 Android Image Reader V1.0](https://github.com/cyh86086/contributor-ai/pull/4)
- Reader-specification pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `939f87c2f522fe9e0f7faae180c76feb1e3d6827`
- Active classified-error branch:
  `feature/classified-image-reader-errors-v1`
- Active classified-error pull request:
  [#5 — Support Classified Image Reader Errors V1.0](https://github.com/cyh86086/contributor-ai/pull/5)
- Classified-error pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `a462f8fe6533f10c23d8445d31d57b4f38d3f90b`
- Active production-reader branch:
  `feature/implement-autojs6-image-reader-v1`
- Active production-reader pull request:
  [#6 — Implement AutoJs6 Android Image Reader V1.0](https://github.com/cyh86086/contributor-ai/pull/6)
- Production-reader pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `be978cb2da2426bde9c08c2ecf5df91fe5203f2c`
- Active device-verification preparation branch:
  `feature/prepare-image-reader-device-verification-v1`
- Active device-verification preparation pull request:
  [#7 — Prepare AutoJs6 Image Reader Device Verification V1.0](https://github.com/cyh86086/contributor-ai/pull/7)
- Device-verification preparation pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `fbf12737be6f661f52969325489a1c19bce86163`
- Active D01 launcher branch:
  `feature/autojs6-d01-one-click-launcher-v1`
- Active D01 launcher pull request:
  [#8 — Prepare AutoJs6 D01 One-Click JPEG Device Check V1.0](https://github.com/cyh86086/contributor-ai/pull/8)
- D01 launcher pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `0324d640e390da7c2c905fb9d2d8e134ee1e7149`
- D01 compatibility-fix branch:
  `fix/autojs6-d01-reserved-class-keyword-v1`
- D01 compatibility-fix pull request:
  [#9 — Fix AutoJs6 D01 Reserved Class Keyword Compatibility V1.0](https://github.com/cyh86086/contributor-ai/pull/9)
- D01 compatibility-fix pull request state: squash-merged
- Resulting authoritative `main` SHA:
  `80717606209f3f01c3bfc232a4d16016bf14c368`
- Compatibility-fix branch state: deleted locally and remotely
- Active device-validation documentation branch:
  `docs/d01-device-validation-v1`
- Active device-validation documentation pull request: draft; number assigned
  after publication
- Release status: no production release

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

- The first Vivo X Fold5 and AutoJs6 v6.7.0 `arm64-v8a` execution against main
  SHA `0324d640e390da7c2c905fb9d2d8e134ee1e7149` failed during parsing because
  the generated bundle used the reserved keyword `class` at line 59. PR #9
  corrected the known syntax blocker, and D01 passed on the same device and
  runtime against main SHA
  `5720caa5015eaee9277c9ec6b8d38dc85e5ed2c9`.
- Production reader source is present. Real Android `ContentResolver`, Java
  bridge, picker, JPEG read, MIME detection, and UI responsiveness now have
  scoped D01 evidence. Other formats and the remaining device matrix are
  unverified.
- Permission revocation, missing sources, MIME fallback, empty input, size
  boundaries, repeated reads, cleanup instrumentation, memory behavior, and
  the remaining stop conditions require user-assisted evidence.
- Remote provider and Contributor app integration remain unimplemented and
  outside the active milestone.
- No provider credential strategy has been approved or implemented. Secrets
  must remain outside Git.

The D01 blocker is resolved for the exact tested device, runtime, SHA, and JPEG
case. This result does not establish complete module migration.

## Next planned actions

1. Review and merge the scoped D01 device-validation record.
2. Continue the remaining device-verification matrix with an exact main SHA
   and sanitized evidence for each case.
3. Keep the complete Android Image Input Adapter V1.0 historical module
   `NOT YET MIGRATED`.
4. Do not add network, provider, queue, Contributor app, submission, or
   device-specific behavior.
5. Do not infer full device compatibility or module completion from the single
   D01 JPEG PASS.

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
