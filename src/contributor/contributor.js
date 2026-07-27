import { assertNonEmptyString } from "../utils/validation.js";

export class Contributor {
  constructor({ aiEngine, queue }) {
    this.aiEngine = aiEngine;
    this.queue = queue;
  }

  propose({ repository, goal }) {
    assertNonEmptyString(repository, "repository");
    assertNonEmptyString(goal, "goal");

    return this.queue.add(() =>
      this.aiEngine.execute({
        prompt: `Propose a contribution for ${repository}: ${goal}`,
        context: { repository, goal },
      }),
    );
  }
}
