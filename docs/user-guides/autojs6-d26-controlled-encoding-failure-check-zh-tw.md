# D26 受控編碼失敗裝置驗證程序

## 目的

驗證當有效讀取後注入受控編碼失敗時，portable core 回傳穩定的公開錯誤碼 `ENCODING_FAILED`，並輸出 frozen、sanitized 的失敗記錄。

## 前置條件

1. Vivo X Fold5 裝置
2. AutoJs6 v6.7.0 `arm64-v8a`
3. GitHub `main` 分支最新程式碼

## 執行步驟

### 1. 準備 AutoJs6

1. **強制停止 AutoJs6**
2. **清除 AutoJs6 快取**
3. **重新啟動 AutoJs6**

### 2. 取得最新程式碼

從 GitHub 拉取最新 `main` 分支：

```bash
git pull origin main
```

確認 SHA 與預期相符。

### 3. 載入 D26 驗證腳本

在 AutoJs6 中載入：

```
scripts/autojs6/d26-controlled-encoding-failure-device-check.js
```

### 4. 執行驗證

1. 點擊執行按鈕
2. 閱讀彈出的指示對話框
3. 點擊「關閉」
4. 腳本會自動模擬有效讀取後的編碼失敗

### 5. 記錄結果

Console 會輸出 sanitized JSON 記錄。記錄以下內容：

```json
{
  "testCaseId": "D26_CONTROLLED_ENCODING_FAILURE",
  "status": "FAIL",
  "errorCode": "ENCODING_FAILED",
  "uiResponsive": true
}
```

**預期結果：**

- `errorCode: "ENCODING_FAILED"` ✓
- `uiResponsive: true` ✓

## 注意事項

1. **隱私保護：** 只記錄 sanitized JSON 輸出，不記錄任何 `content://` URIs、檔案路徑、或檔案內容
2. **Controlled-fake 測試：** D26 是 controlled-fake 測試，不依賴選圖器行為
3. **Offline 證明：** Offline tests（5/5 pass）已通過 controlled-fake 注入證明 `ENCODING_FAILED` 契約

## 故障排除

### 問題：執行後畫面空白

**原因：** 可能是 bundle 解析錯誤或相容性問題

**解決方案：**

1. 強制停止 AutoJs6
2. 清除快取
3. 重新啟動
4. 重新執行

## 參考文件

- [D26 evidence-gap review](../testing/d26-controlled-encoding-failure-evidence-gap-review.md)
- [D26 offline tests](../../tests/autojs6-d26-controlled-encoding-failure.test.js)
- [Verification plan](../testing/autojs6-image-reader-device-verification-v1.md)
