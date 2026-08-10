/* Contributor AI — UI Discovery Tool for AutoJs6. */
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
    log("[ERROR] Cannot get root window.");
    toast("UI Discovery failed");
    return;
  }
  log("[INFO] Root window found. Package: ".concat(root.packageName()));
  log("");
  log("=== Test 1: find() all nodes ===");
  try {
    allNodes = find();
    nodeCount = allNodes ? allNodes.length : 0;
    log("find() returned ".concat(nodeCount, " nodes"));
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
          log("  text: \"".concat(nodeText, "\" class=").concat(nodeClass, " bounds=[").concat(nodeBounds.left, ",").concat(nodeBounds.top, ",").concat(nodeBounds.right, ",").concat(nodeBounds.bottom, "]"));
        }
        if (nodeDesc && !seenDescs[nodeDesc]) {
          seenDescs[nodeDesc] = true;
          log("  desc: \"".concat(nodeDesc, "\" class=").concat(nodeClass));
        }
        if (nodeId && !seenIds[nodeId]) {
          seenIds[nodeId] = true;
          log("  id: \"".concat(nodeId, "\" class=").concat(nodeClass));
        }
        if (node.editable()) {
          editables.push({
            text: nodeText || "",
            desc: nodeDesc || "",
            id: nodeId || "",
            cls: nodeClass || "",
            bounds: nodeBounds ? "[".concat(nodeBounds.left, ",").concat(nodeBounds.top, ",").concat(nodeBounds.right, ",").concat(nodeBounds.bottom, "]") : "null"
          });
        }
        if (node.clickable() && nodeText) {
          clickables.push("\"".concat(nodeText, "\" ").concat(nodeClass));
        }
      }
    }
    log("");
    log("=== Editable elements: ".concat(editables.length, " ==="));
    for (i = 0; i < editables.length; i++) {
      log("  [".concat(i, "] text=\"").concat(editables[i].text, "\" desc=\"").concat(editables[i].desc, "\" id=\"").concat(editables[i].id, "\" class=").concat(editables[i].cls, " bounds=").concat(editables[i].bounds));
    }
    log("");
    log("=== Clickable elements with text: ".concat(clickables.length, " ==="));
    for (i = 0; i < clickables.length; i++) {
      log("  [".concat(i, "] ").concat(clickables[i]));
    }
  } catch (testErr) {
    log("[ERROR] Test 1 failed: ".concat(testErr.message));
  }
  log("");
  log("=== Test 2: Text search ===");
  try {
    searchTerms = ["說明", "说明", "Description", "description", "關鍵字", "关键字", "Keyword", "keyword", "分類", "分类", "Category", "category", "第 1 類", "第1类", "第 2 類", "第2类", "圖片類型", "图片类型", "照片", "插圖", "插图", "用途", "商業", "商业", "刊物", "提交", "Submit", "submit", "儲存", "储存", "Save", "新增關鍵字", "新增", "完成", "Done", "done", "0/7"];
    for (i = 0; i < searchTerms.length; i++) {
      term = searchTerms[i];
      found = text(term).findOnce();
      if (found) {
        fb = found.bounds();
        log("  FOUND text(\"".concat(term, "\"): class=").concat(found.className(), " bounds=[").concat(fb.left, ",").concat(fb.top, ",").concat(fb.right, ",").concat(fb.bottom, "] editable=").concat(found.editable(), " clickable=").concat(found.clickable()));
      }
      foundDesc = desc(term).findOnce();
      if (foundDesc) {
        fd = foundDesc.bounds();
        log("  FOUND desc(\"".concat(term, "\"): class=").concat(foundDesc.className(), " bounds=[").concat(fd.left, ",").concat(fd.top, ",").concat(fd.right, ",").concat(fd.bottom, "] editable=").concat(foundDesc.editable(), " clickable=").concat(foundDesc.clickable()));
      }
    }
  } catch (testErr2) {
    log("[ERROR] Test 2 failed: ".concat(testErr2.message));
  }
  log("");
  log("=== Test 3: EditText/TextInput search ===");
  try {
    editTexts = className("android.widget.EditText").find();
    log("EditText count: ".concat(editTexts ? editTexts.length : 0));
    if (editTexts) {
      for (i = 0; i < editTexts.length; i++) {
        et = editTexts[i];
        etb = et.bounds();
        log("  EditText[".concat(i, "]: text=\"").concat(et.text(), "\" hint=\"").concat(et.hint ? et.hint() : "N/A", "\" bounds=[").concat(etb.left, ",").concat(etb.top, ",").concat(etb.right, ",").concat(etb.bottom, "]"));
      }
    }
    textInputs = className("androidx.compose.ui.platform.AndroidComposeTextInputAccessibilityHelper").find();
    log("Compose TextInput count: ".concat(textInputs ? textInputs.length : 0));
  } catch (testErr3) {
    log("[ERROR] Test 3 failed: ".concat(testErr3.message));
  }
  log("");
  log("=== Test 4: Button search ===");
  try {
    buttons = className("android.widget.Button").find();
    log("Button count: ".concat(buttons ? buttons.length : 0));
    if (buttons) {
      for (i = 0; i < buttons.length; i++) {
        btn = buttons[i];
        bb = btn.bounds();
        log("  Button[".concat(i, "]: text=\"").concat(btn.text(), "\" desc=\"").concat(btn.desc(), "\" bounds=[").concat(bb.left, ",").concat(bb.top, ",").concat(bb.right, ",").concat(bb.bottom, "]"));
      }
    }
  } catch (testErr4) {
    log("[ERROR] Test 4 failed: ".concat(testErr4.message));
  }
  log("");
  log("=== Test 5: TextView search ===");
  try {
    textViews = className("android.widget.TextView").find();
    tvCount = textViews ? textViews.length : 0;
    log("TextView count: ".concat(tvCount));
    uniqueTVs = {};
    if (textViews) {
      for (i = 0; i < textViews.length; i++) {
        tv = textViews[i];
        tvText = tv.text();
        if (tvText && !uniqueTVs[tvText]) {
          uniqueTVs[tvText] = true;
          tvb = tv.bounds();
          log("  TV: text=\"".concat(tvText, "\" bounds=[").concat(tvb.left, ",").concat(tvb.top, ",").concat(tvb.right, ",").concat(tvb.bottom, "]"));
        }
      }
    }
  } catch (testErr5) {
    log("[ERROR] Test 5 failed: ".concat(testErr5.message));
  }
  log("");
  log("=== Discovery Complete ===");
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
  toast("Discovery v4 complete. Check log.");
}
main();
