import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

import {
  D01_FORMAT_CHECK_CASE,
  D02_D05_FORMAT_CHECK_CASES,
  D05_FORMAT_CHECK_CASE,
  FORMAT_CHECK_CASES,
} from "../scripts/autojs6/format-check-case-manifest.js";
import { runFormatCheck } from "../scripts/autojs6/format-check-launcher-core.js";
import {
  assertAutoJs6FormatSyntaxCompatible,
  findAutoJs6FormatSyntaxIncompatibilities,
} from "../scripts/autojs6-format-syntax-compatibility.mjs";
import {
  D01_TEST_CASE_ID,
  runD01OneClick,
} from "../scripts/autojs6/d01-launcher-core.js";
import { IMAGE_INPUT_ERROR_CODES } from "../src/core/index.js";

const PRIVATE_URI =
  "content://private.provider/image/84?account=private&name=secret.png";

test("format-check manifest is static, immutable, and complete", () => {
  assert.deepEqual(
    FORMAT_CHECK_CASES.map((formatCase) => [
      formatCase.testCaseId,
      formatCase.pickerMimeType,
      formatCase.expectedMimeType,
      formatCase.requestCode,
    ]),
    [
      ["D01_JPEG", "image/jpeg", "image/jpeg", 6101],
      ["D02_PNG", "image/png", "image/png", 6102],
      ["D03_WEBP", "image/webp", "image/webp", 6103],
      ["D04_HEIC", "image/heic", "image/heic", 6104],
      ["D05_HEIF", "image/heif", "image/heif", 6105],
    ],
  );
  assert.equal(Object.isFrozen(FORMAT_CHECK_CASES), true);
  for (const formatCase of FORMAT_CHECK_CASES) {
    assert.equal(Object.isFrozen(formatCase), true);
  }
});

for (const formatCase of FORMAT_CHECK_CASES) {
  test(`${formatCase.testCaseId} source entry delegates immediately to the shared runtime`, async () => {
    const entry = await readFile(
      new URL(`../scripts/${formatCase.sourceEntryPath}`, import.meta.url),
      "utf8",
    );

    assert.match(entry, /runAutoJs6FormatCheck/u);
    assert.match(entry, new RegExp(formatCase.testCaseId.slice(0, 3)));
    assert.equal(entry.includes("runImageReaderDeviceCheck"), false);
    assert.equal(entry.split("\n").length <= 10, true);
  });
}

for (const formatCase of D02_D05_FORMAT_CHECK_CASES) {
  test(`${formatCase.testCaseId} produces an exact valid PASS`, async () => {
    const { record, reports } = await runCase(formatCase);

    assert.deepEqual(record, {
      testCaseId: formatCase.testCaseId,
      status: "PASS",
      mimeType: formatCase.expectedMimeType,
      sizeBytes: 12_345,
      uiResponsive: true,
    });
    assert.deepEqual(reports, [record]);
    assert.deepEqual(Object.keys(record), [
      "testCaseId",
      "status",
      "mimeType",
      "sizeBytes",
      "uiResponsive",
    ]);
  });

  test(`${formatCase.testCaseId} rejects the wrong MIME`, async () => {
    const { record } = await runCase(formatCase, {
      prepareSelectedImage: async () => passResult("image/jpeg", 12_345),
    });

    assert.deepEqual(record, failure(formatCase.testCaseId));
  });
}

for (const sizeBytes of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
  test(`rejects invalid PASS sizeBytes ${String(sizeBytes)}`, async () => {
    const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
    const { record } = await runCase(formatCase, {
      prepareSelectedImage: async () =>
        passResult(formatCase.expectedMimeType, sizeBytes),
    });

    assert.deepEqual(record, failure(formatCase.testCaseId));
  });
}

test("picker cancellation returns only a sanitized failure contract", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  const { record } = await runCase(formatCase, {
    pickSingleImage: async () => null,
  });

  assert.deepEqual(record, failure(formatCase.testCaseId, "URI_ACCESS_DENIED"));
  assert.deepEqual(Object.keys(record), [
    "testCaseId",
    "status",
    "errorCode",
    "uiResponsive",
  ]);
});

