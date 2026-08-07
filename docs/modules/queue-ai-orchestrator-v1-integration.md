# Queue-AI Orchestrator V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/queue-ai-orchestrator-v1.md`
- Portable core: `src/core/queue-ai-orchestrator.js`
- Offline tests: `tests/core-queue-ai-orchestrator.test.js` (8/8 pass)
- Integration documentation: this document

## Overview

Queue-AI Orchestrator V1.0 defines the composition contract between the Queue
Engine and the AI Engine. It wires queue management to per-image AI processing.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Launcher V1.3                                           │
│  ─────────────                                           │
│  { images: [...], providerConfig }                       │
│              │                                           │
│              ▼                                           │
│  Queue-AI Orchestrator V1.0 (portable core)              │
│  ────────────────────────────────────                    │
│  orchestrateBatchAI({                                    │
│    images, providerCaller, maxImageBytes, failFast       │
│  })                                                      │
│              │                                           │
│              ▼                                           │
│  Queue Engine V1.0 (portable core)                       │
│  ─────────────────────────                               │
│  processQueue({ items, processor, failFast })            │
│              │                                           │
│              ▼ (for each item)                           │
│  AI Engine V1.0 (portable core)                          │
│  ────────────────────────                                │
│  processImageWithAI({ ... })                             │
│              │                                           │
│              ▼                                           │
│  { totalImages, processed, succeeded, failed,            │
│    results, errors }                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Runtime boundary contract

### Orchestrator input

| Field            | Type       | Description                          |
| ---------------- | ---------- | ------------------------------------ |
| `images`         | `object[]` | Array of image inputs                |
| `providerCaller` | `function` | Injected production provider caller  |
| `maxImageBytes`  | `number`   | Provider maximum image size limit    |
| `failFast`       | `boolean`  | Stop on first error (default: false) |

### Orchestrator output

| Field         | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `totalImages` | `number`   | Total number of images               |
| `processed`   | `number`   | Number of images processed           |
| `succeeded`   | `number`   | Number of successful images          |
| `failed`      | `number`   | Number of failed images              |
| `results`     | `object[]` | Array of `{ description, keywords }` |
| `errors`      | `object[]` | Array of error records               |

## Error handling

The orchestrator does not define its own error codes. Errors from the AI
Engine and Vision Provider propagate through the `errors` array.

## Security rules

1. The orchestrator never stores API keys or credentials.
2. Image data passes through to the provider without retention.
3. All provider output is validated before returning.
4. Error messages are sanitized.

## Test coverage

- Empty image list returns zero counts
- All-success batch returns correct metadata results
- All-failure batch returns correct error records
- Mixed success/failure handles both correctly
- `failFast: true` stops on first error
- Input validation (non-array images, missing caller, invalid maxImageBytes)
- Error records contain correct index and code

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed portable core source (`src/core/queue-ai-orchestrator.js`)
2. ✅ Offline tests (8/8 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification deferred until production adapter implementation
