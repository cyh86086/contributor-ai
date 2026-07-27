import assert from "node:assert/strict";
import test from "node:test";

import { TaskQueue } from "../src/queue/index.js";

test("TaskQueue runs tasks in insertion order", async () => {
  const queue = new TaskQueue();
  const order = [];

  const first = queue.add(async () => {
    order.push("first");
    return 1;
  });
  const second = queue.add(async () => {
    order.push("second");
    return 2;
  });

  assert.deepEqual(await Promise.all([first, second]), [1, 2]);
  assert.deepEqual(order, ["first", "second"]);
  assert.equal(queue.size, 0);
});

test("TaskQueue continues after a rejected task", async () => {
  const queue = new TaskQueue();
  const failed = queue.add(async () => {
    throw new Error("expected");
  });
  const succeeded = queue.add(async () => "ok");

  await assert.rejects(failed, /expected/);
  assert.equal(await succeeded, "ok");
});
