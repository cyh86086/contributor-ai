# D02-D05 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Validation status

- **D02_PNG: PASS**
- **D03_WEBP: PASS**
- **D04_HEIC: PASS**
- **D05_HEIF: PASS**

This record documents user-assisted Android device validation against the exact
repository revision below. The results are limited to the four named format
cases. They do not establish completion of the full device-verification matrix
or migration of Android Image Input Adapter V1.0.

## Test environment

| Item                     | Verified value                             |
| ------------------------ | ------------------------------------------ |
| Device                   | Vivo X Fold5                               |
| Runtime                  | AutoJs6 v6.7.0, `arm64-v8a`                |
| Repository               | `cyh86086/contributor-ai`                  |
| Authoritative main SHA   | `ad52d122e239e0431c9fd2d3c2cdedf383f8b0da` |
| Production network use   | None                                       |
| Provider or app activity | None                                       |

Generated entries:

- `scripts/autojs6/d02-png-device-check.js`
- `scripts/autojs6/d03-webp-device-check.js`
- `scripts/autojs6/d04-heic-device-check.js`
- `scripts/autojs6/d05-heif-device-check.js`

The Android OS version was not included in the supplied evidence and is not
reconstructed in this repository record.

## Sanitized results

```json
{
  "testCaseId": "D02_PNG",
  "status": "PASS",
  "mimeType": "image/png",
  "sizeBytes": 933842,
  "uiResponsive": true
}
```

```json
{
  "testCaseId": "D03_WEBP",
  "status": "PASS",
  "mimeType": "image/webp",
  "sizeBytes": 8044,
  "uiResponsive": true
}
```

```json
{
  "testCaseId": "D04_HEIC",
  "status": "PASS",
  "mimeType": "image/heic",
  "sizeBytes": 1442278,
  "uiResponsive": true
}
```

```json
{
  "testCaseId": "D05_HEIF",
  "status": "PASS",
  "mimeType": "image/heif",
  "sizeBytes": 223312,
  "uiResponsive": true
}
```

The device returned distinct MIME values for HEIC and HEIF: D04 returned
`image/heic`, while D05 returned `image/heif`.

## D03 preliminary stop result

The first D03 attempt produced the following sanitized result when the picker
contained no readable WebP source:

```json
{
  "testCaseId": "D03_WEBP",
  "status": "FAIL",
  "errorCode": "URI_ACCESS_DENIED",
  "uiResponsive": true
}
```

This preliminary result proves only that no readable URI was obtained in that
attempt. It is not classified as a launcher defect. After a genuine WebP source
was added to the device, D03 passed with the result recorded above.

## Evidence scope and privacy

The supplied evidence contains metadata-only records: case ID, status, MIME,
byte count or stable public error code, and UI responsiveness. It does not
contain image bytes, Base64, complete URIs, local paths, filenames, exception
messages, stack traces, credentials, or image content.

No provider, network, queue, Contributor app, or submission behavior was part
of these validations.

## Known limitations

- These are four scoped format results on one Vivo X Fold5 and one AutoJs6
  version.
- The Android OS version was not supplied.
- MIME fallback, permission revocation, missing-source behavior, empty input,
  size boundaries, repeated reads, cleanup instrumentation, memory behavior,
  and the remaining D06-D26 cases are outside these results.
- These results do not validate an AI Vision provider, network transport,
  queueing, Contributor app automation, or submission.
- D01-D05 PASS does not make Android Image Input Adapter V1.0 migrated. It
  remains **NOT YET MIGRATED**.

## Follow-up validation

1. Continue the remaining cases in
   [`../autojs6-image-reader-device-verification-v1.md`](../autojs6-image-reader-device-verification-v1.md),
   beginning with D06.
2. Retain metadata-only reporting and the existing privacy stop conditions.
3. Record the exact authoritative main SHA for every later device case.
4. Update `docs/PROJECT_STATE.md` whenever reviewed evidence changes the active
   phase, blocker, or next action.
