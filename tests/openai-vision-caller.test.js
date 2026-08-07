import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createOpenAIVisionCaller } from "../src/autojs6/openai-vision-caller.js";
import { VisionProviderError } from "../src/core/vision-provider.js";
import { HttpAdapterError } from "../src/core/http-adapter.js";

const VALID_METADATA = {
  description: "A colorful sunset over the ocean",
  keywords: ["sunset", "ocean", "sky", "nature", "water", "horizon", "colors"],
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

function createMockHttpCallerWithResponse(metadata, statusCode = 200) {
  const content = JSON.stringify(metadata);
  const apiResponse = JSON.stringify({
    choices: [{ message: { content } }],
  });
  return createMockHttpCaller({ statusCode, responseBody: apiResponse });
}

describe("OpenAI Vision Caller V1.0", () => {
  it("returns description and keywords for a valid response", async () => {
    const mock = createMockHttpCallerWithResponse(VALID_METADATA);
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
    });

    const result = await caller({
      imageBase64: "aGVsbG8=",
      mimeType: "image/jpeg",
    });

    assert.equal(result.description, VALID_METADATA.description);
    assert.deepEqual(result.keywords, VALID_METADATA.keywords);
  });

  it("constructs correct request with model, headers, and body", async () => {
    const mock = createMockHttpCallerWithResponse(VALID_METADATA);
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
    });

    await caller({ imageBase64: "aGVsbG8=", mimeType: "image/png" });

    assert.equal(mock.calls.length, 1);
    const call = mock.calls[0];
    assert.equal(call.url, "https://api.openai.com/v1/chat/completions");
    assert.equal(call.method, "POST");
    assert.equal(call.headers["Content-Type"], "application/json");
    assert.equal(call.headers.Authorization, "Bearer sk-test-key");

    const body = JSON.parse(call.body);
    assert.equal(body.model, "gpt-4o");
    assert.equal(body.messages[0].role, "user");
    assert.equal(body.messages[0].content[0].type, "text");
    assert.equal(body.messages[0].content[1].type, "image_url");
    assert.equal(
      body.messages[0].content[1].image_url.url,
      "data:image/png;base64,aGVsbG8=",
    );
    assert.equal(body.max_tokens, 1000);
  });

  it("uses custom model and endpoint when provided", async () => {
    const mock = createMockHttpCallerWithResponse(VALID_METADATA);
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
      model: "gpt-4-turbo",
      apiEndpoint: "https://custom.api.com/v1/chat",
    });

    await caller({ imageBase64: "aGVsbG8=", mimeType: "image/jpeg" });

    assert.equal(mock.calls[0].url, "https://custom.api.com/v1/chat");
    const body = JSON.parse(mock.calls[0].body);
    assert.equal(body.model, "gpt-4-turbo");
  });

  it("maps 401 to PROVIDER_AUTH_FAILED", async () => {
    const mock = createMockHttpCaller({ statusCode: 401, responseBody: "" });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-bad-key",
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
    const mock = createMockHttpCaller({ statusCode: 429, responseBody: "" });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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
    const mock = createMockHttpCaller({ statusCode: 500, responseBody: "" });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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

  it("returns PROVIDER_RESPONSE_INVALID for invalid JSON body", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: "not-json",
    });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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

  it("returns PROVIDER_RESPONSE_INVALID for missing choices", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: JSON.stringify({}),
    });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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

  it("returns PROVIDER_RESPONSE_INVALID for missing message content", async () => {
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: JSON.stringify({ choices: [{ message: {} }] }),
    });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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

  it("returns PROVIDER_RESPONSE_INVALID for invalid metadata JSON", async () => {
    const content = JSON.stringify({ description: "only desc" });
    const apiResponse = JSON.stringify({
      choices: [{ message: { content } }],
    });
    const mock = createMockHttpCaller({
      statusCode: 200,
      responseBody: apiResponse,
    });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-test-key",
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
    const mock = createMockHttpCallerWithResponse(VALID_METADATA);
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => {
        throw new Error("secret store unavailable");
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

  it("maps empty API key to PROVIDER_AUTH_FAILED", async () => {
    const mock = createMockHttpCallerWithResponse(VALID_METADATA);
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "",
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
      () => createOpenAIVisionCaller({ getApiKey: () => "sk-test" }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /httpCaller/);
        return true;
      },
    );
  });

  it("throws TypeError when getApiKey is missing", () => {
    assert.throws(
      () => createOpenAIVisionCaller({ httpCaller: async () => ({}) }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /getApiKey/);
        return true;
      },
    );
  });

  it("error messages do not contain API key or image data", async () => {
    const mock = createMockHttpCaller({ shouldThrow: true });
    const caller = createOpenAIVisionCaller({
      httpCaller: mock.caller,
      getApiKey: () => "sk-super-secret-key-12345",
    });

    try {
      await caller({
        imageBase64: "aGVsbG8gd29ybGQ=",
        mimeType: "image/jpeg",
      });
      assert.fail("Should have thrown");
    } catch (error) {
      assert.ok(!error.message.includes("sk-super-secret"));
      assert.ok(!error.message.includes("aGVsbG8"));
    }
  });
});
