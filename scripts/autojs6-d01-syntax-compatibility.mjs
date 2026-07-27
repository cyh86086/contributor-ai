/**
 * Runtime designation: Node.js offline build and CI harness only.
 */

import Babel from "@babel/standalone";

export function assertAutoJs6D01SyntaxCompatible(source) {
  const findings = findAutoJs6D01SyntaxIncompatibilities(source);
  if (findings.length > 0) {
    throw new Error(
      `AutoJs6 D01 bundle contains incompatible syntax: ${findings
        .map(({ label, line }) => `${label} at line ${line}`)
        .join(", ")}`,
    );
  }
}

export function findAutoJs6D01SyntaxIncompatibilities(source) {
  const ast = Babel.packages.parser.parse(source, {
    sourceType: "script",
  });
  const findings = [];

  Babel.packages.traverse.default(ast, {
    enter(path) {
      const label = classifyIncompatibleSyntax(path.node);
      if (label) {
        findings.push({
          label,
          line: path.node.loc?.start.line ?? 0,
        });
      }
    },
  });

  return findings;
}

function classifyIncompatibleSyntax(node) {
  if (node.type === "ClassDeclaration" || node.type === "ClassExpression") {
    return "class declaration or expression";
  }
  if (node.type === "ArrowFunctionExpression") {
    return "arrow function";
  }
  if (
    node.type === "VariableDeclaration" &&
    (node.kind === "const" || node.kind === "let")
  ) {
    return `${node.kind} declaration`;
  }
  if (
    node.type === "OptionalMemberExpression" ||
    node.type === "OptionalCallExpression" ||
    node.type === "ChainExpression"
  ) {
    return "optional chaining";
  }
  if (node.type === "LogicalExpression" && node.operator === "??") {
    return "nullish coalescing";
  }
  if (node.type === "AwaitExpression" || node.async === true) {
    return "async or await";
  }
  if (
    node.type === "TemplateLiteral" ||
    node.type === "TaggedTemplateExpression"
  ) {
    return "template literal";
  }
  if (node.type === "SpreadElement" || node.type === "RestElement") {
    return "spread or rest";
  }
  if (
    node.type === "ClassPrivateProperty" ||
    node.type === "ClassPrivateMethod" ||
    node.type === "PrivateName"
  ) {
    return "private class element";
  }
  if (node.type === "StaticBlock") {
    return "class static block";
  }
  if (node.type === "ObjectMethod") {
    return "object method shorthand";
  }
  if (node.type === "ObjectProperty" && node.shorthand === true) {
    return "object property shorthand";
  }
  if (
    node.type === "ObjectProperty" &&
    node.computed !== true &&
    ((node.key.type === "Identifier" && node.key.name === "class") ||
      (node.key.type === "StringLiteral" && node.key.value === "class"))
  ) {
    return "reserved class property key";
  }
  if (node.type === "ObjectProperty" && node.computed === true) {
    return "computed object property";
  }
  if (node.type === "CatchClause" && node.param?.type !== "Identifier") {
    return "unsupported catch binding";
  }
  if (node.type === "ForOfStatement") {
    return "for-of statement";
  }
  if (node.type === "AssignmentPattern") {
    return "default parameter";
  }
  if (
    (node.type === "FunctionDeclaration" ||
      node.type === "FunctionExpression" ||
      node.type === "ObjectMethod") &&
    node.generator === true
  ) {
    return "generator function";
  }
  if (
    node.type === "RegExpLiteral" &&
    (node.flags.includes("u") || node.flags.includes("v"))
  ) {
    return "Unicode-mode regular expression";
  }
  if (
    node.type === "ImportDeclaration" ||
    node.type.startsWith("Export") ||
    node.type === "MetaProperty"
  ) {
    return "module syntax";
  }
  if (
    node.type === "ObjectPattern" ||
    node.type === "ArrayPattern" ||
    node.type === "BigIntLiteral"
  ) {
    return "unsupported legacy syntax";
  }

  return "";
}
