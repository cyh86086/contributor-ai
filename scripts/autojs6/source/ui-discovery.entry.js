/**
 * Runtime designation: AutoJs6 on Android device.
 *
 * UI Discovery Tool v4 — selector-based search.
 * Uses AutoJs6 UiSelector API to search for elements by text, desc,
 * className, and clickable/editable properties. This may find elements
 * that the tree dump misses.
 *
 * Usage:
 * 1. Open the Contributor app to the target screen
 * 2. Run this script in AutoJs6
 * 3. Switch to Contributor app within 5 seconds
 * 4. Export the log and share it
 */

function main() {
  var i;
  var logLines = [];
  var root;
  var allNodes;
  var nodeCount;
  var dir;
  var file;
  var writer;
  var node;
  var nodeText;
  var nodeDesc;
  var nodeId;
  var nodeClass;
  var nodeBounds;
  var seenTexts;
  var seenDescs;
  var seenIds;
  var editables;
  var clickables;
  var searchTerms;
  var term;
  var found;
  var fb;
  var foundDesc;
  var fd;
  var editTexts;
  var et;
  var etb;
  var textInputs;
  var buttons;
  var btn;
  var bb;
  var textViews;
  var tvCount;
  var uniqueTVs;
  var tv;
  var tvText;
  var tvb;

  function log(msg) {
    console.warn(msg);
    logLines.push(msg);
  }

  auto.waitFor();

  log("=== UI Discovery Tool v4 (Selector Search) ===");
  log(`Time: ${new Date().toISOString()}`);

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
    log("[ERROR] Cannot get root window.");
    toast("UI Discovery failed");
    return;
  }

  log(`[INFO] Root window found. Package: ${root.packageName()}`);
  log("");

  // === Test 1: find() all nodes ===
  log("=== Test 1: find() all nodes ===");
  allNodes = find().find();
  nodeCount = allNodes ? allNodes.length : 0;
  log(`find() returned ${nodeCount} nodes`);

  // Log unique text/desc/id values from all found nodes
  seenTexts = {};
  seenDescs = {};
  seenIds = {};
  editables = [];
  clickables = [];

  if (allNodes) {
    for (i = 0; i < allNodes.length; i++) {
      node = allNodes[i];
      nodeText = node.text();
      nodeDesc = node.desc();
      nodeId = node.id();
      nodeClass = node.className();
      nodeBounds = node.bounds();

      if (nodeText && !seenTexts[nodeText]) {
        seenTexts[nodeText] = true;
        log(
          `  text: "${nodeText}" class=${nodeClass} bounds=[${nodeBounds.left},${nodeBounds.top},${nodeBounds.right},${nodeBounds.bottom}]`,
        );
      }
      if (nodeDesc && !seenDescs[nodeDesc]) {
        seenDescs[nodeDesc] = true;
        log(`  desc: "${nodeDesc}" class=${nodeClass}`);
      }
      if (nodeId && !seenIds[nodeId]) {
        seenIds[nodeId] = true;
        log(`  id: "${nodeId}" class=${nodeClass}`);
      }
      if (node.editable()) {
        editables.push({
          text: nodeText || "",
          desc: nodeDesc || "",
          id: nodeId || "",
          cls: nodeClass || "",
          bounds: nodeBounds
            ? `[${nodeBounds.left},${nodeBounds.top},${nodeBounds.right},${nodeBounds.bottom}]`
            : "null",
        });
      }
      if (node.clickable() && nodeText) {
        clickables.push(`"${nodeText}" ${nodeClass}`);
      }
    }
  }

  log("");
  log(`=== Editable elements: ${editables.length} ===`);
  for (i = 0; i < editables.length; i++) {
    log(
      `  [${i}] text="${editables[i].text}" desc="${editables[i].desc}" id="${editables[i].id}" class=${editables[i].cls} bounds=${editables[i].bounds}`,
    );
  }

  log("");
  log(`=== Clickable elements with text: ${clickables.length} ===`);
  for (i = 0; i < clickables.length; i++) {
    log(`  [${i}] ${clickables[i]}`);
  }

  // === Test 2: Search for specific Chinese text labels ===
  log("");
  log("=== Test 2: Text search ===");
  searchTerms = [
    "說明",
    "说明",
    "Description",
    "description",
    "關鍵字",
    "关键字",
    "Keyword",
    "keyword",
    "分類",
    "分类",
    "Category",
    "category",
    "第 1 類",
    "第1类",
    "第 2 類",
    "第2类",
    "圖片類型",
    "图片类型",
    "照片",
    "插圖",
    "插图",
    "用途",
    "商業",
    "商业",
    "刊物",
    "提交",
    "Submit",
    "submit",
    "儲存",
    "储存",
    "Save",
    "新增關鍵字",
    "新增",
    "完成",
    "Done",
    "done",
    "0/7",
  ];

  for (i = 0; i < searchTerms.length; i++) {
    term = searchTerms[i];
    found = text(term).findOnce();
    if (found) {
      fb = found.bounds();
      log(
        `  FOUND text("${term}"): class=${found.className()} bounds=[${fb.left},${fb.top},${fb.right},${fb.bottom}] editable=${found.editable()} clickable=${found.clickable()}`,
      );
    }
    foundDesc = desc(term).findOnce();
    if (foundDesc) {
      fd = foundDesc.bounds();
      log(
        `  FOUND desc("${term}"): class=${foundDesc.className()} bounds=[${fd.left},${fd.top},${fd.right},${fd.bottom}] editable=${foundDesc.editable()} clickable=${foundDesc.clickable()}`,
      );
    }
  }

  // === Test 3: Find all EditText elements ===
  log("");
  log("=== Test 3: EditText/TextInput search ===");
  editTexts = className("android.widget.EditText").find();
  log(`EditText count: ${editTexts ? editTexts.length : 0}`);
  if (editTexts) {
    for (i = 0; i < editTexts.length; i++) {
      et = editTexts[i];
      etb = et.bounds();
      log(
        `  EditText[${i}]: text="${et.text()}" hint="${et.hint ? et.hint() : "N/A"}" bounds=[${etb.left},${etb.top},${etb.right},${etb.bottom}]`,
      );
    }
  }

  textInputs = className(
    "androidx.compose.ui.platform.AndroidComposeTextInputAccessibilityHelper",
  ).find();
  log(`Compose TextInput count: ${textInputs ? textInputs.length : 0}`);

  // === Test 4: Find all Buttons ===
  log("");
  log("=== Test 4: Button search ===");
  buttons = className("android.widget.Button").find();
  log(`Button count: ${buttons ? buttons.length : 0}`);
  if (buttons) {
    for (i = 0; i < buttons.length; i++) {
      btn = buttons[i];
      bb = btn.bounds();
      log(
        `  Button[${i}]: text="${btn.text()}" desc="${btn.desc()}" bounds=[${bb.left},${bb.top},${bb.right},${bb.bottom}]`,
      );
    }
  }

  // === Test 5: Find all TextViews ===
  log("");
  log("=== Test 5: TextView search ===");
  textViews = className("android.widget.TextView").find();
  tvCount = textViews ? textViews.length : 0;
  log(`TextView count: ${tvCount}`);
  uniqueTVs = {};
  if (textViews) {
    for (i = 0; i < textViews.length; i++) {
      tv = textViews[i];
      tvText = tv.text();
      if (tvText && !uniqueTVs[tvText]) {
        uniqueTVs[tvText] = true;
        tvb = tv.bounds();
        log(
          `  TV: text="${tvText}" bounds=[${tvb.left},${tvb.top},${tvb.right},${tvb.bottom}]`,
        );
      }
    }
  }

  log("");
  log("=== Discovery Complete ===");
  log(`Package: ${root.packageName()}`);

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

  toast(`Discovery v4 complete. Check log.`);
}

main();
