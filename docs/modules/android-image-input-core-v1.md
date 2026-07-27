# Android Image Input Core V1.0 integration

## Scope

This integration document covers the portable core portion of the Android
Image Input Adapter V1.0 specification. The implementation lives in
`src/core/image-input.js` and has no Android, AutoJs6, Node.js, filesystem,
network, provider SDK, or Contributor app UI imports.

This work does not complete or migrate the historical Android Image Input
Adapter V1.0 module.

## Portable entry point

`prepareImageInput(options)` accepts:

- `sourceUri`: a non-empty `content://` URI or a policy-approved `file://` URI;
- `maxSizeBytes`: a positive safe integer;
- `reader`: an injected object providing asynchronous `canAccess(sourceUri)`
  and `read(sourceUri)` methods;
- `isFileUriApproved`: an optional synchronous or asynchronous policy
  function; its secure default denies all `file://` URIs;
- `encodeBase64`: an optional provider-neutral encoder used for deterministic
  failure testing; the default is a portable in-memory Base64 encoder.

The reader returns `{ bytes, mimeType }`, where `bytes` is a `Uint8Array` or
`ArrayBuffer` and `mimeType` may be absent. The core returns:

```json
{
  "sourceUri": "content://media/external/images/media/42",
  "mimeType": "image/jpeg",
  "sizeBytes": 123456,
  "imageBase64": "raw Base64 without a data URL prefix"
}
```

## Dependency and lifecycle boundary

The portable core owns validation, MIME normalization and signature fallback,
size enforcement, sanitized stable errors, and Base64 output. It does not open
streams or acquire platform resources.

A future production reader must own Android permission checks,
`ContentResolver` access, approved `file://` access, complete byte reads, and
cleanup of streams, descriptors, cursors, buffers, and URI references after
success or failure.

No Android production reader or AutoJs6 adapter is included in this work.

## Classified reader error boundary

The portable core exports `ClassifiedImageReaderError` and
`IMAGE_READER_ERROR_CLASSIFICATIONS` for an injected reader to classify a
failure before it crosses the runtime boundary. The only allowed
classifications are:

- `URI_ACCESS_DENIED`;
- `IMAGE_READ_FAILED`.

An explicitly classified `URI_ACCESS_DENIED` thrown by `reader.read()` becomes
the existing public `ImageInputError` with code `URI_ACCESS_DENIED`. An
explicitly classified `IMAGE_READ_FAILED`, an unknown exception, a malformed
tagged value, or an unsupported classification becomes `IMAGE_READ_FAILED`.

The reader cannot use this contract to inject `EMPTY_IMAGE`,
`IMAGE_TOO_LARGE`, `UNSUPPORTED_MIME_TYPE`, or `ENCODING_FAILED`; those
decisions remain exclusively owned by the portable core.

The public error is newly constructed from the existing fixed code and
message. The reader exception is not attached as a cause, and its message,
stack, URI values, paths, filenames, bytes, Base64, credentials, and runtime
details are not copied.

Future Android and Java exceptions must be translated by the production reader
to one of the two allowed classifications before crossing this boundary.

The production reader implementation is isolated at
`src/autojs6/android-image-reader.js`. Its offline integration tests prove that
classified read-time revocation reaches this boundary as `URI_ACCESS_DENIED`,
ordinary failures remain `IMAGE_READ_FAILED`, MIME fallback still runs in the
core, and actual byte-size policy remains owned by the core.

## Offline verification

`tests/image-input-core.test.js` runs under Node.js as a deterministic offline
harness. It covers portable behavior and injected failures only. Node.js is not
the production runtime, and these tests cannot verify Android permissions,
`ContentResolver`, AutoJs6 compatibility, device MIME reporting, or resource
cleanup.

## Deferred production verification

Android device or emulator verification remains deferred and requires future
user action. It must follow the integration-test requirements in
[`android-image-input-adapter-v1.md`](android-image-input-adapter-v1.md) after
the Android/AutoJs6 runtime adapter exists.
