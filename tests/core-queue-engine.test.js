import assert from "node:assert/strict";
import test from "node:test";

import { processQueue } from "../src/core/index.js";

test("empty queue returns zero counts", async () => {
  const result = await processQueue({
    items: [],
    processor: async () => ({}),
  });

  assert.equal(result.totalItems, 0);
  assert.equal(result.processed, 0);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 0);
  assert.deepEqual(result.results, []);
  assert.deepEqual(result.errors, []);
});

test("all-success queue returns correct counts and results", async () => {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const processor = async (item) => ({
    description: `desc-${item.id}`,
    keywords: [item.id],
  });

  const result = await processQueue({ items, processor });

  assert.equal(result.totalItems, 3);
  assert.equal(result.processed, 3);
  assert.equal(result.succeeded, 3);
  assert.equal(result.failed, 0);
  assert.equal(result.results.length, 3);
  assert.deepEqual(result.errors, []);
  assert.equal(result.results[0].description, "desc-1");
});

test("all-failure queue returns correct counts and errors", async () => {
  const items = [{ id: 1 }, { id: 2 }];
  const processor = async () => {
    const err = new Error("fail");
    err.code = "TEST_ERROR";
    throw err;
  };

  const result = await processQueue({ items, processor });

  assert.equal(result.totalItems, 2);
  assert.equal(result.processed, 2);
  assert.equal(result.succeeded, 0);
  assert.equal(result.failed, 2);
  assert.deepEqual(result.results, []);
  assert.equal(result.errors.length, 2);
  assert.equal(result.errors[0].index, 0);
  assert.equal(result.errors[0].code, "TEST_ERROR");
  assert.equal(result.errors[1].index, 1);
});

test("mixed success/failure handles both correctly", async () => {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const processor = async (item) => {
    if (item.id === 2) {
      const err = new Error("fail");
      err.code = "MIDDLE_FAIL";
      throw err;
    }
    return { id: item.id, ok: true };
  };

  const result = await processQueue({ items, processor });

  assert.equal(result.totalItems, 3);
  assert.equal(result.processed, 3);
  assert.equal(result.succeeded, 2);
  assert.equal(result.failed, 1);
  assert.equal(result.results.length, 2);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].index, 1);
  assert.equal(result.errors[0].code, "MIDDLE_FAIL");
});

test("failFast stops on first error", async () => {
  const processed = [];
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const processor = async (item) => {
    processed.push(item.id);
    if (item.id === 2) {
      throw new Error("stop");
    }
    return { id: item.id };
  };

  const result = await processQueue({ items, processor, failFast: true });

  assert.equal(result.totalItems, 3);
  assert.equal(result.processed, 2);
  assert.equal(result.succeeded, 1);
  assert.equal(result.failed, 1);
  assert.deepEqual(processed, [1, 2]);
  assert.equal(result.errors[0].index, 1);
});

test("failFast false processes all items", async () => {
  const processed = [];
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const processor = async (item) => {
    processed.push(item.id);
    if (item.id === 2) {
      throw new Error("continue");
    }
    return { id: item.id };
  };

  const result = await processQueue({ items, processor, failFast: false });

  assert.equal(result.totalItems, 3);
  assert.equal(result.processed, 3);
  assert.equal(result.succeeded, 2);
  assert.equal(result.failed, 1);
  assert.deepEqual(processed, [1, 2, 3]);
});

test("rejects non-array items", async () => {
  await assert.rejects(
    () => processQueue({ items: "not-an-array", processor: async () => {} }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /items must be an array/);
      return true;
    },
  );
});

test("rejects missing processor", async () => {
  await assert.rejects(
    () => processQueue({ items: [] }),
    (err) => {
      assert.ok(err instanceof TypeError);
      assert.match(err.message, /processor must be a function/);
      return true;
    },
  );
});

test("error records contain correct index and null code for plain errors", async () => {
  const items = [{ id: 1 }];
  const processor = async () => {
    throw new Error("plain error");
  };

  const result = await processQueue({ items, processor });

  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].index, 0);
  assert.equal(result.errors[0].code, null);
  assert.equal(result.errors[0].error.message, "plain error");
});
