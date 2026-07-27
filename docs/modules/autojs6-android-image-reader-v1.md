# AutoJs6 Android Image Reader V1.0 specification

## Status

- Specification status: authoritative; specification PR #4 merged
- Implementation status: not implemented
- Production runtime: Android with AutoJs6
- Current known runtime target: AutoJs6 v6.7.0, `arm64-v8a`
- Device compatibility status: unverified; requires later device testing

This document specifies the production reader injected into
`prepareImageInput()` from `src/core/image-input.js`. It does not include or
authorize production Android or AutoJs6 source in this pull request.

## 1. Purpose

AutoJs6 Android Image Reader V1.0 will implement the injected reader boundary
used by the portable image-input core:

```js
reader.canAccess(sourceUri);
reader.read(sourceUri);
```

`canAccess(sourceUri)` must resolve to `true` only when the production runtime
can access the URI under current Android permissions and policy. It must
resolve to `false`, or fail through a sanitized access-denial boundary, when
access is unavailable.

`read(sourceUri)` must completely read the authorized image and resolve to a
portable result compatible with the core:

```js
{
  (bytes, mimeType);
}
```

The reader supplies bytes and the platform MIME value when available. The
portable core remains responsible for MIME normalization and signature
fallback, actual byte-size validation, supported-format validation, and Base64
encoding.

## 2. Runtime designation

- The production runtime is Android with AutoJs6.
- Portable validation and payload preparation remain in
  `src/core/image-input.js`.
- Node.js remains an offline test, lint, formatting, and CI harness only.
- The production reader may depend on the minimum approved Android and AutoJs6
  APIs required for URI access and byte conversion.
- The reader must not contain AI provider, HTTP, queue, orchestration,
  Contributor app, metadata-generation, or submission responsibilities.

The reader is an infrastructure boundary. It must not become a second portable
core or a workflow engine.

## 3. `content://` handling

For `content://` input, the production implementation must:

1. parse the URI through the approved Android URI API;
2. obtain `context.getContentResolver()` from the verified AutoJs6 runtime
   context;
3. request the MIME type through `ContentResolver.getType(uri)` when available;
4. open an `InputStream` through `ContentResolver.openInputStream(uri)`;
5. reject a `null` stream as `IMAGE_READ_FAILED`;
6. read in a loop until the stream reports end-of-file;
7. append only the exact number of bytes returned by each read;
8. handle partial reads correctly and never assume one read fills the buffer;
9. prevent repeated zero-length reads from causing an infinite loop;
10. treat interrupted or incomplete reads as failures rather than returning
    truncated content;
11. close the stream in a guaranteed cleanup path on success and failure.

Missing URI grants and Android `SecurityException` failures must be treated as
access failures. Other open or read failures must follow the error mapping
below. Platform exception text must not be passed through to callers or logs.

## 4. `file://` handling

`file://` access is denied by default. A future implementation must receive an
explicit approved-file policy and must:

- allow only explicitly approved files or files below explicitly approved
  directories;
- apply canonical-path validation where the runtime provides a reliable
  canonicalization API;
- compare canonical paths by path segment, not by unsafe string-prefix tests;
- reject traversal segments, symlink escapes, alternate encodings, malformed
  URIs, and any canonicalization failure;
- revalidate the final path immediately before opening it where practical;
- open the source read-only;
- never modify, overwrite, move, rename, truncate, or delete the source.

The exact approved directories are unresolved product configuration. They must
not be hard-coded or inferred from broad storage access in the specification.

## 5. Byte representation

The exact value returned as `bytes` must be a JavaScript `Uint8Array`.
`ArrayBuffer` is interoperable with the current portable core, but the
production reader contract standardizes on `Uint8Array` to remove ambiguity.

The conversion boundary is:

```text
Android InputStream
  -> bounded Java read buffer
  -> complete Java byte[] (or equivalent bounded accumulator)
  -> AutoJs6 JavaScript conversion
  -> Uint8Array
  -> prepareImageInput()
```

