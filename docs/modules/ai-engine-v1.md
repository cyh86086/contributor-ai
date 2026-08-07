# AI Engine V1.0 specification

## Status

- Historical target module: AI Engine V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no provider SDK or HTTP dependencies

## Purpose

AI Engine V1.0 defines the per-image AI processing contract. It takes a
validated image input, sends it to an AI Vision provider through the Vision
Provider Interface V1.0, and returns validated microstock metadata
(description and exactly seven English keywords).

The engine does not select images, manage a queue, populate the Contributor
app, or submit content. It is the single-image processing boundary between
the image input adapter and the queue orchestrator.

## Production flow position

```text
Android Image Input Adapter V1.0
  -> { sourceUri, mimeType, sizeBytes, imageBase64 }
  -> AI Engine V1.0                  <- this module
  -> { description, keywords }
  -> Queue Engine V1.0 / Queue-AI Orchestrator V1.0
```

## Module composition

The AI Engine composes two already-migrated portable cores:

1. **Vision Provider Interface V1.0** (`callVisionProvider()`): sends the
   image to the provider and normalizes the response.
2. **Metadata validation** (`validateVisionMetadata()`): validates the
   description and keyword contract.

The AI Engine does not duplicate these functions. It defines the per-image
processing contract that the queue orchestrator calls for each image.

## Portable core contract

### Input

The AI Engine accepts a single image processing request:

| Field            | Type       | Description                             |
| ---------------- | ---------- | --------------------------------------- |
| `sourceUri`      | `string`   | The validated source URI                |
| `mimeType`       | `string`   | The validated MIME type                 |
| `sizeBytes`      | `number`   | The validated byte length               |
| `imageBase64`    | `string`   | Base64 encoding without data URL prefix |
| `providerCaller` | `function` | Injected production provider caller     |
| `maxImageBytes`  | `number`   | Provider maximum image size limit       |

### Output

On success, the AI Engine returns:

| Field         | Type       | Description                                 |
| ------------- | ---------- | ------------------------------------------- |
| `description` | `string`   | English microstock description < 2000 chars |
| `keywords`    | `string[]` | Exactly 7 English keyword strings           |

### Error codes

The AI Engine delegates to Vision Provider Interface V1.0 error codes:

| Code                           | Condition                                 |
| ------------------------------ | ----------------------------------------- |
| `PROVIDER_RESPONSE_INVALID`    | Provider response does not match contract |
| `PROVIDER_REQUEST_FAILED`      | Provider request failed                   |
| `PROVIDER_AUTH_FAILED`         | Provider authentication failed            |
| `PROVIDER_RATE_LIMITED`        | Provider rate limit exceeded              |
| `PROVIDER_UNAVAILABLE`         | Provider service unavailable              |
| `IMAGE_TOO_LARGE_FOR_PROVIDER` | Image exceeds provider maximum size       |

The AI Engine does not introduce additional error codes. Input validation
errors (missing fields, wrong types) are `TypeError` exceptions that indicate
a contract violation, not a runtime error.

## Runtime designation

- **Portable core:** `src/core/ai-engine.js` is runtime-neutral. It has no
  dependency on Node.js, AutoJs6, Android, provider SDKs, or the Contributor
  app.
- **Production adapter:** No production adapter is implemented yet. The
  production `providerCaller` will be supplied by the AutoJs6 HTTP Adapter
  at runtime.

## Security rules

1. The AI Engine never stores API keys or credentials.
2. Image data is passed through to the provider caller without retention.
3. The engine validates provider output before returning it.
4. All error messages are sanitized; no source URIs, image data, or internal
   details are included in error outputs.

## Test coverage

Offline tests verify:

- Valid image input produces validated metadata output.
- Each provider error code propagates correctly.
- Invalid input (missing fields, wrong types) throws `TypeError`.
- Provider response normalization and validation.
- Error message sanitization.

## Migration completion criteria

The AI Engine V1.0 module is **MIGRATED** when all of the following exist
in GitHub:

1. the reviewed portable core source (`src/core/ai-engine.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is deferred until production adapter implementation.
