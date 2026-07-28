# D01 Vivo X Fold5 / AutoJs6 v6.7.0 device validation

## Validation status

**D01_JPEG: PASS**

This record documents one user-assisted Android device validation against the
exact repository revision below. The result is limited to the D01 JPEG case;
it does not establish completion of the full device-verification matrix or
migration of Android Image Input Adapter V1.0.

## Test environment

| Item                     | Verified value                             |
| ------------------------ | ------------------------------------------ |
| Device                   | Vivo X Fold5                               |
| Runtime                  | AutoJs6 v6.7.0, `arm64-v8a`                |
| Repository               | `cyh86086/contributor-ai`                  |
| Authoritative main SHA   | `5720caa5015eaee9277c9ec6b8d38dc85e5ed2c9` |
| Test case                | `D01_JPEG`                                 |
| Generated entry          | `scripts/autojs6/d01-jpeg-device-check.js` |
| Production network use   | None                                       |
| Provider or app activity | None                                       |

The Android OS version and exact test-image byte count were not included in
the supplied evidence and are not reconstructed in this repository record.

## Validation flow

1. Use the generated D01 entry from authoritative main SHA
   `5720caa5015eaee9277c9ec6b8d38dc85e5ed2c9` without modifying the script.
2. Start the entry in AutoJs6 v6.7.0 on the Vivo X Fold5.
3. Confirm that the script parses and starts successfully.
4. Open the standard Android image picker from the D01 flow.
5. Select one approved, non-sensitive JPEG.
6. Allow the existing Android image reader to read the granted
   `content://` source.
7. Confirm JPEG MIME detection and a successful metadata-only D01 result.
8. Confirm that the Android UI remains responsive.
9. Inspect the script output for prohibited content before recording the
   result.

## Result

The supplied evidence confirms:

| Check                | Result |
| -------------------- | ------ |
| D01 script startup   | PASS   |
| Android picker       | PASS   |
| JPEG reader          | PASS   |
| MIME detection       | PASS   |
| UI responsiveness    | PASS   |
| Metadata-only output | PASS   |

### Sanitized result JSON

The exact byte count was not supplied, so this repository does not invent a
numeric `sizeBytes` value. The following JSON is the authoritative sanitized
evidence summary, not a verbatim replacement for the runtime output contract:

```json
{
  "testCaseId": "D01_JPEG",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytesVerified": true,
  "uiResponsive": true,
  "outputClassification": "metadata-only"
}
```

The PASS classification confirms that the device result satisfied the D01
success requirements, including a positive JPEG byte count.

## Privacy and security observation

The observed script output did not contain:

- image bytes or image content;
- Base64;
- a complete URI or URI query string;
- a local path;
- a filename;
- an exception message, stack trace, or cause;
- an API key, token, credential, or other secret.

No provider, network, queue, Contributor app, or submission behavior was part
of this validation.

## Known limitations

- This is one D01 JPEG result on one Vivo X Fold5 and one AutoJs6 version.
- The exact Android OS version and image byte count were not supplied for this
  repository record.
- PNG, WebP, HEIC, and HEIF were not validated by D01.
- MIME fallback, permission revocation, missing-source behavior, empty input,
  size boundaries, repeated reads, cleanup instrumentation, and memory
  behavior remain outside this result.
- The result does not validate an AI Vision provider, network transport,
  queueing, Contributor app automation, or submission.
- A D01 PASS does not make the complete Android Image Input Adapter V1.0
  migrated. It remains **NOT YET MIGRATED**.

## Follow-up validation

1. Record the exact authoritative main SHA for every later device case.
2. Continue the remaining cases in
   [`../autojs6-image-reader-device-verification-v1.md`](../autojs6-image-reader-device-verification-v1.md),
   beginning with the supported-format cases that have not yet run.
3. Exercise MIME fallback, permission, read-failure, size-boundary, cleanup,
   repeated-read, memory, and UI-thread stop conditions.
4. Retain metadata-only reporting and the existing privacy stop conditions for
   every case.
5. Update `docs/PROJECT_STATE.md` after reviewed evidence changes the active
   phase, blocker, or module status.
