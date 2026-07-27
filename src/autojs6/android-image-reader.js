/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This module performs URI-backed image reads only. Android and Java objects
 * are injected so the behavior can be tested offline without treating Node.js
 * as the production runtime.
 */

import {
  ClassifiedImageReaderError,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../core/image-input.js";

const DEFAULT_CHUNK_SIZE_BYTES = 64 * 1024;
const DEFAULT_MAX_ZERO_LENGTH_READS = 3;
const CONTENT_SCHEME = "content";
const FILE_SCHEME = "file";

export function createAutoJs6AndroidImageReader({
  context,
  contentResolver,
  parseUri,
  javaBridge,
  isFileUriApproved = () => false,
  openFileReadOnly,
  readerSafetyLimitBytes,
  chunkSizeBytes = DEFAULT_CHUNK_SIZE_BYTES,
  maxZeroLengthReads = DEFAULT_MAX_ZERO_LENGTH_READS,
  logger = createNoopLogger(),
}) {
  const resolver = resolveContentResolver(context, contentResolver);
  validateDependencies({
    resolver,
    parseUri,
    javaBridge,
    readerSafetyLimitBytes,
    chunkSizeBytes,
    maxZeroLengthReads,
  });
  const safeLogger = normalizeLogger(logger);

  return Object.freeze({
    async canAccess(sourceUri) {
      let stream;
      try {
        const source = await resolveSource({
          sourceUri,
          parseUri,
          isFileUriApproved,
          requireFileOpener: openFileReadOnly,
        });
        stream = openSourceStream({
          source,
          resolver,
          openFileReadOnly,
        });
        return stream != null;
      } catch {
        return false;
      } finally {
        closeQuietly(stream, safeLogger);
      }
    },

    async read(sourceUri) {
      let stream;

      try {
        const source = await resolveSource({
          sourceUri,
          parseUri,
          isFileUriApproved,
          requireFileOpener: openFileReadOnly,
        });
        const mimeType =
          source.scheme === CONTENT_SCHEME
            ? getContentMimeType(resolver, source.parsedUri, javaBridge)
            : undefined;

        stream = openSourceStream({
          source,
          resolver,
          openFileReadOnly,
        });
        if (stream == null) {
          throw readerFailure(
            IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
          );
        }

        const readBuffer = javaBridge.createByteArray(chunkSizeBytes);
        const readResult = readCompleteStream({
          stream,
          readBuffer,
          toUint8Array: javaBridge.toUint8Array ?? javaSignedBytesToUint8Array,
          readerSafetyLimitBytes,
          maxZeroLengthReads,
        });
        const bytes = combineChunks(readResult.chunks, readResult.sizeBytes);

        return { bytes, mimeType };
      } catch (error) {
        if (error instanceof ClassifiedImageReaderError) {
          throw error;
        }
        throw classifyReaderFailure(error, javaBridge.classifyError);
      } finally {
        closeQuietly(stream, safeLogger);
      }
    },
  });
}

export function javaSignedBytesToUint8Array(javaBytes, count) {
  if (
    javaBytes == null ||
    !Number.isSafeInteger(count) ||
    count < 0 ||
    count > javaBytes.length
  ) {
    throw new TypeError("Invalid Java byte conversion input");
  }

  const result = new Uint8Array(count);
  for (let index = 0; index < count; index += 1) {
    const value = Number(javaBytes[index]);
    if (!Number.isInteger(value) || value < -128 || value > 255) {
      throw new TypeError("Invalid Java byte value");
    }
    result[index] = value & 0xff;
  }
  return result;
}

function resolveContentResolver(context, contentResolver) {
  if (contentResolver) {
    return contentResolver;
  }
  if (context && typeof context.getContentResolver === "function") {
    return context.getContentResolver();
  }
  return null;
}

function validateDependencies({
  resolver,
  parseUri,
  javaBridge,
  readerSafetyLimitBytes,
  chunkSizeBytes,
  maxZeroLengthReads,
}) {
  if (
    !resolver ||
    typeof resolver.openInputStream !== "function" ||
    typeof resolver.getType !== "function"
  ) {
    throw new TypeError("A ContentResolver-compatible dependency is required");
  }
  if (typeof parseUri !== "function") {
    throw new TypeError("parseUri must be a function");
  }
  if (
    !javaBridge ||
    typeof javaBridge.createByteArray !== "function" ||
    typeof javaBridge.classifyError !== "function"
  ) {
    throw new TypeError(
      "javaBridge must provide createByteArray() and classifyError()",
    );
  }
  validatePositiveSafeInteger(readerSafetyLimitBytes, "readerSafetyLimitBytes");
  validatePositiveSafeInteger(chunkSizeBytes, "chunkSizeBytes");
  validatePositiveSafeInteger(maxZeroLengthReads, "maxZeroLengthReads");
}

function validatePositiveSafeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer`);
  }
}

async function resolveSource({
  sourceUri,
  parseUri,
  isFileUriApproved,
  requireFileOpener,
}) {
  const scheme = getSourceScheme(sourceUri);

  if (scheme === FILE_SCHEME) {
    if (
      typeof isFileUriApproved !== "function" ||
      !(await evaluateFilePolicy(isFileUriApproved, sourceUri)) ||
      typeof requireFileOpener !== "function"
    ) {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
    }
    return { scheme, sourceUri };
  }

  try {
    return {
      scheme,
      sourceUri,
      parsedUri: parseUri(sourceUri),
    };
  } catch {
    throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
  }
}

function getSourceScheme(sourceUri) {
  if (typeof sourceUri !== "string") {
    throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
  }
  if (/^content:\/\/.+/u.test(sourceUri)) {
    return CONTENT_SCHEME;
  }
  if (/^file:\/\/.+/u.test(sourceUri)) {
    return FILE_SCHEME;
  }
  throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
}

async function evaluateFilePolicy(isFileUriApproved, sourceUri) {
  try {
    return (await isFileUriApproved(sourceUri)) === true;
  } catch {
    return false;
  }
}

function openSourceStream({ source, resolver, openFileReadOnly }) {
  return source.scheme === CONTENT_SCHEME
    ? resolver.openInputStream(source.parsedUri)
    : openFileReadOnly(source.sourceUri);
}

function getContentMimeType(resolver, parsedUri, javaBridge) {
  try {
    return resolver.getType(parsedUri);
  } catch (error) {
    const classification = safeClassifyError(javaBridge.classifyError, error);
    if (
      classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED
    ) {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
    }
    return undefined;
  }
}

function readCompleteStream({
  stream,
  readBuffer,
  toUint8Array,
  readerSafetyLimitBytes,
  maxZeroLengthReads,
}) {
  if (!stream || typeof stream.read !== "function") {
    throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
  }
  if (typeof toUint8Array !== "function") {
    throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
  }

  const chunks = [];
  let sizeBytes = 0;
  let zeroLengthReads = 0;

  while (true) {
    const count = stream.read(readBuffer);

    if (count === -1) {
      break;
    }
    if (!Number.isSafeInteger(count) || count < -1) {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }
    if (count === 0) {
      zeroLengthReads += 1;
      if (zeroLengthReads >= maxZeroLengthReads) {
        throw readerFailure(
          IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
        );
      }
      continue;
    }

    zeroLengthReads = 0;
    if (sizeBytes + count > readerSafetyLimitBytes) {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }

    let converted;
    try {
      converted = toUint8Array(readBuffer, count);
    } catch {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }
    if (!(converted instanceof Uint8Array) || converted.byteLength !== count) {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }

    chunks.push(new Uint8Array(converted));
    sizeBytes += count;
  }

  return { chunks, sizeBytes };
}

function combineChunks(chunks, sizeBytes) {
  const result = new Uint8Array(sizeBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function classifyReaderFailure(error, classifyError) {
  const classification = safeClassifyError(classifyError, error);
  return readerFailure(
    classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED
      ? IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED
      : IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
  );
}

function safeClassifyError(classifyError, error) {
  try {
    return classifyError(error);
  } catch {
    return IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED;
  }
}

function readerFailure(classification) {
  return new ClassifiedImageReaderError(classification);
}

function closeQuietly(stream, logger) {
  if (!stream || typeof stream.close !== "function") {
    return;
  }
  try {
    stream.close();
  } catch {
    try {
      logger.warn("AutoJs6 image reader cleanup failed.");
    } catch {
      // Logging must never replace the primary result.
    }
  }
}

function normalizeLogger(logger) {
  return logger && typeof logger.warn === "function"
    ? logger
    : createNoopLogger();
}

function createNoopLogger() {
  return Object.freeze({ warn() {} });
}
