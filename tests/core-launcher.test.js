import assert from "node:assert/strict";
import test from "node:test";

import { createLauncher } from "../src/core/index.js";

const VALID_BASE64 = Buffer.from([0xff, 0xd8, 0xff, 0xe0]).toString("base64");
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

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

const VALID_CONFIG = {
  imageReader: { read: async () => VALID_IMAGE },
  providerCaller: async () => VALID_RESPONSE,
  uiAdapter: async () => {},
  maxImageBytes: MAX_IMAGE_BYTES,
  maxSizeBytes: MAX_SIZE_BYTES,
};

test("valid configuration creates a working launcher", () => {
  const launcher = createLauncher(VALID_CONFIG);
  assert.equal(typeof launcher.run, "function");
});

test("run with empty images returns zero counts", async () => {
  const launcher = createLauncher(VALID_CONFIG);
  const result = await launcher.run([]);

  assert.equal(result.totalImages, 0);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 0);
  assert.deepEqual(result.results, []);
  assert.deepEqual(result.errors, []);
});

test("run processes images through the full pipeline", async () => {
  const images = [
    { ...VALID_IMAGE, sourceUri: "content://1" },
    { ...VALID_IMAGE, sourceUri: "content://2" },
  ];

  const launcher = createLauncher(VALID_CONFIG);
  const result = await launcher.run(images);

  assert.equal(result.totalImages, 2);
  assert.equal(result.succeeded, 2);
  assert.equal(result.failed, 0);
  assert.equal(result.results.length, 2);
  assert.equal(result.results[0].entered, true);
  assert.equal(result.results[0].pendingReview, true);
});

test("rejects missing imageReader", () => {
  assert.throws(
    () =>
      createLauncher({
        providerCaller: async () => VALID_RESPONSE,
        uiAdapter: async () => {},
        maxImageBytes: MAX_IMAGE_BYTES,
        maxSizeBytes: MAX_SIZE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /imageReader/);
      return true;
    },
  );
});

test("rejects missing providerCaller", () => {
  assert.throws(
    () =>
      createLauncher({
        imageReader: { read: async () => {} },
        uiAdapter: async () => {},
        maxImageBytes: MAX_IMAGE_BYTES,
        maxSizeBytes: MAX_SIZE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /providerCaller/);
      return true;
    },
  );
});

test("rejects missing uiAdapter", () => {
  assert.throws(
    () =>
      createLauncher({
        imageReader: { read: async () => {} },
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
        maxSizeBytes: MAX_SIZE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /uiAdapter/);
      return true;
    },
  );
});

test("rejects invalid maxImageBytes", () => {
  assert.throws(
    () =>
      createLauncher({
        ...VALID_CONFIG,
        maxImageBytes: -1,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /maxImageBytes/);
      return true;
    },
  );
});

test("rejects non-array images in run", async () => {
  const launcher = createLauncher(VALID_CONFIG);
  await assert.rejects(
    () => launcher.run("not-an-array"),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /images must be an array/);
      return true;
    },
  );
});

test("error propagation from provider", async () => {
  const images = [{ ...VALID_IMAGE, sourceUri: "content://1" }];

  const launcher = createLauncher({
    ...VALID_CONFIG,
    providerCaller: async () => {
      throw new Error("provider error");
    },
  });

  const result = await launcher.run(images);
  assert.equal(result.totalImages, 1);
  assert.equal(result.failed, 1);
  assert.equal(result.errors.length, 1);
});
