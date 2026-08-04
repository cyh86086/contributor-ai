/**
 * AutoJs6 遠端腳本下載器
 *
 * 用法：修改下方 CONFIG 區塊的 url 和 fileName，然後執行此腳本。
 * 腳本會從 GitHub raw URL 下載檔案並儲存到 /sdcard/Scripts/ 目錄。
 *
 * 首次使用：
 * 1. 在 AutoJs6 中新建一個腳本
 * 2. 複製此檔案的完整內容貼上
 * 3. 每次只需修改 url 和 fileName 即可下載不同腳本
 */

"ui";

// ===== CONFIG（每次只需改這裡）=====
var url =
  "https://raw.githubusercontent.com/cyh86086/contributor-ai/main/scripts/autojs6/d19-cleanup-after-failure-device-check.js";
var fileName = "d19-cleanup-after-failure-device-check.js";
// ==================================

var saveDir = "/sdcard/Scripts/";
var savePath = saveDir + fileName;

// 確保目錄存在
if (!files.exists(saveDir)) {
  files.createWithDirs(saveDir);
}

ui.layout(
  vertical([
    text("AutoJs6 遠端下載器")
      .textSize(20)
      .gravity("center")
      .padding(16),
    text("下載 URL：").padding(16, 4, 16, 0),
    input({ id: "urlInput", text: url, inputType: "textUri" }).padding(
      16,
      4,
      16,
      4,
    ),
    text("檔名：").padding(16, 4, 16, 0),
    input({ id: "nameInput", text: fileName }).padding(16, 4, 16, 4),
    text("儲存路徑：" + saveDir).padding(16, 4, 16, 4).textColor("#666"),
    horizontal([
      button("下載").id("downloadBtn").layout_weight(1).onClick(doDownload),
      button("執行").id("runBtn").layout_weight(1).onClick(doRun),
    ]).padding(16),
    text("").id("statusText").padding(16, 4, 16, 16).textSize(14),
  ]),
);

function doDownload() {
  var targetUrl = ui.urlInput.getText().toString().trim();
  var targetName = ui.nameInput.getText().toString().trim();
  var targetPath = saveDir + targetName;

  if (!targetUrl) {
    toast("請輸入 URL");
    return;
  }
  if (!targetName) {
    toast("請輸入檔名");
    return;
  }

  ui.statusText.setText("下載中...");
  ui.statusText.textColor("#1976D2");

  threads.start(function () {
    try {
      var res = http.get(targetUrl);
      if (res.statusCode === 200) {
        var content = res.body.string();
        files.write(targetPath, content);
        ui.run(function () {
          ui.statusText.setText("下載完成！\n" + targetPath);
          ui.statusText.textColor("#4CAF50");
        });
        toast("下載完成");
      } else {
        ui.run(function () {
          ui.statusText.setText(
            "下載失敗：HTTP " + res.statusCode,
          );
          ui.statusText.textColor("#F44336");
        });
      }
    } catch (e) {
      ui.run(function () {
        ui.statusText.setText("下載錯誤：" + e.message);
        ui.statusText.textColor("#F44336");
      });
    }
  });
}

function doRun() {
  var targetName = ui.nameInput.getText().toString().trim();
  var targetPath = saveDir + targetName;

  if (!files.exists(targetPath)) {
    toast("檔案不存在，請先下載");
    return;
  }

  toast("執行中...");
  engines.execScriptFile(targetPath);
}
