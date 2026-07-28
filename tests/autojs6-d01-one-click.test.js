import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

import {
  D01_TEST_CASE_ID,
  runD01OneClick,
} from "../scripts/autojs6/d01-launcher-core.js";
import {
  assertAutoJs6D01SyntaxCompatible,
  findAutoJs6D01SyntaxIncompatibilities,
} from "../scripts/autojs6-d01-syntax-compatibility.mjs";
import { IMAGE_INPUT_ERROR_CODES } from "../src/core/index.js";

const PRIVATE_URI =
  "content://private.provider/image/41?account=private&name=secret.jpg";
const D01_BUNDLE_URL = new URL(
  "../scripts/autojs6/d01-jpeg-device-check.js",
  import.meta.url,
);

test("valid picker result produces the exact D01 JPEG PASS record", async () => {
  const { record, reports } = await runWith();

  assert.deepEqual(record, {
    testCaseId: D01_TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: 4,
    uiResponsive: true,
  });
  assert.deepEqual(reports, [record]);
});

test("picker cancellation produces sanitized URI_ACCESS_DENIED", async () => {
  const { record } = await runWith({ pickSingleJpeg: async () => null });
  assert.deepEqual(record, failure("URI_ACCESS_DENIED", true));
});

test("null picker data produces sanitized URI_ACCESS_DENIED", async () => {
  const { record } = await runWith({
    pickSingleJpeg: async () => undefined,
  });
  assert.deepEqual(record, failure("URI_ACCESS_DENIED", true));
});

test("non-content URI is rejected before starting a worker", async () => {
  let workerStarted = false;
  const { record } = await runWith({
    pickSingleJpeg: async () => "https://example.invalid/image.jpg",
    executeOffUiThread: async () => {
      workerStarted = true;
      return { uiResponsive: true };
    },
  });

  assert.equal(workerStarted, false);
  assert.deepEqual(record, failure("URI_ACCESS_DENIED", true));
});

test("file URI policy is deny-by-default in D01", async () => {
  let prepared = false;
  const { record } = await runWith({
    pickSingleJpeg: async () => "file:///private/image.jpg",
    prepareSelectedImage: async () => {
      prepared = true;
    },
  });

  assert.equal(prepared, false);
  assert.deepEqual(record, failure("URI_ACCESS_DENIED", true));
});

test("selected URI is passed in memory but never included in output", async () => {
  let observedUri;
  const { record, reports } = await runWith({
    prepareSelectedImage: async (sourceUri) => {
      observedUri = sourceUri;
      return jpegPass();
    },
  });

  assert.equal(observedUri, PRIVATE_URI);
  assert.equal(
    JSON.stringify({ record, reports }).includes(PRIVATE_URI),
    false,
  );
  assert.deepEqual(Object.keys(record), [
    "testCaseId",
    "status",
    "mimeType",
    "sizeBytes",
    "uiResponsive",
  ]);
});

test("D01 prepareSelectedImage receives exactly one legacy argument", async () => {
  let observedArguments;
  const { record } = await runWith({
    prepareSelectedImage: async (...receivedArguments) => {
      observedArguments = receivedArguments;
      return jpegPass();
    },
  });

  assert.equal(observedArguments.length, 1);
  assert.equal(observedArguments[0], PRIVATE_URI);
  assert.equal(record.status, "PASS");
});

for (const errorCode of Object.values(IMAGE_INPUT_ERROR_CODES)) {
  test(`stable ${errorCode} is preserved without diagnostic details`, async () => {
    const { record } = await runWith({
      prepareSelectedImage: async () => ({
        status: "FAIL",
        errorCode,
        message: "private exception message",
        stack: "private stack",
        cause: new Error("private cause"),
        sourceUri: PRIVATE_URI,
        imageBase64: "private-base64",
      }),
    });

    assert.deepEqual(record, failure(errorCode, true));
    assert.equal(JSON.stringify(record).includes("private"), false);
  });
}

test("unknown failure is mapped to IMAGE_READ_FAILED", async () => {
  const { record } = await runWith({
    prepareSelectedImage: async () => ({
      status: "FAIL",
      errorCode: "PRIVATE_RUNTIME_ERROR",
    }),
  });
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", true));
});

test("worker timeout or failed responsiveness proof stops safely", async () => {
  let taskInvoked = false;
  const { record } = await runWith({
    executeOffUiThread: async () => ({
      uiResponsive: false,
    }),
    prepareSelectedImage: async () => {
      taskInvoked = true;
      return jpegPass();
    },
  });

  assert.equal(taskInvoked, false);
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", false));
});

test("missing worker responsiveness proof stops safely", async () => {
  const { record } = await runWith({
    executeOffUiThread: async (task) => ({ value: await task() }),
  });
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", false));
});

test("non-JPEG success is rejected as a D01 harness failure", async () => {
  const { record } = await runWith({
    prepareSelectedImage: async () => ({
      status: "PASS",
      mimeType: "image/png",
      sizeBytes: 4,
    }),
  });
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", true));
});

test("non-positive success byte count is rejected", async () => {
  const { record } = await runWith({
    prepareSelectedImage: async () => ({
      status: "PASS",
      mimeType: "image/jpeg",
      sizeBytes: 0,
    }),
  });
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", true));
});

