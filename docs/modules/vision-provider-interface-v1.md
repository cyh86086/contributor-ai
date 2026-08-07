# Vision Provider Interface V1.0 specification

## Status

- Historical target module: Vision Provider Interface V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no provider SDK or HTTP dependencies

## Purpose

Vision Provider Interface V1.0 defines the provider-neutral contract for
sending an authorized image to a remote AI Vision service and receiving a
validated microstock metadata result. It does not select images, manage a
queue, populate the Contributor app, or submit content.

The interface supports multiple AI Vision providers (OpenAI, Gemini) through a
single normalized contract. Provider-specific HTTP details are isolated behind
an injected production adapter.

## Production flow position

```text
Android Image Input Adapter V1.0
  -> { sourceUri, mimeType, sizeBytes, imageBase64 }
  -> Vision Provider Interface V1.0        ← this module
  -> { description, keywords }
  -> runtime-neutral validation (validateVisionMetadata)
  -> Contributor app field-entry boundary
```

## Input contract

The portable entry point receives:

- `imageBase64`: a non-empty Base64 string without a data URL prefix, produced
  by the Android Image Input Adapter V1.0;
- `mimeType`: a normalized supported MIME type (`image/jpeg`, `image/png`,
  `image/webp`, `image/heic`, `image/heif`);
- an injected production caller capable of making an authorized HTTPS request
  to the configured provider and returning the raw provider response.

The exact function or class API will be chosen during implementation review.
This specification defines behavior rather than inventing a historical source
signature.

## Output contract

On success, the module returns a provider-neutral value equivalent to:

```json
{
  "description": "English text under 2000 characters",
  "keywords": ["exactly", "seven", "English", "keywords", "for", "the", "image"]
}
```

Contract rules:

- `description` is non-empty English text with fewer than 2,000 characters;
- `keywords` is an array containing exactly seven English keyword strings;
- the result is validated by the existing `validateVisionMetadata()` portable
  core function;
- the result is treated as a draft until the user reviews it.

## Runtime separation

### Runtime-neutral validation and payload logic

The portable layer owns:

- provider response validation via `validateVisionMetadata()`;
- normalized error mapping for provider failures;
- request payload construction (provider-neutral);
- response normalization across providers.

It must not import or call Node.js, Android, AutoJs6, HTTP, provider SDK,
credentials, or Contributor app APIs.

### AutoJs6 and Android production adapter

The injected production adapter owns:

- HTTPS request execution through AutoJs6;
- credential retrieval from an approved runtime secret mechanism;
- provider-specific request formatting (OpenAI chat completions, Gemini
  generateContent, etc.);
- provider-specific response parsing;
- retry, timeout, and rate-limit handling;
- network error classification.

The production adapter must expose only the minimum request and response
information required by the portable contract. It must not log credentials,
image Base64, or provider response payloads.

### Node.js offline mock test harness

Node.js may provide deterministic mock provider responses and injected mock
failures for offline tests only. It must not be described, packaged, or
accepted as the production adapter. Node.js tests cannot establish network,
provider, or device compatibility.

## Supported providers

| Provider | API endpoint                                                  | Auth method         |
| -------- | ------------------------------------------------------------- | ------------------- |
| OpenAI   | `https://api.openai.com/v1/chat/completions`                  | Bearer token        |
| Gemini   | `https://generativelanguage.googleapis.com/v1beta/models/...` | API key query param |

Additional providers may be added through the same interface without modifying
the portable contract.

## Request contract

The portable layer constructs a provider-neutral request. The production
adapter translates it to the provider-specific format:

```json
{
  "mimeType": "image/jpeg",
  "imageBase64": "raw Base64 without data URL prefix",
  "prompt": "Analyze this image and return a microstock description under 2000 characters and exactly 7 English keywords."
}
```

The prompt is a fixed, provider-neutral instruction. It must not contain
credentials, URIs, filenames, or user-identifiable information.

## Response contract

The production adapter parses the provider-specific response into the portable
format:

