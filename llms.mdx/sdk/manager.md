---
title: Manager
description: DaimonManagerClient manages sandbox lifecycle against processd-sandbox-manager.
---

High-level client that talks to the processd-sandbox-manager HTTP API. Manages sandbox lifecycle — create, find-or-create, start, stop, delete.

## DaimonManagerClient

```python
DaimonManagerClient(base_url, *, access_token=None, timeout_s=30.0)
```

Construct a manager client targeting the sandbox manager HTTP endpoint.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `base_url` | `str` | | Scheduler (or manager) HTTP endpoint (e.g. `http://127.0.0.1:18081`). |
| `access_token` | `str \| None` | `None` | Access token for `X-Access-Token` header. |
| `timeout_s` | `float` | `30.0` | HTTP request timeout. |

### `async manager.health() -> bool`

Check if the manager is reachable and healthy.

### `async manager.capacity() -> ManagerCapacityResult`

Get current capacity info — memory, PID, CPU limits and usage.

```python
capacity = await manager.capacity()
print(capacity.mode, capacity.memory_bytes.available)
```

### `async manager.create_sandbox() -> DaimonSandbox`

Create a fresh sandbox workspace.

### `async manager.find_or_create_sandbox(*, labels, ttl_seconds=None) -> DaimonSandbox`

Find a sandbox by labels or create one if none matches. Useful for thread-scoped sandbox reuse.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `labels` | `dict[str, str]` | | Labels to match against existing sandboxes. |
| `ttl_seconds` | `int \| None` | `None` | Time-to-live in seconds for the sandbox. |

```python
sandbox = await manager.find_or_create_sandbox(
    labels={"thread_id": "chat-123"},
    ttl_seconds=3600,
)
```

### `async manager.get_sandbox(sandbox_id) -> SandboxInfo`

Get sandbox info by ID.

### `async manager.start_sandbox(sandbox_id) -> SandboxInfo`

Start (resume) a stopped sandbox.

### `async manager.stop_sandbox(sandbox_id) -> SandboxInfo`

Stop (pause) a running sandbox.

### `async manager.delete_sandbox(sandbox_id) -> None`

Delete a sandbox and its workspace permanently.

### `manager.sandbox(*, delete_on_exit=True) -> SandboxContext`

Return an async context manager that creates, connects, and optionally deletes a sandbox.

```python
async with manager.sandbox() as sandbox:
    result = await sandbox.exec.bash("pwd")
    print(result.display_text)
```

## DaimonSandbox

Wraps a sandbox info and its connected MCP client. Exposes the same namespaces as `DaimonClient`.

- `sandbox.info -> SandboxInfo`
- `sandbox.id -> str`
- `sandbox.runtime -> RuntimeAPI`
- `sandbox.files -> FilesAPI`
- `sandbox.exec -> ExecAPI`
- `sandbox.web -> WebAPI`
- `sandbox.raw -> RawAPI`
- `sandbox.refresh() -> SandboxInfo`
- `sandbox.start() -> SandboxInfo`
- `sandbox.stop() -> SandboxInfo`
- `sandbox.delete() -> None`

## SandboxContext

Async context manager returned by `manager.sandbox()`. Creates a sandbox on enter, connects the client, and optionally deletes on exit.
