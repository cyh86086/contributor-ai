import assert from "node:assert/strict";
import test from "node:test";

import {
  ClassifiedImageReaderError,
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
  ImageInputError,
  normalizeMimeType,
  prepareImageInput,
} from "../src/core/index.js";

const CONTENT_URI = "content://media/external/images/media/42";
const MAX_SIZE = 1024;
const JPEG_BYTES = bytes(0xff, 0xd8, 0xff, 0xe0, 0x01);
const PNG_BYTES = bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
const WEBP_BYTES = bytes(
  0x52,
  0x49,
  0x46,
  0x46,
  0x04,
  0x00,
  0x00,
  0x00,
  0x57,
  0x45,
  0x42,
  0x50,
);

test("public errors and reader classifications remain narrowly scoped", () => {
  assert.deepEqual(Object.keys(IMAGE_INPUT_ERROR_CODES), [
    "UNSUPPORTED_MIME_TYPE",
    "EMPTY_IMAGE",
    "IMAGE_TOO_LARGE",
    "IMAGE_READ_FAILED",
    "ENCODING_FAILED",
    "URI_ACCESS_DENIED",
  ]);
  assert.deepEqual(Object.keys(IMAGE_READER_ERROR_CLASSIFICATIONS), [
    "URI_ACCESS_DENIED",
    "IMAGE_READ_FAILED",
  ]);
});

test("prepares valid JPEG input", async () => {
  const result = await prepare(JPEG_BYTES, "image/jpeg");

  assert.deepEqual(result, {
    sourceUri: CONTENT_URI,
    mimeType: "image/jpeg",
    sizeBytes: JPEG_BYTES.byteLength,
    imageBase64: Buffer.from(JPEG_BYTES).toString("base64"),
  });
});

test("prepares valid PNG input", async () => {
  const result = await prepare(PNG_BYTES, "image/png");
  assert.equal(result.mimeType, "image/png");
});

test("prepares valid WebP input", async () => {
  const result = await prepare(WEBP_BYTES, "image/webp");
  assert.equal(result.mimeType, "image/webp");
});

test("detects HEIC from an ISO base media signature", async () => {
  const result = await prepare(ftypBytes("heic"), undefined);
  assert.equal(result.mimeType, "image/heic");
});

test("detects HEIF from an ISO base media signature", async () => {
  const result = await prepare(ftypBytes("mif1"), undefined);
  assert.equal(result.mimeType, "image/heif");
});

test("normalizes a runtime MIME type", async () => {
  assert.equal(normalizeMimeType(" Image/JPEG; charset=binary "), "image/jpeg");

  const result = await prepare(JPEG_BYTES, " Image/JPEG; charset=binary ");
  assert.equal(result.mimeType, "image/jpeg");
});

test("falls back to the byte signature when runtime MIME is absent", async () => {
  const result = await prepare(PNG_BYTES, undefined);
  assert.equal(result.mimeType, "image/png");
});

test("falls back to the byte signature when runtime MIME is generic", async () => {
  const result = await prepare(WEBP_BYTES, "application/octet-stream");
  assert.equal(result.mimeType, "image/webp");
});

test("falls back to the byte signature when runtime MIME is unsupported", async () => {
  const result = await prepare(JPEG_BYTES, "image/gif");
  assert.equal(result.mimeType, "image/jpeg");
});

test("rejects unsupported bytes", async () => {
  await rejectsWithCode(
    () => prepare(bytes(0x47, 0x49, 0x46, 0x38), undefined),
    IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE,
  );
});

test("rejects empty bytes", async () => {
  await rejectsWithCode(
    () => prepare(bytes(), "image/jpeg"),
    IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE,
  );
});

test("accepts content exactly equal to the size limit", async () => {
  const result = await prepare(JPEG_BYTES, "image/jpeg", {
    maxSizeBytes: JPEG_BYTES.byteLength,
  });

  assert.equal(result.sizeBytes, JPEG_BYTES.byteLength);
});

test("rejects content above the size limit", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        maxSizeBytes: JPEG_BYTES.byteLength - 1,
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE,
  );
});

for (const invalidLimit of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, NaN]) {
  test(`rejects invalid maxSizeBytes: ${String(invalidLimit)}`, async () => {
    await assert.rejects(
      () =>
        prepare(JPEG_BYTES, "image/jpeg", {
          maxSizeBytes: invalidLimit,
        }),
      {
        name: "TypeError",
        message: "maxSizeBytes must be a positive safe integer",
      },
    );
  });
}

test("rejects an invalid URI scheme", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        sourceUri: "https://example.invalid/image.jpg",
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );
});

test("accepts a policy-approved file URI", async () => {
  const sourceUri = "file:///approved/image.jpg";
  const result = await prepare(JPEG_BYTES, "image/jpeg", {
    sourceUri,
    isFileUriApproved: (candidate) => candidate === sourceUri,
  });

  assert.equal(result.sourceUri, sourceUri);
});

test("rejects an unapproved file URI before reading", async () => {
  let readCalled = false;

  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        sourceUri: "file:///private/image.jpg",
        reader: {
          async canAccess() {
            return true;
          },
          async read() {
            readCalled = true;
            return { bytes: JPEG_BYTES, mimeType: "image/jpeg" };
          },
        },
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );

  assert.equal(readCalled, false);
});

test("maps a reader access failure to URI_ACCESS_DENIED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: {
          async canAccess() {
            throw new Error("platform permission detail");
          },
          async read() {
            return { bytes: JPEG_BYTES, mimeType: "image/jpeg" };
          },
        },
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );
});

