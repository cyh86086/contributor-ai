/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This adapter constructs OpenAI Chat Completions API requests with vision
 * content, executes them through the HTTP adapter, and parses the response
 * into the microstock metadata contract.
 *
 * All dependencies are injected so the behavior can be tested offline
 * without treating Node.js as the production runtime.
 */

import { executeHttpRequest, HttpAdapterError } from "../core/http-adapter.js";
import { VisionProviderError } from "../core/vision-provider.js";

const DEFAULT_MODEL = "gpt-4o";
const DEFAULT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

const PROMPT = [
  "Analyze this image for a microstock photo listing.",
  "Return a JSON object with exactly two fields:",
  '1. "description": an English description under 2000 characters',
  "   suitable for a microstock photo listing.",
  '2. "keywords": an array of exactly 7 English keywords.',
  "Return only the JSON object with no additional text.",
].join(" ");

export function createOpenAIVisionCaller({
  httpCaller,
  getApiKey,
  model = DEFAULT_MODEL,
  apiEndpoint = DEFAULT_ENDPOINT,
} = {}) {
  validateHttpCaller(httpCaller);
  validateGetApiKey(getApiKey);
  validateModel(model);
  validateEndpoint(apiEndpoint);

  return async function providerCaller({ imageBase64, mimeType }) {
    const apiKey = retrieveApiKey(getApiKey);

    const requestBody = buildRequestBody({ imageBase64, mimeType, model });

    let httpResponse;
    try {
      httpResponse = await executeHttpRequest({
        url: apiEndpoint,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
        httpCaller,
      });
    } catch (error) {
      if (error instanceof VisionProviderError) {
        throw error;
      }
      throw mapHttpErrorToVisionError(error);
    }

    return parseOpenAIResponse(httpResponse.body);
  };
}

function buildRequestBody({ imageBase64, mimeType, model }) {
  return {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: PROMPT },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 1000,
  };
}

function parseOpenAIResponse(body) {
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  const content = extractContent(parsed);
  if (typeof content !== "string" || content.length === 0) {
    throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
  }

  let metadata;
  try {
    metadata = JSON.parse(content);
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

function extractContent(response) {
  if (
    !response ||
    !Array.isArray(response.choices) ||
    response.choices.length === 0
  ) {
    return undefined;
  }

  const firstChoice = response.choices[0];
  if (
    !firstChoice ||
    !firstChoice.message ||
    typeof firstChoice.message.content !== "string"
  ) {
    return undefined;
  }

  return firstChoice.message.content;
}

function mapHttpErrorToVisionError(error) {
  if (error instanceof HttpAdapterError) {
    switch (error.code) {
      case "HTTP_AUTH_FAILED":
        return new VisionProviderError("PROVIDER_AUTH_FAILED");
      case "HTTP_RATE_LIMITED":
        return new VisionProviderError("PROVIDER_RATE_LIMITED");
      case "HTTP_SERVER_ERROR":
        return new VisionProviderError("PROVIDER_UNAVAILABLE");
      case "HTTP_FORBIDDEN":
        return new VisionProviderError("PROVIDER_AUTH_FAILED");
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
