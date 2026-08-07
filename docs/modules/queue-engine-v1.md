# Queue Engine V1.0 specification

## Status

- Historical target module: Queue Engine V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no Android, AutoJs6, or provider dependencies

## Purpose

Queue Engine V1.0 defines the sequential image processing queue contract. It
accepts a list of image items, iterates through them in order, calls an
injected processor for each item, and collects results (successes and
failures).

The engine does not select images, call AI providers directly, populate the
Contributor app, or submit content. It is the queue management boundary
between the orchestrator and the per-image processor.

## Production flow position

```text
Queue-AI Orchestrator V1.0
  -> { items: [...image inputs] }
  -> Queue Engine V1.0               <- this module
  -> for each item: AI Engine V1.0
  -> { results: [...], errors: [...] }
  -> Queue-AI Orchestrator V1.0
```

## Portable core contract

### Input

| Field       | Type       | Description                             |
| ----------- | ---------- | --------------------------------------- |
| `items`     | `object[]` | Array of image processing requests      |
| `processor` | `function` | Injected per-item processor (AI Engine) |
| `failFast`  | `boolean`  | Stop on first error (default: false)    |

Each item is an opaque object passed directly to the processor. The Queue
Engine does not inspect or validate item contents.

### Output

On completion:

| Field        | Type       | Description                        |
| ------------ | ---------- | ---------------------------------- |
| `totalItems` | `number`   | Total number of items in the queue |
| `processed`  | `number`   | Number of items processed          |
| `succeeded`  | `number`   | Number of successful items         |
| `failed`     | `number`   | Number of failed items             |
| `results`    | `object[]` | Array of success results           |
| `errors`     | `object[]` | Array of error records             |

### Error records

Each error record contains:

| Field   | Type     | Description                         |
| ------- | -------- | ----------------------------------- |
| `index` | `number` | Zero-based item index               |
| `error` | `Error`  | The error thrown by the processor   |
| `code`  | `string` | Sanitized error code (if available) |

### Behavior

1. Items are processed sequentially in array order.
2. Each item is passed to the injected processor.
3. On success, the result is added to `results`.
4. On error, the error record is added to `errors`.
5. If `failFast` is true, processing stops on the first error.
6. If `failFast` is false, all items are processed regardless of errors.

## Error codes

The Queue Engine does not define its own error codes. Processor errors are
captured and reported in the `errors` array with their original codes.

Queue-level validation errors (empty items, missing processor) are
`TypeError` exceptions indicating contract violations.

## Runtime designation

- **Portable core:** `src/core/queue-engine.js` is runtime-neutral. It has
  no dependency on Node.js, AutoJs6, Android, provider SDKs, or the
  Contributor app.
- **Production adapter:** No production adapter is needed. The Queue Engine
  is a pure portable core.

## Security rules

1. The Queue Engine never stores or retains item data beyond the current
   processing run.
2. Error messages are sanitized; no item data or internal details are
   included.
3. The engine does not inspect or log item contents.

## Test coverage

Offline tests verify:

- Empty queue returns zero counts.
- All-success queue returns correct counts and results.
- All-failure queue returns correct counts and errors.
- Mixed success/failure queue handles both correctly.
- `failFast: true` stops on first error.
- `failFast: false` processes all items.
- Input validation (empty items, missing processor).
- Error records contain correct index and code.

## Migration completion criteria

The Queue Engine V1.0 module is **MIGRATED** when all of the following exist
in GitHub:

1. the reviewed portable core source (`src/core/queue-engine.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is deferred until production adapter implementation.