The implementation must document and test the exact AutoJs6 conversion used
for signed Java bytes (`-128` through `127`) so the corresponding unsigned
`Uint8Array` values (`0` through `255`) preserve every source byte.

Avoid unnecessary duplicate full-image buffers where practical. If
`ByteArrayOutputStream.toByteArray()` and Java-to-JavaScript conversion each
copy the image, references to intermediate buffers must be released promptly.
An optimization must not return a mutable platform buffer whose lifetime ends
before the portable core finishes.

## 6. MIME handling

- Return the value from `ContentResolver.getType(uri)` when it is available.
- A missing MIME value is valid and must be returned as `undefined`, `null`, or
  an equivalently documented absent value accepted by the core.
- Do not infer MIME type from a filename, URI suffix, or extension alone.
- Do not reject an absent, generic, or unsupported platform MIME value; allow
  the portable core to perform byte-signature fallback.
- Do not include a URI, filename, or sensitive filesystem path in MIME-related
  errors or logs.

For approved `file://` input, use a trustworthy platform MIME source only if
one is available. Otherwise return no MIME value and rely on portable
signature detection.

## 7. Error mapping

The reader boundary must expose only sanitized behavior that the portable core
can map to its stable errors:

| Android or Java condition                                        | Required portable result                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------- |
| Missing permission or denied URI grant detected by `canAccess`   | `canAccess` returns `false`, producing `URI_ACCESS_DENIED` |
| `SecurityException` during access validation                     | Sanitized access denial, producing `URI_ACCESS_DENIED`     |
| Inaccessible or disallowed URI                                   | `canAccess` returns `false`, producing `URI_ACCESS_DENIED` |
| `FileNotFoundException` because the authorized source is missing | Sanitized read failure, producing `IMAGE_READ_FAILED`      |
| `null` stream                                                    | Sanitized read failure, producing `IMAGE_READ_FAILED`      |
| Interrupted, stalled, truncated, or incomplete read              | Sanitized read failure, producing `IMAGE_READ_FAILED`      |
| Unexpected `IOException` or runtime read failure                 | Sanitized read failure, producing `IMAGE_READ_FAILED`      |

An access revocation or `SecurityException` may occur after `canAccess`
succeeds but before or during `read`. The required result remains
`URI_ACCESS_DENIED`. Before crossing the portable boundary, the future
production reader must translate that Android or Java failure into
`ClassifiedImageReaderError` with classification `URI_ACCESS_DENIED`.

Other expected read failures must use the only other allowed classification,
`IMAGE_READ_FAILED`. Unknown reader exceptions, malformed classifications, and
unsupported classifications become `IMAGE_READ_FAILED`. The reader must not
use the classified boundary to inject MIME, size, empty-image, or encoding
decisions owned by the portable core.

The reader must never emit image bytes, Base64, credentials, URI query values,
filenames, canonical paths, or sensitive filesystem paths in error messages,
logs, telemetry, or wrapped causes. The public portable error does not retain
the original Android or Java exception as a cause.

## 8. Resource lifecycle

The implementation must use guaranteed cleanup paths equivalent to
`try`/`finally` for every acquired resource. Cleanup applies on both success
and failure and covers:

- `InputStream`;
- `ByteArrayOutputStream`, if used;
- `ParcelFileDescriptor`, if used;
- `Cursor`, if used;
- read buffers and accumulated Java byte arrays;
- temporary AutoJs6 Java and JavaScript references;
- the final `Uint8Array` reference after its caller releases it.

Resources must close in reverse acquisition order. Cleanup failures must not
replace the primary sanitized failure, reveal sensitive details, or leave a
successful result backed by a closed or reused buffer. No cursor or descriptor
may be acquired unless the implementation actually needs it.

## 9. Memory controls

- A metadata-reported size may be used as an optional pre-read hint only.
- Metadata size must never be trusted as the final image size.
- The portable core remains authoritative for validation of the actual byte
  length it receives against `maxSizeBytes`.
- The reader must use bounded chunks and enforce a separate, configured
  reader-side safety ceiling to prevent unbounded accumulation.
