# AutoJs6 HTTP Adapter V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/autojs6-http-adapter-v1.md`
- Portable core: `src/core/http-adapter.js`
- Offline tests: `tests/core-http-adapter.test.js` (19/19 pass)
- Integration documentation: this document

## Overview

AutoJs6 HTTP Adapter V1.0 defines the provider-neutral contract for making
authorized HTTPS requests through AutoJs6. It is the infrastructure layer used
by the Vision Provider Interface V1.0 production adapter.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Vision Provider Interface V1.0 (portable core)          │
│  ────────────────────────────────────────────────────┐  │
│  │ • Image size validation                             │  │
│  │ • Provider-neutral request construction             │  │
│  │ • validateVisionMetadata() validation               │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ { url, method, headers, body } │
│  ┌────────────────────────────────────────────────────┐  │
│  │  AutoJs6 HTTP Adapter V1.0 (portable core)          │  │
│  │  executeHttpRequest(options)                        │  │
│  │  • HTTPS URL validation                              │  │
│  │  • HTTP method validation                            │  │
│  │  • Timeout validation                                │  │
│  │  • Response classification                           │  │
│  │  • Sanitized error mapping                           │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ httpCaller (injected)          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Production HTTP caller (AutoJs6)                   │  │
│  │  • HTTPS request execution                           │  │
│  │  • Credential injection                              │  │
│  │  • Timeout enforcement                               │  │
│  │  • Response extraction                               │  │
│  ────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────
```

## Module composition

```javascript
import { executeHttpRequest } from "./src/core/http-adapter.js";

// Production HTTP caller wraps AutoJs6 HTTP APIs
const httpCaller = async ({ url, method, headers, body, timeoutMs }) => {
  // 1. Execute HTTPS request through AutoJs6
  // 2. Enforce timeout
  // 3. Return { status, headers, body }
};

// Call the portable core with the production caller
const result = await executeHttpRequest({
  url, // HTTPS URL
  method, // GET, POST, PUT, DELETE
  headers, // optional headers object
  body, // optional request body
  timeoutMs, // optional timeout in milliseconds
  httpCaller, // the production caller
});

// result: { status, headers, body }
```

## Error mapping

| Code                  | Condition                                         |
| --------------------- | ------------------------------------------------- |
| `HTTP_REQUEST_FAILED` | Network error, DNS failure, or connection refused |
| `HTTP_TIMEOUT`        | Request exceeded the configured timeout           |
| `HTTP_INVALID_URL`    | URL is not HTTPS or is malformed                  |
| `HTTP_INVALID_METHOD` | HTTP method is not supported                      |
| `HTTP_SERVER_ERROR`   | Server returned 5xx status                        |
| `HTTP_CLIENT_ERROR`   | Server returned 4xx status (except 401, 403, 429) |
| `HTTP_AUTH_FAILED`    | Server returned 401 Unauthorized                  |
| `HTTP_FORBIDDEN`      | Server returned 403 Forbidden                     |
| `HTTP_RATE_LIMITED`   | Server returned 429 Too Many Requests             |

## Security and privacy

- Credentials supplied through approved runtime secret mechanism outside Git
- Credentials not logged, serialized, or included in error messages
- Request bodies not logged in full
- Response payloads not logged in full
- URLs with query parameters sanitized in error messages
- No storage or caching of responses
- No redirect to non-HTTPS URLs

## Test coverage

### Offline tests

- `tests/core-http-adapter.test.js` — GET/POST requests, network failure,
  timeout, invalid URL, invalid method, response classification (200, 401, 403,
  429, 500, 400), input validation, error sanitization (19/19 pass)

## Migration completion

All eight completion criteria are satisfied:

1. ✅ Reviewed source — `src/core/http-adapter.js`
2. ✅ Runtime-neutral and offline tests — 19/19 pass
3. ✅ Explicit runtime designation — source file declares runtime-neutral
4. ✅ Integration documentation — this document
5. ✅ Passing repository checks — lint, format, tests, secret scan
6. ✅ Git commit — this migration commit
7. ✅ Pull request — contains this commit
8. Device verification — deferred until production adapter implementation
