import assert from "node:assert/strict";
import test from "node:test";

import {
  VISION_PROVIDER_ERROR_CODES,
  VisionProviderError,
  callVisionProvider,
  normalizeProviderResponse,
} from "../src/core/index.js";

const VALID_BASE64 = Buffer.from([0xff, 0xd8, 0xff, 0xe0]).toString("base64");
const VALID_MIME = "image/jpeg";
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

const VALID_RESPONSE = {
  description: "A colorful sunset over the ocean with waves crashing on rocks.",
  keywords: ["sunset", "ocean", "waves", "rocks", "colorful", "sky", "nature"],
};

test("public error codes remain narrowly scoped", () => {
  assert.deepEqual(Object.keys(VISION_PROVIDER_ERROR_CODES), [
    "PROVIDER_RESPONSE_INVALID",
    "PROVIDER_REQUEST_FAILED",
    "PROVIDER_AUTH_FAILED",
    "PROVIDER_RATE_LIMITED",
    "PROVIDER_UNAVAILABLE",
    "IMAGE_TOO_LARGE_FOR_PROVIDER",
  ]);
});

test("calls provider and returns validated result", async () => {
  const result = await callVisionProvider({
    imageBase64: VALID_BASE64,
    mimeType: VALID_MIME,
    providerCaller: async () => VALID_RESPONSE,
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.deepEqual(result, {
    description: VALID_RESPONSE.description,
    keywords: VALID_RESPONSE.keywords,
  });
});

test("rejects invalid provider response with missing description", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => ({ keywords: VALID_RESPONSE.keywords }),
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
  );
});

test("rejects invalid provider response with wrong keyword count", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => ({
          description: VALID_RESPONSE.description,
          keywords: ["only", "three"],
        }),
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
  );
});

test("rejects null provider response", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => null,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
  );
});

test("maps provider caller exception to PROVIDER_REQUEST_FAILED", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => {
          throw new Error("network timeout detail");
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
  );
});

test("preserves VisionProviderError from provider caller", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => {
          throw new VisionProviderError(
            VISION_PROVIDER_ERROR_CODES.PROVIDER_AUTH_FAILED,
          );
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_AUTH_FAILED,
  );
});

test("rejects oversized image without calling provider", async () => {
  let called = false;

  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => {
          called = true;
          return VALID_RESPONSE;
        },
        maxImageBytes: 1,
      }),
    VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER,
  );

  assert.equal(called, false);
});

test("rejects data URL prefix in imageBase64", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: "data:image/jpeg;base64," + VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
  );
});

test("rejects empty imageBase64", async () => {
  await rejectsCode(
    () =>
      callVisionProvider({
        imageBase64: "",
        mimeType: VALID_MIME,
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
  );
});

test("rejects invalid maxImageBytes", async () => {
  await assert.rejects(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: -1,
      }),
    {
      name: "TypeError",
      message: "maxImageBytes must be a positive safe integer",
    },
  );
});

test("rejects non-function providerCaller", async () => {
  await assert.rejects(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: "not a function",
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    {
      name: "TypeError",
      message: "providerCaller must be a function",
    },
  );
});

test("normalizeProviderResponse extracts description and keywords", () => {
  const result = normalizeProviderResponse(VALID_RESPONSE);
  assert.deepEqual(result, {
    description: VALID_RESPONSE.description,
    keywords: VALID_RESPONSE.keywords,
  });
});

test("normalizeProviderResponse rejects null", () => {
  assert.throws(
    () => normalizeProviderResponse(null),
    (error) => {
      assert.ok(error instanceof VisionProviderError);
      assert.equal(
        error.code,
        VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
      );
      return true;
    },
  );
});

test("normalizeProviderResponse rejects missing fields", () => {
  assert.throws(
    () => normalizeProviderResponse({ description: "test" }),
    (error) => {
      assert.ok(error instanceof VisionProviderError);
      assert.equal(
        error.code,
        VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID,
      );
      return true;
    },
  );
});

test("error messages are sanitized and contain no sensitive data", async () => {
  const sensitiveValue = "secret-token-123 /private/path";

  await assert.rejects(
    () =>
      callVisionProvider({
        imageBase64: VALID_BASE64,
        mimeType: VALID_MIME,
        providerCaller: async () => {
          throw new Error(sensitiveValue);
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (error) => {
      assert.ok(error instanceof VisionProviderError);
      assert.equal(
        error.code,
        VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED,
      );
      assert.equal(error.message.includes(sensitiveValue), false);
      return true;
    },
  );
});

async function rejectsCode(action, expectedCode) {
  await assert.rejects(action, (error) => {
    assert.ok(error instanceof VisionProviderError);
    assert.equal(error.code, expectedCode);
    return true;
  });
}
