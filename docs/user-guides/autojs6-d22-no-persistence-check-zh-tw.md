# D22 無影像持久化裝置驗證程序

## 適用環境

- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** 請於 preflight 時確認 live `main` SHA

## 前置作業

1. 從 GitHub repository 下載最新 generated bundle：
   `scripts/autojs6/d22-no-persistence-device-check.js`
2. 確認檔案 SHA 與 live `main` 一致
3. 準備 privately mapped `JPEG_REPEAT_VALID` fixture（6,406 bytes JPEG）

## 執行步驟

1. 在 AutoJs6 中載入 `d22-no-persistence-device-check.js`
2. 執行腳本
3. 閱讀彈出的指示對話框
4. 在系統選圖器中選擇 `JPEG_REPEAT_VALID`（6,406 bytes JPEG）
5. 等待腳本完成成功與失敗兩種路徑的檢查
6. 記錄 console 輸出的 sanitized JSON

## 預期輸出

### PASS 結果

```json
{
  "testCaseId": "D22_NO_PERSISTENCE",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true,
  "successOutputClean": true,
  "failureOutputClean": true
}
```

### FAIL 結果（PERSISTENCE_VIOLATION）

```json
{
  "testCaseId": "D22_NO_PERSISTENCE",
  "status": "FAIL",
  "failureReason": "PERSISTENCE_VIOLATION",
  "successOutputClean": false,
  "failureOutputClean": true,
  "uiResponsive": true
}
```

## 驗證重點

- `successOutputClean: true` — 成功路徑輸出中無 Base64、bytes 或 URI
- `failureOutputClean: true` — 失敗路徑輸出中無 Base64、bytes 或 URI
- 輸出只包含 sanitized metadata（testCaseId、status、mimeType、sizeBytes、uiResponsive）

## 範圍限制

- 此案例只檢查 console/log 輸出，不證明 filesystem-level persistence
- 使用 pattern-matching 檢查輸出字串，不透過 binary inspection 證明 absence
- 不證明 D23 的敏感 logging guarantees（超出 Base64/bytes/URIs 範圍）

## 完成後

1. 將 sanitized JSON 結果提供給專案維護者
2. 維護者將建立 evidence file 並更新治理文件
3. **不要**保留任何包含 `sourceUri` 或 `imageBase64` 的輸出
