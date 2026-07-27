import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import semver from "semver";

const PROJECT_ROOT = new URL("../", import.meta.url);

test("direct dependencies support the complete project Node engine range", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", PROJECT_ROOT), "utf8"),
  );
  const packageLock = JSON.parse(
    await readFile(new URL("package-lock.json", PROJECT_ROOT), "utf8"),
  );
  const projectNodeRange = packageJson.engines.node;
  const directDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  assert.equal(projectNodeRange, ">=20");
  assert.equal(packageJson.engines.npm, ">=10");

  for (const dependencyName of Object.keys(directDependencies).sort()) {
    const lockedDependency =
      packageLock.packages[`node_modules/${dependencyName}`];

    assert.ok(
      lockedDependency,
      `${dependencyName} must have a deterministic lockfile entry`,
    );

    if (lockedDependency.engines?.node) {
      assert.equal(
        semver.subset(projectNodeRange, lockedDependency.engines.node),
        true,
        `${dependencyName}@${lockedDependency.version} requires Node ${lockedDependency.engines.node}, which does not cover project range ${projectNodeRange}`,
      );
    }
  }

  const babel = packageLock.packages["node_modules/@babel/standalone"];
  assert.equal(babel.version, "7.29.7");
  assert.equal(babel.engines.node, ">=6.9.0");
});
