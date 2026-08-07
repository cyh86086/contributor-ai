# D26 Controlled encoding failure — evidence gap review

## Purpose

D26 verifies that when a controlled encoding failure is injected after a valid
read, the portable core returns the stable public error code `ENCODING_FAILED`
with a frozen, sanitized failure record.

## Contract

**Inputs:**

- A valid `content://` URI pointing to a supported image file
- Standard reader parameters (`maxSizeBytes`, `readerSafetyLimitBytes`, etc.)
- A controlled-fake encoder that fails after a valid read

**Expected output:**

```json
{
  "status": "FAIL",
  "errorCode": "ENCODING_FAILED",
  "uiResponsive": true
}
```

**Invariants:**

- The failure record is frozen (`Object.freeze`)
- No image bytes, Base64, or source URIs are exposed in the output
- The UI remains responsive throughout execution
- The error code is stable and public (from `IMAGE_INPUT_ERROR_CODES`)

## Feasibility

**Encoding failure injection:**

- D26 requires injecting a failing encoder after a valid read
- This is a controlled-fake test that does not depend on picker behavior
- The encoder failure can be simulated by throwing an error during encoding

**Offline proof strategy:**

- Use controlled-fake injection to simulate an encoding failure
- Inject a mock encoder that throws after a valid read
- Verify the portable core returns `ENCODING_FAILED`

**Device validation:**

- D26 can be fully validated through offline tests
- No special device setup required (unlike D24/D25)
- The encoding failure is injected programmatically

## Risks

1. **Encoder availability:** The production reader may not have a pluggable
   encoder interface. Mitigation: Use controlled-fake injection at the
   portable core level.

2. **Error propagation:** The encoding failure may not propagate correctly
   through the reader pipeline. Mitigation: Verify error code mapping in
   offline tests.

3. **Platform variance:** Different Android versions may handle encoding
   differently. Mitigation: Scope evidence to Vivo X Fold5 / Android 16.

## Offline test coverage

- **PASS path:** Not applicable (D26 is an error case)
- **ENCODING_FAILED path:** Inject failing encoder, verify error code
- **HARNESS_EXCEPTION path:** Simulate wrapper failure, verify sanitized output
- **Input validation:** Verify `prepareSelectedImage` is a function

## Device validation procedure

1. Force-stop AutoJs6 → Clear cache → Restart
2. Pull latest `main` from GitHub
3. Load `scripts/autojs6/d26-controlled-encoding-failure-device-check.js`
4. Execute the script
5. The script will simulate a valid read followed by an encoding failure
6. Record the console output (sanitized JSON only)

**Expected result:**

```json
{
  "testCaseId": "D26_CONTROLLED_ENCODING_FAILURE",
  "status": "FAIL",
  "errorCode": "ENCODING_FAILED",
  "uiResponsive": true
}
```

## Scope

This review covers D26 only. It does not address:

- Other error codes (D24: `EMPTY_IMAGE`, D25: `UNSUPPORTED_MIME_TYPE`)
- Provider, network, queue, or Contributor app behavior
- Behavior on other devices or Android versions

## References

- [`autojs6-image-reader-device-verification-v1.md`](autojs6-image-reader-device-verification-v1.md) — D26 definition
- [`../src/core/image-input.js`](../src/core/image-input.js) — Portable core encoding
- [`../src/autojs6/android-image-reader.js`](../src/autojs6/android-image-reader.js) — AutoJs6 adapter
