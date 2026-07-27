import assert from "node:assert/strict";
import test from "node:test";

import {
  createAutoJs6AndroidImageReader,
  javaSignedBytesToUint8Array,
} from "../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
  prepareImageInput,
} from "../src/core/index.js";

const CONTENT_URI = "content://media/external/images/media/42";
const FILE_URI = "file:///approved/image.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0];
const PNG_BYTES = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

test("content URI access is allowed when a probe stream opens", async () => {
  const stream = fakeStream([]);
  const reader = createReader({ streams: [stream] });

  assert.equal(await reader.canAccess(CONTENT_URI), true);
  assert.equal(stream.closed, true);
});

test("content URI access is denied when no stream is available", async () => {
  const reader = createReader({ streams: [null] });
  assert.equal(await reader.canAccess(CONTENT_URI), false);
});

test("SecurityException during canAccess is denied and sanitized", async () => {
  const reader = createReader({
    openError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
      "SecurityException private URI",
    ),
  });

  assert.equal(await reader.canAccess(CONTENT_URI), false);
});

test("SecurityException during read maps to URI_ACCESS_DENIED", async () => {
  const reader = createReader({
    openError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
      "SecurityException private URI",
    ),
  });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
});

test("returns a valid ContentResolver MIME value", async () => {
  const reader = createReader({
    mimeType: "image/jpeg",
    streams: [fakeStream([JPEG_BYTES])],
  });

  assert.equal((await reader.read(CONTENT_URI)).mimeType, "image/jpeg");
});

test("returns an absent MIME value without failing", async () => {
  const reader = createReader({
    mimeType: undefined,
    streams: [fakeStream([JPEG_BYTES])],
  });

  assert.equal((await reader.read(CONTENT_URI)).mimeType, undefined);
});

test("rejects a null stream as IMAGE_READ_FAILED", async () => {
  const reader = createReader({ streams: [null] });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
});

test("reconstructs exact bytes from partial reads", async () => {
  const reader = createReader({
    streams: [fakeStream([[1], [2, 3], [4]])],
    chunkSizeBytes: 3,
  });

  assert.deepEqual([...(await reader.read(CONTENT_URI)).bytes], [1, 2, 3, 4]);
});

test("rejects repeated zero-length reads", async () => {
  const reader = createReader({
    streams: [fakeStream([0, 0])],
    maxZeroLengthReads: 2,
  });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
});

test("reads until EOF after multiple chunks", async () => {
  const reader = createReader({
    streams: [fakeStream([[1, 2], [3, 4], [5]])],
  });

  assert.deepEqual(
    [...(await reader.read(CONTENT_URI)).bytes],
    [1, 2, 3, 4, 5],
  );
});

test("maps IOException to IMAGE_READ_FAILED", async () => {
  const stream = fakeStream([
    runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
      "IOException internal detail",
    ),
  ]);
  const reader = createReader({ streams: [stream] });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
});

test("maps FileNotFoundException after authorization to IMAGE_READ_FAILED", async () => {
  const reader = createReader({
    openError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
      "FileNotFoundException /private/photo.jpg",
    ),
  });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
});

test("accepts the reader safety limit exact boundary", async () => {
  const reader = createReader({
    streams: [
      fakeStream([
        [1, 2],
        [3, 4],
      ]),
    ],
    readerSafetyLimitBytes: 4,
  });

  assert.equal((await reader.read(CONTENT_URI)).bytes.byteLength, 4);
});

test("rejects content above the reader safety limit", async () => {
  const stream = fakeStream([
    [1, 2],
    [3, 4, 5],
  ]);
  const reader = createReader({
    streams: [stream],
    readerSafetyLimitBytes: 4,
  });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
  assert.equal(stream.closed, true);
});

test("closes the stream after a successful read", async () => {
  const stream = fakeStream([JPEG_BYTES]);
  const reader = createReader({ streams: [stream] });

  await reader.read(CONTENT_URI);
  assert.equal(stream.closed, true);
});

