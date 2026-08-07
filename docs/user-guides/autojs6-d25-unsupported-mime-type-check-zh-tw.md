# D25 不支援的 MIME 類型裝置驗證程序

## 目的

驗證 production reader 遇到非圖片來源（例如文字檔、PDF 或其他不支援的 MIME 類型）時，portable core 回傳穩定的公開錯誤碼 `UNSUPPORTED_MIME_TYPE`，並輸出 frozen、sanitized 的失敗記錄。

## 前置條件

1. Vivo X Fold5 裝置
2. AutoJs6 v6.7.0 `arm64-v8a`
3. GitHub `main` 分支最新程式碼
4. 準備一個非圖片檔案（例如 `.txt` 文字檔）

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

### 3. 載入 D25 驗證腳本

在 AutoJs6 中載入：

```
scripts/autojs6/d25-unsupported-mime-type-device-check.js
```

### 4. 執行驗證

1. 點擊執行按鈕
2. 閱讀彈出的指示對話框
3. 點擊「關閉」
4. 系統選圖器會開啟

### 5. 選擇非圖片檔案

**重要：** 此步驟可能無法完成，因為 Android 系統選圖器使用 `*/*` MIME 篩選器時可能仍只顯示圖片檔案。

- **如果選圖器允許選擇非圖片檔案：** 選擇一個 `.txt` 文字檔
- **如果選圖器不允許：** 記錄此觀察，D25 成為 controlled-fake offline contract

### 6. 記錄結果

Console 會輸出 sanitized JSON 記錄。記錄以下內容：

```json
{
  "testCaseId": "D25_UNSUPPORTED_MIME_TYPE",
  "status": "FAIL",
  "errorCode": "UNSUPPORTED_MIME_TYPE",
  "uiResponsive": true
}
```

**預期結果（如果選圖器允許選擇非圖片檔案）：**
- `errorCode: "UNSUPPORTED_MIME_TYPE"` ✓
- `uiResponsive: true` ✓

**替代結果（如果選圖器拒絕非圖片檔案）：**
- 記錄觀察到的行為
- D25 成為 controlled-fake offline contract
- Offline tests 已證明 `UNSUPPORTED_MIME_TYPE` 契約

## 注意事項

1. **隱私保護：** 只記錄 sanitized JSON 輸出，不記錄任何 `content://` URIs、檔案路徑、或檔案內容
2. **平台行為：** 不同 Android 版本或 OEM 客製化可能有不同行為
3. **Offline 證明：** 即使裝置驗證無法完成，offline tests（5/5 pass）已通過 controlled-fake 注入證明 `UNSUPPORTED_MIME_TYPE` 契約

## 故障排除

### 問題：選圖器不顯示非圖片檔案

**原因：** Android 系統選圖器可能忽略 `*/*` MIME 篩選器，只顯示圖片檔案

**解決方案：**
- 記錄此觀察
- 依賴 offline tests 證明契約
- D25 成為 controlled-fake offline contract（類似 D12、D24）

### 問題：執行後畫面空白

**原因：** 可能是 bundle 解析錯誤或相容性問題

**解決方案：**
1. 強制停止 AutoJs6
2. 清除快取
3. 重新啟動
4. 重新執行

## 參考文件

- [D25 evidence-gap review](../testing/d25-unsupported-mime-type-evidence-gap-review.md)
- [D25 offline tests](../../tests/autojs6-d25-unsupported-mime-type.test.js)
- [Verification plan](../testing/autojs6-image-reader-device-verification-v1.md)
