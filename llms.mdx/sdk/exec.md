---
title: Exec
description: Run commands, background tasks, and interactive sessions inside the sandbox.
---

## ExecAPI.bash

```python
async exec.bash(command, *, timeout_ms=None, description=None, run_in_background=False, dangerously_disable_sandbox=False) -> BashResult
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | `str` | | Bash command to execute. |
| `timeout_ms` | `int \| None` | `None` | Command timeout in milliseconds. |
| `description` | `str \| None` | `None` | Human-readable description of the command. |
| `run_in_background` | `bool` | `False` | Run the command as a background task. |
| `dangerously_disable_sandbox` | `bool` | `False` | Disable sandbox for this command. |

```python
result = await client.exec.bash("printf 'hello\n'")
print(result.stdout)

background = await client.exec.bash(
    "sleep 1; echo done",
    run_in_background=True,
)
print(background.background_task_id)
```

## Sessions

Start a persistent TTY session, then write input, poll output, and wait for the process to exit.

### `async exec.start_session(cmd, *, workdir=None, tty=False, ...) -> SessionHandle`

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `cmd` | `str` | | Command to start (e.g. `'/bin/cat'`). |
| `workdir` | `str \| None` | `None` | Working directory for the session. |
| `tty` | `bool` | `False` | Allocate a TTY for the session. |

```python
session = await client.exec.start_session("/bin/cat", tty=True)

echoed = await session.write("hello session\n")
print(echoed.output)

final = await session.wait_for_exit()
print(final.exit_code)
```

### `async session.write(chars='', *, yield_time_ms=None, max_output_tokens=None) -> ExecResult`

Write characters to the session's stdin.

### `async session.poll(*, yield_time_ms=None, max_output_tokens=None) -> ExecResult`

Poll the session for new output without writing any input.

### `async session.wait_for_exit(*, timeout_s=10.0, yield_time_ms=5000, ...) -> ExecResult`

Poll until the session process exits or timeout is reached.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout_s` | `float` | `10.0` | Max wait time in seconds. |
| `yield_time_ms` | `int` | `5000` | Time to yield for output per poll. |

### `async session.close(*, exit_payload='__EXIT__\\n', yield_time_ms=500, ...) -> ExecResult`

Send exit signal to the session.
