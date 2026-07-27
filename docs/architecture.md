# Architecture

Contributor AI follows a small set of explicit boundaries so infrastructure
choices do not leak into contribution workflows.

## Components

- `launcher` composes the application and owns process-level behavior.
- `queue` schedules units of work and exposes queue state.
- `ai_engine` validates prompts and coordinates provider calls.
- `provider` defines provider contracts and contains integrations.
- `contributor` implements repository contribution workflows.
- `ui` converts domain results into user-facing output.
- `utils` contains stateless, broadly reusable helpers.

## Dependency direction

The launcher may depend on every application component. Domain components
depend on contracts and utilities, not on the launcher or UI. Provider
implementations satisfy the AI engine contract and should remain replaceable.

```text
launcher -> contributor -> ai_engine -> provider
        \-> queue                 \-> utils
        \-> ui
```

## Security baseline

- Credentials must be supplied at runtime, never stored in source control.
- External input must be validated at component boundaries.
- Repository-changing actions should be explicit and auditable.
- Providers should receive only the minimum context required for a task.
- Logs must not contain secrets, tokens, or private repository contents.

## Extension points

Add a provider by implementing the `generate(request)` interface described in
`src/provider/provider.js`. Add durable scheduling behind the queue interface
without changing contributor workflows. Add UI surfaces by consuming domain
results rather than importing provider implementations directly.
