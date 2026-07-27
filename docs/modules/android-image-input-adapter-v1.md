# Android Image Input Adapter V1.0 migration specification

## Status

- Historical target module: Android Image Input Adapter V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; specification PR #2 merged
- Portable core status: merged in PR #3; see
  [`android-image-input-core-v1.md`](android-image-input-core-v1.md)
- Production reader status: merged in PR #6; offline checks pass, device
  verification pending
- Production reader specification:
  [`autojs6-android-image-reader-v1.md`](autojs6-android-image-reader-v1.md)
- Production reader source: `src/autojs6/android-image-reader.js`; offline
  verification only, device verification pending
- Device-verification plan:
  [`../testing/autojs6-image-reader-device-verification-v1.md`](../testing/autojs6-image-reader-device-verification-v1.md)
- D01 one-click device-verification entry: prepared for repository review;
  no real-device result has been claimed
- Production runtime: Android and AutoJs6

This document defines the contract and verification requirements for the
historical module migration. The portable core and production reader source
are reviewed as separate milestones; neither alone satisfies the migration
completion criteria in [`../PROJECT_STATE.md`](../PROJECT_STATE.md).

## Purpose

Android Image Input Adapter V1.0 will prepare a selected Android image for
provider-neutral downstream processing. For one image URI at a time, it must:

1. accept an Android `content://` URI or an explicitly approved `file://` URI;
2. read the image bytes through an injected Android/AutoJs6 runtime adapter;
3. determine and normalize the image MIME type;
4. validate that the MIME type is supported;
5. validate the actual byte length against a required configured limit;
6. encode the bytes into a provider-neutral image representation;
7. return the output contract defined below.

The caller is responsible for iterating over a multi-photo selection. This
module does not select images, manage a queue, call a remote AI provider,
populate the Contributor app, or submit content.

### URI acceptance

- `content://` is the primary Android gallery URI scheme.
- `file://` is accepted only after the injected production runtime adapter
  confirms that the URI is allowed by an explicit file-access policy.
- All other URI schemes are rejected as URI access failures.
- The runtime-neutral layer must not resolve paths, use a content resolver, or
  bypass Android permission checks.

### Size limit

The caller must provide `maxSizeBytes` as a positive integer. The adapter must
compare this limit with the length of the bytes actually read, not with
untrusted URI metadata. A zero-byte image is empty. An image whose byte length
is greater than `maxSizeBytes` is too large.

This specification does not define a universal default size limit. A later
integration decision must choose a limit compatible with the selected AI
Vision provider and the Android device constraints.

## Runtime separation

### Runtime-neutral validation and payload logic

The portable layer owns:

- URI scheme parsing and validation;
- normalized supported-MIME checks;
- positive `maxSizeBytes` validation;
- empty and maximum-size validation against the byte length;
- provider-neutral output shape validation;
- mapping sanitized failures to the required error codes.

It must not import or call Node.js, Android, AutoJs6, `ContentResolver`, file
system, HTTP, provider SDK, or Contributor app APIs.

### AutoJs6 and Android runtime adapter

The injected production adapter owns:

- checking Android URI grants and permissions;
- enforcing the approved `file://` access policy;
- opening `content://` sources through Android `ContentResolver`;
- opening approved `file://` sources through an approved Android/AutoJs6 file
  API;
- reading and closing streams;
- reporting a platform MIME type when available;
- providing image bytes to the runtime-neutral logic;
- releasing streams, buffers, cursors, descriptors, and URI references after
  processing where possible.

The production adapter must expose only the minimum read and MIME information
required by the portable contract. It must not upload the image.

### Node.js offline mock test harness

Node.js may provide deterministic in-memory byte fixtures and injected mock
failures for offline tests only. It must not be described, packaged, or
accepted as the production adapter. Node.js tests cannot establish Android
permission, `ContentResolver`, AutoJs6, or device compatibility.

## Supported image formats

| Format | Normalized MIME type |
| ------ | -------------------- |
| JPEG   | `image/jpeg`         |
| PNG    | `image/png`          |
| WebP   | `image/webp`         |
| HEIC   | `image/heic`         |
| HEIF   | `image/heif`         |

MIME parameters must be removed and the media type normalized to lowercase
before comparison.

### MIME determination

MIME determination must follow this order:

1. use a supported, normalized MIME type reported by the injected Android
   runtime adapter;
2. if the reported type is absent, generic, or unsupported, inspect the image
   byte signature using runtime-neutral logic;
3. if no supported format can be determined, return
   `UNSUPPORTED_MIME_TYPE`.

The signature fallback must distinguish the supported formats, including
HEIC/HEIF ISO Base Media File Format brands. A file extension or URI suffix is
not sufficient evidence by itself.

## Input contract

The future portable entry point must receive:

- `sourceUri`: a non-empty `content://` or approved `file://` URI string;
- `maxSizeBytes`: a positive integer;
- an injected runtime reader capable of access checks, MIME lookup, and byte
  reads.

