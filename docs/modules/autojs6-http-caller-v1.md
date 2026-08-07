# AutoJs6 HTTP Caller V1.0

## Status

- Module: AutoJs6 HTTP Caller V1.0
- Runtime designation: **production Android runtime hosted by AutoJs6**
- Portable core dependency: `src/core/http-adapter.js` (executeHttpRequest)
- Specification: this document

## Overview

AutoJs6 HTTP Caller V1.0 is the production adapter that executes HTTPS
requests through AutoJs6's HTTP APIs. It implements the `httpCaller` contract
required by the portable core's `executeHttpRequest()`.

The adapter is runtime-neutral for offline testing through injected
dependencies. On production, the injected `httpClient` wraps AutoJs6's
built-in `http` global object.

## Interface

### createAutoJs6HttpCaller(config)

| Field        | Type     | Description                              |
| ------------ | -------- | ---------------------------------------- |
| `httpClient` | `object` | AutoJs6 `http` global or compatible mock |
| `logger`     | `object` | Optional logger with `warn()` method     |

### Returns

A function matching the `httpCaller` contract:

```javascript
async function httpCaller({ url, method, headers, body, timeoutMs }) {
  // Returns { status, headers, body }
}
```

### httpCaller input

| Field       | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| `url`       | `string` | HTTPS URL                            |
| `method`    | `string` | HTTP method (GET, POST, PUT, DELETE) |
| `headers`   | `object` | Optional request headers             |
| `body`      | `string` | Optional request body                |
| `timeoutMs` | `number` | Optional timeout in milliseconds     |

### httpCaller output

| Field     | Type     | Description               |
| --------- | -------- | ------------------------- |
| `status`  | `number` | HTTP response status code |
| `headers` | `object` | Response headers          |
| `body`    | `string` | Response body as string   |

## Dependency contract

### httpClient

The `httpClient` must provide a `request(url, options)` method compatible
with AutoJs6's `http.request()`:

| Method                             | Description          |
| ---------------------------------- | -------------------- |
| `request(url, options)` → `object` | Execute HTTP request |

The returned response object must provide:

| Field        | Type     | Description             |
| ------------ | -------- | ----------------------- |
| `statusCode` | `number` | HTTP status code        |
| `headers`    | `object` | Response headers        |
| `body()`     | `string` | Response body as string |

### Options passed to httpClient.request()

| Field     | Type     | Description             |
| --------- | -------- | ----------------------- |
| `method`  | `string` | HTTP method             |
| `headers` | `object` | Request headers         |
| `body`    | `string` | Request body            |
| `timeout` | `number` | Timeout in milliseconds |

## Error handling

- Network errors, DNS failures, connection refused → thrown as `Error`
- Timeout exceeded → thrown as `Error` with message containing "timeout"
- The portable core maps all thrown errors to `HTTP_REQUEST_FAILED`
- The adapter never logs URLs, headers, or body content
- The adapter never includes credentials in error messages

## Security and privacy

- Credentials supplied through injected headers (Bearer token, API key)
- Credentials not logged, serialized, or included in error messages
- Request and response bodies not logged
- URLs sanitized in any error output
- No storage or caching of responses
- No redirect to non-HTTPS URLs (enforced by portable core URL validation)

## Test strategy

Offline tests inject a mock `httpClient` to verify:

- Successful GET request
- Successful POST request with body
- Network failure mapping
- Timeout handling
- Response extraction (status, headers, body)
- Input validation (missing httpClient)
- Error sanitization (no sensitive data in messages)
- Logger receives warnings without sensitive data
