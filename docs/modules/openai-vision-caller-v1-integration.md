# OpenAI Vision Caller V1.0 integration

## Status

- Runtime designation: **production Android runtime hosted by AutoJs6**
- Adapter source: `src/autojs6/openai-vision-caller.js`
- Portable core dependency: `src/core/vision-provider.js`
- HTTP adapter dependency: `src/core/http-adapter.js`
- Offline tests: `tests/openai-vision-caller.test.js` (16/16 pass)
- Specification: `docs/modules/openai-vision-caller-v1.md`

## Overview

OpenAI Vision Caller V1.0 bridges the portable core's `callVisionProvider()`
to the OpenAI Chat Completions API with vision content. It satisfies the
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
│  │  OpenAI Vision Caller V1.0 (this adapter)           │  │
│  │  createOpenAIVisionCaller({                          │  │
│  │    httpCaller, getApiKey, model, apiEndpoint         │  │
│  │  })                                                  │  │
│  │  • OpenAI request construction                       │  │
│  │  • Vision prompt + image data URL                    │  │
│  │  • Bearer token authentication                       │  │
│  │  • Response parsing (choices → metadata)             │  │
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
import { createOpenAIVisionCaller } from "./src/autojs6/openai-vision-caller.js";
import { createAutoJs6HttpCaller } from "./src/autojs6/http-caller.js";

// Create the HTTP caller
const httpCaller = createAutoJs6HttpCaller({ httpClient: http });

// Create the OpenAI vision caller
const providerCaller = createOpenAIVisionCaller({
  httpCaller,
  getApiKey: () => "sk-...", // from approved runtime secret mechanism
  model: "gpt-4o",
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
| OpenAI Vision Caller (this adapter) | `src/autojs6/openai-vision-caller.js` | OpenAI request construction, response parsing  |
| HTTP Adapter (portable core)        | `src/core/http-adapter.js`            | URL/method validation, response classification |
| HTTP Caller (AutoJs6 adapter)       | `src/autojs6/http-caller.js`          | HTTP request execution                         |

## Test coverage

- Valid response → description + keywords
- Request construction (URL, method, headers, body, model)
- Custom model and endpoint
- Error mapping: 401 → AUTH, 429 → RATE_LIMITED, 500 → UNAVAILABLE
- Network failure → REQUEST_FAILED
- Invalid JSON → RESPONSE_INVALID
- Missing choices/content → RESPONSE_INVALID
- Invalid metadata → RESPONSE_INVALID
- API key failure → AUTH_FAILED
- Empty API key → AUTH_FAILED
- Input validation (missing httpCaller, getApiKey)
- Error sanitization (no API key or image data in messages)
