/* Contributor AI — UI Discovery Tool for AutoJs6. */
function main() {
  var i;
  var c;
  var logLines = [];
  var root;
  var nodeCount;
  var dir;
  var file;
  var writer;
  function log(msg) {
    console.warn(msg);
    logLines.push(msg);
  }
  auto.waitFor();
  log("=== UI Discovery Tool ===");
  log("Time: ".concat(new Date().toISOString()));
  log("Please navigate to the target screen in the Contributor app.");
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
    if (!node) {
      return;
    }
    nodeCount++;
    indent = getIndent(depth);
    parts = [];
    parts.push("".concat(indent, "[#").concat(nodeCount, "]"));
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
    for (c = 0; c < childCount; c++) {
      childNode = node.child(c);
      if (childNode) {
        dumpNode(childNode, depth + 1);
      }
    }
  }
  dumpNode(root, 0);
  log("");
  log("=== Discovery Complete ===");
  log("Total nodes: ".concat(nodeCount));
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
  toast("UI Discovery: ".concat(nodeCount, " elements found. Check log."));
}
main();
