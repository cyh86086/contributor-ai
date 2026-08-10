/* Contributor AI — UI Discovery Tool for AutoJs6. */
function main() {
  var i;
  var c;
  var logLines = [];
  var root;
  var nodeCount;
  var uniqueCount;
  var skippedCount;
  var dir;
  var file;
  var writer;
  var seenKeys;
  var MAX_DEPTH;
  function log(msg) {
    console.warn(msg);
    logLines.push(msg);
  }
  auto.waitFor();
  log("=== UI Discovery Tool v2 (Dedup) ===");
  log("Time: ".concat(new Date().toISOString()));
  log("Switch to the Contributor app NOW! Capturing in 5 seconds...");
  toast("Switch to Contributor app! 5...");
  java.lang.Thread.sleep(1000);
  toast("4...");
  java.lang.Thread.sleep(1000);
  toast("3...");
  java.lang.Thread.sleep(1000);
  toast("2...");
  java.lang.Thread.sleep(1000);
  toast("1... Capturing!");
  java.lang.Thread.sleep(1000);
  log("Capturing current screen...");
  log("");
  root = auto.rootInActiveWindow;
  if (!root) {
    log("[ERROR] Cannot get root window. Is the accessibility service enabled?");
    toast("UI Discovery failed - no root window");
    return;
  }
  log("[INFO] Root window found. Package: ".concat(root.packageName()));
  log("");
  nodeCount = 0;
  uniqueCount = 0;
  skippedCount = 0;
  seenKeys = {};
  MAX_DEPTH = 25;
  function getNodeKey(node) {
    var nodeId;
    var nodeText;
    var nodeDesc;
    var nodeClass;
    var nodeBounds;
    var key;
    nodeId = node.id() || "";
    nodeText = node.text() || "";
    nodeDesc = node.desc() || "";
    nodeClass = node.className() || "";
    nodeBounds = node.bounds();
    key = "".concat(nodeId, "|").concat(nodeText, "|").concat(nodeDesc, "|").concat(nodeClass, "|");
    if (nodeBounds) {
      key += nodeBounds.left + "," + nodeBounds.top + "," + nodeBounds.right + "," + nodeBounds.bottom;
    }
    if (node.clickable()) key += "|C";
    if (node.editable()) key += "|E";
    if (node.scrollable()) key += "|S";
    if (node.checkable()) key += "|K";
    return key;
  }
  function getIndent(depth) {
    var s = "";
    var k;
    for (k = 0; k < depth; k++) {
      s += "  ";
    }
    return s;
  }
  function dumpNode(node, depth) {
    var indent;
    var parts;
    var nodeId;
    var nodeText;
    var nodeDesc;
    var nodeClass;
    var nodeBounds;
    var childCount;
    var childNode;
    var key;
    var prevChildKey;
    var childKey;
    var consecutiveDups;
    if (!node) {
      return;
    }
    if (depth > MAX_DEPTH) {
      log("".concat(getIndent(depth), "[MAX DEPTH ").concat(MAX_DEPTH, " reached]"));
      return;
    }
    nodeCount++;
    key = getNodeKey(node);
    if (seenKeys[key]) {
      seenKeys[key]++;
      skippedCount++;
      return;
    }
    seenKeys[key] = 1;
    uniqueCount++;
    indent = getIndent(depth);
    parts = [];
    parts.push("".concat(indent, "[U").concat(uniqueCount, "]"));
    nodeId = node.id();
    if (nodeId) {
      parts.push(" id=\"".concat(nodeId, "\""));
    }
    nodeText = node.text();
    if (nodeText) {
      parts.push(" text=\"".concat(nodeText, "\""));
    }
    nodeDesc = node.desc();
    if (nodeDesc) {
      parts.push(" desc=\"".concat(nodeDesc, "\""));
    }
    nodeClass = node.className();
    if (nodeClass) {
      parts.push(" class=\"".concat(nodeClass, "\""));
    }
    nodeBounds = node.bounds();
    if (nodeBounds) {
      parts.push(" bounds=[".concat(nodeBounds.left, ",").concat(nodeBounds.top, ",").concat(nodeBounds.right, ",").concat(nodeBounds.bottom, "]"));
    }
    if (node.clickable()) {
      parts.push(" CLICKABLE");
    }
    if (node.editable()) {
      parts.push(" EDITABLE");
    }
    if (node.scrollable()) {
      parts.push(" SCROLLABLE");
    }
    if (node.checkable()) {
      parts.push(" CHECKABLE");
    }
    log(parts.join(""));
    childCount = node.childCount();
    prevChildKey = "";
    consecutiveDups = 0;
    for (c = 0; c < childCount; c++) {
      childNode = node.child(c);
      if (childNode) {
        childKey = getNodeKey(childNode);
        if (childKey === prevChildKey) {
          consecutiveDups++;
          continue;
        }
        if (consecutiveDups > 0) {
          log("".concat(getIndent(depth + 1), "[... ").concat(consecutiveDups, " duplicate siblings skipped]"));
          consecutiveDups = 0;
        }
        prevChildKey = childKey;
        dumpNode(childNode, depth + 1);
      }
    }
    if (consecutiveDups > 0) {
      log("".concat(getIndent(depth + 1), "[... ").concat(consecutiveDups, " duplicate siblings skipped]"));
    }
  }
  dumpNode(root, 0);
  dupCount = 0;
  log("");
  log("=== Top Duplicate Elements (seen >5 times) ===");
  for (key in seenKeys) {
    if (seenKeys[key] > 5) {
      dupCount++;
      log("  ".concat(seenKeys[key], "x: ").concat(key));
    }
  }
  if (dupCount === 0) {
    log("  (none)");
  }
  log("");
  log("=== Discovery Complete ===");
  log("Total nodes traversed: ".concat(nodeCount));
  log("Unique elements: ".concat(uniqueCount));
  log("Skipped (global dup): ".concat(skippedCount));
  log("Package: ".concat(root.packageName()));
  try {
    dir = new java.io.File("/sdcard/contributor-ai");
    if (!dir.exists()) {
      dir.mkdirs();
    }
    file = new java.io.File("/sdcard/contributor-ai/ui-discovery-log.txt");
    writer = new java.io.BufferedWriter(new java.io.FileWriter(file, true));
    writer.write("\n\n=== ".concat(new Date().toISOString(), " ===\n"));
    for (i = 0; i < logLines.length; i++) {
      writer.write("".concat(logLines[i], "\n"));
    }
    writer.close();
    log("[INFO] Log also saved to /sdcard/contributor-ai/ui-discovery-log.txt");
  } catch (fileErr) {
    log("[WARN] Could not save to file: ".concat(fileErr.message));
  }
  toast("Discovery v2: ".concat(uniqueCount, " unique / ").concat(nodeCount, " total"));
}
main();
