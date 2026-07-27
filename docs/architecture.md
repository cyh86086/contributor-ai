# Architecture

Contributor AI has three architectural areas with different runtime
constraints. Keeping their boundaries explicit prevents the Node.js
development tooling from being mistaken for the Android production
application.

The binding project state and architecture decisions are recorded in
[`PROJECT_STATE.md`](PROJECT_STATE.md) and
[`DECISIONS.md`](DECISIONS.md).

## Runtime-neutral core modules

`src/core/` contains small JavaScript rules that do not depend on Node.js,
AutoJs6, Android, a particular AI provider, or the Contributor app.

The current core validates:

- Android gallery references use the `content://` scheme;
- a generated description is non-empty, English text under 2,000 characters;
- a generated result contains exactly seven non-empty English keywords.

The core is not an engine or an orchestrator. It does not perform I/O, schedule
work, call AI services, launch apps, or submit content.

## AutoJs6 Android adapters

`src/autojs6_adapters/` is reserved for production-runtime integration
boundaries. Future adapters are expected to cover Android concerns such as
reading gallery `content://` URIs, making provider HTTP requests through
AutoJs6, opening the Contributor app, and filling its fields.

No Android adapter is implemented in this bootstrap. The reserved area must
not be interpreted as a replacement for the historical AutoJs6 HTTP Adapter or
Android Image Input Adapter V1.0.

The Android layer must stop after field entry. Final submission is a manual
user action.

## Node.js offline test harness

`src/offline_harness/` exists only for local development and CI. It uses
deterministic sample metadata to exercise the runtime-neutral validation rules
without:

- running AutoJs6;
- accessing an Android content resolver;
- reading real gallery photos;
- calling an AI Vision provider;
- controlling the Contributor app.

Node.js is not the production runtime.

## Remote AI Vision providers

OpenAI or Gemini may provide remote image analysis in the production flow.
They are external services, not local runtime modules. Future calls must pass
through an approved production interface or AutoJs6 adapter, use credentials
supplied outside Git, and return the JSON contract defined in
[`product-scope.md`](product-scope.md).

No remote provider integration exists in this bootstrap.

## Contributor Android app

The Contributor app is an external Android application controlled through a
future approved AutoJs6 UI boundary. Contributor AI may open the app and fill
the Description and Keywords fields. It must stop for user review; the user
manually confirms final submission.

## GitHub and Codex development environment

GitHub stores the authoritative code and release history. Codex performs
repository implementation, tests, commits, branches, and pull request work.
Neither GitHub nor Codex is part of the production Android data flow.

## Intended production data flow

```text
Android gallery selection
  -> AutoJs6 image input boundary
  -> selected content:// URI
  -> AI Vision request boundary
  -> description + exactly 7 keywords
  -> runtime-neutral validation
  -> Contributor app field-entry boundary
  -> user review
  -> manual submission
```

## Historical module boundary

The names and versions below refer to historical product modules, not to
generic folders or placeholder classes:

- Launcher V1.3
- Queue Engine V1.0
- AI Engine V1.0
- Queue-AI Orchestrator V1.0
- Contributor Engine V1.0
- Mock UI Adapter
- Vision Provider Interface V1.0
- AutoJs6 HTTP Adapter
- Android Image Input Adapter V1.0

They are intentionally absent from the current source tree. Reintroducing any
of them requires its authoritative contract and is outside this bootstrap.

## Safety boundaries

- Never store API keys in source control.
- Treat images and generated metadata as potentially sensitive user data.
- Send image data only to the configured provider.
- Validate provider output before entering it into another app.
- Require the user to review all populated fields.
- Never automate the final submission confirmation.
