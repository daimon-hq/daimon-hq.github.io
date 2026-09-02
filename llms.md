---
title: Introduction
description: MCP control of a remote Linux terminal, with the same tool surface as Claude Code.
---

DAIMON exposes an MCP server whose tools line up with Claude Code's built-ins — `Bash`, `Read`, `Write`, `Edit`, `Glob`, `Grep`, `WebFetch`, plus a PTY session. Point an MCP client at a Linux host and the agent drives that machine's terminal as if the tools were local.

The kernel is a single Rust binary (static musl, `amd64` / `arm64`). The same runtime is bundled in the sandbox-manager image and the macOS desktop app.

The wire is **plain HTTP**. There is no TLS. Do not expose the port on the public internet.

## Quick start (Debian / Ubuntu)

```bash
curl -fsSL https://github.com/daimon-hq/release/releases/latest/download/install-processd-kernel.sh | sudo bash -s -- install

# Default bind is 127.0.0.1:8080 in /etc/processd-mcp/processd-mcp.env
# To listen on another address, set MCP_HOST yourself (do not use 0.0.0.0 on a public NIC).
# Prefer Tailscale: bind the tailnet IP (tailscale ip -4) or keep loopback and use tailscale serve.
curl -i http://127.0.0.1:8080/health   # 204
sudo awk -F= '/^PROCESSD_TOKEN=/{print $2}' /etc/processd-mcp/processd-mcp.env
```

Paste this into Claude Code (`.mcp.json`) or Cursor MCP settings, replacing the token. If you bound a Tailscale IP, put that host in `url` instead of `127.0.0.1`.

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

Other clients, cluster, and desktop URLs: [Connect](/connect). Other distros, Tailscale, upgrade: [Linux binary](/terminal).

## Core MCP tools

| Tool | Role |
| --- | --- |
| `Bash` | Run a shell command; long jobs can move to the background. |
| `Read` / `Write` / `Edit` | Read, write, and patch files (text, images, PDF pages). |
| `Glob` / `Grep` | Find files by pattern; search contents with ripgrep. |
| `WebFetch` | Fetch a URL through the sandbox instead of shell `curl`. |
| `exec_command` / `write_stdin` | Interactive PTY session when you need a real TTY. |
| `GetRuntimeContext` | Workdir, filesystem/network policy, and tool capabilities. |

Clients send `X-Access-Token`. `/health` is unauthenticated.

## Tutorials

<Cards>
  <Card
    title="Linux binary"
    href="/terminal"
    description="Static musl binary on any Linux. One-liner installer is Debian/Ubuntu + systemd. Put Tailscale in front — MCP is not encrypted."
  />
  <Card
    title="Sandbox cluster"
    href="/cluster"
    description="Scheduler in front, manager containers, nsjail sandboxes built inside each manager."
  />
  <Card
    title="macOS app"
    href="/desktop"
    description="Launch the desktop app, edit policy visually, run the kernel locally."
  />
  <Card
    title="Connect"
    href="/connect"
    description="Claude Code, Cursor, or the SDK: URL + X-Access-Token."
  />
  <Card
    title="Configuration"
    href="/config"
    description="Environment file and sandbox-policy.yaml: host, token, paths, network."
  />
</Cards>

Assets come from [daimon-hq/release](https://github.com/daimon-hq/release/releases) **latest**. A new `core-v*` or `gui-v*` tag updates what the install commands download.
