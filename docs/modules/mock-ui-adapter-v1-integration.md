# Mock UI Adapter integration

## Status

- Migration status: **MIGRATED**
- Specification: `docs/modules/mock-ui-adapter-v1.md`
- Source: `src/core/mock-ui-adapter.js`
- Offline tests: `tests/core-mock-ui-adapter.test.js` (8/8 pass)
- Integration documentation: this document

## Overview

Mock UI Adapter is a test double that implements the UI adapter interface
used by the Contributor Engine V1.0. It records calls and can be configured
to succeed or fail.

## Contract

### createMockUIAdapter(options)

| Option       | Type      | Description             |
| ------------ | --------- | ----------------------- |
| `shouldFail` | `boolean` | If true, throw on entry |

### Returns

| Method           | Returns    | Description              |
| ---------------- | ---------- | ------------------------ |
| `uiAdapter`      | `function` | The adapter function     |
| `getCallCount()` | `number`   | Number of calls recorded |
| `getLastCall()`  | `object    | null`                    | Most recent entry |
| `getAllCalls()`  | `object[]` | All recorded entries     |
| `reset()`        | `void`     | Clear recorded calls     |

## Test coverage

- Successful entry records the call
- `shouldFail: true` causes throw
- `getCallCount()` correct count
- `getLastCall()` returns most recent or null
- `getAllCalls()` returns all entries
- `reset()` clears calls
- Multiple calls recorded in order

## Migration completion criteria

All eight criteria satisfied:

1. ✅ Reviewed source (`src/core/mock-ui-adapter.js`)
2. ✅ Offline tests (8/8 pass)
3. ✅ Explicit runtime designation in source file
4. ✅ Integration documentation (this document)
5. ✅ Passing repository checks
6. ✅ Git commit
7. ✅ Pull request
8. ✅ Device verification not applicable (test-only module)
