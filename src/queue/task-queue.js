export class TaskQueue {
  #pending = [];
  #running = false;

  get size() {
    return this.#pending.length;
  }

  add(task) {
    if (typeof task !== "function") {
      throw new TypeError("Queued task must be a function");
    }

    return new Promise((resolve, reject) => {
      this.#pending.push({ task, resolve, reject });
      void this.#drain();
    });
  }

  async #drain() {
    if (this.#running) {
      return;
    }

    this.#running = true;
    try {
      while (this.#pending.length > 0) {
        const item = this.#pending.shift();
        try {
          item.resolve(await item.task());
        } catch (error) {
          item.reject(error);
        }
      }
    } finally {
      this.#running = false;
    }
  }
}
