# AutoJs6 Image Reader V1.0 device verification

## Status and scope

This is the executable verification plan for:

- **Device:** Vivo X Fold5
- **Runtime:** AutoJs6 v6.7.0, `arm64-v8a`
- **Module:** AutoJs6 Android Image Reader V1.0
- **Tested D01 baseline:** repository `main` commit
  `0324d640e390da7c2c905fb9d2d8e134ee1e7149`

The first device execution stopped at bundle parsing and did not reach the
Android picker. It is not a D01 PASS. The Android Image Input Adapter V1.0
remains **NOT YET MIGRATED**. This plan does not test or authorize provider,
network, queue, Contributor app, or submission behavior.

The D01 one-click launcher was merged in PR #8. Its generated,
verification-only entry is `scripts/autojs6/d01-jpeg-device-check.js`, with a
Traditional Chinese guide at
[`../user-guides/autojs6-d01-jpeg-check-zh-tw.md`](../user-guides/autojs6-d01-jpeg-check-zh-tw.md).
The confirmed parse failure is being corrected on
`fix/autojs6-d01-reserved-class-keyword-v1`. Real-device retesting is required,
and AutoJs6 compatibility remains unverified.

### Recorded D01 device evidence

- **Device:** Vivo X Fold5
- **Runtime:** AutoJs6 v6.7.0, `arm64-v8a`
- **Tested main SHA:** `0324d640e390da7c2c905fb9d2d8e134ee1e7149`
- **Result:** FAIL at parse stage
- **Project-level classification:** runtime compatibility blocker
- **Observed message:** reserved keyword `class`
- **Observed generated location:** `d01-jpeg-device-check.js`, line 59
- **Picker state:** Android picker did not open
- **Image state:** no image was selected or read
- **Privacy observation:** the script did not output Base64, a complete URI,
  a local path, a filename, image content, a stack trace, or credentials
- **D01 status:** no PASS
- **Adapter status:** **NOT YET MIGRATED**

## 1. Preconditions

Complete and record every item before running a case:

1. Check out the exact authoritative `main` commit named by the reviewed
   device-verification package
   from authoritative `main`. Record `git rev-parse HEAD` in the checklist.
   If testing a later corrected `main`, replace this recorded SHA with that
   exact commit and repeat the complete matrix.
2. Confirm `git status --short` produces no output. Do not test uncommitted
   source.
3. Install AutoJs6 v6.7.0 for `arm64-v8a` on the Vivo X Fold5. Capture its
   version screen and record the device Android version.
4. Use only the minimum URI permission granted by the selected, approved
   Android picker or gallery flow. Record whether the grant is temporary or
   persistable. Do not assume broad storage permission.
5. Confirm no API key, provider account, network access, or Contributor app
   access is required.
6. Prepare the non-sensitive local fixtures listed below. Do not use personal
   photos.
7. Configure reporting to emit only the case ID, pass/fail status, normalized
   MIME type, byte count, stable error code, and coarse memory observations.
   Disable any runtime logging that would print image contents, Base64, full
   URI query strings, paths, exception objects, or filenames.
8. Choose and record positive safe integers for `maxSizeBytes` and
   `readerSafetyLimitBytes`. The reader ceiling must not be lower than the
   portable limit except in the dedicated reader-overflow case.
9. Confirm the test is running away from the Android UI thread. If this cannot
   be demonstrated, stop before reading images.

## 2. Required test-image set

Create the fixtures locally on the test device. Use generated geometric
patterns or other non-sensitive synthetic content. Record only opaque case IDs
and expected byte sizes.

