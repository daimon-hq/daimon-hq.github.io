---
title: Reference
description: SDK exceptions and typed result models.
---

## Exceptions

| Exception | Description |
| --- | --- |
| `DaimonError` | Base exception for all SDK errors. |
| `DaimonHttpError` | HTTP-level errors from manager or file transfer APIs. Includes `status_code` and `payload`. |
| `DaimonToolError` | MCP tool execution failures. Raised when a tool returns an error result. |
| `DaimonConnectionError` | Connection failures (network unreachable, DNS, timeout). |
| `DaimonProtocolError` | Protocol-level errors from the MCP transport. |

## Models

- `ReadResult`, `ReadTextFile`, `ReadImageFile`, `ReadPartsFile`
- `WriteResult`
- `EditResult`
- `GlobResult`
- `GrepResult`
- `FileTransferResult`
- `BashResult`
- `ExecResult`
- `WebFetchResult`
- `RuntimeContextResult`
- `SandboxInfo`
- `ManagerCapacityResult`, `CapacityResource`
- `LimitsStatus`
- `SessionHandle`
- `ContentBlock`

<Callout title="Typed results">
  All tool results expose `content_blocks` (list of `ContentBlock`) and `display_text` (`str`) for agent/UI output. Use typed fields for logic, `raw_payload` for debugging.
</Callout>