test("reader failure preserves only a stable public code", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[1];
  const { record } = await runCase(formatCase, {
    prepareSelectedImage: async () => ({
      status: "FAIL",
      errorCode: IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE,
      sourceUri: PRIVATE_URI,
      imageBase64: "private-base64",
      stack: "private stack",
      credentials: "private credential",
    }),
  });

  assert.deepEqual(record, failure(formatCase.testCaseId, "IMAGE_TOO_LARGE"));
  assert.equal(JSON.stringify(record).includes("private"), false);
});

for (const [label, thrown] of [
  ["Error object", new Error(`private ${PRIVATE_URI}`)],
  ["string", `private ${PRIVATE_URI}`],
  ["null", null],
  ["undefined", undefined],
  [
    "throwing code getter",
    {
      get code() {
        throw new Error(`private ${PRIVATE_URI}`);
      },
    },
  ],
  [
    "Proxy throwing on get",
    new Proxy(
      {},
      {
        get() {
          throw new Error(`private ${PRIVATE_URI}`);
        },
      },
    ),
  ],
  [
    "throwing string conversion",
    {
      toString() {
        throw new Error(`private ${PRIVATE_URI}`);
      },
      valueOf() {
        throw new Error(`private ${PRIVATE_URI}`);
      },
    },
  ],
]) {
  test(`${label} is normalized without exposing uncontrolled details`, async () => {
    const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
    const { record } = await runThrown(formatCase, thrown);

    assert.deepEqual(
      record,
      failure(formatCase.testCaseId, "IMAGE_READ_FAILED", false),
    );
    assert.deepEqual(Object.keys(record), [
      "testCaseId",
      "status",
      "errorCode",
      "uiResponsive",
    ]);
    assert.equal(JSON.stringify(record).includes("private"), false);
  });
}

test("a safely readable allowlisted thrown code is preserved", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[1];
  const { record } = await runThrown(formatCase, {
    code: IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE,
  });

  assert.deepEqual(
    record,
    failure(formatCase.testCaseId, "IMAGE_TOO_LARGE", false),
  );
});

test("an arbitrary thrown code maps to the fixed fallback", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[1];
  const { record } = await runThrown(formatCase, {
    code: `PRIVATE_${PRIVATE_URI}`,
  });

  assert.deepEqual(
    record,
    failure(formatCase.testCaseId, "IMAGE_READ_FAILED", false),
  );
  assert.deepEqual(Object.keys(record), [
    "testCaseId",
    "status",
    "errorCode",
    "uiResponsive",
  ]);
});

test("UI non-responsiveness fails closed", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[2];
  const { record } = await runCase(formatCase, {
    executeOffUiThread: async () => ({ uiResponsive: false }),
  });

  assert.deepEqual(
    record,
    failure(formatCase.testCaseId, "IMAGE_READ_FAILED", false),
  );
});

