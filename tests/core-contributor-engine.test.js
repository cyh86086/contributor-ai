import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTRIBUTOR_ENGINE_ERROR_CODES,
  ContributorEngineError,
  enterContributorMetadata,
} from "../src/core/index.js";

const VALID_DESCRIPTION =
  "A colorful sunset over the ocean with waves crashing on rocks.";
const VALID_KEYWORDS = [
  "sunset",
  "ocean",
  "waves",
  "rocks",
  "colorful",
  "sky",
  "nature",
];

test("public error codes remain narrowly scoped", () => {
  assert.deepEqual(Object.keys(CONTRIBUTOR_ENGINE_ERROR_CODES), [
    "FIELD_ENTRY_FAILED",
    "METADATA_INVALID",
  ]);
});

test("valid metadata with successful UI adapter returns entered true", async () => {
  const uiAdapter = async () => {};

  const result = await enterContributorMetadata({
    description: VALID_DESCRIPTION,
    keywords: VALID_KEYWORDS,
    uiAdapter,
  });

  assert.equal(result.entered, true);
  assert.equal(result.pendingReview, true);
});

test("pendingReview is always true on success", async () => {
  const result = await enterContributorMetadata({
    description: VALID_DESCRIPTION,
    keywords: VALID_KEYWORDS,
    uiAdapter: async () => {},
  });

  assert.equal(result.pendingReview, true);
});

test("UI adapter receives validated description and keywords", async () => {
  let received = null;
  const uiAdapter = async (data) => {
    received = data;
  };

  await enterContributorMetadata({
    description: VALID_DESCRIPTION,
    keywords: VALID_KEYWORDS,
    uiAdapter,
  });

  assert.equal(received.description, VALID_DESCRIPTION);
  assert.deepEqual(received.keywords, VALID_KEYWORDS);
});

test("UI adapter failure returns FIELD_ENTRY_FAILED", async () => {
  await assert.rejects(
    () =>
      enterContributorMetadata({
        description: VALID_DESCRIPTION,
        keywords: VALID_KEYWORDS,
        uiAdapter: async () => {
          throw new Error("UI not available");
        },
      }),
    (err) => {
      assert.equal(err.name, "ContributorEngineError");
      assert.equal(err.code, "FIELD_ENTRY_FAILED");
      return true;
    },
  );
});

test("invalid description throws METADATA_INVALID", async () => {
  await assert.rejects(
    () =>
      enterContributorMetadata({
        description: "",
        keywords: VALID_KEYWORDS,
        uiAdapter: async () => {},
      }),
    (err) => {
      assert.equal(err.name, "ContributorEngineError");
      assert.equal(err.code, "METADATA_INVALID");
      return true;
    },
  );
});

test("wrong keyword count throws METADATA_INVALID", async () => {
  await assert.rejects(
    () =>
      enterContributorMetadata({
        description: VALID_DESCRIPTION,
        keywords: ["only", "three", "keywords"],
        uiAdapter: async () => {},
      }),
    (err) => {
      assert.equal(err.name, "ContributorEngineError");
      assert.equal(err.code, "METADATA_INVALID");
      return true;
    },
  );
});

test("rejects missing uiAdapter", async () => {
  await assert.rejects(
    () =>
      enterContributorMetadata({
        description: VALID_DESCRIPTION,
        keywords: VALID_KEYWORDS,
      }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /uiAdapter must be a function/);
      return true;
    },
  );
});

test("error messages do not contain metadata content", async () => {
  try {
    await enterContributorMetadata({
      description: VALID_DESCRIPTION,
      keywords: VALID_KEYWORDS,
      uiAdapter: async () => {
        throw new Error("fail");
      },
    });
    assert.fail("should have thrown");
  } catch (err) {
    assert.equal(err.code, "FIELD_ENTRY_FAILED");
    assert.ok(!err.message.includes(VALID_DESCRIPTION));
    assert.ok(!err.message.includes(VALID_KEYWORDS[0]));
  }
});