test("closes the stream after a read failure", async () => {
  const stream = fakeStream([new Error("read failed")]);
  const reader = createReader({ streams: [stream] });

  await assert.rejects(() => reader.read(CONTENT_URI));
  assert.equal(stream.closed, true);
});

test("cleanup failure does not replace the primary failure", async () => {
  const stream = fakeStream([new Error("primary secret")], {
    closeError: new Error("cleanup secret"),
  });
  const reader = createReader({ streams: [stream] });

  await rejectsReaderCode(
    () => reader.read(CONTENT_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
});

test("reads an explicitly approved file URI", async () => {
  const events = [];
  const reader = createReader({
    isFileUriApproved: (uri) => uri === FILE_URI,
    openFileReadOnly(uri) {
      events.push(["open-read-only", uri]);
      return fakeStream([JPEG_BYTES]);
    },
  });

  const result = await reader.read(FILE_URI);
  assert.deepEqual([...result.bytes], JPEG_BYTES);
  assert.deepEqual(events, [["open-read-only", FILE_URI]]);
});

test("denies a file URI by default", async () => {
  const reader = createReader();

  await rejectsReaderCode(
    () => reader.read(FILE_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
});

test("maps a file-policy exception to URI_ACCESS_DENIED", async () => {
  const reader = createReader({
    isFileUriApproved() {
      throw new Error("/private/policy/path");
    },
    openFileReadOnly() {
      throw new Error("must not open");
    },
  });

  await rejectsReaderCode(
    () => reader.read(FILE_URI),
    IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
  );
});

test("converts signed Java bytes exactly to Uint8Array", () => {
  const converted = javaSignedBytesToUint8Array(
    new Int8Array([-128, -1, 0, 127]),
    4,
  );

  assert.deepEqual([...converted], [128, 255, 0, 127]);
});

test("reader output contains no Base64 operation or field", async () => {
  const reader = createReader({ streams: [fakeStream([JPEG_BYTES])] });
  const result = await reader.read(CONTENT_URI);

  assert.deepEqual(Object.keys(result).sort(), ["bytes", "mimeType"]);
  assert.equal("imageBase64" in result, false);
});

test("file API exposes only a read-only opener and no source mutation operation", async () => {
  const events = [];
  const reader = createReader({
    isFileUriApproved: () => true,
    openFileReadOnly(uri) {
      events.push({ operation: "read", uri });
      return fakeStream([JPEG_BYTES]);
    },
  });

  await reader.read(FILE_URI);
  assert.deepEqual(events, [{ operation: "read", uri: FILE_URI }]);
});

test("reader errors use fixed sanitized messages", async () => {
  const reader = createReader({
    openError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
      "runtime exception detail",
    ),
  });

  await assert.rejects(
    () => reader.read(CONTENT_URI),
    (error) => {
      assert.equal(error.message, "Classified image reader failure.");
      assert.equal("cause" in error, false);
      return true;
    },
  );
});

test("sensitive path, URI, token, and runtime text do not leak", async () => {
  const secret =
    "content://media/private?token=secret /private/image.jpg SecurityException";
  const reader = createReader({
    openError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
      secret,
    ),
  });

  await assert.rejects(
    () => reader.read(CONTENT_URI),
    (error) => {
      assert.equal(error.message.includes(secret), false);
      assert.equal((error.stack ?? "").includes(secret), false);
      assert.equal("cause" in error, false);
      return true;
    },
  );
});

test("reader result integrates with prepareImageInput", async () => {
  const reader = createReader({
    mimeType: "image/jpeg",
    streamFactory: () => fakeStream([JPEG_BYTES]),
  });

  const result = await prepareImageInput({
    sourceUri: CONTENT_URI,
    maxSizeBytes: JPEG_BYTES.length,
    reader,
  });

  assert.equal(result.mimeType, "image/jpeg");
  assert.equal(result.sizeBytes, JPEG_BYTES.length);
});

test("integrated read-time permission revocation becomes URI_ACCESS_DENIED", async () => {
  let opens = 0;
  const reader = createReader({
    streamFactory() {
      opens += 1;
      if (opens === 1) {
        return fakeStream([]);
      }
      throw runtimeError(
        IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
        "revoked permission secret",
      );
    },
  });

  await rejectsPublicCode(
    () =>
      prepareImageInput({
        sourceUri: CONTENT_URI,
        maxSizeBytes: 10,
        reader,
      }),
    IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  );
});

test("integrated ordinary read failure becomes IMAGE_READ_FAILED", async () => {
  let opens = 0;
  const reader = createReader({
    streamFactory() {
      opens += 1;
      return opens === 1
        ? fakeStream([])
        : fakeStream([new Error("ordinary read failure")]);
    },
  });

  await rejectsPublicCode(
    () =>
      prepareImageInput({
        sourceUri: CONTENT_URI,
        maxSizeBytes: 10,
        reader,
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  );
});

test("integrated MIME fallback works when the reader returns no MIME", async () => {
  const reader = createReader({
    mimeType: undefined,
    streamFactory: () => fakeStream([PNG_BYTES]),
  });

  const result = await prepareImageInput({
    sourceUri: CONTENT_URI,
    maxSizeBytes: PNG_BYTES.length,
    reader,
  });

  assert.equal(result.mimeType, "image/png");
});

test("actual byte-size validation remains owned by the portable core", async () => {
  const reader = createReader({
    streamFactory: () => fakeStream([JPEG_BYTES]),
    readerSafetyLimitBytes: 100,
  });

  await rejectsPublicCode(
    () =>
      prepareImageInput({
        sourceUri: CONTENT_URI,
        maxSizeBytes: JPEG_BYTES.length - 1,
        reader,
      }),
    IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE,
  );
});

function createReader({
  streams = [],
  streamFactory,
  openError,
  mimeType,
  isFileUriApproved,
  openFileReadOnly,
  readerSafetyLimitBytes = 64,
  chunkSizeBytes = 8,
  maxZeroLengthReads = 2,
} = {}) {
  let streamIndex = 0;
  const resolver = {
    getType() {
      return mimeType;
    },
    openInputStream() {
      if (openError) {
        throw openError;
      }
      if (streamFactory) {
        return streamFactory();
      }
      if (streamIndex < streams.length) {
        return streams[streamIndex++];
      }

      return fakeStream([JPEG_BYTES]);
    },
  };

  return createAutoJs6AndroidImageReader({
    contentResolver: resolver,
    parseUri: (uri) => ({ uri }),
    javaBridge: {
      createByteArray(size) {
        return new Int8Array(size);
      },
      classifyError(error) {
        return (
          error?.runtimeClassification ??
          IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED
        );
      },
    },
    isFileUriApproved,
    openFileReadOnly,
    readerSafetyLimitBytes,
    chunkSizeBytes,
    maxZeroLengthReads,
  });
}

function fakeStream(steps, { closeError } = {}) {
  let index = 0;
  return {
    closed: false,
    read(target) {
      if (index >= steps.length) {
        return -1;
      }
      const step = steps[index++];
      if (step instanceof Error) {
        throw step;
      }
      if (typeof step === "number") {
        return step;
      }
      for (let byteIndex = 0; byteIndex < step.length; byteIndex += 1) {
        target[byteIndex] = step[byteIndex];
      }
      return step.length;
    },
    close() {
      this.closed = true;
      if (closeError) {
        throw closeError;
      }
    },
  };
}

function runtimeError(runtimeClassification, message) {
  const error = new Error(message);
  error.runtimeClassification = runtimeClassification;
  return error;
}

async function rejectsReaderCode(action, expectedClassification) {
  await assert.rejects(action, (error) => {
    assert.equal(error.classification, expectedClassification);
    assert.equal(error.message, "Classified image reader failure.");
    assert.equal("cause" in error, false);
    return true;
  });
}

async function rejectsPublicCode(action, expectedCode) {
  await assert.rejects(action, (error) => {
    assert.equal(error.code, expectedCode);
    assert.equal("cause" in error, false);
    return true;
  });
}
