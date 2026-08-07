# Contributor UI Adapter V1.0

## Status

- Module: Contributor UI Adapter V1.0
- Runtime designation: **production Android runtime hosted by AutoJs6**
- Portable core dependency: `src/core/contributor-engine.js` (enterContributorMetadata)
- Specification: this document

## Overview

Contributor UI Adapter V1.0 is the production adapter that opens the
Contributor Android app and populates the Description and Keywords fields
through AutoJs6 UI automation. It implements the `uiAdapter` contract
required by the portable core's `enterContributorMetadata()`.

## Interface

### createContributorUIAdapter(config)

| Field             | Type       | Description                               |
| ----------------- | ---------- | ----------------------------------------- |
| `appLauncher`     | `function` | Launches the Contributor app by package   |
| `findDescription` | `function` | Finds the Description field UI element    |
| `findKeywords`    | `function` | Finds the Keywords field UI element       |
| `waitMs`          | `number`   | Max wait for UI elements (default: 10000) |

### Returns

A function matching the `uiAdapter` contract:

```javascript
async function uiAdapter({ description, keywords }) {
  // Opens Contributor app and fills Description + Keywords fields
}
```

## Dependency contract

### appLauncher

`appLauncher(packageName)` → launches the app. Throws on failure.

### findDescription / findKeywords

Each function receives a timeout in milliseconds and returns a UI element
with a `setText(text)` method. Throws if the element is not found within
the timeout.

## Error handling

- App launch failure → thrown as `Error` (mapped to `FIELD_ENTRY_FAILED`)
- UI element not found within timeout → thrown as `Error`
- `setText()` failure → thrown as `Error`
- The portable core maps all thrown errors to `FIELD_ENTRY_FAILED`

## Security and privacy

- Description and keywords not logged
- No metadata persisted beyond the current entry operation
- Final submission is never automated; user must manually confirm

## Test strategy

Offline tests inject mock dependencies to verify:

- Successful field entry (app launch + setText for both fields)
- Description receives the correct text
- Keywords joined with commas and set correctly
- App launch failure handling
- Description field not found handling
- Keywords field not found handling
- setText failure handling
- Input validation (missing dependencies)
- Error sanitization (no metadata in error messages)
