# Queue Engine V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/queue-engine-v1.md`
- Portable core: `src/core/queue-engine.js`
- Offline tests: `tests/core-queue-engine.test.js` (9/9 pass)
- Integration documentation: this document

## Overview

Queue Engine V1.0 defines the sequential image processing queue contract. It
accepts a list of image items, iterates through them in order, calls an
injected processor for each item, and collects results.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Queue-AI Orchestrator V1.0                              │
│  ──────────────────────────                              │
│  { items: [...image inputs] }                            │
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
│  { totalItems, processed, succeeded, failed,             │
│    results, errors }                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Runtime boundary contract

### Queue Engine input

| Field       | Type       | Description                             |
| ----------- | ---------- | --------------------------------------- |
| `items`     | `object[]` | Array of image processing requests      |
| `processor` | `function` | Injected per-item processor (AI Engine) |
| `failFast`  | `boolean`  | Stop on first error (default: false)    |

### Queue Engine output

| Field        | Type       | Description                        |
| ------------ | ---------- | ---------------------------------- |
| `totalItems` | `number`   | Total number of items in the queue |
| `processed`  | `number`   | Number of items processed          |
| `succeeded`  | `number`   | Number of successful items         |
| `failed`     | `number`   | Number of failed items             |
| `results`    | `object[]` | Array of success results           |
| `errors`     | `object[]` | Array of error records             |

## Error handling

The Queue Engine does not define its own error codes. Processor errors are
captured and reported in the `errors` array with their original codes.

Queue-level validation errors (empty items, missing processor) are
`TypeError` exceptions.

## Security rules

1. The Queue Engine never stores or retains item data beyond the current
   processing run.
2. Error messages are sanitized.
3. The engine does not inspect or log item contents.

## Test coverage

- Empty queue returns zero counts
- All-success queue returns correct counts and results
- All-failure queue returns correct counts and errors
- Mixed success/failure queue handles both correctly
- `failFast: true` stops on first error
- `failFast: false` processes all items
- Input validation (non-array items, missing processor)
- Error records contain correct index and code

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed portable core source (`src/core/queue-engine.js`)
2. ✅ Offline tests (9/9 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification deferred until production adapter implementation
