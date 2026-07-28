# Binding decisions

This document records binding architectural and operating decisions for
Contributor AI. Changes require an explicit repository change and review.

## D-001: GitHub is the authoritative source

**Decision:** GitHub is the only authoritative source of project truth. The
committed repository defines the code, documentation, module status, and
release history. Chat history, generated archives, and local examples are not
authoritative unless committed.

## D-002: Contributor AI is an Android microstock product

**Decision:** Contributor AI is an Android AutoJs6 application that takes
multiple gallery photos, obtains English microstock metadata from an AI Vision
provider, enters it into the Contributor Android app, and stops for human
review and confirmation. It is not repository-contribution automation.

## D-003: AutoJs6 is the production runtime

**Decision:** Production execution occurs on Android through AutoJs6. Android
image access, provider transport, and Contributor app interaction belong to
production adapters or migrated production modules.

## D-004: Node.js is not the production runtime

**Decision:** Node.js is limited to offline tests, deterministic examples,
linting, formatting, and CI. Passing Node.js checks alone does not verify
Android or AutoJs6 production behavior.

## D-005: Separate portable logic from Android adapters

**Decision:** Runtime-neutral core logic must remain separate from
Android-specific and AutoJs6-specific adapters. The core may not depend on
Android APIs, AutoJs6 APIs, Node.js APIs, provider SDKs, or Contributor app UI
details.

## D-006: Codex performs repository operations

**Decision:** Codex performs repository implementation, tests, commits, branch
management, and pull request work. Those actions must follow repository rules,
and their results are authoritative only after they exist in GitHub.

## D-007: Never commit secrets

**Decision:** API keys, tokens, credentials, and secrets may not be committed.
Future provider credentials must be supplied through an approved runtime secret
mechanism outside Git.

## D-008: Historical modules require migration and verification

**Decision:** Historical chat-generated modules must not be silently recreated
or marked complete. A historical module is complete only when its source,
tests, runtime designation, integration documentation, passing checks, commit,
and pull request exist in GitHub as required by
[`PROJECT_STATE.md`](PROJECT_STATE.md).

## D-009: Read authoritative context before development

**Decision:** Every new development task must first read
[`PROJECT_STATE.md`](PROJECT_STATE.md) and this document before planning or
changing the repository.

## D-010: Final submission requires the user

**Decision:** All user-visible final submissions remain manually reviewed and
confirmed by the user. Automatic final submission is outside the current
approved scope unless the user explicitly enables it through a later
repository decision.

## D-011: Device-validation claims are evidence scoped

**Decision:** Every Android or AutoJs6 device-validation claim must identify
the exact device, runtime version, authoritative repository SHA, and test case.
A passing case applies only to that recorded scope. It must not be expanded
into a claim that other formats, failure paths, integrations, devices, or
runtimes pass, and it does not mark a historical module migrated unless every
migration requirement in [`PROJECT_STATE.md`](PROJECT_STATE.md) is satisfied.
