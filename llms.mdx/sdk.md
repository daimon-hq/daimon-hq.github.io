---
title: Python SDK
description: Typed async Python SDK for DAIMON sandbox manager. Create sandboxes and call file, exec, web, and raw MCP APIs.
---

`daimon-sdk` **v0.5.4** wraps the MCP tool surface exposed by `processd-mcp` as grouped Python APIs such as `client.files.read()` and `client.exec.start_session()`.

Requires Python 3.12+. The SDK uses httpx for HTTP transport and supports both manager-backed and direct MCP connections.

## Installation

```bash
pip install daimon-sdk
```

PyPI: [daimon-sdk](https://pypi.org/project/daimon-sdk/)

## Start the cluster locally

Walkthrough, compose, and cgroup notes: [Sandbox cluster](/cluster). Short form:

```bash
for f in compose.manager.yaml compose.manager.cgroup.yaml compose.manager.scheduler.yaml scheduler-config.local.yaml; do
  curl -LO "https://daimon-hq.github.io/scripts/$f"
done
PROCESSD_MANAGER_LIMITS_MODE=required docker compose \
  -p processd-local \
  -f compose.manager.yaml \
  -f compose.manager.cgroup.yaml \
  -f compose.manager.scheduler.yaml \
  up -d --force-recreate processd-sandbox-manager processd-scheduler
curl -i http://127.0.0.1:18081/health
```

## Quickstart

Use `DaimonManagerClient` when your application owns sandbox lifecycle. The context manager creates a sandbox, connects to its MCP server, and deletes it on exit by default.

```python
import asyncio

from daimon_sdk import DaimonManagerClient


async def main() -> None:
    async with DaimonManagerClient("http://127.0.0.1:18081") as manager:
        async with manager.sandbox() as sandbox:
            runtime = await sandbox.runtime.get_context()
            print(runtime.base_workdir)

            result = await sandbox.exec.bash("python3 --version")
            print(result.display_text)

            uploaded = await sandbox.files.upload_bytes(
                "artifacts/hello.bin",
                b"hello from daimon-sdk",
            )
            print(uploaded.file_path, uploaded.bytes_written)


asyncio.run(main())
```

<Callout>
  If you already have an MCP URL and token, use [DaimonClient](/sdk/client) directly.
</Callout>

Point `DaimonManagerClient` at the scheduler (`:18081`). It is wire-compatible with the manager API — no separate scheduler client. Scheduler sandbox IDs are signed, opaque routing tokens; store and pass them back unchanged. There is no scheduler `/mcp`: create a sandbox first, then use `mcp_url` + `token` (or keep talking through the SDK).
