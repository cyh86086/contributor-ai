# Mock UI Adapter specification

## Status

- Historical target module: Mock UI Adapter
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: test-only; no production runtime
- Portable core: runtime-neutral, no Android, AutoJs6, or UI dependencies

## Purpose

Mock UI Adapter is a test double that implements the UI adapter interface
used by the Contributor Engine V1.0. It records field entry calls for
verification, can be configured to succeed or fail, and provides inspection
of entered data.

The mock adapter is not a production adapter. It exists only for offline
testing of the Contributor Engine contract.

## Production flow position

```text
Contributor Engine V1.0
  -> enterContributorMetadata({ description, keywords, uiAdapter })
  -> Mock UI Adapter (test) / AutoJs6 UI Adapter (production)
```

## Contract

### createMockUIAdapter(options)

| Option       | Type      | Description                          |
| ------------ | --------- | ------------------------------------ |
| `shouldFail` | `boolean` | If true, the adapter throws on entry |

### Returns

A `uiAdapter` function that:

1. Records each call with `{ description, keywords }`.
2. If `shouldFail` is true, throws an error.
3. Otherwise, returns successfully.

### Inspection methods

| Method           | Returns    | Description                            |
| ---------------- | ---------- | -------------------------------------- |
| `getCallCount()` | `number`   | Number of times the adapter was called |
| `getLastCall()`  | `object    | null`                                  | The last `{ description, keywords }` |
| `getAllCalls()`  | `object[]` | All recorded calls                     |
| `reset()`        | `void`     | Clear all recorded calls               |

## Runtime designation

- **Test utility:** `src/core/mock-ui-adapter.js` is runtime-neutral. It is
  used only in offline tests. It has no production runtime dependency.

## Test coverage

Offline tests verify:

- Successful entry records the call.
- `shouldFail: true` causes the adapter to throw.
- `getCallCount()` returns correct count.
- `getLastCall()` returns the most recent entry.
- `getAllCalls()` returns all entries.
- `reset()` clears recorded calls.
- Multiple calls are recorded in order.

## Migration completion criteria

The Mock UI Adapter module is **MIGRATED** when all of the following exist in
GitHub:

1. the reviewed source (`src/core/mock-ui-adapter.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is not applicable (test-only module).