| Fixture ID            | Required source                                                                    |
| --------------------- | ---------------------------------------------------------------------------------- |
| `JPEG_VALID`          | Valid JPEG                                                                         |
| `PNG_VALID`           | Valid PNG                                                                          |
| `WEBP_VALID`          | Valid WebP                                                                         |
| `HEIC_VALID`          | Valid HEIC                                                                         |
| `HEIF_VALID`          | Valid HEIF where the device and gallery support it                                 |
| `EMPTY_CONTROLLED`    | Zero-byte or controlled empty source where Android permits it; otherwise fake-only |
| `AT_PORTABLE_LIMIT`   | Valid supported image exactly `maxSizeBytes`                                       |
| `OVER_PORTABLE`       | Valid supported image above `maxSizeBytes` but not above the reader ceiling        |
| `OVER_READER_CEILING` | Valid supported source above `readerSafetyLimitBytes`                              |
| `MISSING_SOURCE`      | A selected non-sensitive source deleted after its URI is recorded                  |
| `REVOKED_SOURCE`      | A source whose temporary URI grant can be intentionally revoked                    |

Do not commit personal photos, generated binary fixtures, local paths, or
captured content URIs to Git. Keep the fixture manifest outside the repository
and sanitize it before sharing.

## 3. AutoJs6 runtime harness

The reusable non-production template is
[`../../scripts/autojs6/image-reader-device-check.js`](../../scripts/autojs6/image-reader-device-check.js).
It loads the production reader and portable core, constructs the reader from
injected runtime dependencies, invokes `prepareImageInput()`, and reports only
sanitized metadata.

The device launcher must inject:

- `context` or a verified `contentResolver`;
- an Android URI parser;
- a Java bridge with bounded byte-array creation and runtime-exception
  classification;
- an explicit approved-file policy, which must deny by default;
- a read-only file opener only if an approved `file://` case is added;
- `readerSafetyLimitBytes` and `maxSizeBytes`;
- a synthetic case ID;
- a metadata-only reporting function.

The Java bridge must classify permission or `SecurityException` failures as
`URI_ACCESS_DENIED`; all other read failures must become
`IMAGE_READ_FAILED`. The launcher must obtain `sourceUri` from the approved
picker result at runtime. It must not contain a hard-coded URI or device path.

The D01 one-click entry is deterministically bundled from the repository ESM
sources because AutoJs6 v6.7.0 does not provide a verified native ESM loading
path for this project. The committed generated file must match
`npm run build:autojs6:d01:check`; it is test support, not a second production
implementation.

The generated entry must also pass `npm run scan:autojs6:d01`. That AST-based
offline scan rejects `class`, arrow functions, `const`/`let`, optional
chaining, nullish coalescing, async/await, generators, template literals,
spread/rest, private fields, static blocks, shorthand or computed object
properties, non-simple catch bindings, Unicode-mode regular expressions, and
module syntax. Passing this offline scan corrects the observed parse syntax
but does not replace the required AutoJs6 device retest.

The deterministic build uses one build-only `@babel/standalone` pass after
esbuild. This extra transpilation is necessary because esbuild cannot lower
the complete bundle to the legacy Rhino syntax boundary by itself; it rejects
required transformations such as `const` for that target. Babel is not
included as an AutoJs6 runtime dependency, and no second implementation is
maintained.

Before the first D01 image read:

1. follow the Traditional Chinese D01 user guide;
2. verify that the standard Android picker opens;
3. verify that the bundled module starts without a syntax or module error;
4. select one non-sensitive JPEG;
5. require `uiResponsive: true`;
6. inspect the output and logs for sensitive content before continuing.

The harness must never print image bytes, Base64, complete URI query strings,
file paths, credentials, personal filenames, exception messages, stacks, or
causes. Node.js may lint this template, but Node.js is not a device or
compatibility test.

## 4. Verification matrix

Record the exact main SHA, limits, Android version, AutoJs6 version, start/end
memory observations, result, and sanitized notes for every row.

