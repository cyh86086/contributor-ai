# Gemini Vision Caller V1.0 integration

## Status

- Runtime designation: **production Android runtime hosted by AutoJs6**
- Adapter source: `src/autojs6/gemini-vision-caller.js`
- Portable core dependency: `src/core/vision-provider.js`
- HTTP adapter dependency: `src/core/http-adapter.js`
- Offline tests: `tests/gemini-vision-caller.test.js` (16/16 pass)
- Specification: `docs/modules/gemini-vision-caller-v1.md`

## Overview

Gemini Vision Caller V1.0 bridges the portable core's `callVisionProvider()`
to the Google Gemini API with vision content. It satisfies the
`providerCaller` injection contract.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Portable core: vision-provider.js                       │
│  ────────────────────────────────────────────────────┐  │
│  │ • Image size validation                             │  │
│  │ • Provider-neutral request construction             │  │
│  │ • validateVisionMetadata() validation               │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ providerCaller (injected)      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Gemini Vision Caller V1.0 (this adapter)           │  │
│  │  createGeminiVisionCaller({                          │  │
│  │    httpCaller, getApiKey, model, apiEndpoint         │  │
│  │  })                                                  │  │
│  │  • Gemini request construction                       │  │
│  │  • inline_data image + text prompt                   │  │
│  │  • API key as query parameter                        │  │
│  │  • Response parsing (candidates → metadata)          │  │
│  │  • Error mapping to VisionProviderError              │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ httpCaller (injected)          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  AutoJs6 HTTP Caller V1.0                            │  │
│  └────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────┘
```

## Usage

```javascript
import { callVisionProvider } from "./src/core/vision-provider.js";
import { createGeminiVisionCaller } from "./src/autojs6/gemini-vision-caller.js";
import { createAutoJs6HttpCaller } from "./src/autojs6/http-caller.js";

// Create the HTTP caller
const httpCaller = createAutoJs6HttpCaller({ httpClient: http });

// Create the Gemini vision caller
const providerCaller = createGeminiVisionCaller({
  httpCaller,
  getApiKey: () => "AIza...", // from approved runtime secret mechanism
  model: "gemini-1.5-pro",
});

// Use with the portable core
const result = await callVisionProvider({
  imageBase64,
  mimeType,
  providerCaller,
  maxImageBytes: 20 * 1024 * 1024,
});
// result: { description, keywords }
```

## Module relationship

| Module                              | Location                              | Role                                           |
| ----------------------------------- | ------------------------------------- | ---------------------------------------------- |
| Vision Provider (portable core)     | `src/core/vision-provider.js`         | Image size validation, response validation     |
| Gemini Vision Caller (this adapter) | `src/autojs6/gemini-vision-caller.js` | Gemini request construction, response parsing  |
| HTTP Adapter (portable core)        | `src/core/http-adapter.js`            | URL/method validation, response classification |
| HTTP Caller (AutoJs6 adapter)       | `src/autojs6/http-caller.js`          | HTTP request execution                         |

## Test coverage

- Valid response → description + keywords
- Request construction (URL with model + key, inline_data, generationConfig)
- Custom model and endpoint
- Error mapping: 401 → AUTH, 403 → AUTH, 429 → RATE_LIMITED, 500 → UNAVAILABLE
- Network failure → REQUEST_FAILED
- Invalid JSON → RESPONSE_INVALID
- Missing candidates → RESPONSE_INVALID
- Missing parts text → RESPONSE_INVALID
- Invalid metadata → RESPONSE_INVALID
- API key failure → AUTH_FAILED
- Input validation (missing httpCaller, getApiKey)
- Error sanitization (no API key or image data in messages)
