import { AiEngine } from "../ai_engine/index.js";
import { Contributor } from "../contributor/index.js";
import { LocalProvider } from "../provider/index.js";
import { TaskQueue } from "../queue/index.js";
import { ConsoleUi } from "../ui/index.js";

export function createApp({
  provider = new LocalProvider(),
  queue = new TaskQueue(),
  ui = new ConsoleUi({}),
} = {}) {
  const aiEngine = new AiEngine({ provider });
  const contributor = new Contributor({ aiEngine, queue });

  return {
    async run({
      repository = "cyh86086/contributor-ai",
      goal = "Bootstrap the project",
    } = {}) {
      try {
        const result = await contributor.propose({ repository, goal });
        ui.showResult(result);
        return result;
      } catch (error) {
        ui.showError(error);
        throw error;
      }
    },
  };
}
