---
title: Authentication
description: Manager tokens protect the control plane. Sandbox MCP tokens are wired automatically.
---

Manager access tokens protect the control plane. Sandbox MCP tokens are returned by the manager and wired into `DaimonSandbox` automatically.

```python
from daimon_sdk import DaimonManagerClient

async with DaimonManagerClient(
    "http://127.0.0.1:18081",
    access_token="your-token",
) as manager:
    sandbox = await manager.create_sandbox()
    await sandbox.connect()

    runtime = await sandbox.runtime.get_context()
    print(runtime.capabilities)
```

<Callout>
  `DaimonManagerClient` sends `X-Access-Token` to manager APIs. Direct `DaimonClient` also sends `X-Access-Token` to MCP and `/sdk/file` when you pass `access_token`.
</Callout>
