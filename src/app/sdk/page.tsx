import { withBasePath } from "@/lib/site";
import { DownloadComposeBtn } from "./download-compose-btn";

const pypiUrl = "https://pypi.org/project/daimon-sdk/";
const managerEndpoint = "http://127.0.0.1:18080";

/* ─── Sidebar navigation structure ─── */
const navGroups = [
  {
    label: "Getting Started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "start-manager", label: "Start Manager" },
      { id: "quickstart", label: "Quickstart" },
    ],
  },
  {
    label: "Client",
    items: [
      { id: "daimon-client", label: "DaimonClient" },
      { id: "raw-api", label: "RawAPI" },
      { id: "runtime-api", label: "RuntimeAPI" },
    ],
  },
  {
    label: "Manager",
    items: [
      { id: "daimon-manager-client", label: "DaimonManagerClient" },
      { id: "daimon-sandbox", label: "DaimonSandbox" },
      { id: "sandbox-context", label: "SandboxContext" },
    ],
  },
  {
    label: "Files",
    items: [
      { id: "files-api", label: "FilesAPI" },
      { id: "file-transfer", label: "File Transfer" },
    ],
  },
  {
    label: "Exec",
    items: [
      { id: "exec-api", label: "ExecAPI" },
      { id: "sessions", label: "Sessions" },
    ],
  },
  {
    label: "Web",
    items: [{ id: "web-api", label: "WebAPI" }],
  },
  {
    label: "Authentication",
    items: [{ id: "authentication", label: "Auth" }],
  },
  {
    label: "Reference",
    items: [
      { id: "exceptions", label: "Exceptions" },
      { id: "models", label: "Models" },
    ],
  },
];

/* ─── Parameter table component ─── */
function ParamTable({
  params,
}: {
  params: { name: string; type: string; default?: string; description: string }[];
}) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card/80">
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Parameter</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-border last:border-0">
              <td className="px-4 py-2.5 font-mono text-accent">{p.name}</td>
              <td className="px-4 py-2.5 font-mono text-muted">{p.type}</td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground">{p.default ?? "\u2014"}</td>
              <td className="px-4 py-2.5 text-muted">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Helper components ─── */
function MethodSignature({
  name,
  signature,
  description,
  params,
  returns,
  example,
}: {
  name: string;
  signature: string;
  description: string;
  params?: { name: string; type: string; default?: string; description: string }[];
  returns?: string;
  example?: string;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-2">
        <code className="rounded-lg bg-card px-3 py-1.5 text-sm font-semibold text-accent">{signature}</code>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-muted">{description}</p>
      {params && params.length > 0 && (
        <>
          <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Parameters</p>
          <ParamTable params={params} />
        </>
      )}
      {returns && (
        <p className="mb-3 text-sm text-muted">
          <span className="font-semibold text-foreground">Returns:</span>{" "}
          <code className="rounded bg-card px-1.5 py-0.5 text-accent">{returns}</code>
        </p>
      )}
      {example && (
        <div className="code-block">
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.82rem] leading-7 text-foreground">
            <code>{example}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ id, label }: { id: string; label: string }) {
  return (
    <h2 id={id} className="scroll-mt-28 mb-6 border-b border-border pb-3 text-2xl font-bold tracking-tight">
      {label}
    </h2>
  );
}

function SubHeading({ id, label }: { id: string; label: string }) {
  return (
    <h3 id={id} className="scroll-mt-28 mb-4 mt-8 text-xl font-semibold tracking-tight text-foreground">
      {label}
    </h3>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="code-block mb-6 overflow-hidden border border-border/70">
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.84rem] leading-7 text-foreground md:text-[0.9rem] md:leading-7">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Note({ title, text }: { title?: string; text: string }) {
  return (
    <div className="mb-6 rounded-xl border border-accent/20 bg-accent/[0.04] p-4">
      {title && <div className="mb-1 text-sm font-semibold text-accent">{title}</div>}
      <p className="text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

/* ─── Navbar ─── */
function DocsNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href={withBasePath("/")} className="flex items-center gap-3 group">
          <img src={withBasePath("/logo.png")} alt="DAIMON" className="h-5 w-5 transition-transform group-hover:scale-110" />
          <div className="leading-tight">
            <div className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">DAIMON</div>
          </div>
        </a>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground md:inline">daimon-sdk v0.4.1</span>
          <a
            href={pypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-accent/30 bg-accent px-3 py-1.5 text-xs font-medium text-background transition-all hover:bg-accent-light"
          >
            PyPI
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Sidebar ─── */
function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 bottom-0 z-40 hidden w-56 overflow-y-auto border-r border-border bg-background/50 backdrop-blur-sm md:block">
      <nav className="p-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="mb-1.5 px-3 text-[0.7rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              {group.label}
            </div>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-accent/8 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
        <div className="mt-8 border-t border-border pt-4">
          <a
            href={withBasePath("/")}
            className="block rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back to Home
          </a>
        </div>
      </nav>
    </aside>
  );
}

/* ─── On This Page (right rail) ─── */
function OnThisPage() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 w-48">
        <div className="mb-3 text-[0.65rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          On This Page
        </div>
        <div className="space-y-1">
          {navGroups.flatMap((g) =>
            g.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            )),
          )}
        </div>
      </div>
    </aside>
  );
}

