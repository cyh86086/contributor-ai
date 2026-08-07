import assert from "node:assert/strict";
import test from "node:test";

import { processImageWithAI, VisionProviderError } from "../src/core/index.js";

const VALID_IMAGE_INPUT = {
  sourceUri: "content://media/external/images/media/12345",
  mimeType: "image/jpeg",
  sizeBytes: 6406,
  imageBase64: Buffer.from([0xff, 0xd8, 0xff, 0xe0]).toString("base64"),
};

const VALID_RESPONSE = {
  description: "A colorful sunset over the ocean with waves crashing on rocks.",
  keywords: ["sunset", "ocean", "waves", "rocks", "colorful", "sky", "nature"],
};

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

test("processes valid image input and returns validated metadata", async () => {
  const result = await processImageWithAI({
    ...VALID_IMAGE_INPUT,
    providerCaller: async () => VALID_RESPONSE,
    maxImageBytes: MAX_IMAGE_BYTES,
  });

  assert.equal(result.description, VALID_RESPONSE.description);
  assert.deepEqual(result.keywords, VALID_RESPONSE.keywords);
});

test("delegates PROVIDER_RESPONSE_INVALID from invalid response", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        providerCaller: async () => ({ description: "", keywords: [] }),
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "PROVIDER_RESPONSE_INVALID");
      return true;
    },
  );
});

test("delegates PROVIDER_REQUEST_FAILED from caller exception", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        providerCaller: async () => {
          throw new Error("network error");
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "PROVIDER_REQUEST_FAILED");
      return true;
    },
  );
});

test("delegates PROVIDER_AUTH_FAILED", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        providerCaller: async () => {
          throw new VisionProviderError("PROVIDER_AUTH_FAILED");
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "PROVIDER_AUTH_FAILED");
      return true;
    },
  );
});

test("delegates PROVIDER_RATE_LIMITED", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        providerCaller: async () => {
          throw new VisionProviderError("PROVIDER_RATE_LIMITED");
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "PROVIDER_RATE_LIMITED");
      return true;
    },
  );
});

test("delegates PROVIDER_UNAVAILABLE", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        providerCaller: async () => {
          throw new VisionProviderError("PROVIDER_UNAVAILABLE");
        },
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "PROVIDER_UNAVAILABLE");
      return true;
    },
  );
});

test("delegates IMAGE_TOO_LARGE_FOR_PROVIDER", async () => {
  const largeBase64 = "A".repeat(30_000_000);
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        imageBase64: largeBase64,
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.equal(err.name, "VisionProviderError");
      assert.equal(err.code, "IMAGE_TOO_LARGE_FOR_PROVIDER");
      return true;
    },
  );
});

test("rejects empty sourceUri", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        sourceUri: "",
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /sourceUri/);
      return true;
    },
  );
});

test("rejects empty mimeType", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        mimeType: "",
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /mimeType/);
      return true;
    },
  );
});

test("rejects non-positive sizeBytes", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        sizeBytes: 0,
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /sizeBytes/);
      return true;
    },
  );
});

test("rejects data URL prefix in imageBase64", async () => {
  await assert.rejects(
    () =>
      processImageWithAI({
        ...VALID_IMAGE_INPUT,
        imageBase64: "data:image/jpeg;base64,/9j/4AAQ",
        providerCaller: async () => VALID_RESPONSE,
        maxImageBytes: MAX_IMAGE_BYTES,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /imageBase64/);
      return true;
    },
  );
});

test("error messages do not contain source URI or image data", async () => {
  try {
    await processImageWithAI({
      ...VALID_IMAGE_INPUT,
      providerCaller: async () => {
        throw new Error("network error");
      },
      maxImageBytes: MAX_IMAGE_BYTES,
    });
    assert.fail("should have thrown");
  } catch (err) {
    assert.equal(err.code, "PROVIDER_REQUEST_FAILED");
    assert.ok(!err.message.includes(VALID_IMAGE_INPUT.sourceUri));
    assert.ok(!err.message.includes(VALID_IMAGE_INPUT.imageBase64));
  }
});
