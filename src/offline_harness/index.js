#!/usr/bin/env node

import { runOfflineSample } from "./run-sample.js";

const results = runOfflineSample();
console.info(JSON.stringify(results, null, 2));