The exact function or class API will be chosen during implementation review.
This specification defines behavior rather than inventing a historical source
signature.

## Required output contract

On success, the module returns a provider-neutral value equivalent to:

```json
{
  "sourceUri": "content://media/external/images/media/42",
  "mimeType": "image/jpeg",
  "sizeBytes": 123456,
  "imageBase64": "provider-neutral Base64 image bytes"
}
```

Contract rules:

- `sourceUri` is the accepted source URI without embedded credentials or
  transformed image data;
- `mimeType` is one of the normalized supported MIME types;
- `sizeBytes` is the non-zero byte length of the source bytes;
- `imageBase64` is the Base64 encoding of exactly those bytes, without a data
  URL prefix;
- a future provider-neutral encoded representation may replace `imageBase64`
  only through an explicit contract decision and documented migration;
- Base64 must remain in memory and must not be persisted to disk by default;
- callers must not log or serialize the Base64 outside the immediate
  processing boundary.

## Required errors

Failures must be distinguishable by stable machine-readable codes. Error
messages and wrapped platform causes must not contain image bytes, Base64,
credentials, or sensitive filesystem details.

| Code                    | Required condition                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `UNSUPPORTED_MIME_TYPE` | No supported MIME type can be established from the runtime report or byte signature                                 |
| `EMPTY_IMAGE`           | The runtime read succeeds with zero bytes                                                                           |
| `IMAGE_TOO_LARGE`       | The actual byte length exceeds `maxSizeBytes`                                                                       |
| `IMAGE_READ_FAILED`     | The runtime adapter cannot completely read the image for a reason other than a classified access failure            |
| `ENCODING_FAILED`       | Provider-neutral encoding of valid, supported bytes fails                                                           |
| `URI_ACCESS_DENIED`     | Permission is missing, the URI is inaccessible, the `file://` URI is not approved, or the URI scheme is not allowed |

An implementation must preserve the stable code when adding a sanitized
human-readable message or platform cause.

## Security and privacy rules

- This module must not upload images or make network requests.
- It must not accept, read, store, or log API credentials.
- It must not modify, overwrite, move, rename, or delete source images.
- It must not log image contents, raw bytes, Base64, or full diagnostic
  payloads containing them.
- Base64 must not be persisted to disk by default.
- Android URI permissions must be honored; access must never be bypassed.
- `file://` sources must pass an explicit allow policy before reading.
- Streams, descriptors, cursors, buffers, Base64 references, and other
  resources must be closed or released after processing where the runtime
  permits.
- Errors and telemetry must be metadata-only and minimized.

## Required tests

### Runtime-neutral and Node.js offline tests

The future implementation must include deterministic tests for:

1. **Valid JPEG input:** reads non-empty JPEG bytes, normalizes
   `image/jpeg`, enforces the configured limit, and returns the complete output
   contract with matching Base64.
2. **MIME fallback:** an absent, generic, or unsupported runtime MIME value
   falls back to a supported byte signature and returns the detected normalized
   MIME type.
3. **Unsupported format:** unsupported bytes produce
   `UNSUPPORTED_MIME_TYPE`.
4. **Empty content:** zero bytes produce `EMPTY_IMAGE`.
5. **Size limit:** content larger than `maxSizeBytes` produces
   `IMAGE_TOO_LARGE`; content exactly equal to the limit is accepted.
6. **Read failure:** an injected runtime read failure produces
   `IMAGE_READ_FAILED` without leaking content.
7. **Encoding failure:** an injected encoding failure produces
   `ENCODING_FAILED` without persisting or logging content.

Tests must also cover each supported MIME type, rejected URI schemes,
unapproved `file://` access, invalid limits, resource cleanup, and sanitized
errors.

### Later AutoJs6 integration tests

Production integration tests are deferred until an implementation exists and
will require user action. On an authorized Android device or emulator, they
must verify:

- the user grants and revokes gallery URI access;
- real `content://` JPEG, PNG, WebP, HEIC, and HEIF images can be read where
  the device supports them;
- approved and unapproved `file://` policies behave as specified;
- Android-reported MIME values and byte-signature fallback agree with the
  contract;
- empty, oversized, missing, and inaccessible sources map to the required
  errors;
- streams and URI references are released after success and failure;
- no image content or Base64 is written to logs or persistent storage.

The user must supply or authorize the device/emulator, permissions, test
images, and any required AutoJs6 environment. Offline Node.js tests cannot
replace this verification.

## Completion criteria

Android Image Input Adapter V1.0 remains **NOT YET MIGRATED** until all of the
following exist:

1. reviewed source implementing this specification;
2. runtime-neutral and offline tests;
3. an explicit runtime designation for every source file;
4. integration documentation for the AutoJs6/Android boundary and its callers;
5. passing repository checks and secret scan;
6. a Git commit containing the verified migration;
7. a pull request containing that commit;
8. later Android device or emulator verification with the required user
   intervention.

This specification PR satisfies none of the source, implementation, or
Android-device completion gates. It must not change the historical module
status.