test("PASS output removes URI, Base64, bytes, and extra metadata", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  const { record } = await runCase(formatCase, {
    prepareSelectedImage: async () => ({
      ...passResult(formatCase.expectedMimeType, 9),
      sourceUri: PRIVATE_URI,
      path: "/private/image.png",
      filename: "secret.png",
      imageBase64: "private-base64",
      bytes: [1, 2, 3],
      stack: "private stack",
      credentials: "private credential",
      metadata: { private: true },
    }),
  });

  assert.deepEqual(record, {
    testCaseId: formatCase.testCaseId,
    status: "PASS",
    mimeType: formatCase.expectedMimeType,
    sizeBytes: 9,
    uiResponsive: true,
  });
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("PASS fields are read once and emitted from cached primitives", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  const readCounts = {
    mimeType: 0,
    sizeBytes: 0,
    uiResponsive: 0,
  };
  const result = {
    status: "PASS",
    get mimeType() {
      readCounts.mimeType += 1;
      return readCounts.mimeType === 1
        ? formatCase.expectedMimeType
        : PRIVATE_URI;
    },
    get sizeBytes() {
      readCounts.sizeBytes += 1;
      return readCounts.sizeBytes === 1 ? 7 : PRIVATE_URI;
    },
  };

  const { record } = await runCase(formatCase, {
    executeOffUiThread: async (task) => ({
      value: await task(),
      get uiResponsive() {
        readCounts.uiResponsive += 1;
        return readCounts.uiResponsive === 1 ? true : PRIVATE_URI;
      },
    }),
    prepareSelectedImage: async () => result,
  });

  assert.deepEqual(readCounts, {
    mimeType: 1,
    sizeBytes: 1,
    uiResponsive: 1,
  });
  assert.deepEqual(record, {
    testCaseId: formatCase.testCaseId,
    status: "PASS",
    mimeType: formatCase.expectedMimeType,
    sizeBytes: 7,
    uiResponsive: true,
  });
  assert.equal(JSON.stringify(record).includes(PRIVATE_URI), false);
});

test("a stateful sizeBytes getter cannot leak its second URI value", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  let sizeBytesReads = 0;
  const { record } = await runCase(formatCase, {
    prepareSelectedImage: async () => ({
      status: "PASS",
      mimeType: formatCase.expectedMimeType,
      get sizeBytes() {
        sizeBytesReads += 1;
        return sizeBytesReads === 1 ? 11 : PRIVATE_URI;
      },
    }),
  });

  assert.equal(sizeBytesReads, 1);
  assert.equal(record.status, "PASS");
  assert.equal(record.sizeBytes, 11);
  assert.equal(JSON.stringify(record).includes(PRIVATE_URI), false);
});

for (const propertyName of ["mimeType", "sizeBytes"]) {
  test(`a throwing PASS ${propertyName} getter produces sanitized FAIL`, async () => {
    const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
    let propertyReads = 0;
    const result = {
      status: "PASS",
      mimeType: formatCase.expectedMimeType,
      sizeBytes: 5,
    };
    Object.defineProperty(result, propertyName, {
      get() {
        propertyReads += 1;
        throw new Error(`private ${PRIVATE_URI}`);
      },
    });

    const { record } = await runCase(formatCase, {
      prepareSelectedImage: async () => result,
    });

    assert.equal(propertyReads, 1);
    assertSanitizedFailure(record, formatCase.testCaseId, true);
  });
}

test("a throwing PASS uiResponsive getter produces sanitized FAIL", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  let uiResponsiveReads = 0;
  const { record } = await runCase(formatCase, {
    executeOffUiThread: async (task) => ({
      value: await task(),
      get uiResponsive() {
        uiResponsiveReads += 1;
        throw new Error(`private ${PRIVATE_URI}`);
      },
    }),
  });

  assert.equal(uiResponsiveReads, 1);
  assertSanitizedFailure(record, formatCase.testCaseId, false);
});

test("a Proxy throwing on required PASS field access produces sanitized FAIL", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[0];
  let sizeBytesReads = 0;
  const result = new Proxy(passResult(formatCase.expectedMimeType, 5), {
    get(target, propertyName, receiver) {
      if (propertyName === "sizeBytes") {
        sizeBytesReads += 1;
        throw new Error(`private ${PRIVATE_URI}`);
      }
      return Reflect.get(target, propertyName, receiver);
    },
  });
  const { record } = await runCase(formatCase, {
    prepareSelectedImage: async () => result,
  });

  assert.equal(sizeBytesReads, 1);
  assertSanitizedFailure(record, formatCase.testCaseId, true);
});

test("D05 picker/platform limitations never become a false PASS", async () => {
  const cancelled = await runCase(D05_FORMAT_CHECK_CASE, {
    pickSingleImage: async () => null,
  });
  const mismatched = await runCase(D05_FORMAT_CHECK_CASE, {
    prepareSelectedImage: async () => passResult("image/heic", 10),
  });

  assert.equal(cancelled.record.status, "FAIL");
  assert.equal(mismatched.record.status, "FAIL");
});

