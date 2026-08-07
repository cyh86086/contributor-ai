# Contributor Engine V1.0 specification

## Status

- Historical target module: Contributor Engine V1.0
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no Contributor app or AutoJs6 UI dependencies

## Purpose

Contributor Engine V1.0 defines the contract for entering validated AI
metadata into the Contributor Android app. It takes validated description and
keywords, validates the entry contract, and delegates to an injected UI
adapter for the actual field entry.

The engine does not select images, call AI providers, manage a queue, or
submit content. It stops at field entry; the user reviews and manually
confirms final submission.

## Production flow position

```text
Queue-AI Orchestrator V1.0
  -> { description, keywords }
  -> Contributor Engine V1.0     <- this module
  -> Mock UI Adapter / AutoJs6 UI Adapter
  -> Contributor app fields populated
  -> user review
  -> manual submission
```

## Portable core contract

### Input

| Field         | Type       | Description                                |
| ------------- | ---------- | ------------------------------------------ |
| `description` | `string`   | Validated English description < 2000 chars |
| `keywords`    | `string[]` | Exactly 7 English keywords                 |
| `uiAdapter`   | `function` | Injected UI field entry adapter            |

### Output

On success:

| Field           | Type      | Description                    |
| --------------- | --------- | ------------------------------ |
| `entered`       | `boolean` | Whether fields were populated  |
| `pendingReview` | `boolean` | Always true; user must confirm |

### Error codes

| Code                 | Condition                            |
| -------------------- | ------------------------------------ |
| `FIELD_ENTRY_FAILED` | UI adapter could not populate fields |
| `METADATA_INVALID`   | Metadata does not pass validation    |

Input validation errors (missing fields, wrong types) are `TypeError`
exceptions indicating contract violations.

## Runtime designation

- **Portable core:** `src/core/contributor-engine.js` is runtime-neutral. It
  has no dependency on Node.js, AutoJs6, Android, the Contributor app, or UI
  automation APIs.
- **Production adapter:** The AutoJs6 UI adapter is not implemented yet. It
  will use AutoJs6 accessibility APIs to populate the Contributor app fields.

## Security rules

1. The engine never stores metadata beyond the current entry operation.
2. The engine never automates final submission; user review is required.
3. All metadata is validated before entry.
4. Error messages are sanitized; no metadata content is included.

## Test coverage

Offline tests verify:

- Valid metadata with successful UI adapter returns `entered: true`.
- Invalid metadata throws `TypeError` or `METADATA_INVALID`.
- UI adapter failure returns `FIELD_ENTRY_FAILED`.
- `pendingReview` is always true on success.
- Input validation (missing description, wrong keyword count).
- Error messages do not contain metadata content.

## Migration completion criteria

The Contributor Engine V1.0 module is **MIGRATED** when all of the following
exist in GitHub:

1. the reviewed portable core source (`src/core/contributor-engine.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is deferred until production adapter implementation.
