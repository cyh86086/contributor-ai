/**
 * Runtime designation: backward-compatible Node.js D01 syntax-check aliases.
 */

import {
  assertAutoJs6FormatSyntaxCompatible,
  findAutoJs6FormatSyntaxIncompatibilities,
} from "./autojs6-format-syntax-compatibility.mjs";

export function assertAutoJs6D01SyntaxCompatible(source) {
  return assertAutoJs6FormatSyntaxCompatible(source, "AutoJs6 D01 bundle");
}

export function findAutoJs6D01SyntaxIncompatibilities(source) {
  return findAutoJs6FormatSyntaxIncompatibilities(source);
}
