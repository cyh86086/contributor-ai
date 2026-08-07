import { validateVisionMetadata } from "./metadata.js";

export const VISION_PROVIDER_ERROR_CODES = Object.freeze({
  PROVIDER_RESPONSE_INVALID: "PROVIDER_RESPONSE_INVALID",
  PROVIDER_REQUEST_FAILED: "PROVIDER_REQUEST_FAILED",
  PROVIDER_AUTH_FAILED: "PROVIDER_AUTH_FAILED",
  PROVIDER_RATE_LIMITED: "PROVIDER_RATE_LIMITED",
  PROVIDER_UNAVAILABLE: "PROVIDER_UNAVAILABLE",
  IMAGE_TOO_LARGE_FOR_PROVIDER: "IMAGE_TOO_LARGE_FOR_PROVIDER",
});

const ERROR_MESSAGES = Object.freeze({
  [VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID]:
    "The provider response does not match the required contract.",
  [VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED]:
    "The provider request failed.",
  [VISION_PROVIDER_ERROR_CODES.PROVIDER_AUTH_FAILED]:
    "The provider authentication failed.",
  [VISION_PROVIDER_ERROR_CODES.PROVIDER_RATE_LIMITED]:
    "The provider rate limit was exceeded.",
  [VISION_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE]:
    "The provider service is unavailable.",
  [VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER]:
    "The image exceeds the provider maximum size limit.",
});

export class VisionProviderError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);
    this.name = "VisionProviderError";
    this.code = code;
  }
}

export async function callVisionProvider({
  imageBase64,
  mimeType,
  providerCaller,
  maxImageBytes,
}) {
  validateImageBase64(imageBase64);
  validateMimeType(mimeType);
  validateProviderCaller(providerCaller);
  validateMaxImageBytes(maxImageBytes);

  if (imageBase64.length * 0.75 > maxImageBytes) {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER,
    );
  }

  let rawResponse;
  try {
    rawResponse = await providerCaller({ imageBase64, mimeType });
  } catch (error) {
    if (error instanceof VisionProviderError) {
      throw error;
    }
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
    );
  }

  const normalized = normalizeProviderResponse(rawResponse);

  try {
    return validateVisionMetadata(normalized);
  } catch {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
    );
  }
}

export function normalizeProviderResponse(value) {
  if (!value || typeof value !== "object") {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
    );
  }

  const { description, keywords } = value;

  if (typeof description !== "string" || typeof keywords !== "object") {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
    );
  }

  return { description, keywords };
}

function validateImageBase64(imageBase64) {
  if (
    typeof imageBase64 !== "string" ||
    imageBase64.length === 0 ||
    imageBase64.startsWith("data:")
  ) {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
    );
  }
}

function validateMimeType(mimeType) {
  if (typeof mimeType !== "string" || mimeType.length === 0) {
    throw visionProviderError(
      VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
    );
  }
}

function validateProviderCaller(providerCaller) {
  if (typeof providerCaller !== "function") {
    throw new TypeError("providerCaller must be a function");
  }
}

function validateMaxImageBytes(maxImageBytes) {
  if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
    throw new TypeError("maxImageBytes must be a positive safe integer");
  }
}

function visionProviderError(code) {
  return new VisionProviderError(code);
}