test("maps a reader read failure to IMAGE_READ_FAILED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: {
          async canAccess() {
            return true;
          },
          async read() {
            throw new Error("platform read detail");
          },
        },
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  );
});

test("maps a classified reader URI access error to URI_ACCESS_DENIED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: throwingReader(
          new ClassifiedImageReaderError(
            IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
          ),
        ),
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );
});

test("maps a classified image read error to IMAGE_READ_FAILED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: throwingReader(
          new ClassifiedImageReaderError(
            IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
          ),
        ),
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  );
});

test("maps a malformed reader classification to IMAGE_READ_FAILED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: throwingReader({
          classification: IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
        }),
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  );
});

test("rejects unsupported reader classifications as IMAGE_READ_FAILED", async () => {
  const error = new ClassifiedImageReaderError(
    IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE,
  );
  assert.equal(error.classification, null);

  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: throwingReader(error),
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  );
});

test("classified reader messages cannot leak into the public error", async () => {
  const sensitiveValue = "classified-message-secret";
  const error = new ClassifiedImageReaderError(
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
  error.message = sensitiveValue;

  await assertSanitizedReaderFailure(error, sensitiveValue);
});

test("classified reader stacks cannot leak into the public error", async () => {
  const sensitiveValue = "classified-stack-secret";
  const error = new ClassifiedImageReaderError(
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
  error.stack = sensitiveValue;

  await assertSanitizedReaderFailure(error, sensitiveValue);
});

test("sensitive URI, path, and token text cannot leak from classified errors", async () => {
  const sensitiveValue =
    "content://media/item?token=private-token /private/photo.jpg";
  const error = new ClassifiedImageReaderError(
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
  error.message = sensitiveValue;
  error.stack = sensitiveValue;

  await assertSanitizedReaderFailure(error, sensitiveValue);
});

test("canAccess false still maps to URI_ACCESS_DENIED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: {
          async canAccess() {
            return false;
          },
          async read() {
            return { bytes: JPEG_BYTES, mimeType: "image/jpeg" };
          },
        },
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );
});

test("maps an encoder failure to ENCODING_FAILED", async () => {
  await rejectsWithCode(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        encodeBase64() {
          throw new Error("encoder detail");
        },
      }),
    IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED,
  );
});

test("operational errors are sanitized", async () => {
  const sensitiveValue = "sensitive-content-and-path";

  await assert.rejects(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        sourceUri: `content://media/${sensitiveValue}`,
        reader: {
          async canAccess() {
            return true;
          },
          async read() {
            throw new Error(sensitiveValue);
          },
        },
      }),
    (error) => {
      assert.ok(error instanceof ImageInputError);
      assert.equal(error.code, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
      assert.doesNotMatch(error.message, /sensitive-content-and-path/u);
      assert.equal("cause" in error, false);
      return true;
    },
  );
});

test("output Base64 matches the exact source bytes without a data URL prefix", async () => {
  const source = bytes(0xff, 0xd8, 0xff, 0x00, 0x01, 0x02, 0xfe);
  const result = await prepare(source, "image/jpeg");

  assert.equal(result.imageBase64, Buffer.from(source).toString("base64"));
  assert.doesNotMatch(result.imageBase64, /^data:/u);
});

function prepare(
  sourceBytes,
  mimeType,
  {
    sourceUri = CONTENT_URI,
    maxSizeBytes = MAX_SIZE,
    reader = readerFor(sourceBytes, mimeType),
    isFileUriApproved,
    encodeBase64,
  } = {},
) {
  return prepareImageInput({
    sourceUri,
    maxSizeBytes,
    reader,
    isFileUriApproved,
    encodeBase64,
  });
}

function readerFor(sourceBytes, mimeType) {
  return {
    async canAccess() {
      return true;
    },
    async read() {
      return { bytes: sourceBytes, mimeType };
    },
  };
}

function throwingReader(error) {
  return {
    async canAccess() {
      return true;
    },
    async read() {
      throw error;
    },
  };
}

function bytes(...values) {
  return new Uint8Array(values);
}

function ftypBytes(majorBrand, ...compatibleBrands) {
  const brands = [majorBrand, ...compatibleBrands];
  const boxSize = 16 + compatibleBrands.length * 4;
  const result = new Uint8Array(boxSize);
  result[0] = (boxSize >>> 24) & 0xff;
  result[1] = (boxSize >>> 16) & 0xff;
  result[2] = (boxSize >>> 8) & 0xff;
  result[3] = boxSize & 0xff;
  writeAscii(result, 4, "ftyp");
  writeAscii(result, 8, brands[0]);
  for (let index = 1; index < brands.length; index += 1) {
    writeAscii(result, 12 + index * 4, brands[index]);
  }
  return result;
}

function writeAscii(target, offset, value) {
  for (let index = 0; index < value.length; index += 1) {
    target[offset + index] = value.charCodeAt(index);
  }
}

async function rejectsWithCode(action, expectedCode) {
  await assert.rejects(action, (error) => {
    assert.ok(error instanceof ImageInputError);
    assert.equal(error.code, expectedCode);
    return true;
  });
}

async function assertSanitizedReaderFailure(readerError, sensitiveValue) {
  await assert.rejects(
    () =>
      prepare(JPEG_BYTES, "image/jpeg", {
        reader: throwingReader(readerError),
      }),
    (error) => {
      assert.ok(error instanceof ImageInputError);
      assert.equal(error.code, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
      assert.equal(error.message, "The image URI is not accessible.");
      assert.equal(error.message.includes(sensitiveValue), false);
      assert.equal((error.stack ?? "").includes(sensitiveValue), false);
      assert.equal("cause" in error, false);
      return true;
    },
  );
}
