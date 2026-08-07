# Contributor Engine V1.0 integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/contributor-engine-v1.md`
- Portable core: `src/core/contributor-engine.js`
- Offline tests: `tests/core-contributor-engine.test.js` (9/9 pass)
- Integration documentation: this document

## Overview

Contributor Engine V1.0 defines the contract for entering validated AI
metadata into the Contributor Android app. It validates metadata and delegates
field entry to an injected UI adapter.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Queue-AI Orchestrator V1.0                              │
│  ──────────────────────────                              │
│  { description, keywords }                               │
│              │                                           │
│              ▼                                           │
│  Contributor Engine V1.0 (portable core)                 │
│  ──────────────────────────────                          │
│  enterContributorMetadata({                              │
│    description, keywords, uiAdapter                      │
│  })                                                      │
│              │                                           │
│              ▼                                           │
│  Mock UI Adapter / AutoJs6 UI Adapter                    │
│  ──────────────────────────────────                      │
│  Populate Contributor app fields                         │
│              │                                           │
│              ▼                                           │
│  { entered: true, pendingReview: true }                  │
│              │                                           │
│              ▼                                           │
│  User review → manual submission                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Runtime boundary contract

### Contributor Engine input

| Field         | Type       | Description                     |
| ------------- | ---------- | ------------------------------- |
| `description` | `string`   | Validated English description   |
| `keywords`    | `string[]` | Exactly 7 English keywords      |
| `uiAdapter`   | `function` | Injected UI field entry adapter |

### Contributor Engine output

| Field           | Type      | Description                    |
| --------------- | --------- | ------------------------------ |
| `entered`       | `boolean` | Whether fields were populated  |
| `pendingReview` | `boolean` | Always true; user must confirm |

## Error mapping

| Code                 | Condition                            |
| -------------------- | ------------------------------------ |
| `FIELD_ENTRY_FAILED` | UI adapter could not populate fields |
| `METADATA_INVALID`   | Metadata does not pass validation    |

## Security rules

1. The engine never stores metadata beyond the current entry operation.
2. The engine never automates final submission; user review is required.
3. All metadata is validated before entry.
4. Error messages are sanitized.

## Test coverage

- Valid metadata with successful UI adapter
- `pendingReview` always true on success
- UI adapter receives validated data
- UI adapter failure → `FIELD_ENTRY_FAILED`
- Invalid description/keywords → `METADATA_INVALID`
- Missing uiAdapter → `TypeError`
- Error messages do not contain metadata content

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed portable core source (`src/core/contributor-engine.js`)
2. ✅ Offline tests (9/9 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification deferred until production adapter implementation