```json
{
  "description": "English text under 2000 characters",
  "keywords": ["exactly", "seven", "English", "keywords", "for", "the", "image"]
}
```

The portable layer validates this through `validateVisionMetadata()`. If
validation fails, the module returns `PROVIDER_RESPONSE_INVALID`.

## Required errors

Failures must be distinguishable by stable machine-readable codes. Error
messages must not contain credentials, image Base64, provider response
payloads, or sensitive network details.

| Code                           | Required condition                                            |
| ------------------------------ | ------------------------------------------------------------- |
| `PROVIDER_RESPONSE_INVALID`    | Provider response fails `validateVisionMetadata()` validation |
| `PROVIDER_REQUEST_FAILED`      | Network error, timeout, or HTTP error from the provider       |
| `PROVIDER_AUTH_FAILED`         | Authentication failure (invalid token, expired key)           |
| `PROVIDER_RATE_LIMITED`        | Provider rate limit or quota exceeded                         |
| `PROVIDER_UNAVAILABLE`         | Provider service unavailable or maintenance                   |
| `IMAGE_TOO_LARGE_FOR_PROVIDER` | Image exceeds the provider's maximum size limit               |

An implementation must preserve the stable code when adding a sanitized
human-readable message. Provider-specific error details must not leak into
the public error.

## Security and privacy rules

- Credentials must be supplied through an approved runtime secret mechanism
  outside Git.
- Credentials must not be logged, serialized, or included in error messages.
- Image Base64 must not be persisted to disk by default.
- Provider response payloads must not be logged in full.
- The module must not make network requests directly; all HTTP goes through
  the injected production adapter.
- The module must not store or cache provider responses.
- The prompt must not contain URIs, filenames, or user-identifiable information.

## Provider size limits

Each provider has a maximum image size. The portable layer must validate the
image size against the configured provider limit before making a request:

| Provider | Maximum image size |
| -------- | ------------------ |
| OpenAI   | 20 MB per image    |
| Gemini   | 20 MB per image    |

The exact limit is an integration-time configuration decision. When the image
exceeds the limit, the module returns `IMAGE_TOO_LARGE_FOR_PROVIDER` without
making a network request.

## Required tests

### Runtime-neutral and Node.js offline tests

The future implementation must include deterministic tests for:

1. **Valid provider response:** a mock provider returns a valid description and
   seven keywords; the module returns the validated result.
2. **Invalid provider response:** a mock provider returns a malformed or
   non-contract response; the module returns `PROVIDER_RESPONSE_INVALID`.
3. **Network failure:** an injected network failure produces
   `PROVIDER_REQUEST_FAILED`.
4. **Authentication failure:** an injected auth failure produces
   `PROVIDER_AUTH_FAILED`.
5. **Rate limiting:** an injected rate limit produces `PROVIDER_RATE_LIMITED`.
6. **Service unavailable:** an injected service failure produces
   `PROVIDER_UNAVAILABLE`.
7. **Image too large:** an oversized image produces
   `IMAGE_TOO_LARGE_FOR_PROVIDER` without a network request.
8. **Credential isolation:** credentials do not appear in error messages, logs,
   or serialized output.
9. **Response sanitization:** provider response payloads do not leak into
   error messages or logs.

### Later AutoJs6 integration tests

Production integration tests are deferred until an implementation exists and
will require user action. On an authorized Android device or emulator, they
must verify:

- a real HTTPS request to the configured provider succeeds with a valid image;
- the provider returns a valid description and seven keywords;
- network failures map to the required error codes;
- authentication failures map to `PROVIDER_AUTH_FAILED`;
- credentials are not logged or exposed;
- image Base64 is not persisted to disk.

The user must supply or authorize the device/emulator, network access, provider
account, credentials (outside Git), and representative test images. Offline
Node.js tests cannot replace this verification.

## Completion criteria

Vision Provider Interface V1.0 remains **NOT YET MIGRATED** until all of the
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
