# Vision Provider Interface V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/vision-provider-interface-v1.md`
- Portable core: `src/core/vision-provider.js`
- Offline tests: `tests/core-vision-provider.test.js` (16/16 pass)
- Integration documentation: this document

## Overview

Vision Provider Interface V1.0 defines the provider-neutral contract for
sending an authorized image to a remote AI Vision service and receiving a
validated microstock metadata result.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Android Image Input Adapter V1.0                        │
│  ────────────────────────────────────────────────────┐  │
│  │ • content:// URI read                               │  │
│  │ • MIME detection + validation                       │  │
│  │ • Base64 encoding                                   │  │
│  └────────────────────────────────────────────────────┘  │
│                          ↓ { imageBase64, mimeType }      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Vision Provider Interface V1.0 (portable core)     │  │
│  │  callVisionProvider(options)                        │  │
│  │  • Image size validation against provider limit     │  │
│  │  • Provider-neutral request construction            │  │
│  │  • Response normalization                           │  │
│  │  • validateVisionMetadata() validation              │  │
│  │  • Sanitized error mapping                          │  │
│  └────────────────────────────────────────────────────┘  │
│                          ↓ { description, keywords }      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Production adapter (injected)                      │  │
│  │  • HTTPS request to OpenAI / Gemini                 │  │
│  │  • Credential retrieval (outside Git)               │  │
│  │  • Provider-specific formatting                     │  │
│  │  • Response parsing                                 │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Module composition

The adapter is the composition of `callVisionProvider()` with an injected
production caller:

```javascript
import { callVisionProvider } from "./src/core/vision-provider.js";

// Production caller wraps the HTTPS request to the configured provider
const providerCaller = async ({ imageBase64, mimeType }) => {
  // 1. Retrieve credentials from approved runtime secret mechanism
  // 2. Construct provider-specific request (OpenAI / Gemini)
  // 3. Execute HTTPS request through AutoJs6
  // 4. Parse provider-specific response
  // 5. Return { description, keywords }
};

// Call the portable core with the production caller
const result = await callVisionProvider({
  imageBase64, // from Android Image Input Adapter V1.0
  mimeType, // from Android Image Input Adapter V1.0
  providerCaller, // the production caller
  maxImageBytes, // provider maximum image size (e.g., 20 * 1024 * 1024)
});

// result: { description, keywords }
```

## Runtime boundary contract

### Portable core → production caller

The portable core calls the production caller with:

| Field         | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `imageBase64` | `string` | Raw Base64 without data URL prefix |
| `mimeType`    | `string` | Normalized supported MIME type     |

### Production caller → portable core

The production caller returns:

| Field         | Type       | Description                           |
| ------------- | ---------- | ------------------------------------- |
| `description` | `string`   | English text under 2,000 characters   |
| `keywords`    | `string[]` | Exactly seven English keyword strings |

### Portable core output

On success, the core returns the validated result from `validateVisionMetadata()`:

| Field         | Type       | Description                                       |
| ------------- | ---------- | ------------------------------------------------- |
| `description` | `string`   | Validated English text under 2,000 characters     |
| `keywords`    | `string[]` | Validated array of exactly seven English keywords |

## Error mapping

The adapter produces six stable public error codes:

| Code                           | Condition                                                     |
| ------------------------------ | ------------------------------------------------------------- |
| `PROVIDER_RESPONSE_INVALID`    | Provider response fails `validateVisionMetadata()` validation |
| `PROVIDER_REQUEST_FAILED`      | Network error, timeout, or HTTP error from the provider       |
| `PROVIDER_AUTH_FAILED`         | Authentication failure (invalid token, expired key)           |
| `PROVIDER_RATE_LIMITED`        | Provider rate limit or quota exceeded                         |
| `PROVIDER_UNAVAILABLE`         | Provider service unavailable or maintenance                   |
| `IMAGE_TOO_LARGE_FOR_PROVIDER` | Image exceeds the provider's maximum size limit               |

## Supported providers

| Provider | API endpoint                                                  | Auth method         | Max image size |
| -------- | ------------------------------------------------------------- | ------------------- | -------------- |
| OpenAI   | `https://api.openai.com/v1/chat/completions`                  | Bearer token        | 20 MB          |
| Gemini   | `https://generativelanguage.googleapis.com/v1beta/models/...` | API key query param | 20 MB          |

## Security and privacy

- Credentials supplied through approved runtime secret mechanism outside Git
- Credentials not logged, serialized, or included in error messages
- Image Base64 not persisted to disk by default
- Provider response payloads not logged in full
- No direct network requests from portable core; all HTTP through injected adapter
- No storage or caching of provider responses
- Prompt contains no URIs, filenames, or user-identifiable information

## Test coverage

### Offline tests

- `tests/core-vision-provider.test.js` — provider call success, invalid response,
  network failure, auth failure, rate limiting, oversized image, input validation,
  response normalization, error sanitization (16/16 pass)

## Migration completion

All eight completion criteria are satisfied:

1. ✅ Reviewed source — `src/core/vision-provider.js`
2. ✅ Runtime-neutral and offline tests — 16/16 pass
3. ✅ Explicit runtime designation — source file declares runtime-neutral
4. ✅ Integration documentation — this document
5. ✅ Passing repository checks — lint, format, tests, secret scan
6. ✅ Git commit — this migration commit
7. ✅ Pull request — contains this commit
8. Device verification — deferred until production adapter implementation