test("case configuration reaches instruction and picker dependencies", async () => {
  const formatCase = D02_D05_FORMAT_CHECK_CASES[1];
  let instructions;
  let picker;
  await runCase(formatCase, {
    showInstructions: async (value) => {
      instructions = value;
    },
    pickSingleImage: async (value) => {
      picker = value;
      return PRIVATE_URI;
    },
  });

  assert.deepEqual(instructions, {
    title: formatCase.title,
    instructionText: formatCase.instructionText,
  });
  assert.deepEqual(picker, {
    pickerMimeType: formatCase.pickerMimeType,
    requestCode: formatCase.requestCode,
  });
});

test("D01 wrapper remains backward compatible", async () => {
  const reports = [];
  const record = await runD01OneClick({
    showInstructions: async () => {},
    pickSingleJpeg: async () => PRIVATE_URI,
    executeOffUiThread: async (task) => ({
      value: await task(),
      uiResponsive: true,
    }),
    prepareSelectedImage: async () =>
      passResult(D01_FORMAT_CHECK_CASE.expectedMimeType, 4),
    reportMetadata: (value) => reports.push(value),
  });

  assert.equal(D01_TEST_CASE_ID, "D01_JPEG");
  assert.deepEqual(record, {
    testCaseId: "D01_JPEG",
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: 4,
    uiResponsive: true,
  });
  assert.deepEqual(reports, [record]);
});

for (const formatCase of FORMAT_CHECK_CASES) {
  test(`${formatCase.testCaseId} bundle is parseable and syntax-compatible`, async () => {
    const bundleUrl = new URL(
      `../scripts/${formatCase.generatedPath}`,
      import.meta.url,
    );
    const bundle = await readFile(bundleUrl, "utf8");

    assert.doesNotThrow(() => new vm.Script(bundle));
    assert.match(bundle, /^"ui";/u);
    assert.match(
      bundle,
      new RegExp(`GENERATED: non-production AutoJs6 ${formatCase.testCaseId}`),
    );
    assert.doesNotMatch(bundle, /^\s*(?:import|export)\s/mu);
    assert.doesNotMatch(bundle, /sourceMappingURL/u);
    assert.deepEqual(findAutoJs6FormatSyntaxIncompatibilities(bundle), []);
    assert.doesNotThrow(() =>
      assertAutoJs6FormatSyntaxCompatible(bundle, formatCase.testCaseId),
    );
    await assert.rejects(access(new URL(`${bundleUrl.href}.map`)));
  });
}

function passResult(mimeType, sizeBytes) {
  return { status: "PASS", mimeType, sizeBytes };
}

async function runCase(formatCase, overrides = {}) {
  const reports = [];
  const dependencies = {
    showInstructions: async () => {},
    pickSingleImage: async () => PRIVATE_URI,
    executeOffUiThread: async (task) => ({
      value: await task(),
      uiResponsive: true,
    }),
    prepareSelectedImage: async () =>
      passResult(formatCase.expectedMimeType, 12_345),
    reportMetadata: (record) => reports.push(record),
    ...overrides,
  };

  const record = await runFormatCheck(formatCase, dependencies);
  return { record, reports };
}

function runThrown(formatCase, thrown) {
  return runCase(formatCase, {
    showInstructions: async () => {
      throw thrown;
    },
  });
}

function failure(
  testCaseId,
  errorCode = "IMAGE_READ_FAILED",
  uiResponsive = true,
) {
  return {
    testCaseId,
    status: "FAIL",
    errorCode,
    uiResponsive,
  };
}

function assertSanitizedFailure(record, testCaseId, uiResponsive) {
  assert.deepEqual(
    record,
    failure(testCaseId, "IMAGE_READ_FAILED", uiResponsive),
  );
  assert.deepEqual(Object.keys(record), [
    "testCaseId",
    "status",
    "errorCode",
    "uiResponsive",
  ]);
  assert.equal(JSON.stringify(record).includes("private"), false);
}
