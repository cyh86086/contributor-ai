// Runtime designation: runtime-neutral portable core.
// No dependency on Node.js, AutoJs6, Android, provider SDKs, or Contributor app.

import { callVisionProvider } from "./vision-provider.js";

/**
 * Process a single image through the AI Vision provider and return
 * validated microstock metadata.
 *
 * @param {object} options
 * @param {string} options.sourceUri - Validated source URI
 * @param {string} options.mimeType - Validated MIME type
 * @param {number} options.sizeBytes - Validated byte length
 * @param {string} options.imageBase64 - Base64 without data URL prefix
 * @param {function} options.providerCaller - Injected production provider caller
 * @param {number} options.maxImageBytes - Provider maximum image size limit
 * @returns {Promise<{description: string, keywords: string[]}>}
 */
export async function processImageWithAI({
  sourceUri,
  mimeType,
  sizeBytes,
  imageBase64,
  providerCaller,
  maxImageBytes,
}) {
  validateImageInput({ sourceUri, mimeType, sizeBytes, imageBase64 });

  const result = await callVisionProvider({
    imageBase64,
    mimeType,
    providerCaller,
    maxImageBytes,
  });

  return result;
}

function validateImageInput({ sourceUri, mimeType, sizeBytes, imageBase64 }) {
  if (typeof sourceUri !== "string" || sourceUri.length === 0) {
    throw new TypeError("sourceUri must be a non-empty string");
  }
  if (typeof mimeType !== "string" || mimeType.length === 0) {
    throw new TypeError("mimeType must be a non-empty string");
  }
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0) {
    throw new TypeError("sizeBytes must be a positive safe integer");
  }
  if (
    typeof imageBase64 !== "string" ||
    imageBase64.length === 0 ||
    imageBase64.startsWith("data:")
  ) {
    throw new TypeError(
      "imageBase64 must be a non-empty string without data URL prefix",
    );
  }
}
