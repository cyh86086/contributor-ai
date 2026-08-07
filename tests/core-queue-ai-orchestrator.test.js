import assert from "node:assert/strict";
import test from "node:test";

import { orchestrateBatchAI, VisionProviderError } from "../src/core/index.js";

const VALID_BASE64 = Buffer.from([0xff, 0xd8, 0xff, 0xe0]).toString("base64");
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

const VALID_IMAGE = {
  sourceUri: "content://media/external/images/media/1",
  mimeType: "image/jpeg",
  sizeBytes: 6406,
  imageBase64: VALID_BASE64,
};

const VALID_RESPONSE = {
  description: "A colorful sunset over the ocean.",
  keywords: ["sunset", "ocean", "waves", "rocks", "colorful", "sky", "nature"],
};

test("empty image list returns zero counts", async () => {
  const result = await orchestrateBatchAI({
    images: [],
    providerCaller: async () => VALID_RESPONSE,
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.equal(result.totalImages, 0);
  assert.equal(result.processed, 0);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 0);
  assert.deepEqual(result.results, []);
  assert.deepEqual(result.errors, []);
});

test("all-success batch returns correct metadata results", async () => {
  const images = [
    { ...VALID_IMAGE, sourceUri: "content://1" },
    { ...VALID_IMAGE, sourceUri: "content://2" },
  ];

  const result = await orchestrateBatchAI({
    images,
    providerCaller: async () => VALID_RESPONSE,
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.equal(result.totalImages, 2);
  assert.equal(result.processed, 2);
  assert.equal(result.succeeded, 2);
  assert.equal(result.failed, 0);
  assert.equal(result.results.length, 2);
  assert.equal(result.results[0].description, VALID_RESPONSE.description);
  assert.deepEqual(result.results[0].keywords, VALID_RESPONSE.keywords);
});

test("all-failure batch returns correct error records", async () => {
  const images = [
    { ...VALID_IMAGE, sourceUri: "content://1" },
    { ...VALID_IMAGE, sourceUri: "content://2" },
  ];

  const result = await orchestrateBatchAI({
    images,
    providerCaller: async () => {
      throw new VisionProviderError("PROVIDER_REQUEST_FAILED");
    },
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.equal(result.totalImages, 2);
  assert.equal(result.processed, 2);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 2);
  assert.deepEqual(result.results, []);
  assert.equal(result.errors.length, 2);
  assert.equal(result.errors[0].index, 0);
  assert.equal(result.errors[0].code, "PROVIDER_REQUEST_FAILED");
  assert.equal(result.errors[1].index, 1);
});

test("mixed success/failure handles both correctly", async () => {
  const images = [
    { ...VALID_IMAGE, sourceUri: "content://1" },
    { ...VALID_IMAGE, sourceUri: "content://2" },
    { ...VALID_IMAGE, sourceUri: "content://3" },
  ];

  let callCount = 0;
  const result = await orchestrateBatchAI({
    images,
    providerCaller: async () => {
      callCount++;
      if (callCount === 2) {
        throw new VisionProviderError("PROVIDER_UNAVAILABLE");
      }
      return VALID_RESPONSE;
    },
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.equal(result.totalImages, 3);
  assert.equal(result.processed, 3);
  assert.equal(result.succeeded, 2);
  assert.equal(result.failed, 1);
  assert.equal(result.results.length, 2);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].index, 1);
  assert.equal(result.errors[0].code, "PROVIDER_UNAVAILABLE");
});

test("failFast stops on first error", async () => {
  const images = [
    { ...VALID_IMAGE, sourceUri: "content://1" },
    { ...VALID_IMAGE, sourceUri: "content://2" },
    { ...VALID_IMAGE, sourceUri: "content://3" },
  ];

  const result = await orchestrateBatchAI({
    images,
    providerCaller: async () => {
      throw new VisionProviderError("PROVIDER_AUTH_FAILED");
    },
    maxImageBytes: MAX_IMAGE_BYTES,
    failFast: true,
  });

  assert.equal(result.totalImages, 3);
  assert.equal(result.processed, 1);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 1);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].index, 0);
});

test("rejects non-array images", async () => {
  await assert.rejects(
    () =>
      orchestrateBatchAI({
        images: "not-an-array",
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /images must be an array/);
      return true;
    },
  );
});

test("rejects missing providerCaller", async () => {
  await assert.rejects(
    () =>
      orchestrateBatchAI({
        images: [VALID_IMAGE],
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /providerCaller must be a function/);
      return true;
    },
  );
});

test("rejects invalid maxImageBytes", async () => {
  await assert.rejects(
    () =>
      orchestrateBatchAI({
        images: [VALID_IMAGE],
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: -1,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /maxImageBytes must be a positive/);
      return true;
    },
  );
});
