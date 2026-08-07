# Launcher V1.3 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/launcher-v1.md`
- Portable core: `src/core/launcher.js`
- Offline tests: `tests/core-launcher.test.js` (9/9 pass)
- Integration documentation: this document

## Overview

Launcher V1.3 is the application entry point. It wires all modules together
and starts the production flow.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  User / AutoJs6 script entry                             │
│              │                                           │
│              ▼                                           │
│  Launcher V1.3 (portable core)                           │
│  ────────────────────────                                │
│  createLauncher({                                        │
│    imageReader, providerCaller, uiAdapter,               │
│    maxImageBytes, maxSizeBytes, failFast                 │
│  })                                                      │
│              │                                           │
│              ▼                                           │
│  launcher.run(images)                                    │
│              │                                           │
│    ┌─────────┼─────────────────────────────┐             │
│    ▼         ▼                             ▼             │
│  Queue-AI   Contributor               Mock UI /          │
│  Orchestrator Engine                   AutoJs6 UI        │
│    │         │                         Adapter           │
│    ▼         ▼                             │             │
│  { totalImages, succeeded, failed,         │             │
│    results, errors }                       │             │
│              │                             │             │
│              ▼                             ▼             │
│  User review → manual submission                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Runtime boundary contract

### Launcher configuration

| Field            | Type       | Description                          |
| ---------------- | ---------- | ------------------------------------ |
| `imageReader`    | `object`   | Image reader with `read()` method    |
| `providerCaller` | `function` | Production provider caller           |
| `uiAdapter`      | `function` | UI field entry adapter               |
| `maxImageBytes`  | `number`   | Provider maximum image size          |
| `maxSizeBytes`   | `number`   | Portable core maximum image size     |
| `failFast`       | `boolean`  | Stop on first error (default: false) |

### run(images) output

| Field         | Type       | Description               |
| ------------- | ---------- | ------------------------- |
| `totalImages` | `number`   | Total images processed    |
| `succeeded`   | `number`   | Successful images         |
| `failed`      | `number`   | Failed images             |
| `results`     | `object[]` | Contributor entry results |
| `errors`      | `object[]` | Combined error records    |

## Module composition

The launcher wires all migrated modules:

1. Android Image Input Adapter V1.0
2. Vision Provider Interface V1.0
3. AutoJs6 HTTP Adapter V1.0
4. AI Engine V1.0
5. Queue Engine V1.0
6. Queue-AI Orchestrator V1.0
7. Contributor Engine V1.0
8. Mock UI Adapter (test) / AutoJs6 UI Adapter (production)

## Test coverage

- Valid configuration creates a working launcher
- Empty images returns zero counts
- Full pipeline processing
- Missing config fields throw `TypeError`
- Error propagation from provider

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed portable core source (`src/core/launcher.js`)
2. ✅ Offline tests (9/9 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification deferred until production adapter implementation
