# Contributor AI

Contributor AI is a provider-agnostic foundation for automating repository
contribution workflows. The project separates task intake, AI orchestration,
provider integrations, contribution logic, and user interaction so each area
can evolve independently.

## Status

This repository contains the initial production-oriented skeleton. Provider
implementations and repository write operations are intentionally left for
future changes. No API keys or credentials are required to run the current
code.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Getting started

```bash
npm install
npm test
npm start
```

The launcher currently runs a deterministic local workflow with a built-in
provider. It is safe to use without network access or credentials.

## Commands

| Command                | Purpose                               |
| ---------------------- | ------------------------------------- |
| `npm start`            | Run the local Contributor AI launcher |
| `npm test`             | Run the test suite                    |
| `npm run lint`         | Check JavaScript source and tests     |
| `npm run format:check` | Verify formatting                     |
| `npm run check`        | Run all repository checks             |

## Project structure

```text
.
├── assets/             Static project assets
├── docs/               Architecture and contributor documentation
├── release/            Release notes and packaging guidance
├── scripts/            Repository automation
├── src/
│   ├── ai_engine/      AI request orchestration
│   ├── contributor/    Contribution workflow domain logic
│   ├── launcher/       Application entry points
│   ├── provider/       Provider contracts and implementations
│   ├── queue/          In-memory work scheduling
│   ├── ui/             User-facing presentation helpers
│   └── utils/          Shared utilities
└── tests/              Automated tests
```

See [the architecture overview](docs/architecture.md) for component
responsibilities and dependency direction.

## Configuration and secrets

The bootstrap uses no secrets. When external providers are introduced, pass
credentials through environment variables or a secret manager. Never commit
API keys, `.env` files, tokens, or generated credentials.

## Contributing

1. Create a focused branch from `main`.
2. Make the smallest coherent change.
3. Run `npm run check`.
4. Open a pull request describing the behavior and validation.

By contributing, you agree that your changes may be distributed under the
project's license once one is added.
