# Queue-AI Orchestrator V1.0 specification

## Status

- Historical target module: Queue-AI Orchestrator V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no Android, AutoJs6, or provider dependencies

## Purpose

Queue-AI Orchestrator V1.0 defines the composition contract between the Queue
Engine and the AI Engine. It takes a list of image inputs and provider
configuration, uses the Queue Engine to process them sequentially through the
AI Engine, and returns aggregated results.

The orchestrator does not select images, call AI providers directly, populate
the Contributor app, or submit content. It is the composition boundary that
wires queue management to per-image AI processing.

## Production flow position

```text
Launcher V1.3
  -> { images: [...], providerConfig }
  -> Queue-AI Orchestrator V1.0    <- this module
  -> Queue Engine V1.0 + AI Engine V1.0
  -> { results: [...metadata], errors: [...] }
  -> Contributor Engine V1.0
```

## Module composition

The orchestrator composes two already-migrated portable cores:

1. **Queue Engine V1.0** (`processQueue()`): manages the sequential queue.
2. **AI Engine V1.0** (`processImageWithAI()`): per-image AI processing.

The orchestrator wires the Queue Engine's processor to the AI Engine.

## Portable core contract

### Input

| Field            | Type       | Description                          |
| ---------------- | ---------- | ------------------------------------ |
| `images`         | `object[]` | Array of image inputs                |
| `providerCaller` | `function` | Injected production provider caller  |
| `maxImageBytes`  | `number`   | Provider maximum image size limit    |
| `failFast`       | `boolean`  | Stop on first error (default: false) |

Each image input must have: `sourceUri`, `mimeType`, `sizeBytes`, `imageBase64`.

### Output

On completion:

| Field         | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `totalImages` | `number`   | Total number of images               |
| `processed`   | `number`   | Number of images processed           |
| `succeeded`   | `number`   | Number of successful images          |
| `failed`      | `number`   | Number of failed images              |
| `results`     | `object[]` | Array of `{ description, keywords }` |
| `errors`      | `object[]` | Array of error records               |

### Behavior

1. Each image is processed sequentially through the AI Engine.
2. The AI Engine calls the vision provider for each image.
3. Results are aggregated into the output.
4. If `failFast` is true, processing stops on the first error.

## Error codes

The orchestrator does not define its own error codes. Errors from the AI
Engine and Vision Provider propagate through the `errors` array.

Orchestrator-level validation errors (empty images, missing caller) are
`TypeError` exceptions.

## Runtime designation

- **Portable core:** `src/core/queue-ai-orchestrator.js` is runtime-neutral.
  It has no dependency on Node.js, AutoJs6, Android, provider SDKs, or the
  Contributor app.
- **Production adapter:** No production adapter is needed. The orchestrator
  is a pure portable core.

## Security rules

1. The orchestrator never stores API keys or credentials.
2. Image data passes through to the provider without retention.
3. All provider output is validated before returning.
4. Error messages are sanitized.

## Test coverage

Offline tests verify:

- Empty image list returns zero counts.
- All-success batch returns correct metadata results.
- All-failure batch returns correct error records.
- Mixed success/failure handles both correctly.
- `failFast: true` stops on first error.
- Input validation (empty images, missing caller).
- Error records contain correct index and code.

## Migration completion criteria

The Queue-AI Orchestrator V1.0 module is **MIGRATED** when all of the
following exist in GitHub:

1. the reviewed portable core source (`src/core/queue-ai-orchestrator.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is deferred until production adapter implementation.
