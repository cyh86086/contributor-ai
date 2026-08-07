# D25 Unsupported MIME type — evidence gap review

## Purpose

D25 verifies that when the production reader encounters a non-image source
(e.g., a text file, PDF, or other unsupported MIME type), the portable core
returns the stable public error code `UNSUPPORTED_MIME_TYPE` with a frozen,
sanitized failure record.

## Contract

**Inputs:**

- A `content://` URI pointing to a non-image file (e.g., `.txt`, `.pdf`)
- Standard reader parameters (`maxSizeBytes`, `readerSafetyLimitBytes`, etc.)

**Expected output:**

```json
{
  "status": "FAIL",
  "errorCode": "UNSUPPORTED_MIME_TYPE",
  "uiResponsive": true
}
```

**Invariants:**

- The failure record is frozen (`Object.freeze`)
- No image bytes, Base64, or source URIs are exposed in the output
- The UI remains responsive throughout execution
- The error code is stable and public (from `IMAGE_INPUT_ERROR_CODES`)

## Feasibility

**Android system picker behavior:**

- The system picker with `image/*` MIME filter typically only shows image files
- Selecting a non-image file may not be possible through the standard picker
- If the picker rejects non-image files, D25 becomes a controlled-fake offline
  contract (similar to D12, D24)

**Offline proof strategy:**

- Use controlled-fake injection to simulate a non-image source
- Inject a mock `contentResolver` that returns a non-image MIME type
- Verify the portable core returns `UNSUPPORTED_MIME_TYPE`

**Device validation:**

- Attempt to select a non-image file from the system picker
- If the picker allows it, record the actual result
- If the picker rejects it, document the observation and rely on offline proof

## Risks

1. **Picker restriction:** The Android system picker with `image/*` filter may
   not allow selecting non-image files, making device validation impossible.
   Mitigation: Controlled-fake offline contract.

2. **MIME detection:** The production reader may detect MIME type from file
   content rather than extension, potentially misclassifying some files.
   Mitigation: Use clearly non-image files (e.g., plain text).

3. **Platform variance:** Different Android versions or OEM skins may behave
   differently. Mitigation: Scope evidence to Vivo X Fold5 / Android 16.

## Offline test coverage

- **PASS path:** Not applicable (D25 is an error case)
- **UNSUPPORTED_MIME_TYPE path:** Inject non-image MIME type, verify error code
- **HARNESS_EXCEPTION path:** Simulate wrapper failure, verify sanitized output
- **Input validation:** Verify `prepareSelectedImage` is a function

## Device validation procedure

1. Force-stop AutoJs6 → Clear cache → Restart
2. Pull latest `main` from GitHub
3. Load `scripts/autojs6/d25-unsupported-mime-type-device-check.js`
4. Execute the script
5. Attempt to select a non-image file (e.g., `.txt`) from the system picker
6. Record the console output (sanitized JSON only)

**Expected result (if picker allows non-image selection):**

```json
{
  "testCaseId": "D25_UNSUPPORTED_MIME_TYPE",
  "status": "FAIL",
  "errorCode": "UNSUPPORTED_MIME_TYPE",
  "uiResponsive": true
}
```

**Alternative result (if picker rejects non-image files):**

- Document the observation
- D25 becomes a controlled-fake offline contract
- Offline tests prove the `UNSUPPORTED_MIME_TYPE` contract

## Scope

This review covers D25 only. It does not address:

- Other error codes (D24: `EMPTY_IMAGE`, D26: `ENCODING_FAILED`)
- Provider, network, queue, or Contributor app behavior
- Behavior on other devices or Android versions

## References

- [`autojs6-image-reader-device-verification-v1.md`](autojs6-image-reader-device-verification-v1.md) — D25 definition
- [`../src/core/image-input.js`](../src/core/image-input.js) — Portable core MIME validation
- [`../src/autojs6/android-image-reader.js`](../src/autojs6/android-image-reader.js) — AutoJs6 adapter
