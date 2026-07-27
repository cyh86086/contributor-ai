import assert from "node:assert/strict";
import test from "node:test";

import {
  validateAndroidImageUri,
  validateVisionMetadata,
} from "../src/core/index.js";

const validMetadata = {
  description: "A cyclist riding on a mountain road at sunrise.",
  keywords: [
    "cyclist",
    "mountain",
    "road",
    "sunrise",
    "fitness",
    "travel",
    "outdoors",
  ],
};

test("accepts an Android content URI", () => {
  const uri = "content://media/external/images/media/42";
  assert.equal(validateAndroidImageUri(uri), uri);
});

test("rejects a non-content URI", () => {
  assert.throws(() => validateAndroidImageUri("file:///photo.jpg"), {
    name: "TypeError",
  });
});

test("accepts valid microstock metadata", () => {
  assert.deepEqual(validateVisionMetadata(validMetadata), validMetadata);
});

test("requires exactly seven keywords", () => {
  assert.throws(
    () =>
      validateVisionMetadata({
        ...validMetadata,
        keywords: validMetadata.keywords.slice(0, 6),
      }),
    /exactly 7/,
  );
});

test("requires a description shorter than 2000 characters", () => {
  assert.throws(
    () =>
      validateVisionMetadata({
        ...validMetadata,
        description: "a".repeat(2000),
      }),
    /under 2000/,
  );
});

test("requires English keywords", () => {
  assert.throws(
    () =>
      validateVisionMetadata({
        ...validMetadata,
        keywords: [...validMetadata.keywords.slice(0, 6), "風景"],
      }),
    /English keywords/,
  );
});
