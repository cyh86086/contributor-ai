# AutoJs6 HTTP Caller V1.0 integration

## Status

- Runtime designation: **production Android runtime hosted by AutoJs6**
- Adapter source: `src/autojs6/http-caller.js`
- Portable core dependency: `src/core/http-adapter.js`
- Offline tests: `tests/autojs6-http-caller.test.js` (15/15 pass)
- Specification: `docs/modules/autojs6-http-caller-v1.md`

## Overview

AutoJs6 HTTP Caller V1.0 bridges the portable core's `executeHttpRequest()`
to AutoJs6's built-in `http.request()` API. It satisfies the `httpCaller`
injection contract.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Portable core: http-adapter.js                          │
│  ────────────────────────────────────────────────────┐  │
│  │ • HTTPS URL validation                              │  │
│  │ • HTTP method validation                            │  │
│  │ • Timeout validation                                │  │
│  │ • Response classification                           │  │
│  │ • Sanitized error mapping                           │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ httpCaller (injected)          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  AutoJs6 HTTP Caller V1.0 (this adapter)            │  │
│  │  createAutoJs6HttpCaller({ httpClient })            │  │
│  │  • Request execution through http.request()          │  │
│  │  • Response extraction (status, headers, body)       │  │
│  │  • Sanitized error propagation                       │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ AutoJs6 http global            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  AutoJs6 http.request(url, options)                  │  │
│  └────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────┘
```

## Usage

```javascript
import { executeHttpRequest } from "./src/core/http-adapter.js";
import { createAutoJs6HttpCaller } from "./src/autojs6/http-caller.js";

// Create the adapter with AutoJs6's http global
const httpCaller = createAutoJs6HttpCaller({ httpClient: http });

// Use with the portable core
const result = await executeHttpRequest({
  url: "https://api.example.com/data",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "value" }),
  timeoutMs: 30000,
  httpCaller,
});
```

## Module relationship

| Module                       | Location                      | Role                                                                  |
| ---------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| HTTP Adapter (portable core) | `src/core/http-adapter.js`    | URL/method/timeout validation, response classification, error mapping |
| HTTP Caller (this adapter)   | `src/autojs6/http-caller.js`  | AutoJs6 HTTP request execution                                        |
| Vision Provider Interface    | `src/core/vision-provider.js` | Consumes HTTP caller for provider requests                            |

## Test coverage

- GET/POST request execution
- Timeout passthrough
- Network failure handling
- Invalid response handling (null, missing status)
- Body extraction (function and string forms)
- Body extraction failure fallback
- Missing headers fallback
- Input validation (missing httpClient)
- Error sanitization (no URLs, credentials, or body data in messages)
- Logger sanitization
- Portable core integration (executeHttpRequest + error mapping)
