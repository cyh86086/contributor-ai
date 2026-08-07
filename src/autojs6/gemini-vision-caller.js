/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This adapter constructs Google Gemini API requests with vision content,
 * executes them through the HTTP adapter, and parses the response into the
 * microstock metadata contract.
 *
 * All dependencies are injected so the behavior can be tested offline
 * without treating Node.js as the production runtime.
 */

import { executeHttpRequest, HttpAdapterError } from "../core/http-adapter.js";
import { VisionProviderError } from "../core/vision-provider.js";

const DEFAULT_MODEL = "gemini-1.5-pro";
const DEFAULT_BASE_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models";

const PROMPT = [
  "Analyze this image for a microstock photo listing.",
  "Return a JSON object with exactly two fields:",
  '1. "description": an English description under 2000 characters',
  "   suitable for a microstock photo listing.",
  '2. "keywords": an array of exactly 7 English keywords.',
  "Return only the JSON object with no additional text.",
].join(" ");

export function createGeminiVisionCaller({
  httpCaller,
  getApiKey,
  model = DEFAULT_MODEL,
  apiEndpoint = DEFAULT_BASE_ENDPOINT,
} = {}) {
  validateHttpCaller(httpCaller);
  validateGetApiKey(getApiKey);
  validateModel(model);
  validateEndpoint(apiEndpoint);

  return async function providerCaller({ imageBase64, mimeType }) {
    const apiKey = retrieveApiKey(getApiKey);
    const url = `${apiEndpoint}/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: PROMPT },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1000,
      },
    };

    let httpResponse;
    try {
      httpResponse = await executeHttpRequest({
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        httpCaller,
      });
    } catch (error) {
      if (error instanceof VisionProviderError) {
        throw error;
      }
      throw mapHttpErrorToVisionError(error);
    }

    return parseGeminiResponse(httpResponse.body);
  };
}

function parseGeminiResponse(body) {
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  const text = extractText(parsed);
  if (typeof text !== "string" || text.length === 0) {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  let metadata;
  try {
    metadata = JSON.parse(text);
  } catch {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  if (
    !metadata ||
    typeof metadata !== "object" ||
    typeof metadata.description !== "string" ||
    !Array.isArray(metadata.keywords)
  ) {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  return {
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

function extractText(response) {
  if (
    !response ||
    !Array.isArray(response.candidates) ||
    response.candidates.length === 0
  ) {
    return undefined;
  }

  const firstCandidate = response.candidates[0];
  if (
    !firstCandidate ||
    !firstCandidate.content ||
    !Array.isArray(firstCandidate.content.parts) ||
    firstCandidate.content.parts.length === 0
  ) {
    return undefined;
  }

  const firstPart = firstCandidate.content.parts[0];
  if (!firstPart || typeof firstPart.text !== "string") {
    return undefined;
  }

  return firstPart.text;
}

function mapHttpErrorToVisionError(error) {
  if (error instanceof HttpAdapterError) {
    switch (error.code) {
      case "HTTP_AUTH_FAILED":
      case "HTTP_FORBIDDEN":
        return new VisionProviderError("PROVIDER_AUTH_FAILED");
      case "HTTP_RATE_LIMITED":
        return new VisionProviderError("PROVIDER_RATE_LIMITED");
      case "HTTP_SERVER_ERROR":
        return new VisionProviderError("PROVIDER_UNAVAILABLE");
      case "HTTP_REQUEST_FAILED":
        return new VisionProviderError("PROVIDER_REQUEST_FAILED");
      default:
        return new VisionProviderError("PROVIDER_REQUEST_FAILED");
    }
  }
  return new VisionProviderError("PROVIDER_REQUEST_FAILED");
}

function retrieveApiKey(getApiKey) {
  let key;
  try {
    key = getApiKey();
  } catch {
    throw new VisionProviderError("PROVIDER_AUTH_FAILED");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new VisionProviderError("PROVIDER_AUTH_FAILED");
  }
  return key;
}

function validateHttpCaller(httpCaller) {
  if (typeof httpCaller !== "function") {
    throw new TypeError("httpCaller must be a function");
  }
}

function validateGetApiKey(getApiKey) {
  if (typeof getApiKey !== "function") {
    throw new TypeError("getApiKey must be a function");
  }
}

function validateModel(model) {
  if (typeof model !== "string" || model.length === 0) {
    throw new TypeError("model must be a non-empty string");
  }
}

function validateEndpoint(apiEndpoint) {
  if (typeof apiEndpoint !== "string" || apiEndpoint.length === 0) {
    throw new TypeError("apiEndpoint must be a non-empty string");
  }
}
