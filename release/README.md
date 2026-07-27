# Release

Release-specific notes, manifests, and packaging configuration belong here.

Before publishing a release:

1. Run `npm ci`.
2. Run `npm run check`.
3. Confirm the changelog and version are accurate.
4. Build from a clean, tagged commit.
5. Publish through an authenticated CI environment.

Do not store registry tokens or signing credentials in this directory.
