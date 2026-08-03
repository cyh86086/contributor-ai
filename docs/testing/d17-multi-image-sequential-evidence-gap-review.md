# D17 multi-image sequential reads evidence-gap review

## Purpose

D17 verifies that the production reader can sequentially process multiple
independently selected images of different formats through one fresh temporary
system-picker grant. Each image produces one independent sanitized success
metadata record.

## Case definition

- **Case ID:** `D17_MULTI_IMAGE_SEQUENTIAL`
- **Objective:** Select multiple images (JPEG, PNG, WebP, and supported
  HEIC/HEIF) in one system-picker multi-selection, then sequentially process
  each URI through the complete production reader and portable core path.
- **Expected result:** One independent sanitized success metadata record per
  image, in selection order.

## Contract

### Inputs

- One fresh temporary system-picker multi-selection providing multiple
  `content://` URIs.
- Each URI corresponds to a privately mapped, non-sensitive fixture with an
  independently verified byte count.
- Supported formats: JPEG (`image/jpeg`), PNG (`image/png`), WebP
  (`image/webp`), HEIC (`image/heic`), HEIF (`image/heif`).

### Processing

- Each URI is processed sequentially through:
  `canAccess() → read() → portable core → sanitized reporter`
- No reselection between iterations.
- No persistable access or broad storage permission.
- The same temporary grant covers all iterations.

### Output

- One sanitized aggregate containing an ordered array of per-image records.
- Each record contains: `mimeType`, `sizeBytes`, `status`.
- No URI, path, filename, bytes, Base64, image content, exception detail,
  stack, credential, or private fixture mapping is retained.

### Fail-fast

- If any image fails (public error, metadata mismatch, or UI not responsive),
  processing stops.
- Failed iterations are recorded with their stable public error code.
- Subsequent unprocessed images are not attempted.
- The aggregate records which iteration failed and how many succeeded.

### Acceptance criteria (PASS shape)

```json
{
  "testCaseId": "D17_MULTI_IMAGE_SEQUENTIAL",
  "status": "PASS",
  "requestedImages": 4,
  "attemptedImages": 4,
  "successfulImages": 4,
  "images": [
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    {
      "mimeType": "image/png",
      "sizeBytes": "<independently-verified>",
      "status": "PASS"
    },
    {
      "mimeType": "image/webp",
      "sizeBytes": "<independently-verified>",
      "status": "PASS"
    },
    {
      "mimeType": "image/heic",
      "sizeBytes": "<independently-verified>",
      "status": "PASS"
    }
  ],
  "uiResponsive": true
}
```

- `requestedImages`: number of images selected.
- `attemptedImages`: number of images actually processed (≤ requestedImages).
- `successfulImages`: number of images that returned PASS.
- `images`: ordered array of per-image sanitized records.
- PASS requires `attemptedImages === requestedImages` and
  `successfulImages === requestedImages`.

### Failure shapes

- `UI_NOT_RESPONSIVE`: `uiResponsive === false`, no `errorCode`.
- `PUBLIC_ERROR`: stable public `errorCode` from the failed iteration.
- `METADATA_MISMATCH`: MIME or sizeBytes does not match the independently
  verified fixture record.

## Case boundaries

- D17 is multi-image sequential reads of different formats; it is not D16
  repeated same-source reads.
- D17 does not prove D18/D19 exact cleanup instrumentation, D20 memory
  behavior, or D21 UI blocking during extended work.
- D17 requires independently verified byte counts for each fixture; it cannot
  reuse D13-D16 counts for different fixtures.
- A private-cache lifecycle observation, fake resolver, or injected stream is
  not D17 Android evidence.

## Existing offline coverage

- The production reader and portable core are proved by D01-D08, D12-D16
  offline tests for single-image success and failure paths.
- No existing test processes multiple different URIs sequentially through the
  complete production path.
- No fake or injected test can establish real Android temporary-grant lifetime
  across multiple different format reads.

## Disposition

D17 requires:

1. Scoped review of the multi-image sequential contract (this document).
2. Device-procedure preparation: manifest, verification-only wrapper,
   launcher integration, generated bundle, offline tests, and Traditional
   Chinese procedure.
3. Independent review and merge of the preparation PR.
4. Device execution on Vivo X Fold5 with AutoJs6 v6.7.0 `arm64-v8a`.

No launcher, private fixture mapping, device result, or PASS claim exists at
this stage.
