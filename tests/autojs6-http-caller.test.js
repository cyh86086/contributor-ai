import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createAutoJs6HttpCaller } from "../src/autojs6/http-caller.js";
import { executeHttpRequest } from "../src/core/http-adapter.js";

function createMockHttpClient({
  statusCode = 200,
  headers = {},
  body = "",
  shouldThrow = false,
} = {}) {
  const calls = [];
  return {
    calls,
    request(url, options) {
      calls.push({ url, options });
      if (shouldThrow) {
        throw new Error("Network error");
      }
      return {
        statusCode,
        headers,
        body: typeof body === "function" ? body : () => body,
      };
    },
  };
}

describe("AutoJs6 HTTP Caller V1.0", () => {
  it("executes a GET request and returns status, headers, and body", async () => {
    const responseHeaders = { "content-type": "application/json" };
    const responseBody = '{"result":"ok"}';
    const mock = createMockHttpClient({
      statusCode: 200,
      headers: responseHeaders,
      body: responseBody,
    });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    const result = await caller({
      url: "https://api.example.com/data",
      method: "GET",
    });

    assert.equal(result.status, 200);
    assert.deepEqual(result.headers, responseHeaders);
    assert.equal(result.body, responseBody);
    assert.equal(mock.calls.length, 1);
    assert.equal(mock.calls[0].url, "https://api.example.com/data");
    assert.equal(mock.calls[0].options.method, "GET");
  });

  it("executes a POST request with body and headers", async () => {
    const mock = createMockHttpClient({ statusCode: 201, body: "created" });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });
    const reqHeaders = { "Content-Type": "application/json" };
    const reqBody = '{"key":"value"}';

    const result = await caller({
      url: "https://api.example.com/submit",
      method: "POST",
      headers: reqHeaders,
      body: reqBody,
    });

    assert.equal(result.status, 201);
    assert.equal(result.body, "created");
    assert.deepEqual(mock.calls[0].options.headers, reqHeaders);
    assert.equal(mock.calls[0].options.body, reqBody);
  });

  it("passes timeoutMs as timeout in options", async () => {
    const mock = createMockHttpClient({ statusCode: 200, body: "" });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    await caller({
      url: "https://api.example.com/data",
      method: "GET",
      timeoutMs: 5000,
    });

    assert.equal(mock.calls[0].options.timeout, 5000);
  });

  it("throws when httpClient.request throws (network failure)", async () => {
    const mock = createMockHttpClient({ shouldThrow: true });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    await assert.rejects(
      () => caller({ url: "https://api.example.com/data", method: "GET" }),
      (error) => {
        assert.equal(error.message, "The HTTP request failed.");
        return true;
      },
    );
  });

  it("throws when response is null", async () => {
    const mock = {
      request() {
        return null;
      },
    };
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    await assert.rejects(
      () => caller({ url: "https://api.example.com/data", method: "GET" }),
      (error) => {
        assert.equal(error.message, "The HTTP response was invalid.");
        return true;
      },
    );
  });

  it("throws when response has no valid status code", async () => {
    const mock = {
      request() {
        return { statusCode: "not-a-number", headers: {}, body: () => "" };
      },
    };
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    await assert.rejects(
      () => caller({ url: "https://api.example.com/data", method: "GET" }),
      (error) => {
        assert.equal(error.message, "The HTTP response had no valid status.");
        return true;
      },
    );
  });

  it("handles response body as string (not function)", async () => {
    const mock = {
      request() {
        return { statusCode: 200, headers: {}, body: "direct-string" };
      },
    };
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    const result = await caller({
      url: "https://api.example.com/data",
      method: "GET",
    });

    assert.equal(result.body, "direct-string");
  });

  it("returns empty body when response.body() throws", async () => {
    const mock = {
      request() {
        return {
          statusCode: 200,
          headers: {},
          body: () => {
            throw new Error("body read failed");
          },
        };
      },
    };
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    const result = await caller({
      url: "https://api.example.com/data",
      method: "GET",
    });

    assert.equal(result.body, "");
  });

  it("returns empty headers when response has no headers", async () => {
    const mock = {
      request() {
        return { statusCode: 200, body: () => "ok" };
      },
    };
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    const result = await caller({
      url: "https://api.example.com/data",
      method: "GET",
    });

    assert.deepEqual(result.headers, {});
  });

  it("throws TypeError when httpClient is missing", () => {
    assert.throws(
      () => createAutoJs6HttpCaller({}),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /httpClient/);
        return true;
      },
    );
  });

  it("throws TypeError when httpClient.request is not a function", () => {
    assert.throws(
      () => createAutoJs6HttpCaller({ httpClient: {} }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /httpClient/);
        return true;
      },
    );
  });

  it("error messages do not contain URLs or credentials", async () => {
    const mock = createMockHttpClient({ shouldThrow: true });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    try {
      await caller({
        url: "https://secret-api.example.com/v1?key=abc123",
        method: "GET",
        headers: { Authorization: "Bearer secret-token" },
      });
      assert.fail("Should have thrown");
    } catch (error) {
      assert.ok(!error.message.includes("secret-api"));
      assert.ok(!error.message.includes("abc123"));
      assert.ok(!error.message.includes("secret-token"));
    }
  });

  it("logger receives sanitized warnings without sensitive data", async () => {
    const warnings = [];
    const mock = createMockHttpClient({ shouldThrow: true });
    const caller = createAutoJs6HttpCaller({
      httpClient: mock,
      logger: { warn: (msg) => warnings.push(msg) },
    });

    await assert.rejects(() =>
      caller({
        url: "https://secret-api.example.com/v1",
        method: "GET",
        headers: { Authorization: "Bearer secret-token" },
      }),
    );

    assert.ok(warnings.length > 0);
    for (const w of warnings) {
      assert.ok(!w.includes("secret-api"));
      assert.ok(!w.includes("secret-token"));
    }
  });

  it("integrates with portable core executeHttpRequest", async () => {
    const mock = createMockHttpClient({
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: '{"data":"test"}',
    });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    const result = await executeHttpRequest({
      url: "https://api.example.com/data",
      method: "GET",
      httpCaller: caller,
    });

    assert.equal(result.status, 200);
    assert.equal(result.body, '{"data":"test"}');
  });

  it("portable core maps network failure to HTTP_REQUEST_FAILED", async () => {
    const mock = createMockHttpClient({ shouldThrow: true });
    const caller = createAutoJs6HttpCaller({ httpClient: mock });

    await assert.rejects(
      () =>
        executeHttpRequest({
          url: "https://api.example.com/data",
          method: "GET",
          httpCaller: caller,
        }),
      (error) => {
        assert.equal(error.code, "HTTP_REQUEST_FAILED");
        assert.equal(error.name, "HttpAdapterError");
        return true;
      },
    );
  });
});
