/* Contributor AI — UI Discovery Tool for AutoJs6. */
function main() {
  var i;
  var logLines = [];
  var root;
  var nodeCount;
  var uniqueCount;
  var skippedCount;
  var dir;
  var file;
  var writer;
  var MAX_DEPTH;
  var MAX_SIBLINGS;
  function log(msg) {
    console.warn(msg);
    logLines.push(msg);
  }
  auto.waitFor();
  log("=== UI Discovery Tool v3 (Sibling Dedup) ===");
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
  MAX_DEPTH = 30;
  MAX_SIBLINGS = 50;
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
      key += "".concat(nodeBounds.left, ",").concat(nodeBounds.top, ",").concat(nodeBounds.right, ",").concat(nodeBounds.bottom);
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
    for (k = 0; k < depth && k < 15; k++) {
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
    var prevChildKey;
    var childKey;
    var consecutiveDups;
    var processed;
    if (!node) {
      return;
    }
    if (depth > MAX_DEPTH) {
      return;
    }
    nodeCount++;
    uniqueCount++;
    indent = getIndent(depth);
    parts = [];
    parts.push("".concat(indent, "[").concat(uniqueCount, "]"));
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
    childCount = node.childCount();
    if (childCount > 0) {
      parts.push(" children=".concat(childCount));
    }
    log(parts.join(""));
    if (childCount === 0) {
      return;
    }
    prevChildKey = "";
    consecutiveDups = 0;
    processed = 0;
    for (i = 0; i < childCount && processed < MAX_SIBLINGS; i++) {
      childNode = node.child(i);
      if (!childNode) {
        continue;
      }
      childKey = getNodeKey(childNode);
      if (childKey === prevChildKey) {
        consecutiveDups++;
        skippedCount++;
        continue;
      }
      if (consecutiveDups > 0) {
        log("".concat(getIndent(depth + 1), "[... ").concat(consecutiveDups, " duplicate siblings skipped]"));
        consecutiveDups = 0;
      }
      prevChildKey = childKey;
      processed++;
      dumpNode(childNode, depth + 1);
    }
    if (consecutiveDups > 0) {
      log("".concat(getIndent(depth + 1), "[... ").concat(consecutiveDups, " duplicate siblings skipped]"));
    }
    if (i < childCount) {
      log("".concat(getIndent(depth + 1), "[... ").concat(childCount - i, " more siblings not processed (limit ").concat(MAX_SIBLINGS, ")]"));
    }
  }
  dumpNode(root, 0);
  log("");
  log("=== Discovery Complete ===");
  log("Total nodes traversed: ".concat(nodeCount));
  log("Unique elements logged: ".concat(uniqueCount));
  log("Skipped (sibling dup): ".concat(skippedCount));
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
  toast("Discovery v3: ".concat(uniqueCount, " unique / ").concat(skippedCount, " skipped"));
}
main();
