# OpenAI Vision Caller V1.0

## Status

- Module: OpenAI Vision Caller V1.0
- Runtime designation: **production Android runtime hosted by AutoJs6**
- Portable core dependency: `src/core/vision-provider.js` (callVisionProvider)
- HTTP adapter dependency: `src/core/http-adapter.js` (executeHttpRequest)
- Specification: this document

## Overview

OpenAI Vision Caller V1.0 is the production adapter that constructs
OpenAI Chat Completions API requests with vision content, executes them
through the HTTP adapter, and parses the response into the microstock
metadata contract (`{ description, keywords }`).

## Interface

### createOpenAIVisionCaller(config)

| Field         | Type       | Description                             |
| ------------- | ---------- | --------------------------------------- |
| `httpCaller`  | `function` | HTTP caller from HTTP Adapter or caller |
| `getApiKey`   | `function` | Returns the OpenAI API key string       |
| `model`       | `string`   | Model name (default: `"gpt-4o"`)        |
| `apiEndpoint` | `string`   | API URL (default: OpenAI completions)   |

### Returns

A function matching the `providerCaller` contract:

```javascript
async function providerCaller({ imageBase64, mimeType }) {
  // Returns { description, keywords }
}
```

## OpenAI API contract

### Request

```
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer <api-key>
Content-Type: application/json
```

Body:

```json
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "<prompt>" },
        {
          "type": "image_url",
          "image_url": { "url": "data:<mimeType>;base64,<base64>" }
        }
      ]
    }
  ],
  "max_tokens": 1000
}
```

### Response

```json
{
  "choices": [
    {
      "message": {
        "content": "{\"description\":\"...\",\"keywords\":[\"...\",\"...\"]}"
      }
    }
  ]
}
```

## Error mapping

| OpenAI HTTP status | Vision Provider error code  |
| ------------------ | --------------------------- |
| 401                | `PROVIDER_AUTH_FAILED`      |
| 429                | `PROVIDER_RATE_LIMITED`     |
| 500, 502, 503      | `PROVIDER_UNAVAILABLE`      |
| Other 4xx          | `PROVIDER_REQUEST_FAILED`   |
| Other 5xx          | `PROVIDER_UNAVAILABLE`      |
| Network failure    | `PROVIDER_REQUEST_FAILED`   |
| Parse failure      | `PROVIDER_RESPONSE_INVALID` |

## Prompt

The prompt instructs the model to return exactly:

- One English description under 2000 characters for microstock listing
- Exactly 7 English keywords

The response must be valid JSON with `description` and `keywords` fields.

## Security and privacy

- API key retrieved at call time through injected `getApiKey()` function
- API key never logged, serialized, or included in error messages
- Image data sent only to the configured OpenAI endpoint
- Prompt contains no URIs, filenames, or user-identifiable information
- Error messages are sanitized

## Test strategy

Offline tests inject mock `httpCaller` and `getApiKey` to verify:

- Successful vision request with valid response
- Correct request construction (model, messages, headers)
- API key included as Bearer token
- Auth failure (401) mapping
- Rate limit (429) mapping
- Server error (500) mapping
- Network failure mapping
- Response parse failure
- Missing choices/content handling
- Invalid JSON content handling
- Error sanitization (no API key or image data in messages)
- Custom model and endpoint support
