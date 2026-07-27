export class ConsoleUi {
  constructor({ output = console }) {
    this.output = output;
  }

  showResult(result) {
    this.output.info(`[${result.model}] ${result.content}`);
  }

  showError(error) {
    this.output.error(`Contributor AI failed: ${error.message}`);
  }
}
