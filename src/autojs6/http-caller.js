/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This adapter executes HTTPS requests through an injected HTTP client
 * compatible with AutoJs6's `http.request()` API. All dependencies are
 * injected so the behavior can be tested offline without treating Node.js
 * as the production runtime.
 *
 * The returned function satisfies the `httpCaller` contract required by
 * the portable core's `executeHttpRequest()`.
 */

export function createAutoJs6HttpCaller({ httpClient, logger } = {}) {
  validateHttpClient(httpClient);
  const safeLogger = normalizeLogger(logger);

  return async function httpCaller({
    url,
    method,
    headers,
    body,
    timeoutMs,
  } = {}) {
    const options = { method: method ?? "GET" };
    if (headers) {
      options.headers = headers;
    }
    if (body !== undefined) {
      options.body = body;
    }
    if (timeoutMs !== undefined) {
      options.timeout = timeoutMs;
    }

    let response;
    try {
      safeLogger.warn(`[DEBUG] HTTP calling: ${sanitizeUrl(url)}`);
      safeLogger.warn(`[DEBUG] HTTP method: ${options.method}`);
      safeLogger.warn(
        `[DEBUG] HTTP body length: ${options.body ? options.body.length : 0}`,
      );
      response = httpClient.request(url, options);
      safeLogger.warn(`[DEBUG] HTTP response received`);
    } catch (error) {
      safeLogger.warn(
        `[DEBUG] HTTP request failed: ${error.message || String(error)}`,
      );
      safeLogger.warn(`[DEBUG] HTTP error stack: ${error.stack || "no stack"}`);
      throw new Error("The HTTP request failed.");
    }

    if (!response || typeof response !== "object") {
      safeLogger.warn("HTTP response was invalid.");
      throw new Error("The HTTP response was invalid.");
    }

    safeLogger.warn(
      `[DEBUG] HTTP response keys: ${Object.keys(response).join(",")}`,
    );
    const status = response.statusCode;
    safeLogger.warn(`[DEBUG] HTTP status: ${status}, type: ${typeof status}`);
    if (!Number.isSafeInteger(status)) {
      safeLogger.warn("HTTP response had no valid status.");
      throw new Error("The HTTP response had no valid status.");
    }

    let responseBody = "";
    if (typeof response.body === "function") {
      try {
        responseBody = response.body();
      } catch {
        safeLogger.warn("HTTP response body extraction failed.");
        responseBody = "";
      }
    } else if (typeof response.body === "string") {
      responseBody = response.body;
    }

    if (status >= 400) {
      safeLogger.warn(
        `[DEBUG] HTTP error response body: ${responseBody.substring(0, 500)}`,
      );
    }

    return {
      status,
      headers: response.headers ?? {},
      body: responseBody,
    };
  };
}

function validateHttpClient(httpClient) {
  if (!httpClient || typeof httpClient.request !== "function") {
    throw new TypeError("httpClient must be an object with a request() method");
  }
}

function normalizeLogger(logger) {
  if (logger && typeof logger.warn === "function") {
    return logger;
  }
  return { warn() {} };
}

function sanitizeUrl(url) {
  if (!url || typeof url !== "string") {
    return "unknown";
  }
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//[host]${parsed.pathname}`;
  } catch {
    return "invalid-url";
  }
}
