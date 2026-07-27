import assert from "node:assert/strict";
import test from "node:test";

import { runOfflineSample } from "../src/offline_harness/run-sample.js";

test("offline harness validates deterministic sample metadata", () => {
  const [result] = runOfflineSample({
    imageUris: ["content://media/external/images/media/42"],
  });

  assert.equal(result.imageUri, "content://media/external/images/media/42");
  assert.equal(result.metadata.keywords.length, 7);
  assert.ok(result.metadata.description.length < 2000);
});
