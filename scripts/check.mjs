import { spawn } from "node:child_process";

const checks = [
  ["AutoJs6 D01 bundle", ["run", "build:autojs6:d01:check"]],
  ["lint", ["run", "lint"]],
  ["format", ["run", "format:check"]],
  ["test", ["test"]],
];

for (const [name, args] of checks) {
  await runCheck(name, args);
}

console.info("All checks passed.");

function runCheck(name, args) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${name} failed with exit code ${code ?? "unknown"}`));
    });
  });
}