test("picker exception is sanitized and does not expose its cause", async () => {
  const { record } = await runWith({
    pickSingleJpeg: async () => {
      throw new Error(`picker failed for ${PRIVATE_URI}`);
    },
  });
  assert.deepEqual(record, failure("IMAGE_READ_FAILED", false));
  assert.equal(JSON.stringify(record).includes("picker failed"), false);
});

test("metadata reporter receives exactly one frozen record", async () => {
  const { reports } = await runWith();
  assert.equal(reports.length, 1);
  assert.equal(Object.isFrozen(reports[0]), true);
});

test("D01 bundle is parseable, self-contained, and marked non-production", async () => {
  const bundle = await readFile(D01_BUNDLE_URL, "utf8");

  assert.doesNotThrow(() => new vm.Script(bundle));
  assert.match(bundle, /^"ui";/u);
  assert.match(bundle, /GENERATED: non-production AutoJs6 D01/u);
  assert.doesNotMatch(bundle, /^\s*(?:import|export)\s/mu);
});

test("regression: generated errors do not use the reserved class expression", async () => {
  const bundle = await readFile(D01_BUNDLE_URL, "utf8");

  assert.doesNotMatch(bundle, /var ImageInputError\s*=\s*class\b/u);
  assert.doesNotMatch(bundle, /var ClassifiedImageReaderError\s*=\s*class\b/u);
  assert.match(bundle, /var ImageInputError\s*=\s*function\b/u);
  assert.match(bundle, /var ClassifiedImageReaderError\s*=\s*function\b/u);
});

test("D01 bundle contains no known AutoJs6 legacy-incompatible syntax", async () => {
  const bundle = await readFile(D01_BUNDLE_URL, "utf8");

  assert.deepEqual(findAutoJs6D01SyntaxIncompatibilities(bundle), []);
  assert.doesNotThrow(() => assertAutoJs6D01SyntaxCompatible(bundle));
});

test("compatibility scan detects the observed reserved class regression", () => {
  const incompatible =
    "var ImageInputError = class extends Error { constructor() {} };";

  assert.deepEqual(findAutoJs6D01SyntaxIncompatibilities(incompatible), [
    {
      label: "class declaration or expression",
      line: 1,
    },
  ]);
});

test("D01 deterministic build emits no source map", async () => {
  await assert.rejects(access(new URL(`${D01_BUNDLE_URL.href}.map`)));
  const bundle = await readFile(D01_BUNDLE_URL, "utf8");
  assert.doesNotMatch(bundle, /sourceMappingURL/u);
});

test("D01 runtime source contains no prohibited integration behavior", async () => {
  const sourceFiles = await Promise.all(
    [
      "../scripts/autojs6/d01-launcher-core.js",
      "../scripts/autojs6/format-check-launcher-core.js",
      "../scripts/autojs6/format-check-runtime.js",
      "../scripts/autojs6/source/d01-jpeg-device-check.entry.js",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );
  const source = sourceFiles.join("\n");

  for (const prohibitedPattern of [
    /\bfetch\s*\(/u,
    /\bXMLHttpRequest\b/u,
    /\bhttp(?:s)?:\/\//u,
    /\bopenConnection\s*\(/u,
    /\brequest\s*\(/u,
    /\bsetText\s*\(/u,
    /\bclick\s*\(/u,
  ]) {
    assert.doesNotMatch(source, prohibitedPattern);
  }
});

test("D01 reporter serializes only the already-sanitized record", async () => {
  const runtimeAdapter = await readFile(
    new URL("../scripts/autojs6/format-check-runtime.js", import.meta.url),
    "utf8",
  );

  assert.match(runtimeAdapter, /console\.info\(JSON\.stringify\(record\)\)/u);
  assert.doesNotMatch(runtimeAdapter, /console\.(?:log|error|warn)\s*\(/u);
  assert.doesNotMatch(
    runtimeAdapter,
    /JSON\.stringify\((?:error|sourceUri)\)/u,
  );
});

test("D01 entry injects the existing production reader harness", async () => {
  const runtimeAdapter = await readFile(
    new URL("../scripts/autojs6/format-check-runtime.js", import.meta.url),
    "utf8",
  );

  assert.match(runtimeAdapter, /runImageReaderDeviceCheck\(\{/u);
  assert.match(runtimeAdapter, /isFileUriApproved:\s*\(\)\s*=>\s*false/u);
  assert.match(runtimeAdapter, /context\.getContentResolver\(\)/u);
  assert.match(runtimeAdapter, /runtime\.util\.java\.array\("byte", size\)/u);
});

async function runWith(overrides = {}) {
  const reports = [];
  const defaults = {
    showInstructions: async () => {},
    pickSingleJpeg: async () => PRIVATE_URI,
    executeOffUiThread: async (task) => ({
      value: await task(),
      uiResponsive: true,
    }),
    prepareSelectedImage: async () => jpegPass(),
    reportMetadata: (record) => reports.push(record),
  };

  const record = await runD01OneClick({ ...defaults, ...overrides });
  return { record, reports };
}

function jpegPass() {
  return {
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: 4,
  };
}

function failure(errorCode, uiResponsive) {
  return {
    testCaseId: D01_TEST_CASE_ID,
    status: "FAIL",
    errorCode,
    uiResponsive,
  };
}
