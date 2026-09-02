---
title: Sandbox policy
description: "Write version 2 sandbox-policy.yaml for MCP_SANDBOX_POLICY_FILE."
---

If `MCP_SANDBOX_POLICY_FILE` is unset, **kernel sandbox is off**. The server runs with whatever privileges the process already has. Set the file when you want Landlock / `sandbox-exec` to enforce paths and network.

- Absolute paths only.
- Loaded once at startup. Restart after edits.
- Fails closed if required sandbox features are missing (`linux.landlock.compatibility: hard_requirement`).
- `linux.process.run_as_user` / `run_as_group` must not be root/`0`.
- `version: 2` for new files. Legacy `version: 1` still parses on Linux.

## Enable it on a binary install

```bash
sudo curl -fsSL https://github.com/daimon-hq/release/releases/latest/download/sandbox-policy.example.yaml \
  -o /etc/processd-mcp/policy.yaml
sudo chmod 644 /etc/processd-mcp/policy.yaml

# then edit the paths — the example's /workspace is a placeholder
sudo $EDITOR /etc/processd-mcp/policy.yaml

echo 'MCP_SANDBOX_POLICY_FILE=/etc/processd-mcp/policy.yaml' | \
  sudo tee -a /etc/processd-mcp/processd-mcp.env

sudo systemctl restart processd-mcp
```

On macOS the desktop app writes this YAML for you. You can still drop a file and point `MCP_SANDBOX_POLICY_FILE` at it.

## Anatomy

```yaml
version: 2

filesystem_policy:
  # Add the process cwd to read_write at startup.
  include_workdir: true

  read_only:
    - /var/log          # readable, not writable

  read_write:
    - /workspace        # replace with a real project dir

network:
  # disabled | localhost_only | enabled
  mode: disabled

linux:
  landlock:
    # hard_requirement | best_effort
    compatibility: hard_requirement

  process:
    run_as_user: user    # must exist, must not be root
    run_as_group: user
```

### Filesystem

- `read_only`: tools may read, not modify.
- `read_write`: tools may read and write.
- Nested read-only under a writable root is valid; the kernel uses carve-outs. Prefer disjoint trees.
- A path in both lists is a conflict — pick one.

### Network

| `mode` | Effect |
| --- | --- |
| `disabled` | No network from sandboxed helpers. Strong default. |
| `localhost_only` | Loopback only (local dev servers, health checks). |
| `enabled` | Network allowed. Combine with Tailscale if the host itself is on a tailnet. |

`WebFetch` and shell `curl` both follow this policy.

### Linux identity

`run_as_user` / `run_as_group` drop to a non-root account **inside the sandbox**. Create that user on the host first. `hard_requirement` means the service will not start if Landlock cannot attach.

macOS uses `sandbox-exec` instead of Landlock; the same YAML `filesystem_policy` and `network` blocks apply.

## After you save

```bash
sudo systemctl restart processd-mcp
# or restart from the desktop app
```

Then `GetRuntimeContext` should show the policy you wrote. If startup fails, `journalctl -u processd-mcp -n 200 --no-pager` (Linux) or the app log panel (macOS).
