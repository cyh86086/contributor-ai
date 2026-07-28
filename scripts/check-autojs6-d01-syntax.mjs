/**
 * Runtime designation: backward-compatible Node.js D01 syntax-check command.
 */

process.argv.push("--cases=D01_JPEG");
await import("./check-autojs6-format-syntax.mjs");
