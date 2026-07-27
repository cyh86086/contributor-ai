# Runtime matrix

| Environment or component               | Responsibilities                                                                                                                     | Allowed dependencies                                                                                                                    | Test method                                                                                     | User intervention required                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Android / AutoJs6 production runtime   | Coordinate gallery selection, read `content://` images, call production adapters, open the Contributor app, and fill metadata fields | AutoJs6 APIs, approved Android APIs, runtime-neutral core, approved production adapters                                                 | Authorized Android device or emulator integration tests plus manual workflow verification       | Yes: permissions, photo selection, provider authorization, review, and final confirmation          |
| Runtime-neutral core                   | Validate portable input and output rules, including URI shape and AI metadata constraints                                            | JavaScript language features and other runtime-neutral modules only; no Node.js, AutoJs6, Android, provider SDK, or app UI dependencies | Shared deterministic unit tests, including the Node.js offline suite                            | No during automated validation; user approval is required for contract changes                     |
| Node.js offline harness                | Run unit tests, deterministic examples, linting, formatting, secret scans, and CI checks                                             | Runtime-neutral core and development-only Node.js tooling; no production Android responsibilities                                       | `npm run check`, `npm start`, and the repository secret-pattern scan                            | No for automated checks; it cannot replace Android acceptance testing                              |
| OpenAI or Gemini remote provider       | Analyze authorized images and return the required description and exactly seven English keywords                                     | Provider HTTPS API through an approved production interface or adapter; runtime credentials supplied outside Git                        | Contract tests with mocks plus authorized provider integration tests that do not expose secrets | Yes: provider selection, consent, credentials, account access, and any usage cost                  |
| Contributor Android app                | Present Description and Keywords fields, show populated metadata, and provide the final submission control                           | Its own Android application runtime; interacted with only through approved AutoJs6 UI automation                                        | Authorized-device UI integration tests and manual acceptance testing                            | Yes: review and manual confirmation of every final submission                                      |
| GitHub / Codex development environment | Store authoritative code and release history; implement, test, commit, branch, and maintain pull requests                            | Repository files, Git/GitHub tooling, Node.js development harness; no production secrets                                                | Repository checks, secret scan, Git diff review, commit history, and pull request review        | Yes for product decisions, historical source approval, PR review, merge, and release authorization |

## Boundary rules

- Android and AutoJs6 are the production runtime.
- Runtime-neutral core code is portable business logic, not a runtime.
- Node.js is an offline development and CI harness only.
- Remote provider calls require user authorization and credentials supplied
  outside the repository.
- The Contributor app owns final submission; Contributor AI stops for user
  review and manual confirmation.
- GitHub records authoritative project and release history; Codex performs
  repository implementation and version-control actions.

## Current production-reader status

The AutoJs6 Android image reader source is isolated under `src/autojs6/` and
uses injected Android and Java dependencies. Node.js verifies its control flow
with fakes only. Real `ContentResolver`, Java bridge, permission, threading,
memory, and cleanup behavior remain subject to later user-assisted Vivo X
Fold5 and AutoJs6 verification.

The current active milestone prepares that work through the
[`AutoJs6 Image Reader V1.0 device-verification plan`](testing/autojs6-image-reader-device-verification-v1.md).
The plan and its safe harness template are test support, not evidence that a
device test has passed.
