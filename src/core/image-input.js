export const IMAGE_INPUT_ERROR_CODES = Object.freeze({
  UNSUPPORTED_MIME_TYPE: "UNSUPPORTED_MIME_TYPE",
  EMPTY_IMAGE: "EMPTY_IMAGE",
  IMAGE_TOO_LARGE: "IMAGE_TOO_LARGE",
  IMAGE_READ_FAILED: "IMAGE_READ_FAILED",
  ENCODING_FAILED: "ENCODING_FAILED",
  URI_ACCESS_DENIED: "URI_ACCESS_DENIED",
});

const ERROR_MESSAGES = Object.freeze({
  [IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE]:
    "The image MIME type is not supported.",
  [IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE]: "The image is empty.",
  [IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE]:
    "The image exceeds the configured size limit.",
  [IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED]: "The image could not be read.",
  [IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED]: "The image could not be encoded.",
  [IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED]:
    "The image URI is not accessible.",
});

const SUPPORTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const HEIC_BRANDS = new Set(["heic", "heix", "hevc", "hevx"]);
const HEIF_BRANDS = new Set(["heif", "heim", "heis", "mif1", "msf1"]);
const BASE64_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export class ImageInputError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);
    this.name = "ImageInputError";
    this.code = code;
  }
}

export async function prepareImageInput({
  sourceUri,
  maxSizeBytes,
  reader,
  isFileUriApproved = () => false,
  encodeBase64 = encodeBytesToBase64,
}) {
  const scheme = validateSourceUri(sourceUri);
  validateMaxSize(maxSizeBytes);
  validateReader(reader);

  if (
    scheme === "file" &&
    !(await checkFileApproval(isFileUriApproved, sourceUri))
  ) {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
  }

  await checkRuntimeAccess(reader, sourceUri);
  const readResult = await readImage(reader, sourceUri);
  const bytes = normalizeBytes(readResult?.bytes);

  if (bytes.byteLength === 0) {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE);
  }

  if (bytes.byteLength > maxSizeBytes) {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE);
  }

  const reportedMimeType = normalizeMimeType(readResult?.mimeType);
  const mimeType = SUPPORTED_MIME_TYPES.has(reportedMimeType)
    ? reportedMimeType
    : detectImageMimeType(bytes);

  if (!mimeType) {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE);
  }

  const imageBase64 = encodeImage(bytes, encodeBase64);

  return {
    sourceUri,
    mimeType,
    sizeBytes: bytes.byteLength,
    imageBase64,
  };
}

export function normalizeMimeType(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.split(";", 1)[0].trim().toLowerCase();
}

export function detectImageMimeType(value) {
  const bytes = normalizeBytes(value);

  if (matches(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (matches(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "image/png";
  }

  if (readAscii(bytes, 0, 4) === "RIFF" && readAscii(bytes, 8, 12) === "WEBP") {
    return "image/webp";
  }

  return detectIsoBaseMediaType(bytes);
}

export function encodeBytesToBase64(value) {
  const bytes = normalizeBytes(value);
  let result = "";

  for (let index = 0; index < bytes.byteLength; index += 3) {
    const first = bytes[index];
    const hasSecond = index + 1 < bytes.byteLength;
    const hasThird = index + 2 < bytes.byteLength;
    const second = hasSecond ? bytes[index + 1] : 0;
    const third = hasThird ? bytes[index + 2] : 0;
    const combined = (first << 16) | (second << 8) | third;

    result += BASE64_ALPHABET[(combined >> 18) & 0x3f];
    result += BASE64_ALPHABET[(combined >> 12) & 0x3f];
    result += hasSecond ? BASE64_ALPHABET[(combined >> 6) & 0x3f] : "=";
    result += hasThird ? BASE64_ALPHABET[combined & 0x3f] : "=";
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
  if (
    !reader ||
    typeof reader.canAccess !== "function" ||
    typeof reader.read !== "function"
  ) {
    throw new TypeError("reader must provide canAccess() and read()");
  }
}

async function checkFileApproval(isFileUriApproved, sourceUri) {
  if (typeof isFileUriApproved !== "function") {
    return false;
  }

  try {
    return (await isFileUriApproved(sourceUri)) === true;
  } catch {
    return false;
  }
}

async function checkRuntimeAccess(reader, sourceUri) {
  try {
    if ((await reader.canAccess(sourceUri)) !== true) {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
    }
  } catch {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
  }
}

async function readImage(reader, sourceUri) {
  try {
    return await reader.read(sourceUri);
  } catch {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
  }
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
    if (
      typeof result !== "string" ||
      result.length === 0 ||
      result.startsWith("data:")
    ) {
      throw new TypeError("Invalid Base64 result");
    }
    return result;
  } catch {
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED);
  }
}

function detectIsoBaseMediaType(bytes) {
  if (bytes.byteLength < 12 || readAscii(bytes, 4, 8) !== "ftyp") {
    return "";
  }

  const declaredSize = readUint32(bytes, 0);
  const boxEnd =
    declaredSize >= 12 && declaredSize <= bytes.byteLength
      ? declaredSize
      : bytes.byteLength;
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
  return (
    bytes[offset] * 0x1000000 +
    bytes[offset + 1] * 0x10000 +
    bytes[offset + 2] * 0x100 +
    bytes[offset + 3]
  );
}

function imageInputError(code) {
  return new ImageInputError(code);
}
