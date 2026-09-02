---
title: Connect
description: Point Claude Code, Cursor, or any HTTP MCP client at processd-mcp.
---

Install first ([Linux binary](/terminal), [sandbox cluster](/cluster), or [macOS app](/desktop)). Connecting is the same after that: streamable HTTP, plus a token header.

## Wire

| | |
| --- | --- |
| Transport | Streamable HTTP, **not** TLS |
| MCP | `http://<host>:<port>/mcp` — tools return text **and** `structuredContent` |
| MCP text-only | `http://<host>:<port>/mcp/text-only` — same tools, `structuredContent` stripped; use this when the client only consumes `content` text |
| Auth | `X-Access-Token: <token>` on `/mcp`, `/mcp/text-only`, and `/sdk/file` |
| Health | `GET /health` — no token, expect **204** |

```bash
curl -i http://127.0.0.1:8080/health
```

## Client config

Drop this into Claude Code (`.mcp.json`) or Cursor MCP settings. Change `url` and the token.

```json
{
  "mcpServers": {
    "daimon": {
      "type": "http",
      "url": "http://127.0.0.1:8080/mcp",
      "headers": {
        "X-Access-Token": "<PROCESSD_TOKEN>"
      }
    }
  }
}
```

For text-only, set `url` to `http://127.0.0.1:8080/mcp/text-only`. Some clients call the type `streamable_http` instead of `http`. The URL and header are what the kernel checks.

## Which URL

| You installed | `url` | Token |
| --- | --- | --- |
| [Linux binary](/terminal) | `http://127.0.0.1:8080/mcp` (or `.../mcp/text-only`), or the Tailscale host you bound | `PROCESSD_TOKEN` in `/etc/processd-mcp/processd-mcp.env` |
| [macOS app](/desktop) | The MCP URL on the overview (loopback, app port); append `/text-only` if needed | Token the app generated — Copy JSON on the overview |
| [Sandbox cluster](/cluster) | After `create_sandbox`: `mcp_url`, e.g. `http://127.0.0.1:18081/sandboxes/<id>/mcp`, or `.../mcp/text-only` | Sandbox `token`, not a scheduler/manager token |

Cluster mode has **no** `/mcp` on the scheduler or manager. Create a sandbox with [daimon-sdk](/sdk) first (`DaimonManagerClient("http://127.0.0.1:18081")` → `create_sandbox()`), then either call tools through the SDK or put that `mcp_url` + token into the JSON above.

Python, talking to a kernel directly:

```python
from daimon_sdk import DaimonClient

async with DaimonClient("http://127.0.0.1:8080/mcp", access_token=token) as client:
    runtime = await client.runtime.get_context()
    print(runtime.base_workdir)
```
