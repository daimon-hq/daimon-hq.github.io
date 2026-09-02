---
title: Configuration
description: Environment variables and sandbox-policy.yaml for processd-mcp and the sandbox manager.
---

Two files matter on a Linux binary install:

| File | Role |
| --- | --- |
| `/etc/processd-mcp/processd-mcp.env` | Process environment. systemd `EnvironmentFile`. |
| Policy YAML (optional) | Kernel sandbox. Path in `MCP_SANDBOX_POLICY_FILE`. |

The desktop app writes the same YAML schema through the GUI. The manager image is configured with `PROCESSD_MANAGER_*` env vars in compose.

There is **no hot reload**. Change env or YAML, then restart the process.

## Kernel environment

The installer creates `/etc/processd-mcp/processd-mcp.env` mode `600`:

```bash
MCP_HOST=127.0.0.1
MCP_PORT=8080
PROCESSD_TOKEN=<random hex>
```

| Variable | Default | Meaning |
| --- | --- | --- |
| `MCP_HOST` | `0.0.0.0` without the installer; installer sets `127.0.0.1` | Bind address. See [Linux binary](/terminal#no-tls--use-tailscale). |
| `MCP_PORT` | `8080` | Listen port. |
| `PROCESSD_TOKEN` | unset (no auth) | Value of `X-Access-Token`. Always set this. |
| `MCP_SANDBOX_POLICY_FILE` | unset (no kernel sandbox) | Absolute path to policy YAML. |
| `MCP_SANDBOX_RUNTIME_DIR` | `$TMPDIR/processd-mcp/sandbox` | Helper runtime dir. |
| `MCP_DEFAULT_SHELL` | `$SHELL` or `/bin/bash` | Shell for `Bash`. |
| `MCP_ALLOW_ESCALATED` | `false` | Break-glass: skip sandbox for shell tools. Keep `false` in production. |
| `MCP_ALLOW_LOGIN_SHELL` | `true` | Login shell for `Bash`. |
| `MCP_BASH_DEFAULT_TIMEOUT_MS` | `120000` | Default `Bash` timeout. |
| `MCP_BASH_MAX_TIMEOUT_MS` | `600000` | Hard max timeout. |
| `MCP_WEB_FETCH_DEFAULT_TIMEOUT_MS` | `30000` | `WebFetch` timeout. |
| `MCP_WEB_FETCH_DEFAULT_MAX_BYTES` | `2 MiB` | `WebFetch` body cap. |

`PROCESSD_ENV_*` copies into the command environment (prefix stripped). Example: `PROCESSD_ENV_TERM=linux` becomes `TERM=linux` inside `Bash`.

Edit the env file, then:

```bash
sudo systemctl restart processd-mcp
```

## Policy YAML

See [Sandbox policy](/config/policy) for the full schema and a worked example.

## Manager

Compose sets these on `processd-sandbox-manager`. The important ones:

| Variable | Typical | Meaning |
| --- | --- | --- |
| `PROCESSD_MANAGER_HOST` / `PORT` | `0.0.0.0` / `18080` | Manager HTTP API (compose network). Clients talk to the scheduler on `:18081`. |
| `PROCESSD_MANAGER_PUBLIC_MCP_HOST` | LAN or Tailscale IP, **not** `0.0.0.0` | Host clients use to reach sandbox MCP workers. |
| `PROCESSD_MANAGER_PUBLIC_BASE_URL` | `http://127.0.0.1:18080` | Base URL returned by the manager. Scheduler rewrites this to its own `public_base_url`. |
| `PROCESSD_MANAGER_LIMITS_MODE` | `required` in release compose | Fail sandbox create if cgroups cannot apply. |
| `PROCESSD_MANAGER_SANDBOX_TTL_SECONDS` | `3600` | Idle sandbox lifetime. |

Cluster walkthrough: [Sandbox cluster](/cluster).
