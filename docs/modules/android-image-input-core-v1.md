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
