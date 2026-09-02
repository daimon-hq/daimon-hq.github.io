---
title: Files
description: Read, write, edit, glob, grep, and transfer files inside the sandbox.
---

All methods return typed result objects.

## FilesAPI.read

```python
async files.read(file_path, *, offset=None, limit=None, pages=None) -> ReadResult
```

Read a file from the sandbox filesystem. Supports text, image, and multi-page content.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `file_path` | `str` | | Path to the file. |
| `offset` | `int \| None` | `None` | Starting line for text files. |
| `limit` | `int \| None` | `None` | Max lines to read. |
| `pages` | `str \| None` | `None` | Page range for PDFs (e.g. `'1-5'`). |

```python
read = await client.files.read("/tmp/demo.txt")
print(read.file.content)
print(read.file.num_lines)
```

## FilesAPI.write

```python
async files.write(file_path, content) -> WriteResult
```

Write content to a file. Creates the file if it does not exist.

```python
written = await client.files.write("/tmp/demo.txt", "hello\n")
print(written.file_path)
```

## FilesAPI.edit

```python
async files.edit(file_path, *, old_string, new_string, replace_all=False) -> EditResult
```

Edit a file by replacing text. Returns a structured patch.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `file_path` | `str` | | Path to the file. |
| `old_string` | `str` | | Text to replace. |
| `new_string` | `str` | | Replacement text. |
| `replace_all` | `bool` | `False` | Replace all occurrences. |

## FilesAPI.glob

```python
async files.glob(pattern, *, path=None) -> GlobResult
```

```python
glob = await client.files.glob("**/*.rs", path=runtime.base_workdir)
print(glob.search_path, glob.num_files)
```

## FilesAPI.grep

```python
async files.grep(pattern, *, path=None, glob=None, output_mode=None, ...) -> GrepResult
```

Search file contents with regex. Supports the full Grep tool parameter set.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `pattern` | `str` | | Regex pattern to search for. |
| `path` | `str \| None` | `None` | Root directory to search. |
| `glob` | `str \| None` | `None` | File filter glob (e.g. `'*.py'`). |
| `output_mode` | `str \| None` | `None` | `'content'`, `'files_with_matches'`, or `'count'`. |

```python
grep = await client.files.grep("TODO", path=runtime.base_workdir)
print(grep.num_matches)
```

## File transfer

Upload and download raw bytes through the SDK-only HTTP endpoint (`/sdk/file`). Meant for SDK and GUI integrations.

### `async files.upload_bytes(file_path, data) -> FileTransferResult`

```python
blob = await client.files.upload_bytes(
    "artifacts/report.pdf",
    pdf_bytes,
)
print(blob.file_path, blob.bytes_written, blob.created)
```

### `async files.download_bytes(file_path) -> bytes`

```python
data = await client.files.download_bytes("artifacts/report.pdf")
print(len(data))
```

### `async files.upload_file(local_path, remote_path) -> FileTransferResult`

Upload a local file to the sandbox.

### `async files.download_file(remote_path, local_path) -> Path`

Download a remote file to the local filesystem.
