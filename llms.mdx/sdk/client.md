---
title: Client
description: DaimonClient connects directly to a sandbox MCP endpoint.
---

Low-level client that connects directly to a sandbox MCP endpoint. Use this when you already have a sandbox URL and token. For lifecycle management, prefer [DaimonManagerClient](/sdk/manager).

## DaimonClient

```python
DaimonClient(base_url, *, access_token=None, timeout_s=30.0)
```

Construct a client targeting a sandbox MCP endpoint.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `base_url` | `str` | | Sandbox MCP endpoint URL (e.g. `http://127.0.0.1:8080/mcp`). |
| `access_token` | `str \| None` | `None` | Optional access token sent as `X-Access-Token` header. |
| `timeout_s` | `float` | `30.0` | HTTP request timeout in seconds. |

<Callout title="Connection lifecycle">
  Use async context manager (`async with DaimonClient(...) as client:`) or call `await client.connect()` / `await client.close()` manually.
</Callout>

## RawAPI

Escape hatch for calling arbitrary MCP tools when the typed surface does not cover your use case.

```python
async raw.call_tool(name, arguments=None, *, raise_on_error=True) -> dict[str, Any]
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `str` | | MCP tool name (e.g. `'GetRuntimeContext'`). |
| `arguments` | `dict \| None` | `None` | Tool arguments as a dictionary. |
| `raise_on_error` | `bool` | `True` | Raise `DaimonToolError` on tool failure if True. |

```python
payload = await client.raw.call_tool(
    "GetRuntimeContext",
    {},
)
print(payload["baseWorkdir"])
```

## RuntimeAPI

Access sandbox runtime context including base workdir, filesystem policy, network policy, and capabilities.

```python
async runtime.get_context() -> RuntimeContextResult
```

```python
runtime = await client.runtime.get_context()
print(runtime.base_workdir)
print(runtime.capabilities)
```