| ID  | Test                                                  | Procedure                                                                                   | Expected result                                                        |
| --- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| D01 | `content://` JPEG                                     | Select `JPEG_VALID`, retain only its runtime URI, and run once                              | Success: `image/jpeg`, exact non-zero `sizeBytes`                      |
| D02 | PNG                                                   | Select and run `PNG_VALID`                                                                  | Success: `image/png`, exact non-zero `sizeBytes`                       |
| D03 | WebP                                                  | Select and run `WEBP_VALID`                                                                 | Success: `image/webp`, exact non-zero `sizeBytes`                      |
| D04 | HEIC                                                  | Select and run `HEIC_VALID`                                                                 | Success: `image/heic`, exact non-zero `sizeBytes`                      |
| D05 | HEIF where supported                                  | Select and run `HEIF_VALID`; mark not supported only with platform evidence                 | Success: `image/heif`, exact non-zero `sizeBytes`                      |
| D06 | MIME from `ContentResolver`                           | Record that a supported MIME is returned, without recording the URI                         | Success with normalized returned MIME and exact `sizeBytes`            |
| D07 | Absent MIME signature fallback                        | Through a controlled adapter hook, return no MIME while reading a valid fixture             | Success with signature-detected MIME and exact `sizeBytes`             |
| D08 | Permission granted                                    | Run a freshly selected URI while its grant is active                                        | Success metadata                                                       |
| D09 | Permission revoked before `canAccess()`               | Revoke the temporary grant before invoking the harness                                      | `URI_ACCESS_DENIED`                                                    |
| D10 | Permission revoked between `canAccess()` and `read()` | Use a controlled hook to revoke after the probe closes and before the production read opens | `URI_ACCESS_DENIED`                                                    |
| D11 | Missing source                                        | Delete `MISSING_SOURCE` after selection, then run while authorization history remains       | `IMAGE_READ_FAILED`                                                    |
| D12 | Null stream, controlled fake only                     | Inject a resolver fake returning `null`; do not claim this as a real Android behavior       | `IMAGE_READ_FAILED`                                                    |
| D13 | Exact portable size limit                             | Run `AT_PORTABLE_LIMIT` with `maxSizeBytes` equal to its verified byte count                | Success with `sizeBytes === maxSizeBytes`                              |
| D14 | Portable size overflow                                | Run `OVER_PORTABLE` with a higher reader ceiling                                            | `IMAGE_TOO_LARGE`                                                      |
| D15 | Reader safety ceiling overflow                        | Run `OVER_READER_CEILING` with a deliberately lower recorded reader ceiling                 | `IMAGE_READ_FAILED`; no truncated success                              |
| D16 | Repeated reads                                        | Read the same non-sensitive granted URI repeatedly in a recorded loop                       | Every iteration returns the same success metadata                      |
| D17 | Multi-image sequential reads                          | Read JPEG, PNG, WebP, and supported HEIC/HEIF URIs sequentially                             | One independent success metadata record per image                      |
| D18 | Stream cleanup after success                          | Instrument the stream wrapper close event for a valid read                                  | Success metadata and exactly one demonstrated close                    |
| D19 | Cleanup after failure                                 | Inject a controlled mid-read failure and instrument close                                   | `IMAGE_READ_FAILED` and exactly one demonstrated close                 |
| D20 | Memory behavior                                       | Record coarse memory before, during, and after D16/D17; allow a stabilization interval      | Success metadata; no unsafe sustained growth                           |
| D21 | UI responsiveness and blocking                        | Interact with the device UI while repeated reads execute off the UI thread                  | Success metadata; no UI blocking                                       |
| D22 | No image or Base64 persistence                        | Inspect the approved output/log locations after successful and failed cases                 | Success metadata or the case's stable error; no persisted bytes/Base64 |
| D23 | No sensitive logging                                  | Review all logs after the full matrix                                                       | Success metadata or stable error codes only; no prohibited data        |
| D24 | Empty source where Android permits                    | Run `EMPTY_CONTROLLED`; otherwise retain this as a controlled-fake result only              | `EMPTY_IMAGE`                                                          |
| D25 | Unsupported non-image source                          | Select a non-sensitive unsupported controlled source if the picker permits it               | `UNSUPPORTED_MIME_TYPE`                                                |
| D26 | Controlled encoding failure                           | Inject a failing provider-neutral encoder after a valid read                                | `ENCODING_FAILED`                                                      |

