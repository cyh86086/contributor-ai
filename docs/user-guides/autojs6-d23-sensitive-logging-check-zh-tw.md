# D23 無敏感日誌裝置驗證程序

## 適用環境

- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** 請於 preflight 時確認 live `main` SHA

## 前置作業

1. 從 GitHub repository 下載最新 generated bundle：
   `scripts/autojs6/d23-sensitive-logging-device-check.js`
2. 確認檔案 SHA 與 live `main` 一致
3. 準備 privately mapped `JPEG_REPEAT_VALID` fixture（6,406 bytes JPEG）

## 執行步驟

1. 在 AutoJs6 中載入 `d23-sensitive-logging-device-check.js`
2. 執行腳本
3. 閱讀彈出的指示對話框
4. 在系統選圖器中選擇 `JPEG_REPEAT_VALID`（6,406 bytes JPEG）
5. 等待腳本完成成功與失敗兩種路徑的檢查
6. 記錄 console 輸出的 sanitized JSON

## 預期輸出

### PASS 結果

```json
{
  "testCaseId": "D23_SENSITIVE_LOGGING",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true,
  "successLogsClean": true,
  "failureLogsClean": true
}
```

### FAIL 結果（SENSITIVE_LOG_VIOLATION）

```json
{
  "testCaseId": "D23_SENSITIVE_LOGGING",
  "status": "FAIL",
  "failureReason": "SENSITIVE_LOG_VIOLATION",
  "successLogsClean": false,
  "failureLogsClean": true,
  "uiResponsive": true
}
```

## 驗證重點

- `successLogsClean: true` — 成功路徑日誌中無敏感資料
- `failureLogsClean: true` — 失敗路徑日誌中無敏感資料
- 日誌不包含：檔案路徑、content URIs、Base64、byte arrays、exception stack traces、sourceUri、imageBase64

## 範圍限制

- 此案例只檢查腳本執行期間的 console 輸出，不檢查 Android logcat 或遠端日誌服務
- 使用 pattern-matching 檢查日誌字串，不透過 binary inspection 證明 absence
- 不涵蓋未來 provider adapter 或 Contributor app 整合的日誌行為

## 完成後

1. 將 sanitized JSON 結果提供給專案維護者
2. 維護者將建立 evidence file 並更新治理文件
3. **不要**保留任何包含敏感資料的日誌輸出
