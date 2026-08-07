export const HTTP_ADAPTER_ERROR_CODES = Object.freeze({
  HTTP_REQUEST_FAILED: "HTTP_REQUEST_FAILED",
  HTTP_TIMEOUT: "HTTP_TIMEOUT",
  HTTP_INVALID_URL: "HTTP_INVALID_URL",
  HTTP_INVALID_METHOD: "HTTP_INVALID_METHOD",
  HTTP_SERVER_ERROR: "HTTP_SERVER_ERROR",
  HTTP_CLIENT_ERROR: "HTTP_CLIENT_ERROR",
  HTTP_AUTH_FAILED: "HTTP_AUTH_FAILED",
  HTTP_FORBIDDEN: "HTTP_FORBIDDEN",
  HTTP_RATE_LIMITED: "HTTP_RATE_LIMITED",
});

const ERROR_MESSAGES = Object.freeze({
  [HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED]: "The HTTP request failed.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_TIMEOUT]: "The HTTP request timed out.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL]:
    "The URL is invalid or not HTTPS.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD]:
    "The HTTP method is not supported.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR]: "The server returned an error.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR]: "The request was invalid.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED]: "Authentication failed.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN]: "Access is forbidden.",
  [HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED]: "Rate limit exceeded.",
});

const SUPPORTED_METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);

export class HttpAdapterError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);
    this.name = "HttpAdapterError";
    this.code = code;
  }
}

export async function executeHttpRequest({
  url,
  method,
  headers,
  body,
  timeoutMs,
  httpCaller,
}) {
  validateUrl(url);
  validateMethod(method);
  validateHttpCaller(httpCaller);
  validateTimeout(timeoutMs);

  let rawResponse;
  try {
    rawResponse = await httpCaller({ url, method, headers, body, timeoutMs });
  } catch (error) {
    if (error instanceof HttpAdapterError) {
      throw error;
    }
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
  }

  return classifyHttpResponse(rawResponse);
}

export function classifyHttpResponse(response) {
  if (!response || typeof response !== "object") {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
  }

  const { status, headers, body } = response;

  if (!Number.isSafeInteger(status) || status < 100 || status > 599) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
  }

  if (status === 401) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED);
  }

  if (status === 403) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN);
  }

  if (status === 429) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED);
  }

  if (status >= 500) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR);
  }

  if (status >= 400) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR);
  }

  return {
    status,
    headers: headers ?? {},
    body: typeof body === "string" ? body : "",
  };
}

function validateUrl(url) {
  if (typeof url !== "string" || url.length === 0) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL);
  }

  if (!/^https:\/\/.+/u.test(url)) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL);
  }
}

function validateMethod(method) {
  if (
    typeof method !== "string" ||
    !SUPPORTED_METHODS.has(method.toUpperCase())
  ) {
    throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD);
  }
}

function validateHttpCaller(httpCaller) {
  if (typeof httpCaller !== "function") {
    throw new TypeError("httpCaller must be a function");
  }
}

function validateTimeout(timeoutMs) {
  if (timeoutMs !== undefined) {
    if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
      throw new TypeError("timeoutMs must be a positive safe integer");
    }
  }
}

function httpAdapterError(code) {
  return new HttpAdapterError(code);
}
