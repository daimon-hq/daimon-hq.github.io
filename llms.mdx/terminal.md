---
title: Linux binary
description: Static musl processd-mcp for any Linux amd64/arm64. The one-liner installer is Debian/Ubuntu + systemd.
---

Use this when you already have a Linux server and want an MCP client to drive **that host's** terminal. No Docker.

The release binary is **static musl** (`processd-mcp-linux-amd64` / `processd-mcp-linux-arm64`). It does not link glibc, so it runs on generic Linux. The **install script** is the Debian/Ubuntu path: it needs `systemd`, writes a unit under `/etc/systemd/system`, and uses `apt`-style host layout.

## Install (Debian / Ubuntu)

```bash
curl -fsSL https://github.com/daimon-hq/release/releases/latest/download/install-processd-kernel.sh | sudo bash -s -- install
```

Writes `/usr/local/bin/processd-mcp`, systemd unit `processd-mcp.service`, and `/etc/processd-mcp/processd-mcp.env` (`MCP_HOST=127.0.0.1`, `MCP_PORT=8080`, random `PROCESSD_TOKEN`). Pin a tag with `PROCESSD_RELEASE_TAG=core-v0.1.13` if you do not want latest.

```bash
sudo systemctl status processd-mcp --no-pager
curl -i http://127.0.0.1:8080/health   # 204
sudo awk -F= '/^PROCESSD_TOKEN=/{print $2}' /etc/processd-mcp/processd-mcp.env
```

Then [connect an MCP client](/connect). Local URL is `http://127.0.0.1:8080/mcp`; after Tailscale, use that host instead.

## Other Linux

Download the matching binary and checksum from [daimon-hq/release](https://github.com/daimon-hq/release/releases/latest), verify SHA256, and run it yourself (your own unit file, OpenRC, or a foreground process). Set `MCP_HOST`, `MCP_PORT`, and `PROCESSD_TOKEN` in the environment. Same Tailscale rules as below.

## No TLS — use Tailscale

The endpoint is **plain HTTP**. The token is a shared secret, not encryption. Do not set `MCP_HOST=0.0.0.0` and open `8080` on the public internet. Without the installer env file the binary itself defaults to `0.0.0.0` — always set the host.

Join the server and the MCP client to the same [Tailscale](https://tailscale.com/) tailnet, then either:

- Keep `MCP_HOST=127.0.0.1` and reach it with `tailscale serve` or an SSH tunnel, or
- Bind only the Tailscale IP:

```bash
TS_IP=$(tailscale ip -4)
sudo sed -i "s/^MCP_HOST=.*/MCP_HOST=${TS_IP}/" /etc/processd-mcp/processd-mcp.env
sudo systemctl restart processd-mcp
```

Do not use Tailscale Funnel unless you intend to put a remote shell on the public internet. Client JSON: [Connect](/connect).

Policy YAML: [Configuration](/config).

## Upgrade and uninstall

```bash
curl -fsSL https://github.com/daimon-hq/release/releases/latest/download/install-processd-kernel.sh | sudo bash -s -- upgrade
curl -fsSL https://github.com/daimon-hq/release/releases/latest/download/install-processd-kernel.sh | sudo bash -s -- uninstall
```

Port in use: change `MCP_PORT` in the env file and `sudo systemctl restart processd-mcp`. Logs: `journalctl -u processd-mcp -n 200 --no-pager`.
