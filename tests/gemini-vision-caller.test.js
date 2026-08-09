import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createGeminiVisionCaller } from "../src/autojs6/gemini-vision-caller.js";
import { VisionProviderError } from "../src/core/vision-provider.js";
import { HttpAdapterError } from "../src/core/http-adapter.js";

const VALID_METADATA = {
  description: "A serene mountain landscape at dawn",
  keywords: [
    "mountain",
    "landscape",
    "dawn",
    "nature",
    "serene",
    "scenic",
    "outdoors",
  ],
};

function createMockHttpCaller({
  statusCode = 200,
  responseBody = null,
  shouldThrow = false,
} = {}) {
  const calls = [];
  return {
    calls,
    async caller({ url, method, headers, body }) {
      calls.push({ url, method, headers, body });
      if (shouldThrow) {
        throw new HttpAdapterError("HTTP_REQUEST_FAILED");
      }
      return { status: statusCode, headers: {}, body: responseBody ?? "" };
    },
  };
}

function createMockWithResponse(metadata, statusCode = 200) {
  const text = JSON.stringify(metadata);
  const apiResponse = JSON.stringify({
    candidates: [{ content: { parts: [{ text }] } }],
  });
  return createMockHttpCaller({ statusCode, responseBody: apiResponse });
}

describe("Gemini Vision Caller V1.0", () => {
  it("returns description and keywords for a valid response", async () => {
    const mock = createMockWithResponse(VALID_METADATA);
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    const result = await caller({
      imageBase64: "aGVsbG8=",
      mimeType: "image/jpeg",
    });

    assert.equal(result.description, VALID_METADATA.description);
    assert.deepEqual(result.keywords, VALID_METADATA.keywords);
  });

  it("constructs correct Gemini request with inline_data", async () => {
    const mock = createMockWithResponse(VALID_METADATA);
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await caller({ imageBase64: "aGVsbG8=", mimeType: "image/png" });

    assert.equal(mock.calls.length, 1);
    const call = mock.calls[0];
    assert.ok(call.url.includes("gemini-3.6-flash:generateContent"));
    assert.ok(call.url.includes("key=AIza-test-key"));
    assert.equal(call.method, "POST");
    assert.equal(call.headers["Content-Type"], "application/json");

    const body = JSON.parse(call.body);
    assert.equal(body.contents[0].parts[0].text.length > 0, true);
    assert.equal(body.contents[0].parts[1].inline_data.mime_type, "image/png");
    assert.equal(body.contents[0].parts[1].inline_data.data, "aGVsbG8=");
    assert.equal(body.generationConfig.maxOutputTokens, 1000);
  });

  it("uses custom model and endpoint when provided", async () => {
    const mock = createMockWithResponse(VALID_METADATA);
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
      model: "gemini-1.5-flash",
      apiEndpoint: "https://custom.api.com/v1beta/models",
    });

    await caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" });

    assert.ok(mock.calls[0].url.includes("gemini-1.5-flash:generateContent"));
    assert.ok(mock.calls[0].url.startsWith("https://custom.api.com/"));
  });

  it("maps 401 to PROVIDER_AUTH_FAILED", async () => {
    const mock = createMockHttpCaller({ statusCode: 401 });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-bad-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_AUTH_FAILED");
        return true;
      },
    );
  });

  it("maps 403 to PROVIDER_AUTH_FAILED", async () => {
    const mock = createMockHttpCaller({ statusCode: 403 });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_AUTH_FAILED");
        return true;
      },
    );
  });

  it("maps 429 to PROVIDER_RATE_LIMITED", async () => {
    const mock = createMockHttpCaller({ statusCode: 429 });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_RATE_LIMITED");
        return true;
      },
    );
  });

  it("maps 500 to PROVIDER_UNAVAILABLE", async () => {
    const mock = createMockHttpCaller({ statusCode: 500 });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_UNAVAILABLE");
        return true;
      },
    );
  });

  it("maps network failure to PROVIDER_REQUEST_FAILED", async () => {
    const mock = createMockHttpCaller({ shouldThrow: true });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_REQUEST_FAILED");
        return true;
      },
    );
  });

  it("returns PROVIDER_RESPONSE_INVALID for invalid JSON", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: "not-json",
    });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_RESPONSE_INVALID");
        return true;
      },
    );
  });

  it("returns PROVIDER_RESPONSE_INVALID for missing candidates", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: JSON.stringify({}),
    });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_RESPONSE_INVALID");
        return true;
      },
    );
  });

  it("returns PROVIDER_RESPONSE_INVALID for missing parts text", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: JSON.stringify({
        candidates: [{ content: { parts: [{}] } }],
      }),
    });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_RESPONSE_INVALID");
        return true;
      },
    );
  });

  it("returns PROVIDER_RESPONSE_INVALID for invalid metadata", async () => {
    const text = JSON.stringify({ description: "only desc" });
    const apiResponse = JSON.stringify({
      candidates: [{ content: { parts: [{ text }] } }],
    });
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: apiResponse,
    });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-test-key",
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_RESPONSE_INVALID");
        return true;
      },
    );
  });

  it("maps getApiKey failure to PROVIDER_AUTH_FAILED", async () => {
    const mock = createMockWithResponse(VALID_METADATA);
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => {
        throw new Error("secret store error");
      },
    });

    await assert.rejects(
      () => caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" }),
      (error) => {
        assert.ok(error instanceof VisionProviderError);
        assert.equal(error.code, "PROVIDER_AUTH_FAILED");
        return true;
      },
    );
  });

  it("throws TypeError when httpCaller is missing", () => {
    assert.throws(
      () => createGeminiVisionCaller({ getApiKey: () => "key" }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /httpCaller/);
        return true;
      },
    );
  });

  it("throws TypeError when getApiKey is missing", () => {
    assert.throws(
      () => createGeminiVisionCaller({ httpCaller: async () => ({}) }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /getApiKey/);
        return true;
      },
    );
  });

  it("error messages do not contain API key or image data", async () => {
    const mock = createMockHttpCaller({ shouldThrow: true });
    const caller = createGeminiVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "AIza-super-secret-key",
    });

    try {
      await caller({
        imageBase64: "aGVsbG8gd29ybGQ=",
        mimeType: "image/jpeg",
      });
      assert.fail("Should have thrown");
    } catch (error) {
      assert.ok(!error.message.includes("AIza-super-secret"));
      assert.ok(!error.message.includes("aGVsbG8"));
    }
  });
});
