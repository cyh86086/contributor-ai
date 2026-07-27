"ui";
/* GENERATED: non-production AutoJs6 D01 device-verification support only. */
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/core/image-input.js
  var IMAGE_INPUT_ERROR_CODES = Object.freeze({
    UNSUPPORTED_MIME_TYPE: "UNSUPPORTED_MIME_TYPE",
    EMPTY_IMAGE: "EMPTY_IMAGE",
    IMAGE_TOO_LARGE: "IMAGE_TOO_LARGE",
    IMAGE_READ_FAILED: "IMAGE_READ_FAILED",
    ENCODING_FAILED: "ENCODING_FAILED",
    URI_ACCESS_DENIED: "URI_ACCESS_DENIED"
  });
  var IMAGE_READER_ERROR_CLASSIFICATIONS = Object.freeze({
    URI_ACCESS_DENIED: "URI_ACCESS_DENIED",
    IMAGE_READ_FAILED: "IMAGE_READ_FAILED"
  });
  var ALLOWED_READER_ERROR_CLASSIFICATIONS = new Set(
    Object.values(IMAGE_READER_ERROR_CLASSIFICATIONS)
  );
  var ERROR_MESSAGES = Object.freeze({
    [IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE]: "The image MIME type is not supported.",
    [IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE]: "The image is empty.",
    [IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE]: "The image exceeds the configured size limit.",
    [IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED]: "The image could not be read.",
    [IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED]: "The image could not be encoded.",
    [IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED]: "The image URI is not accessible."
  });
  var SUPPORTED_MIME_TYPES = /* @__PURE__ */ new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif"
  ]);
  var HEIC_BRANDS = /* @__PURE__ */ new Set(["heic", "heix", "hevc", "hevx"]);
  var HEIF_BRANDS = /* @__PURE__ */ new Set(["heif", "heim", "heis", "mif1", "msf1"]);
  var BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var ImageInputError = class extends Error {
    constructor(code) {
      super(ERROR_MESSAGES[code]);
      this.name = "ImageInputError";
      this.code = code;
    }
  };
  var ClassifiedImageReaderError = class extends Error {
    constructor(classification) {
      super("Classified image reader failure.");
      this.name = "ClassifiedImageReaderError";
      Object.defineProperty(this, "classification", {
        configurable: false,
        enumerable: true,
        value: ALLOWED_READER_ERROR_CLASSIFICATIONS.has(classification) ? classification : null,
        writable: false
      });
    }
  };
  function prepareImageInput(_0) {
    return __async(this, arguments, function* ({
      sourceUri,
      maxSizeBytes,
      reader,
      isFileUriApproved = () => false,
      encodeBase64 = encodeBytesToBase64
    }) {
      const scheme = validateSourceUri(sourceUri);
      validateMaxSize(maxSizeBytes);
      validateReader(reader);
      if (scheme === "file" && !(yield checkFileApproval(isFileUriApproved, sourceUri))) {
        throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
      }
      yield checkRuntimeAccess(reader, sourceUri);
      const readResult = yield readImage(reader, sourceUri);
      const bytes = normalizeBytes(readResult == null ? void 0 : readResult.bytes);
      if (bytes.byteLength === 0) {
        throw imageInputError(IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE);
      }
      if (bytes.byteLength > maxSizeBytes) {
        throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE);
      }
      const reportedMimeType = normalizeMimeType(readResult == null ? void 0 : readResult.mimeType);
      const mimeType = SUPPORTED_MIME_TYPES.has(reportedMimeType) ? reportedMimeType : detectImageMimeType(bytes);
      if (!mimeType) {
        throw imageInputError(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE);
      }
      const imageBase64 = encodeImage(bytes, encodeBase64);
      return {
        sourceUri,
        mimeType,
        sizeBytes: bytes.byteLength,
        imageBase64
      };
    });
  }
  function normalizeMimeType(value) {
    if (typeof value !== "string") {
      return "";
    }
    return value.split(";", 1)[0].trim().toLowerCase();
  }
  function detectImageMimeType(value) {
    const bytes = normalizeBytes(value);
    if (matches(bytes, [255, 216, 255])) {
      return "image/jpeg";
    }
    if (matches(bytes, [137, 80, 78, 71, 13, 10, 26, 10])) {
      return "image/png";
    }
    if (readAscii(bytes, 0, 4) === "RIFF" && readAscii(bytes, 8, 12) === "WEBP") {
      return "image/webp";
    }
    return detectIsoBaseMediaType(bytes);
  }
  function encodeBytesToBase64(value) {
    const bytes = normalizeBytes(value);
    let result = "";
    for (let index = 0; index < bytes.byteLength; index += 3) {
      const first = bytes[index];
      const hasSecond = index + 1 < bytes.byteLength;
      const hasThird = index + 2 < bytes.byteLength;
      const second = hasSecond ? bytes[index + 1] : 0;
      const third = hasThird ? bytes[index + 2] : 0;
      const combined = first << 16 | second << 8 | third;
      result += BASE64_ALPHABET[combined >> 18 & 63];
      result += BASE64_ALPHABET[combined >> 12 & 63];
      result += hasSecond ? BASE64_ALPHABET[combined >> 6 & 63] : "=";
      result += hasThird ? BASE64_ALPHABET[combined & 63] : "=";
    }
    return result;
  }
  function validateSourceUri(sourceUri) {
    if (typeof sourceUri !== "string") {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
    }
    if (/^content:\/\/.+/u.test(sourceUri)) {
      return "content";
    }
    if (/^file:\/\/.+/u.test(sourceUri)) {
      return "file";
    }
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
  }
  function validateMaxSize(maxSizeBytes) {
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
  }
  function validateReader(reader) {
    if (!reader || typeof reader.canAccess !== "function" || typeof reader.read !== "function") {
      throw new TypeError("reader must provide canAccess() and read()");
    }
  }
  function checkFileApproval(isFileUriApproved, sourceUri) {
    return __async(this, null, function* () {
      if (typeof isFileUriApproved !== "function") {
        return false;
      }
      try {
        return (yield isFileUriApproved(sourceUri)) === true;
      } catch (e) {
        return false;
      }
    });
  }
  function checkRuntimeAccess(reader, sourceUri) {
    return __async(this, null, function* () {
      try {
        if ((yield reader.canAccess(sourceUri)) !== true) {
          throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
        }
      } catch (e) {
        throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
      }
    });
  }
  function readImage(reader, sourceUri) {
    return __async(this, null, function* () {
      try {
        return yield reader.read(sourceUri);
      } catch (error) {
        const code = error instanceof ClassifiedImageReaderError && error.classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
        throw imageInputError(code);
      }
    });
  }
  function normalizeBytes(value) {
    if (value instanceof Uint8Array) {
      return value;
    }
    if (value instanceof ArrayBuffer) {
      return new Uint8Array(value);
    }
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
  }
  function encodeImage(bytes, encodeBase64) {
    if (typeof encodeBase64 !== "function") {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED);
    }
    try {
      const result = encodeBase64(bytes);
      if (typeof result !== "string" || result.length === 0 || result.startsWith("data:")) {
        throw new TypeError("Invalid Base64 result");
      }
      return result;
    } catch (e) {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED);
    }
  }
  function detectIsoBaseMediaType(bytes) {
    if (bytes.byteLength < 12 || readAscii(bytes, 4, 8) !== "ftyp") {
      return "";
    }
    const declaredSize = readUint32(bytes, 0);
    const boxEnd = declaredSize >= 12 && declaredSize <= bytes.byteLength ? declaredSize : bytes.byteLength;
    const brands = [readAscii(bytes, 8, 12)];
    for (let offset = 16; offset + 4 <= boxEnd; offset += 4) {
      brands.push(readAscii(bytes, offset, offset + 4));
    }
    if (brands.some((brand) => HEIC_BRANDS.has(brand))) {
      return "image/heic";
    }
    if (brands.some((brand) => HEIF_BRANDS.has(brand))) {
      return "image/heif";
    }
    return "";
  }
  function matches(bytes, signature) {
    if (bytes.byteLength < signature.length) {
      return false;
    }
    return signature.every((byte, index) => bytes[index] === byte);
  }
  function readAscii(bytes, start, end) {
    if (start < 0 || end > bytes.byteLength || start >= end) {
      return "";
    }
    let result = "";
    for (let index = start; index < end; index += 1) {
      result += String.fromCharCode(bytes[index]);
    }
    return result;
  }
  function readUint32(bytes, offset) {
    return bytes[offset] * 16777216 + bytes[offset + 1] * 65536 + bytes[offset + 2] * 256 + bytes[offset + 3];
  }
  function imageInputError(code) {
    return new ImageInputError(code);
  }

  // scripts/autojs6/d01-launcher-core.js
  var D01_TEST_CASE_ID = "D01_JPEG";
  var PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var CONTENT_URI = /^content:\/\/.+/u;
  function runD01OneClick(_0) {
    return __async(this, arguments, function* ({
      showInstructions: showInstructions2,
      pickSingleJpeg: pickSingleJpeg2,
      executeOffUiThread: executeOffUiThread2,
      prepareSelectedImage: prepareSelectedImage2,
      reportMetadata: reportMetadata2
    }) {
      validateDependencies({
        showInstructions: showInstructions2,
        pickSingleJpeg: pickSingleJpeg2,
        executeOffUiThread: executeOffUiThread2,
        prepareSelectedImage: prepareSelectedImage2,
        reportMetadata: reportMetadata2
      });
      let record;
      try {
        yield showInstructions2();
        const sourceUri = yield pickSingleJpeg2();
        if (typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri)) {
          record = failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, true);
        } else {
          const execution = yield executeOffUiThread2(
            () => prepareSelectedImage2(sourceUri)
          );
          record = normalizeExecution(execution);
        }
      } catch (error) {
        record = failure(publicCode(error), false);
      }
      reportMetadata2(record);
      return record;
    });
  }
  function normalizeExecution(execution) {
    if (!execution || execution.uiResponsive !== true) {
      return failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, false);
    }
    const result = execution.value;
    if ((result == null ? void 0 : result.status) === "PASS" && result.mimeType === "image/jpeg" && Number.isSafeInteger(result.sizeBytes) && result.sizeBytes > 0) {
      return Object.freeze({
        testCaseId: D01_TEST_CASE_ID,
        status: "PASS",
        mimeType: "image/jpeg",
        sizeBytes: result.sizeBytes,
        uiResponsive: true
      });
    }
    return failure(
      (result == null ? void 0 : result.status) === "FAIL" ? publicCode(result) : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      true
    );
  }
  function failure(errorCode, uiResponsive) {
    return Object.freeze({
      testCaseId: D01_TEST_CASE_ID,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      uiResponsive: uiResponsive === true
    });
  }
  function publicCode(value) {
    return PUBLIC_ERROR_CODES.has(value == null ? void 0 : value.code) ? value.code : PUBLIC_ERROR_CODES.has(value == null ? void 0 : value.errorCode) ? value.errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateDependencies(dependencies) {
    for (const [name, dependency] of Object.entries(dependencies)) {
      if (typeof dependency !== "function") {
        throw new TypeError(`${name} must be a function`);
      }
    }
  }

  // src/autojs6/android-image-reader.js
  var DEFAULT_CHUNK_SIZE_BYTES = 64 * 1024;
  var DEFAULT_MAX_ZERO_LENGTH_READS = 3;
  var CONTENT_SCHEME = "content";
  var FILE_SCHEME = "file";
  function createAutoJs6AndroidImageReader({
    context,
    contentResolver,
    parseUri,
    javaBridge,
    isFileUriApproved = () => false,
    openFileReadOnly,
    readerSafetyLimitBytes,
    chunkSizeBytes = DEFAULT_CHUNK_SIZE_BYTES,
    maxZeroLengthReads = DEFAULT_MAX_ZERO_LENGTH_READS,
    logger = createNoopLogger()
  }) {
    const resolver = resolveContentResolver(context, contentResolver);
    validateDependencies2({
      resolver,
      parseUri,
      javaBridge,
      readerSafetyLimitBytes,
      chunkSizeBytes,
      maxZeroLengthReads
    });
    const safeLogger = normalizeLogger(logger);
    return Object.freeze({
      canAccess(sourceUri) {
        return __async(this, null, function* () {
          let stream;
          try {
            const source = yield resolveSource({
              sourceUri,
              parseUri,
              isFileUriApproved,
              requireFileOpener: openFileReadOnly
            });
            stream = openSourceStream({
              source,
              resolver,
              openFileReadOnly
            });
            return stream != null;
          } catch (e) {
            return false;
          } finally {
            closeQuietly(stream, safeLogger);
          }
        });
      },
      read(sourceUri) {
        return __async(this, null, function* () {
          var _a2;
          let stream;
          try {
            const source = yield resolveSource({
              sourceUri,
              parseUri,
              isFileUriApproved,
              requireFileOpener: openFileReadOnly
            });
            const mimeType = source.scheme === CONTENT_SCHEME ? getContentMimeType(resolver, source.parsedUri, javaBridge) : void 0;
            stream = openSourceStream({
              source,
              resolver,
              openFileReadOnly
            });
            if (stream == null) {
              throw readerFailure(
                IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED
              );
            }
            const readBuffer = javaBridge.createByteArray(chunkSizeBytes);
            const readResult = readCompleteStream({
              stream,
              readBuffer,
              toUint8Array: (_a2 = javaBridge.toUint8Array) != null ? _a2 : javaSignedBytesToUint8Array,
              readerSafetyLimitBytes,
              maxZeroLengthReads
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
        });
      }
    });
  }
  function javaSignedBytesToUint8Array(javaBytes, count) {
    if (javaBytes == null || !Number.isSafeInteger(count) || count < 0 || count > javaBytes.length) {
      throw new TypeError("Invalid Java byte conversion input");
    }
    const result = new Uint8Array(count);
    for (let index = 0; index < count; index += 1) {
      const value = Number(javaBytes[index]);
      if (!Number.isInteger(value) || value < -128 || value > 255) {
        throw new TypeError("Invalid Java byte value");
      }
      result[index] = value & 255;
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
  function validateDependencies2({
    resolver,
    parseUri,
    javaBridge,
    readerSafetyLimitBytes,
    chunkSizeBytes,
    maxZeroLengthReads
  }) {
    if (!resolver || typeof resolver.openInputStream !== "function" || typeof resolver.getType !== "function") {
      throw new TypeError("A ContentResolver-compatible dependency is required");
    }
    if (typeof parseUri !== "function") {
      throw new TypeError("parseUri must be a function");
    }
    if (!javaBridge || typeof javaBridge.createByteArray !== "function" || typeof javaBridge.classifyError !== "function") {
      throw new TypeError(
        "javaBridge must provide createByteArray() and classifyError()"
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
  function resolveSource(_0) {
    return __async(this, arguments, function* ({
      sourceUri,
      parseUri,
      isFileUriApproved,
      requireFileOpener
    }) {
      const scheme = getSourceScheme(sourceUri);
      if (scheme === FILE_SCHEME) {
        if (typeof isFileUriApproved !== "function" || !(yield evaluateFilePolicy(isFileUriApproved, sourceUri)) || typeof requireFileOpener !== "function") {
          throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
        }
        return { scheme, sourceUri };
      }
      try {
        return {
          scheme,
          sourceUri,
          parsedUri: parseUri(sourceUri)
        };
      } catch (e) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
      }
    });
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
  function evaluateFilePolicy(isFileUriApproved, sourceUri) {
    return __async(this, null, function* () {
      try {
        return (yield isFileUriApproved(sourceUri)) === true;
      } catch (e) {
        return false;
      }
    });
  }
  function openSourceStream({ source, resolver, openFileReadOnly }) {
    return source.scheme === CONTENT_SCHEME ? resolver.openInputStream(source.parsedUri) : openFileReadOnly(source.sourceUri);
  }
  function getContentMimeType(resolver, parsedUri, javaBridge) {
    try {
      return resolver.getType(parsedUri);
    } catch (error) {
      const classification = safeClassifyError(javaBridge.classifyError, error);
      if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
      }
      return void 0;
    }
  }
  function readCompleteStream({
    stream,
    readBuffer,
    toUint8Array,
    readerSafetyLimitBytes,
    maxZeroLengthReads
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
            IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED
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
      } catch (e) {
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
  function classifyReaderFailure(error, classifyError2) {
    const classification = safeClassifyError(classifyError2, error);
    return readerFailure(
      classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED ? IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED : IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED
    );
  }
  function safeClassifyError(classifyError2, error) {
    try {
      return classifyError2(error);
    } catch (e) {
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
    } catch (e) {
      try {
        logger.warn("AutoJs6 image reader cleanup failed.");
      } catch (e2) {
      }
    }
  }
  function normalizeLogger(logger) {
    return logger && typeof logger.warn === "function" ? logger : createNoopLogger();
  }
  function createNoopLogger() {
    return Object.freeze({ warn() {
    } });
  }

  // scripts/autojs6/image-reader-device-check.js
  var PUBLIC_ERROR_CODES2 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;
  function runImageReaderDeviceCheck(_0) {
    return __async(this, arguments, function* ({
      testCaseId,
      sourceUri,
      maxSizeBytes,
      readerSafetyLimitBytes,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved = () => false,
      openFileReadOnly,
      reportMetadata: reportMetadata2 = () => {
      }
    }) {
      validateHarnessInputs({ testCaseId, reportMetadata: reportMetadata2 });
      let record;
      try {
        const reader = createAutoJs6AndroidImageReader({
          context,
          contentResolver,
          parseUri,
          javaBridge,
          isFileUriApproved,
          openFileReadOnly,
          readerSafetyLimitBytes
        });
        const result = yield prepareImageInput({
          sourceUri,
          maxSizeBytes,
          reader,
          isFileUriApproved
        });
        record = Object.freeze({
          testCaseId,
          status: "PASS",
          mimeType: result.mimeType,
          sizeBytes: result.sizeBytes
        });
      } catch (error) {
        record = Object.freeze({
          testCaseId,
          status: "FAIL",
          errorCode: PUBLIC_ERROR_CODES2.has(error == null ? void 0 : error.code) ? error.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
        });
      }
      reportMetadata2(record);
      return record;
    });
  }
  function validateHarnessInputs({ testCaseId, reportMetadata: reportMetadata2 }) {
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata2 !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }

  // scripts/autojs6/source/d01-jpeg-device-check.entry.js
  var MAX_SIZE_BYTES = 10 * 1024 * 1024;
  var READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
  var PICK_REQUEST_CODE = 6101;
  var UI_HEARTBEAT_TIMEOUT_MILLIS = 1e3;
  var CHECK_TIMEOUT_MILLIS = 2e4;
  var runtime = typeof globalThis === "object" ? globalThis : Function("return this")();
  void runD01OneClick({
    showInstructions,
    pickSingleJpeg,
    executeOffUiThread,
    prepareSelectedImage,
    reportMetadata
  });
  function showInstructions() {
    return runtime.dialogs.alert(
      "D01 JPEG \u88DD\u7F6E\u9A57\u8B49",
      "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002"
    );
  }
  function pickSingleJpeg() {
    return new Promise((resolve) => {
      let settled = false;
      const listener = (requestCode, resultCode, data) => {
        if (requestCode !== PICK_REQUEST_CODE || settled) {
          return;
        }
        settled = true;
        removeActivityResultListener(listener);
        if (resultCode !== runtime.android.app.Activity.RESULT_OK || data == null || typeof data.getData !== "function") {
          resolve(null);
          return;
        }
        const uri = data.getData();
        resolve(uri == null ? null : String(uri.toString()));
      };
      runtime.ui.emitter.on("activity_result", listener);
      try {
        const intent = new runtime.android.content.Intent(
          runtime.android.content.Intent.ACTION_GET_CONTENT
        );
        intent.setType("image/jpeg");
        intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
        runtime.activity.startActivityForResult(intent, PICK_REQUEST_CODE);
      } catch (e) {
        settled = true;
        removeActivityResultListener(listener);
        resolve(null);
      }
    });
  }
  function removeActivityResultListener(listener) {
    if (typeof runtime.ui.emitter.removeListener === "function") {
      runtime.ui.emitter.removeListener("activity_result", listener);
    }
  }
  function executeOffUiThread(task) {
    return new Promise((resolve) => {
      const completed = new runtime.java.util.concurrent.atomic.AtomicBoolean(
        false
      );
      const heartbeat = new runtime.java.util.concurrent.atomic.AtomicBoolean(
        false
      );
      let worker = null;
      const finish = (execution) => {
        if (completed.compareAndSet(false, true)) {
          resolve(execution);
        }
      };
      runtime.ui.post(() => {
        if (completed.compareAndSet(false, true)) {
          if (worker != null && typeof worker.interrupt === "function") {
            worker.interrupt();
          }
          resolve({ uiResponsive: false });
        }
      }, CHECK_TIMEOUT_MILLIS);
      try {
        worker = runtime.threads.start(() => {
          if (runtime.ui.isUiThread()) {
            runtime.ui.post(() => finish({ uiResponsive: false }));
            return;
          }
          runtime.ui.post(() => heartbeat.set(true));
          const deadline = Date.now() + UI_HEARTBEAT_TIMEOUT_MILLIS;
          while (!heartbeat.get() && Date.now() < deadline) {
            runtime.java.lang.Thread.sleep(10);
          }
          if (!heartbeat.get()) {
            runtime.ui.post(() => finish({ uiResponsive: false }));
            return;
          }
          Promise.resolve().then(task).then((value) => {
            runtime.ui.post(() => finish({ value, uiResponsive: true }));
          }).catch((error) => {
            const errorCode = publicErrorCode(error);
            runtime.ui.post(
              () => finish({
                value: { status: "FAIL", errorCode },
                uiResponsive: true
              })
            );
          });
        });
      } catch (e) {
        finish({ uiResponsive: false });
      }
    });
  }
  function prepareSelectedImage(sourceUri) {
    const context = runtime.context;
    const contentResolver = context.getContentResolver();
    return runImageReaderDeviceCheck({
      testCaseId: D01_TEST_CASE_ID,
      sourceUri,
      maxSizeBytes: MAX_SIZE_BYTES,
      readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
      context,
      contentResolver,
      parseUri: (value) => runtime.android.net.Uri.parse(value),
      javaBridge: {
        createByteArray: (size) => runtime.util.java.array("byte", size),
        classifyError
      },
      isFileUriApproved: () => false,
      reportMetadata: () => {
      }
    });
  }
  function classifyError(error) {
    var _a;
    try {
      const candidate = (_a = error == null ? void 0 : error.javaException) != null ? _a : error;
      return candidate instanceof runtime.java.lang.SecurityException ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    } catch (e) {
      return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    }
  }
  function publicErrorCode(error) {
    return Object.values(IMAGE_INPUT_ERROR_CODES).includes(error == null ? void 0 : error.code) ? error.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function reportMetadata(record) {
    runtime.console.clear();
    runtime.console.show();
    runtime.console.info(JSON.stringify(record));
  }
})();
