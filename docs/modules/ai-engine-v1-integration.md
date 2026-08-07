# AI Engine V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/ai-engine-v1.md`
- Portable core: `src/core/ai-engine.js`
- Offline tests: `tests/core-ai-engine.test.js` (12/12 pass)
- Integration documentation: this document

## Overview

AI Engine V1.0 defines the per-image AI processing contract. It takes a
validated image input, sends it to an AI Vision provider through the Vision
Provider Interface V1.0, and returns validated microstock metadata.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Android Image Input Adapter V1.0                        │
│  ────────────────────────────                            │
│  { sourceUri, mimeType, sizeBytes, imageBase64 }         │
│              │                                           │
│              ▼                                           │
│  AI Engine V1.0 (portable core)                          │
│  ────────────────────────                                │
│  processImageWithAI({                                    │
│    sourceUri, mimeType, sizeBytes, imageBase64,          │
│    providerCaller, maxImageBytes                         │
│  })                                                      │
│              │                                           │
│              ▼                                           │
│  Vision Provider Interface V1.0 (portable core)          │
│  ─────────────────────────────────                       │
│  callVisionProvider({ imageBase64, mimeType,             │
│    providerCaller, maxImageBytes })                      │
│              │                                           │
│              ▼                                           │
│  AutoJs6 HTTP Adapter V1.0 (production adapter)          │
│  ─────────────────────────────────                       │
│  HTTPS request to provider                               │
│              │                                           │
│              ▼                                           │
│  { description, keywords }                               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Runtime boundary contract

### AI Engine input

| Field            | Type       | Description                         |
| ---------------- | ---------- | ----------------------------------- |
| `sourceUri`      | `string`   | Validated source URI                |
| `mimeType`       | `string`   | Validated MIME type                 |
| `sizeBytes`      | `number`   | Validated byte length               |
| `imageBase64`    | `string`   | Base64 without data URL prefix      |
| `providerCaller` | `function` | Injected production provider caller |
| `maxImageBytes`  | `number`   | Provider maximum image size limit   |

### AI Engine output

On success:

| Field         | Type       | Description                                 |
| ------------- | ---------- | ------------------------------------------- |
| `description` | `string`   | English microstock description < 2000 chars |
| `keywords`    | `string[]` | Exactly 7 English keyword strings           |

## Error mapping

The AI Engine delegates to Vision Provider Interface V1.0 error codes:

| Code                           | Condition                                 |
| ------------------------------ | ----------------------------------------- |
| `PROVIDER_RESPONSE_INVALID`    | Provider response does not match contract |
| `PROVIDER_REQUEST_FAILED`      | Provider request failed                   |
| `PROVIDER_AUTH_FAILED`         | Provider authentication failed            |
| `PROVIDER_RATE_LIMITED`        | Provider rate limit exceeded              |
| `PROVIDER_UNAVAILABLE`         | Provider service unavailable              |
| `IMAGE_TOO_LARGE_FOR_PROVIDER` | Image exceeds provider maximum size       |

Input validation errors are `TypeError` exceptions indicating contract
violations, not runtime errors.

## Security rules

1. The AI Engine never stores API keys or credentials.
2. Image data is passed through to the provider caller without retention.
3. The engine validates provider output before returning it.
4. All error messages are sanitized; no source URIs, image data, or internal
   details are included in error outputs.

## Test coverage

- Valid image input produces validated metadata output
- Each provider error code propagates correctly
- Invalid input (missing fields, wrong types) throws `TypeError`
- Provider response normalization and validation
- Error message sanitization (no source URI or image data in errors)

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed portable core source (`src/core/ai-engine.js`)
2. ✅ Offline tests (12/12 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification deferred until production adapter implementation
