/**
 * Runtime designation: AutoJs6 on Android device.
 *
 * UI Discovery Tool v2 — dumps unique UI elements on the current screen.
 * Deduplicates Compose rendering layers and limits tree depth.
 *
 * Usage:
 * 1. Open the Contributor app to the target screen
 * 2. Run this script in AutoJs6
 * 3. Switch to Contributor app within 5 seconds
 * 4. Export the log and share it for selector configuration
 */

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

  // Wait for accessibility service
  auto.waitFor();

  log("=== UI Discovery Tool v2 (Dedup) ===");
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

  // Deduplication setup
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
    key = `${nodeId}|${nodeText}|${nodeDesc}|${nodeClass}|`;
    if (nodeBounds) {
      key +=
        nodeBounds.left +
        "," +
        nodeBounds.top +
        "," +
        nodeBounds.right +
        "," +
        nodeBounds.bottom;
    }
    // Add interactive flags
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
      log(`${getIndent(depth)}[MAX DEPTH ${MAX_DEPTH} reached]`);
      return;
    }

    nodeCount++;
    key = getNodeKey(node);

    // Check if we've seen this exact node before (global dedup)
    if (seenKeys[key]) {
      seenKeys[key]++;
      skippedCount++;
      return;
    }
    seenKeys[key] = 1;
    uniqueCount++;

    indent = getIndent(depth);
    parts = [];
    parts.push(`${indent}[U${uniqueCount}]`);

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

    // Recurse into children with sibling dedup
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
          log(
            `${getIndent(depth + 1)}[... ${consecutiveDups} duplicate siblings skipped]`,
          );
          consecutiveDups = 0;
        }
        prevChildKey = childKey;
        dumpNode(childNode, depth + 1);
      }
    }
    if (consecutiveDups > 0) {
      log(
        `${getIndent(depth + 1)}[... ${consecutiveDups} duplicate siblings skipped]`,
      );
    }
  }

  dumpNode(root, 0);

  // Summary: show duplicate counts for frequently seen keys
  dupCount = 0;
  log("");
  log("=== Top Duplicate Elements (seen >5 times) ===");
  for (key in seenKeys) {
    if (seenKeys[key] > 5) {
      dupCount++;
      log(`  ${seenKeys[key]}x: ${key}`);
    }
  }
  if (dupCount === 0) {
    log("  (none)");
  }

  log("");
  log("=== Discovery Complete ===");
  log(`Total nodes traversed: ${nodeCount}`);
  log(`Unique elements: ${uniqueCount}`);
  log(`Skipped (global dup): ${skippedCount}`);
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

  toast(`Discovery v2: ${uniqueCount} unique / ${nodeCount} total`);
}

main();
