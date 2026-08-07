# Gemini Vision Caller V1.0

## Status

- Module: Gemini Vision Caller V1.0
- Runtime designation: **production Android runtime hosted by AutoJs6**
- Portable core dependency: `src/core/vision-provider.js` (callVisionProvider)
- HTTP adapter dependency: `src/core/http-adapter.js` (executeHttpRequest)
- Specification: this document

## Overview

Gemini Vision Caller V1.0 is the production adapter that constructs Google
Gemini API requests with vision content, executes them through the HTTP
adapter, and parses the response into the microstock metadata contract.

## Interface

### createGeminiVisionCaller(config)

| Field         | Type       | Description                              |
| ------------- | ---------- | ---------------------------------------- |
| `httpCaller`  | `function` | HTTP caller from HTTP Adapter or caller  |
| `getApiKey`   | `function` | Returns the Gemini API key string        |
| `model`       | `string`   | Model name (default: `"gemini-1.5-pro"`) |
| `apiEndpoint` | `string`   | Base API URL (default: Gemini endpoint)  |

### Returns

A function matching the `providerCaller` contract:

```javascript
async function providerCaller({ imageBase64, mimeType }) {
  // Returns { description, keywords }
}
```

## Gemini API contract

### Request

```
POST https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent?key=<api-key>
Content-Type: application/json
```

Body:

```json
{
  "contents": [
    {
      "parts": [
        { "text": "<prompt>" },
        { "inline_data": { "mime_type": "image/jpeg", "data": "<base64>" } }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.1,
    "maxOutputTokens": 1000
  }
}
```

### Response

```json
{
  "candidates": [
    {
      "content": {
        "parts": [{ "text": "{\"description\":\"...\",\"keywords\":[...]}" }]
      }
    }
  ]
}
```

## Error mapping

| Gemini HTTP status | Vision Provider error code  |
| ------------------ | --------------------------- |
| 401, 403           | `PROVIDER_AUTH_FAILED`      |
| 429                | `PROVIDER_RATE_LIMITED`     |
| 500, 502, 503      | `PROVIDER_UNAVAILABLE`      |
| Other 4xx          | `PROVIDER_REQUEST_FAILED`   |
| Other 5xx          | `PROVIDER_UNAVAILABLE`      |
| Network failure    | `PROVIDER_REQUEST_FAILED`   |
| Parse failure      | `PROVIDER_RESPONSE_INVALID` |

## Security and privacy

- API key passed as query parameter (Gemini API requirement)
- API key never logged, serialized, or included in error messages
- Image data sent only to the configured Gemini endpoint
- Prompt contains no URIs, filenames, or user-identifiable information
- Error messages are sanitized
