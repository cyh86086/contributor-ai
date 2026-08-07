# AutoJs6 HTTP Adapter V1.0 specification

## Status

- Historical target module: AutoJs6 HTTP Adapter
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no HTTP or network dependencies

## Purpose

AutoJs6 HTTP Adapter V1.0 defines the provider-neutral contract for making
authorized HTTPS requests through AutoJs6. It is the infrastructure layer used
by the Vision Provider Interface V1.0 production adapter to communicate with
remote AI Vision services (OpenAI, Gemini).

The adapter does not select images, manage a queue, call AI providers directly,
populate the Contributor app, or submit content. It is a pure HTTP transport
boundary.

## Production flow position

```text
Vision Provider Interface V1.0 (portable core)
  -> { imageBase64, mimeType }
  -> AutoJs6 HTTP Adapter V1.0         ← this module
  -> HTTPS request to provider
  -> { description, keywords }
  -> validateVisionMetadata()
```

## Input contract

The portable entry point receives:

- `url`: a non-empty HTTPS URL string;
- `method`: an HTTP method (`GET`, `POST`, `PUT`, `DELETE`);
- `headers`: an optional object of HTTP headers;
- `body`: an optional request body (string or object);
- `timeoutMs`: an optional positive integer timeout in milliseconds;
- an injected production HTTP caller capable of executing the request through
  AutoJs6.

The exact function or class API will be chosen during implementation review.
This specification defines behavior rather than inventing a historical source
signature.

## Output contract

On success, the module returns:

```json
{
  "status": 200,
  "headers": { "content-type": "application/json" },
  "body": "response body string"
}
```

Contract rules:

- `status` is a valid HTTP status code (100-599);
- `headers` is an object of response headers;
- `body` is the response body as a string;
- the response is not parsed or validated by the portable layer; parsing is
  the caller's responsibility.

## Runtime separation

### Runtime-neutral validation and payload logic

The portable layer owns:

- URL validation (HTTPS only);
- HTTP method validation;
- timeout validation;
- response shape normalization;
- error classification.

It must not import or call Node.js, Android, AutoJs6, HTTP, network, provider
SDK, or Contributor app APIs.

### AutoJs6 and Android production adapter

The injected production adapter owns:

- HTTPS request execution through AutoJs6 HTTP APIs;
- credential injection into request headers;
- timeout enforcement;
- network error classification;
- response body extraction.

The production adapter must expose only the minimum request and response
information required by the portable contract. It must not log credentials,
request bodies, or response payloads.

### Node.js offline mock test harness

Node.js may provide deterministic mock HTTP responses and injected mock
failures for offline tests only. It must not be described, packaged, or
accepted as the production adapter. Node.js tests cannot establish network,
AutoJs6, or device compatibility.

## Supported HTTP methods

| Method   | Use case                                 |
| -------- | ---------------------------------------- |
| `GET`    | Read-only requests                       |
| `POST`   | Create requests (e.g., chat completions) |
| `PUT`    | Update requests                          |
| `DELETE` | Delete requests                          |

## Required errors

Failures must be distinguishable by stable machine-readable codes. Error
messages must not contain credentials, URLs with query parameters, request
bodies, or sensitive network details.

| Code                  | Required condition                                |
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

An implementation must preserve the stable code when adding a sanitized
human-readable message.

## Security and privacy rules

- Credentials must be supplied through an approved runtime secret mechanism
  outside Git.
- Credentials must not be logged, serialized, or included in error messages.
- Request bodies must not be logged in full.
- Response payloads must not be logged in full.
- URLs with query parameters must be sanitized in error messages.
- The adapter must not store or cache responses.
- The adapter must not redirect to non-HTTPS URLs.

## Timeout handling

The adapter must enforce a configurable timeout for each request. When the
timeout is exceeded, the adapter must:

1. abort the request;
2. clean up any open connections;
3. return `HTTP_TIMEOUT`.

The default timeout is an integration-time configuration decision.

## Required tests

### Runtime-neutral and Node.js offline tests

The future implementation must include deterministic tests for:

1. **Valid GET request:** a mock HTTP caller returns a 200 response; the module
   returns the normalized response.
2. **Valid POST request:** a mock HTTP caller returns a 201 response; the
   module returns the normalized response.
3. **Network failure:** an injected network failure produces
   `HTTP_REQUEST_FAILED`.
4. **Timeout:** an injected timeout produces `HTTP_TIMEOUT`.
5. **Invalid URL:** a non-HTTPS URL produces `HTTP_INVALID_URL`.
6. **Invalid method:** an unsupported method produces `HTTP_INVALID_METHOD`.
7. **Server error:** a 500 response produces `HTTP_SERVER_ERROR`.
8. **Client error:** a 400 response produces `HTTP_CLIENT_ERROR`.
9. **Auth failure:** a 401 response produces `HTTP_AUTH_FAILED`.
10. **Forbidden:** a 403 response produces `HTTP_FORBIDDEN`.
11. **Rate limited:** a 429 response produces `HTTP_RATE_LIMITED`.
12. **Credential isolation:** credentials do not appear in error messages,
    logs, or serialized output.
13. **Response sanitization:** response payloads do not leak into error
    messages or logs.

### Later AutoJs6 integration tests

Production integration tests are deferred until an implementation exists and
will require user action. On an authorized Android device or emulator, they
must verify:

- a real HTTPS GET request succeeds;
- a real HTTPS POST request with a JSON body succeeds;
- network failures map to the required error codes;
- timeouts map to `HTTP_TIMEOUT`;
- credentials are not logged or exposed;
- response payloads are not logged in full.

The user must supply or authorize the device/emulator, network access, and
test endpoints. Offline Node.js tests cannot replace this verification.

## Completion criteria

AutoJs6 HTTP Adapter V1.0 remains **NOT YET MIGRATED** until all of the
following exist:

1. reviewed source implementing this specification;
2. runtime-neutral and offline tests;
3. an explicit runtime designation for every source file;
4. integration documentation for the AutoJs6/Android boundary and its callers;
5. passing repository checks and secret scan;
6. a Git commit containing the verified migration;
7. a pull request containing that commit;
8. later Android device or emulator verification with the required user
   intervention.