- The reader safety ceiling must be explicit, positive, documented, and not
  lower than the active portable-core limit for the same operation.
- When a stream exceeds the safety ceiling, the reader must stop, clean up,
  and raise a sanitized read failure. It must never return truncated bytes.
- The reader must not Base64-encode or persist Base64.
- The reader must not create a temporary image file by default.
- Intermediate full-image buffers must be released as soon as their data has
  been safely transferred.

The concrete safety ceiling is unresolved and must be selected with the
portable limit, supported devices, and provider constraints before
implementation.

## 10. Android permission requirements

The production reader must honor URI grants supplied by the approved Android
picker or gallery selection flow.

- Treat temporary grants as valid only for their granted lifetime.
- Request a persistable URI permission only when the selected provider
  supports it and the approved workflow requires access beyond the temporary
  grant.
- Do not assume every returned URI supports persistable permission.
- After revocation or process-lifetime expiration, `canAccess` must deny access
  and the reader must not attempt a bypass.
- Do not assume broad storage permission is available or required.
- Request only the minimum permissions required by the final approved
  selection flow and Android version.

Android picker choice, minimum/target API levels, manifest declarations,
photo-picker behavior, and version-specific media permissions are unresolved.
They must be decided from the approved product flow and verified runtime
evidence before implementation; this specification does not invent an exact
manifest or API-level policy.

## 11. AutoJs6 compatibility assumptions

The current known target is **AutoJs6 v6.7.0 on `arm64-v8a`**. The following
are assumptions, not verified facts:

- the script can obtain a usable context and call
  `context.getContentResolver()`;
- required Android and Java classes can be imported or referenced through the
  supported AutoJs6 bridge;
- Java byte arrays can be converted losslessly to `Uint8Array`;
- the chosen API supports deterministic cleanup of Java resources;
- the reader can execute blocking I/O away from the Android UI thread;
- the integration can define safe asynchronous behavior around blocking Java
  stream reads;
- the target AutoJs6 version supports every selected bridge operation.

Each assumption requires later verification on the target device. Large image
reads must not run on the UI thread. The exact worker/threading mechanism is
unresolved until AutoJs6 v6.7.0 behavior is verified.

## 12. Required offline tests

A future production-reader implementation must isolate Android calls behind
mockable boundaries and include deterministic offline tests for:

1. access allowed;
2. access denied;
3. a valid platform MIME value;
4. an absent platform MIME value;
5. a `null` stream;
6. multiple partial reads that reconstruct the exact source bytes;
7. a read failure;
8. cleanup after success;
9. cleanup after failure;
10. the reader-side safety limit;
11. sanitized errors containing no source bytes, Base64, credentials, or
    sensitive paths.

Mocks may represent Android and Java behavior but must not be described as
production compatibility tests.

## 13. Required later device tests

User-assisted verification must later run on the **Vivo X Fold5 with
AutoJs6**. It must cover:

- a real `content://` JPEG;
- a real `content://` PNG;
- a real `content://` WebP;
- real HEIC and HEIF images where the device and gallery provide them;
- revoked or expired URI permission;
- a missing or deleted image;
- an image that exceeds the configured reader safety ceiling;
- repeated multi-image reads;
- memory behavior before, during, and after repeated reads;
- cleanup of streams, descriptors, cursors, and temporary references after
  success and failure;
- confirmation that no image bytes or Base64 are logged or persisted.

The user must provide or authorize the device, AutoJs6 environment, gallery
selection, permissions, and representative test images. Device testing is not
required for this specification-only task.

## 14. Completion criteria

The complete Android Image Input Adapter V1.0 remains **NOT YET MIGRATED**
until all of the following are true:

1. the portable core is merged;
2. production reader source exists;
3. offline production-adapter tests exist;
4. integration documentation exists;
5. repository checks and the secret scan pass;
6. the production implementation pull request is reviewed and merged;
7. Android and AutoJs6 device verification is completed with user
   participation.

At this specification milestone, only the first criterion is satisfied. This
document does not count as production reader source, offline adapter tests, a
merged implementation pull request, or device verification.
