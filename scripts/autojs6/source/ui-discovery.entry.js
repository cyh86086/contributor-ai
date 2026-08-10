/**
 * Runtime designation: AutoJs6 on Android device.
 *
 * UI Discovery Tool — dumps all UI elements on the current screen.
 * Run this script on each screen of the Contributor app to discover
 * the actual resource IDs, text labels, and class names needed for
 * UI automation selectors.
 *
 * Usage:
 * 1. Open the Contributor app to the target screen
 * 2. Run this script in AutoJs6
 * 3. Export the log and share it for selector configuration
 */

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

  // Wait for accessibility service
  auto.waitFor();

  log("=== UI Discovery Tool ===");
  log(`Time: ${new Date().toISOString()}`);

  // Countdown: give user time to switch to the Contributor app
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

  // Get the root UI node
  root = auto.rootInActiveWindow;
  if (!root) {
    log(
      "[ERROR] Cannot get root window. Is the accessibility service enabled?",
    );
    toast("UI Discovery failed - no root window");
    return;
  }

  log(`[INFO] Root window found. Package: ${root.packageName()}`);
  log("");

  // Recursive UI tree dump
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
    parts.push(`${indent}[#${nodeCount}]`);

    nodeId = node.id();
    if (nodeId) {
      parts.push(` id="${nodeId}"`);
    }

    nodeText = node.text();
    if (nodeText) {
      parts.push(` text="${nodeText}"`);
    }

    nodeDesc = node.desc();
    if (nodeDesc) {
      parts.push(` desc="${nodeDesc}"`);
    }

    nodeClass = node.className();
    if (nodeClass) {
      parts.push(` class="${nodeClass}"`);
    }

    nodeBounds = node.bounds();
    if (nodeBounds) {
      parts.push(
        ` bounds=[${nodeBounds.left},${nodeBounds.top},${nodeBounds.right},${nodeBounds.bottom}]`,
      );
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

    // Recurse into children
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
  log(`Total nodes: ${nodeCount}`);
  log(`Package: ${root.packageName()}`);

  // Try to write log to file
  try {
    dir = new java.io.File("/sdcard/contributor-ai");
    if (!dir.exists()) {
      dir.mkdirs();
    }
    file = new java.io.File("/sdcard/contributor-ai/ui-discovery-log.txt");
    writer = new java.io.BufferedWriter(new java.io.FileWriter(file, true));
    writer.write(`\n\n=== ${new Date().toISOString()} ===\n`);
    for (i = 0; i < logLines.length; i++) {
      writer.write(`${logLines[i]}\n`);
    }
    writer.close();
    log("[INFO] Log also saved to /sdcard/contributor-ai/ui-discovery-log.txt");
  } catch (fileErr) {
    log(`[WARN] Could not save to file: ${fileErr.message}`);
  }

  toast(`UI Discovery: ${nodeCount} elements found. Check log.`);
}

main();
