# AutoJs6 D20 重複讀取記憶體行為裝置驗證

## 目的

D20 要在 10 次重複讀取期間監控粗粒度 heap 記憶體行為，確認無不安全持續
成長。腳本在讀取前、每次讀取後、以及穩定化間隔後記錄 `Runtime.getRuntime()`
的 heap 使用量，並計算記憶體成長量。

本文件只準備後續、另行治理的使用者輔助裝置執行。

## 已審閱設定

- Case ID：`D20_MEMORY_BEHAVIOR`
- Fixture ID：`JPEG_REPEAT_VALID`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`
- Iterations：10 次完整 production-path 讀取
- Stabilization interval：500ms
- Grant：一次系統選圖器選取所取得的 fresh temporary grant
- Reselection：禁止

## 記憶體指標

- `memoryBefore`：任何讀取前的 heap 使用量（bytes）
- `memoryAfterEach`：每次讀取後的 heap 使用量陣列（10 個值）
- `memoryAfterStabilization`：500ms 穩定化間隔後的 heap 使用量
- `peakMemory`：測試期間觀察到的最大 heap 使用量
- `memoryGrowth`：`memoryAfterStabilization - memoryBefore`

## 裝置執行步驟

1. 在 AutoJs6 v6.7.0 中載入
   `scripts/autojs6/d20-memory-behavior-device-check.js`
2. 執行腳本
3. 閱讀指示對話框，點擊「確定」
4. 在系統選圖器中選擇 `JPEG_REPEAT_VALID`（6,406 bytes JPEG）
5. 等待腳本完成 10 次讀取 + 500ms 穩定化間隔
6. 記錄 console 輸出的 sanitized JSON

## 預期結果

### PASS shape

```json
{
  "testCaseId": "D20_MEMORY_BEHAVIOR",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "allMetadataEqual": true,
  "memoryBefore": 12345678,
  "memoryAfterEach": [12346000, 12346100, ...],
  "memoryAfterStabilization": 12346500,
  "peakMemory": 12347000,
  "memoryGrowth": 722,
  "uiResponsive": true
}
```

### FAIL shapes

- **PUBLIC_ERROR**：任何迭代失敗，附帶 public error code
- **METADATA_MISMATCH**：迭代間 metadata 不一致
- **UI_NOT_RESPONSIVE**：UI 在執行期間無回應

## 範圍限制

- D20 使用粗粒度 heap 指標（`Runtime.getRuntime()`）；不證明 native memory、
  GC 行為、或記憶體 profiling
- D20 不證明 D21 UI-blocking 行為
- D20 不證明 D22/D23 persistence 或 logging guarantees
- 此為 scoped device observation，僅適用於記錄的裝置、runtime、SHA、
  fixture、byte count、memory metrics、和 UI-responsiveness 結果
