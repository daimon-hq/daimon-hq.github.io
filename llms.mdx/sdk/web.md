---
title: Web
description: Fetch web pages through the sandbox's controlled HTTP client.
---

```python
async web.fetch(url, *, timeout_ms=None, max_bytes=None, follow_same_host_redirects=None) -> WebFetchResult
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `str` | | URL to fetch. |
| `timeout_ms` | `int \| None` | `None` | Request timeout in milliseconds. |
| `max_bytes` | `int \| None` | `None` | Maximum response body size. |
| `follow_same_host_redirects` | `bool \| None` | `None` | Follow same-host redirects. |

```python
page = await client.web.fetch("https://example.com")
print(page.status_code)
print(page.content[:200])
```