/* ─── Page ─── */
export default function SdkDocsPage() {
  return (
    <>
      <DocsNavbar />
      <Sidebar />
      <main className="relative pt-14 md:pl-56">
        <div className="mx-auto max-w-5xl">
          <div className="flex gap-10 px-6 py-10">
            {/* Main content */}
            <div className="min-w-0 flex-1">
              {/* Hero */}
              <div className="mb-12">
                <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                  daimon-sdk{" "}
                  <span className="bg-gradient-to-r from-accent via-accent-light to-amber-300 bg-clip-text text-transparent">
                    v0.4.1
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                  Python SDK for DAIMON sandbox manager. Create manager-backed sandboxes,
                  connect to MCP endpoints, and call typed file, exec, web, and raw APIs.
                </p>
              </div>

              {/* ──────── Getting Started ──────── */}
              <SectionHeading id="installation" label="Installation" />
              <CodeBlock>{`pip install daimon-sdk`}</CodeBlock>
              <Note text="Requires Python 3.11+. The SDK uses httpx for HTTP transport and supports both manager-backed and direct MCP connections." />

              <SectionHeading id="start-manager" label="Start Manager Locally" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                The fastest local path is the published manager Docker image plus the release compose file.
                This starts <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">processd-sandbox-manager</code>,
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">nsjail</code>, and sandbox MCP workers on demand.
              </p>
              <DownloadComposeBtn />
              <CodeBlock>
                {`# Replace LAN_IP with your host machine's actual LAN IP (e.g. 192.168.1.100)
# Do NOT use 0.0.0.0 — the MCP workers bind inside nsjail and won't route correctly
# Alternatively, uncomment network_mode: host in the compose file to bypass Docker NAT
PROCESSD_MANAGER_PUBLIC_MCP_HOST=LAN_IP docker compose -f compose.manager.release.yaml up -d

curl -i ${managerEndpoint}/health`}
              </CodeBlock>
              <Note
                title="Docker permissions"
                text="The release compose defaults to cgroup_required. It needs cgroup v2 mounted writable plus SYS_ADMIN, SETUID, SETGID, SETFCAP, and DAC_OVERRIDE so nsjail can create per-sandbox namespaces and cgroups. If your local Docker environment cannot provide those permissions, use a best-effort manager compose from processd-standalone or run the manager with adjusted limits."
              />

              <SectionHeading id="quickstart" label="Quickstart" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Use <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">DaimonManagerClient</code> when your application owns sandbox lifecycle.
                The context manager creates a sandbox, connects to its MCP server, and deletes it on exit by default.
              </p>
              <CodeBlock>{`import asyncio

from daimon_sdk import DaimonManagerClient


async def main() -> None:
    async with DaimonManagerClient("${managerEndpoint}") as manager:
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


asyncio.run(main())`}</CodeBlock>

              {/* ──────── Client ──────── */}
              <SectionHeading id="daimon-client" label="DaimonClient" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Low-level client that connects directly to a sandbox MCP endpoint. Use this when you already have a sandbox URL and token.
                For lifecycle management, prefer <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">DaimonManagerClient</code>.
              </p>

              <MethodSignature
                name="DaimonClient"
                signature="DaimonClient(base_url, *, access_token=None, timeout_s=30.0)"
                description="Construct a client targeting a sandbox MCP endpoint."
                params={[
                  { name: "base_url", type: "str", description: "Sandbox MCP endpoint URL (e.g. http://127.0.0.1:18080/mcp)." },
                  { name: "access_token", type: "str | None", default: "None", description: "Optional access token sent as X-Access-Token header." },
                  { name: "timeout_s", type: "float", default: "30.0", description: "HTTP request timeout in seconds." },
                ]}
              />

              <Note title="Connection lifecycle" text="Use async context manager (async with DaimonClient(...) as client:) or call await client.connect() / await client.close() manually." />

              <SubHeading id="raw-api" label="RawAPI" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Escape hatch for calling arbitrary MCP tools when the typed surface doesn&apos;t cover your use case.
              </p>
              <MethodSignature
                name="RawAPI.call_tool"
                signature="async raw.call_tool(name, arguments=None, *, raise_on_error=True) -> dict[str, Any]"
                description="Call any MCP tool by name with raw arguments."
                params={[
                  { name: "name", type: "str", description: "MCP tool name (e.g. 'GetRuntimeContext')." },
                  { name: "arguments", type: "dict | None", default: "None", description: "Tool arguments as a dictionary." },
                  { name: "raise_on_error", type: "bool", default: "True", description: "Raise DaimonToolError on tool failure if True." },
                ]}
                returns="dict[str, Any]"
                example={`payload = await client.raw.call_tool(
    "GetRuntimeContext",
    {},
)
print(payload["baseWorkdir"])`}
              />

              <SubHeading id="runtime-api" label="RuntimeAPI" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Access sandbox runtime context including base workdir, filesystem policy, network policy, and capabilities.
              </p>
              <MethodSignature
                name="RuntimeAPI.get_context"
                signature="async runtime.get_context() -> RuntimeContextResult"
                description="Fetch the sandbox runtime context."
                returns="RuntimeContextResult"
                example={`runtime = await client.runtime.get_context()
print(runtime.base_workdir)
print(runtime.capabilities)`}
              />

              {/* ──────── Manager ──────── */}
              <SectionHeading id="daimon-manager-client" label="DaimonManagerClient" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                High-level client that talks to the processd-sandbox-manager HTTP API.
                Manages sandbox lifecycle — create, find-or-create, start, stop, delete.
              </p>

              <MethodSignature
                name="DaimonManagerClient"
                signature="DaimonManagerClient(base_url, *, access_token=None, timeout_s=30.0)"
                description="Construct a manager client targeting the sandbox manager HTTP endpoint."
                params={[
                  { name: "base_url", type: "str", description: "Manager HTTP endpoint (e.g. http://127.0.0.1:18080)." },
                  { name: "access_token", type: "str | None", default: "None", description: "Access token for X-Access-Token header." },
                  { name: "timeout_s", type: "float", default: "30.0", description: "HTTP request timeout." },
                ]}
              />

              <MethodSignature
                name="DaimonManagerClient.health"
                signature="async manager.health() -> bool"
                description="Check if the manager is reachable and healthy."
                returns="bool"
              />

              <MethodSignature
                name="DaimonManagerClient.capacity"
                signature="async manager.capacity() -> ManagerCapacityResult"
                description="Get current capacity info — memory, PID, CPU limits and usage."
                returns="ManagerCapacityResult"
                example={`capacity = await manager.capacity()
print(capacity.mode, capacity.memory_bytes.available)`}
              />

              <MethodSignature
                name="DaimonManagerClient.create_sandbox"
                signature="async manager.create_sandbox() -> DaimonSandbox"
                description="Create a fresh sandbox workspace."
                returns="DaimonSandbox"
              />

              <MethodSignature
                name="DaimonManagerClient.find_or_create_sandbox"
                signature="async manager.find_or_create_sandbox(*, labels, ttl_seconds=None) -> DaimonSandbox"
                description="Find a sandbox by labels or create one if none matches. Useful for thread-scoped sandbox reuse."
                params={[
                  { name: "labels", type: "dict[str, str]", description: "Labels to match against existing sandboxes." },
                  { name: "ttl_seconds", type: "int | None", default: "None", description: "Time-to-live in seconds for the sandbox." },
                ]}
                returns="DaimonSandbox"
                example={`sandbox = await manager.find_or_create_sandbox(
    labels={"thread_id": "chat-123"},
    ttl_seconds=3600,
)`}
              />

              <MethodSignature
                name="DaimonManagerClient.get_sandbox"
                signature="async manager.get_sandbox(sandbox_id) -> SandboxInfo"
                description="Get sandbox info by ID."
                params={[{ name: "sandbox_id", type: "str", description: "Sandbox unique identifier." }]}
                returns="SandboxInfo"
              />

              <MethodSignature
                name="DaimonManagerClient.start_sandbox"
                signature="async manager.start_sandbox(sandbox_id) -> SandboxInfo"
                description="Start (resume) a stopped sandbox."
                params={[{ name: "sandbox_id", type: "str", description: "Sandbox unique identifier." }]}
                returns="SandboxInfo"
              />

              <MethodSignature
                name="DaimonManagerClient.stop_sandbox"
                signature="async manager.stop_sandbox(sandbox_id) -> SandboxInfo"
                description="Stop (pause) a running sandbox."
                params={[{ name: "sandbox_id", type: "str", description: "Sandbox unique identifier." }]}
                returns="SandboxInfo"
              />

              <MethodSignature
                name="DaimonManagerClient.delete_sandbox"
                signature="async manager.delete_sandbox(sandbox_id) -> None"
                description="Delete a sandbox and its workspace permanently."
                params={[{ name: "sandbox_id", type: "str", description: "Sandbox unique identifier." }]}
                returns="None"
              />

              <MethodSignature
                name="DaimonManagerClient.sandbox"
                signature="manager.sandbox(*, delete_on_exit=True) -> SandboxContext"
                description="Return an async context manager that creates, connects, and optionally deletes a sandbox."
                params={[{ name: "delete_on_exit", type: "bool", default: "True", description: "Delete the sandbox when exiting the context." }]}
                returns="SandboxContext"
                example={`async with manager.sandbox() as sandbox:
    result = await sandbox.exec.bash("pwd")
    print(result.display_text)`}
              />

              <SubHeading id="daimon-sandbox" label="DaimonSandbox" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Wraps a sandbox info and its connected MCP client. Exposes the same namespaces as <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">DaimonClient</code>.
              </p>

              <div className="mb-4 grid gap-2 sm:grid-cols-2">
                {[
                  "sandbox.info -> SandboxInfo",
                  "sandbox.id -> str",
                  "sandbox.runtime -> RuntimeAPI",
                  "sandbox.files -> FilesAPI",
                  "sandbox.exec -> ExecAPI",
                  "sandbox.web -> WebAPI",
                  "sandbox.raw -> RawAPI",
                  "sandbox.refresh() -> SandboxInfo",
                  "sandbox.start() -> SandboxInfo",
                  "sandbox.stop() -> SandboxInfo",
                  "sandbox.delete() -> None",
                ].map((prop) => (
                  <div key={prop} className="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono text-xs text-muted">
                    {prop}
                  </div>
                ))}
              </div>

              <SubHeading id="sandbox-context" label="SandboxContext" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Async context manager returned by <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">manager.sandbox()</code>.
                Creates a sandbox on enter, connects the client, and optionally deletes on exit.
              </p>

              {/* ──────── Files ──────── */}
              <SectionHeading id="files-api" label="FilesAPI" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Read, write, edit, glob, and grep files inside the sandbox. All methods return typed result objects.
              </p>

              <MethodSignature
                name="FilesAPI.read"
                signature="async files.read(file_path, *, offset=None, limit=None, pages=None) -> ReadResult"
                description="Read a file from the sandbox filesystem. Supports text, image, and multi-page content."
                params={[
                  { name: "file_path", type: "str", description: "Path to the file." },
                  { name: "offset", type: "int | None", default: "None", description: "Starting line for text files." },
                  { name: "limit", type: "int | None", default: "None", description: "Max lines to read." },
                  { name: "pages", type: "str | None", default: "None", description: "Page range for PDFs (e.g. '1-5')." },
                ]}
                returns="ReadResult"
                example={`read = await client.files.read("/tmp/demo.txt")
print(read.file.content)
print(read.file.num_lines)`}
              />

              <MethodSignature
                name="FilesAPI.write"
                signature="async files.write(file_path, content) -> WriteResult"
                description="Write content to a file. Creates the file if it doesn't exist."
                params={[
                  { name: "file_path", type: "str", description: "Path to write to." },
                  { name: "content", type: "str", description: "Text content to write." },
                ]}
                returns="WriteResult"
                example={`written = await client.files.write("/tmp/demo.txt", "hello\\n")
print(written.file_path)`}
              />

              <MethodSignature
                name="FilesAPI.edit"
                signature="async files.edit(file_path, *, old_string, new_string, replace_all=False) -> EditResult"
                description="Edit a file by replacing text. Returns a structured patch."
                params={[
                  { name: "file_path", type: "str", description: "Path to the file." },
                  { name: "old_string", type: "str", description: "Text to replace." },
                  { name: "new_string", type: "str", description: "Replacement text." },
                  { name: "replace_all", type: "bool", default: "False", description: "Replace all occurrences." },
                ]}
                returns="EditResult"
              />

              <MethodSignature
                name="FilesAPI.glob"
                signature="async files.glob(pattern, *, path=None) -> GlobResult"
                description="Search for files matching a glob pattern."
                params={[
                  { name: "pattern", type: "str", description: "Glob pattern (e.g. '**/*.py')." },
                  { name: "path", type: "str | None", default: "None", description: "Root directory for the search." },
                ]}
                returns="GlobResult"
                example={`glob = await client.files.glob("**/*.rs", path=runtime.base_workdir)
print(glob.search_path, glob.num_files)`}
              />

              <MethodSignature
                name="FilesAPI.grep"
                signature="async files.grep(pattern, *, path=None, glob=None, output_mode=None, ...) -> GrepResult"
                description="Search file contents with regex. Supports the full Grep tool parameter set."
                params={[
                  { name: "pattern", type: "str", description: "Regex pattern to search for." },
                  { name: "path", type: "str | None", default: "None", description: "Root directory to search." },
                  { name: "glob", type: "str | None", default: "None", description: "File filter glob (e.g. '*.py')." },
                  { name: "output_mode", type: "str | None", default: "None", description: "'content', 'files_with_matches', or 'count'." },
                ]}
                returns="GrepResult"
                example={`grep = await client.files.grep("TODO", path=runtime.base_workdir)
print(grep.num_matches)`}
              />

              <SubHeading id="file-transfer" label="File Transfer" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Upload and download raw bytes through the SDK-only HTTP endpoint (<code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">/sdk/file</code>).
                Meant for SDK and GUI integrations.
              </p>

              <MethodSignature
                name="FilesAPI.upload_bytes"
                signature="async files.upload_bytes(file_path, data) -> FileTransferResult"
                description="Upload raw bytes to a file in the sandbox."
                params={[
                  { name: "file_path", type: "str", description: "Remote path in the sandbox." },
                  { name: "data", type: "bytes", description: "Raw byte content to upload." },
                ]}
                returns="FileTransferResult"
                example={`blob = await client.files.upload_bytes(
    "artifacts/report.pdf",
    pdf_bytes,
)
print(blob.file_path, blob.bytes_written, blob.created)`}
              />

              <MethodSignature
                name="FilesAPI.download_bytes"
                signature="async files.download_bytes(file_path) -> bytes"
                description="Download raw bytes from a file in the sandbox."
                params={[{ name: "file_path", type: "str", description: "Remote path in the sandbox." }]}
                returns="bytes"
                example={`data = await client.files.download_bytes("artifacts/report.pdf")
print(len(data))`}
              />

              <MethodSignature
                name="FilesAPI.upload_file"
                signature="async files.upload_file(local_path, remote_path) -> FileTransferResult"
                description="Upload a local file to the sandbox."
                params={[
                  { name: "local_path", type: "str | Path", description: "Local filesystem path." },
                  { name: "remote_path", type: "str", description: "Remote path in the sandbox." },
                ]}
                returns="FileTransferResult"
              />

              <MethodSignature
                name="FilesAPI.download_file"
                signature="async files.download_file(remote_path, local_path) -> Path"
                description="Download a remote file to the local filesystem."
                params={[
                  { name: "remote_path", type: "str", description: "Remote path in the sandbox." },
                  { name: "local_path", type: "str | Path", description: "Local destination path." },
                ]}
                returns="Path"
              />

              {/* ──────── Exec ──────── */}
              <SectionHeading id="exec-api" label="ExecAPI" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Run commands, background tasks, and interactive sessions inside the sandbox.
              </p>

              <MethodSignature
                name="ExecAPI.bash"
                signature="async exec.bash(command, *, timeout_ms=None, description=None, run_in_background=False, dangerously_disable_sandbox=False) -> BashResult"
                description="Execute a bash command in the sandbox."
                params={[
                  { name: "command", type: "str", description: "Bash command to execute." },
                  { name: "timeout_ms", type: "int | None", default: "None", description: "Command timeout in milliseconds." },
                  { name: "description", type: "str | None", default: "None", description: "Human-readable description of the command." },
                  { name: "run_in_background", type: "bool", default: "False", description: "Run the command as a background task." },
                  { name: "dangerously_disable_sandbox", type: "bool", default: "False", description: "Disable sandbox for this command." },
                ]}
                returns="BashResult"
                example={`result = await client.exec.bash("printf 'hello\\n'")
print(result.stdout)

background = await client.exec.bash(
    "sleep 1; echo done",
    run_in_background=True,
)
print(background.background_task_id)`}
              />

              <SubHeading id="sessions" label="Sessions" />
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Start a persistent TTY session, then write input, poll output, and wait for the process to exit.
              </p>

              <MethodSignature
                name="ExecAPI.start_session"
                signature="async exec.start_session(cmd, *, workdir=None, tty=False, ...) -> SessionHandle"
                description="Start an interactive session in the sandbox."
                params={[
                  { name: "cmd", type: "str", description: "Command to start (e.g. '/bin/cat')." },
                  { name: "workdir", type: "str | None", default: "None", description: "Working directory for the session." },
                  { name: "tty", type: "bool", default: "False", description: "Allocate a TTY for the session." },
                ]}
                returns="SessionHandle"
                example={`session = await client.exec.start_session("/bin/cat", tty=True)

echoed = await session.write("hello session\\n")
print(echoed.output)

final = await session.wait_for_exit()
print(final.exit_code)`}
              />

              <MethodSignature
                name="SessionHandle.write"
                signature="async session.write(chars='', *, yield_time_ms=None, max_output_tokens=None) -> ExecResult"
                description="Write characters to the session's stdin."
                params={[
                  { name: "chars", type: "str", default: "''", description: "Characters to write to stdin." },
                  { name: "yield_time_ms", type: "int | None", default: "None", description: "Time to wait for output." },
                ]}
                returns="ExecResult"
              />

              <MethodSignature
                name="SessionHandle.poll"
                signature="async session.poll(*, yield_time_ms=None, max_output_tokens=None) -> ExecResult"
                description="Poll the session for new output without writing any input."
                returns="ExecResult"
              />

              <MethodSignature
                name="SessionHandle.wait_for_exit"
                signature="async session.wait_for_exit(*, timeout_s=10.0, yield_time_ms=5000, ...) -> ExecResult"
                description="Poll until the session process exits or timeout is reached."
                params={[
                  { name: "timeout_s", type: "float", default: "10.0", description: "Max wait time in seconds." },
                  { name: "yield_time_ms", type: "int", default: "5000", description: "Time to yield for output per poll." },
                ]}
                returns="ExecResult"
              />

              <MethodSignature
                name="SessionHandle.close"
                signature="async session.close(*, exit_payload='__EXIT__\\n', yield_time_ms=500, ...) -> ExecResult"
                description="Send exit signal to the session."
                returns="ExecResult"
              />

              {/* ──────── Web ──────── */}
              <SectionHeading id="web-api" label="WebAPI" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Fetch web pages through the sandbox. Returns a typed result with content, status code, and metadata.
              </p>

              <MethodSignature
                name="WebAPI.fetch"
                signature="async web.fetch(url, *, timeout_ms=None, max_bytes=None, follow_same_host_redirects=None) -> WebFetchResult"
                description="Fetch a URL through the sandbox's controlled HTTP client."
                params={[
                  { name: "url", type: "str", description: "URL to fetch." },
                  { name: "timeout_ms", type: "int | None", default: "None", description: "Request timeout in milliseconds." },
                  { name: "max_bytes", type: "int | None", default: "None", description: "Maximum response body size." },
                  { name: "follow_same_host_redirects", type: "bool | None", default: "None", description: "Follow same-host redirects." },
                ]}
                returns="WebFetchResult"
                example={`page = await client.web.fetch("https://example.com")
print(page.status_code)
print(page.content[:200])`}
              />

              {/* ──────── Auth ──────── */}
              <SectionHeading id="authentication" label="Authentication" />
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Manager access tokens protect the control plane. Sandbox MCP tokens are returned by the manager
                and wired into <code className="rounded bg-card px-1.5 py-0.5 font-mono text-accent">DaimonSandbox</code> automatically.
              </p>

              <CodeBlock>{`from daimon_sdk import DaimonManagerClient

async with DaimonManagerClient(
    "${managerEndpoint}",
    access_token="your-token",
) as manager:
    sandbox = await manager.create_sandbox()
    await sandbox.connect()

    runtime = await sandbox.runtime.get_context()
    print(runtime.capabilities)`}</CodeBlock>

              <Note text="DaimonManagerClient sends X-Access-Token to manager APIs. Direct DaimonClient also sends X-Access-Token to MCP and /sdk/file when you pass access_token." />

              {/* ──────── Reference ──────── */}
              <SectionHeading id="exceptions" label="Exceptions" />

              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card/80">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Exception</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "DaimonError", desc: "Base exception for all SDK errors." },
                      { name: "DaimonHttpError", desc: "HTTP-level errors from manager or file transfer APIs. Includes status_code and payload." },
                      { name: "DaimonToolError", desc: "MCP tool execution failures. Raised when a tool returns an error result." },
                      { name: "DaimonConnectionError", desc: "Connection failures (network unreachable, DNS, timeout)." },
                      { name: "DaimonProtocolError", desc: "Protocol-level errors from the MCP transport." },
                    ].map((exc) => (
                      <tr key={exc.name} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 font-mono text-accent">{exc.name}</td>
                        <td className="px-4 py-2.5 text-muted">{exc.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <SectionHeading id="models" label="Models" />

              <div className="mb-6 grid gap-2 sm:grid-cols-2">
                {[
                  "ReadResult, ReadTextFile, ReadImageFile, ReadPartsFile",
                  "WriteResult",
                  "EditResult",
                  "GlobResult",
                  "GrepResult",
                  "FileTransferResult",
                  "BashResult",
                  "ExecResult",
                  "WebFetchResult",
                  "RuntimeContextResult",
                  "SandboxInfo",
                  "ManagerCapacityResult, CapacityResource",
                  "LimitsStatus",
                  "SessionHandle",
                  "ContentBlock",
                ].map((m) => (
                  <div key={m} className="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono text-xs text-muted">
                    {m}
                  </div>
                ))}
              </div>

              <Note title="Typed results" text="All tool results expose content_blocks (list of ContentBlock) and display_text (str) for agent/UI output. Use typed fields for logic, raw_payload for debugging." />
            </div>

            {/* Right rail */}
            <OnThisPage />
          </div>
        </div>
      </main>
    </>
  );
}