## 5. Expected results

An internal successful `prepareImageInput()` result has this shape:

```js
{
  sourceUri,
  mimeType,
  sizeBytes,
  imageBase64,
}
```

Evidence output must redact `sourceUri` and `imageBase64`, leaving only:

```json
{
  "testCaseId": "D01_JPEG",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

Failure evidence may contain only the case ID, `FAIL`, and one of these stable
public codes, plus the boolean `uiResponsive` field:

- `URI_ACCESS_DENIED`
- `IMAGE_READ_FAILED`
- `EMPTY_IMAGE`
- `IMAGE_TOO_LARGE`
- `UNSUPPORTED_MIME_TYPE`
- `ENCODING_FAILED`

Any other result is a harness or integration defect. Stop and report it
without printing the underlying exception.

## 6. Evidence capture

Acceptable evidence is limited to:

- an AutoJs6 version screenshot showing v6.7.0 and `arm64-v8a`;
- the Vivo X Fold5 Android version;
- the exact repository SHA and clean-tree confirmation;
- the completed test-case checklist;
- metadata-only console output;
- coarse memory observations without dumps containing image data;
- a pass/fail record and sanitized failure notes.

Do not capture, share, or commit personal image content, raw bytes, Base64,
private paths, tokens, credentials, personal filenames, full sensitive URIs,
exception objects, or memory dumps containing image data. Store evidence
outside Git until it has been manually sanitized and approved.

## 7. Stop conditions

Stop testing and report the case ID plus sanitized observation instead of
improvising if:

- AutoJs6 cannot load ES modules;
- the D01 generated bundle cannot load or the standard Android picker does not
  open;
- `context.getContentResolver()` is unavailable;
- Java imports or byte arrays behave differently than expected;
- the reader runs on the UI thread, the UI heartbeat cannot be demonstrated,
  `uiResponsive` is not `true`, or the reader blocks the UI thread;
- HEIC or HEIF behavior differs from the expected platform support;
- permission classification is ambiguous;
- stream cleanup cannot be demonstrated;
- memory behavior appears unsafe;
- any sensitive data appears in logs.

Do not add broad permissions, copy images to workaround paths, weaken the file
policy, log runtime exceptions, or modify production code directly on the
device.

## 8. Completion criteria

Device verification is complete only when:

1. every mandatory test case has a recorded result;
2. unsupported HEIF or empty-source cases have explicit platform evidence and
   their controlled-fake coverage is recorded;
3. every failure is classified and documented without sensitive details;
4. no sensitive information leaked;
5. required corrections are reviewed and merged;
6. the complete mandatory matrix is repeated against the corrected,
   explicitly recorded authoritative `main` SHA.

Until then, device compatibility remains unverified and Android Image Input
Adapter V1.0 remains **NOT YET MIGRATED**.

## 9. User action checklist

- [ ] Confirm Vivo X Fold5 Android version and AutoJs6 v6.7.0 `arm64-v8a`.
- [ ] Check out the recorded authoritative `main` SHA and confirm a clean tree.
- [ ] Prepare only non-sensitive local fixtures; commit no binaries or photos.
- [ ] Record `maxSizeBytes`, `readerSafetyLimitBytes`, and the minimum URI grant.
- [ ] Confirm the harness loads, reports metadata only, and runs off the UI thread.
- [ ] Execute D01–D26 in order, stopping immediately on any stop condition.
- [ ] Record pass/fail, stable error codes, cleanup, responsiveness, and memory observations.
- [ ] Review all output for sensitive data before sharing any evidence.
- [ ] Report failures for repository correction; do not improvise on the device.
- [ ] Repeat the complete matrix against the corrected authoritative `main` SHA.
