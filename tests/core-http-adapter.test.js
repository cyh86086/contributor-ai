import assert from "node:assert/strict";
import test from "node:test";

import {
  HTTP_ADAPTER_ERROR_CODES,
  HttpAdapterError,
  executeHttpRequest,
  classifyHttpResponse,
} from "../src/core/index.js";

const VALID_URL = "https://api.example.com/v1/test";
const VALID_METHOD = "POST";

test("public error codes remain narrowly scoped", () => {
  assert.deepEqual(Object.keys(HTTP_ADAPTER_ERROR_CODES), [
    "HTTP_REQUEST_FAILED",
    "HTTP_TIMEOUT",
    "HTTP_INVALID_URL",
    "HTTP_INVALID_METHOD",
    "HTTP_SERVER_ERROR",
    "HTTP_CLIENT_ERROR",
    "HTTP_AUTH_FAILED",
    "HTTP_FORBIDDEN",
    "HTTP_RATE_LIMITED",
  ]);
});

test("executes valid GET request", async () => {
  const result = await executeHttpRequest({
    url: VALID_URL,
    method: "GET",
    httpCaller: async () => ({ status: 200, headers: {}, body: "ok" }),
  });

  assert.equal(result.status, 200);
  assert.equal(result.body, "ok");
});

test("executes valid POST request", async () => {
  const result = await executeHttpRequest({
    url: VALID_URL,
    method: "POST",
    headers: { "content-type": "application/json" },
    body: '{"test": true}',
    httpCaller: async () => ({ status: 201, headers: {}, body: "created" }),
  });

  assert.equal(result.status, 201);
});

test("maps network failure to HTTP_REQUEST_FAILED", async () => {
  await rejectsCode(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "GET",
        httpCaller: async () => {
          throw new Error("network timeout detail");
        },
      }),
    HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED,
  );
});

test("preserves HttpAdapterError from httpCaller", async () => {
  await rejectsCode(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "GET",
        httpCaller: async () => {
          throw new HttpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_TIMEOUT);
        },
      }),
    HTTP_ADAPTER_ERROR_CODES.HTTP_TIMEOUT,
  );
});

test("rejects non-HTTPS URL", async () => {
  await rejectsCode(
    () =>
      executeHttpRequest({
        url: "http://api.example.com/v1/test",
        method: "GET",
        httpCaller: async () => ({ status: 200, headers: {}, body: "ok" }),
      }),
    HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL,
  );
});

test("rejects empty URL", async () => {
  await rejectsCode(
    () =>
      executeHttpRequest({
        url: "",
        method: "GET",
        httpCaller: async () => ({ status: 200, headers: {}, body: "ok" }),
      }),
    HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL,
  );
});

test("rejects unsupported HTTP method", async () => {
  await rejectsCode(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "PATCH",
        httpCaller: async () => ({ status: 200, headers: {}, body: "ok" }),
      }),
    HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD,
  );
});

test("rejects invalid timeout", async () => {
  await assert.rejects(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "GET",
        timeoutMs: -1,
        httpCaller: async () => ({ status: 200, headers: {}, body: "ok" }),
      }),
    {
      name: "TypeError",
      message: "timeoutMs must be a positive safe integer",
    },
  );
});

test("rejects non-function httpCaller", async () => {
  await assert.rejects(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "GET",
        httpCaller: "not a function",
      }),
    {
      name: "TypeError",
      message: "httpCaller must be a function",
    },
  );
});

test("classifyHttpResponse returns 200 response", () => {
  const result = classifyHttpResponse({
    status: 200,
    headers: { "content-type": "application/json" },
    body: '{"ok": true}',
  });

  assert.equal(result.status, 200);
  assert.deepEqual(result.headers, { "content-type": "application/json" });
  assert.equal(result.body, '{"ok": true}');
});

test("classifyHttpResponse maps 401 to HTTP_AUTH_FAILED", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 401, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED);
      return true;
    },
  );
});

test("classifyHttpResponse maps 403 to HTTP_FORBIDDEN", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 403, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN);
      return true;
    },
  );
});

test("classifyHttpResponse maps 429 to HTTP_RATE_LIMITED", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 429, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED);
      return true;
    },
  );
});

test("classifyHttpResponse maps 500 to HTTP_SERVER_ERROR", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 500, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR);
      return true;
    },
  );
});

test("classifyHttpResponse maps 400 to HTTP_CLIENT_ERROR", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 400, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR);
      return true;
    },
  );
});

test("classifyHttpResponse rejects null response", () => {
  assert.throws(
    () => classifyHttpResponse(null),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
      return true;
    },
  );
});

test("classifyHttpResponse rejects invalid status", () => {
  assert.throws(
    () => classifyHttpResponse({ status: 999, headers: {}, body: "" }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
      return true;
    },
  );
});

test("error messages are sanitized and contain no sensitive data", async () => {
  const sensitiveValue = "secret-token-123 https://api.example.com?key=secret";

  await assert.rejects(
    () =>
      executeHttpRequest({
        url: VALID_URL,
        method: "GET",
        httpCaller: async () => {
          throw new Error(sensitiveValue);
        },
      }),
    (error) => {
      assert.ok(error instanceof HttpAdapterError);
      assert.equal(error.code, HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
      assert.equal(error.message.includes(sensitiveValue), false);
      return true;
    },
  );
});

async function rejectsCode(action, expectedCode) {
  await assert.rejects(action, (error) => {
    assert.ok(error instanceof HttpAdapterError);
    assert.equal(error.code, expectedCode);
    return true;
  });
}
