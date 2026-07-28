/**
 * Runtime designation: backward-compatible Node.js D01 build command.
 */

process.argv.push("--cases=D01_JPEG");
await import("./build-autojs6-format-checks.mjs");
