#!/usr/bin/env node

import { createApp } from "./app.js";

const app = createApp();

app.run().catch(() => {
  process.exitCode = 1;
});
