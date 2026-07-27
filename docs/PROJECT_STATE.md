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

**Phase: runtime-neutral implementation.**

The repository contains product scope and architecture documentation,
runtime-neutral validation for the current metadata contract, and a Node.js
offline harness. The active milestone implements the portable core for Android
Image Input Adapter V1.0. No Android `ContentResolver`, AutoJs6, network,
provider, Contributor app, or device-specific implementation is included. See
the [portable core integration document](modules/android-image-input-core-v1.md).

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
- Active implementation pull request: draft to be opened into `main`
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

- There are no device or user-intervention blockers for the current offline
  portable-core task.
- Production Android `ContentResolver` and AutoJs6 adapters are not
  implemented. They are outstanding production work, not part of this task.
- Later Android device behavior, permissions, supported formats, MIME
  reporting, cleanup, and AutoJs6 compatibility require user-assisted testing.
  This is a future production blocker, not a blocker for offline implementation.
- Remote provider and Contributor app integration remain unimplemented and
  outside the active milestone.
- No provider credential strategy has been approved or implemented. Secrets
  must remain outside Git.

These blockers do not prevent offline core validation or documentation work.

## Next planned actions

1. Implement and review the Android Image Input Adapter V1.0 portable core,
   offline tests, and integration documentation.
2. Keep the complete Android Image Input Adapter V1.0 historical module
   `NOT YET MIGRATED`.
3. Do not begin Android `ContentResolver` or AutoJs6 integration in this
   milestone.
4. After portable-core review, wait for user direction before production
   adapter work.
5. Verify Android-specific behavior later on an authorized Android and AutoJs6
   environment with user participation.

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
