# D24 空檔案裝置驗證程序

## 適用環境

- **裝置：** Vivo X Fold5
- **Android 版本：** 16
- **AutoJs6 版本：** v6.7.0 `arm64-v8a`
- **Authoritative SHA：** `e0c6cd7`（或更新）

## 前置作業

1. 確認 AutoJs6 已安裝並授予必要權限
2. 從 GitHub 拉取最新 `main` 分支
3. 準備一個 0-byte 檔案（空檔案）存放於裝置可存取位置

## 執行步驟

1. **啟動 AutoJs6**
2. **載入腳本：** `scripts/autojs6/d24-empty-image-device-check.js`
3. **執行腳本**
4. **閱讀_instruction dialog：**
   - 標題：「D24 空檔案裝置驗證」
   - 內容：「請在 Android 系統選圖器中選擇私下對應 EMPTY_CONTROLLED 的 0-byte 檔案（若選圖器允許）。此 evidence-only 案例預期 production reader 回傳 EMPTY_IMAGE 錯誤碼，並輸出 sanitized metadata。若選圖器不允許選擇空檔案，此案例保留為 controlled-fake offline contract。」
5. **點擊「關閉」**
6. **系統選圖器開啟後：**
   - 嘗試選擇一個 0-byte 檔案
   - **若選圖器不允許選擇空檔案：** 記錄此觀察，D24 成為 controlled-fake offline contract
   - **若選圖器允許選擇空檔案：** 選擇該檔案
7. **記錄 console 輸出的 JSON**

## 預期結果

### 情況 A：選圖器允許選擇空檔案

```json
{
  "testCaseId": "D24_EMPTY_IMAGE",
  "status": "FAIL",
  "errorCode": "EMPTY_IMAGE",
  "uiResponsive": true
}
```

注意：`status: "FAIL"` 是預期的，因為這是一個錯誤案例驗證。關鍵是 `errorCode` 必須是 `EMPTY_IMAGE`。

### 情況 B：選圖器不允許選擇空檔案

記錄觀察：「Android 系統選圖器不允許選擇 0-byte 檔案」。D24 成為 controlled-fake offline contract，offline tests 已證明契約。

## 證據記錄

將執行結果記錄於：
`docs/testing/device-validation/d24-vivo-x-fold5-autojs6-v6.7.0.md`

## 注意事項

- 此案例驗證錯誤處理路徑，`status: "FAIL"` 是預期結果
- 關鍵驗證點是 `errorCode === "EMPTY_IMAGE"`
- 若選圖器不允許選擇空檔案，不要強行創建或修改系統行為
