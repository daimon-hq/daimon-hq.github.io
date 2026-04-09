import Image from "next/image";
import { withBasePath } from "@/lib/site";

const pypiUrl = "https://pypi.org/project/daimon-sdk/";
const localEndpoint = "http://127.0.0.1:8080/mcp";

const sections = [
  { id: "install", label: "Install" },
  { id: "quick-start", label: "Quick Start" },
  { id: "authentication", label: "Authentication" },
  { id: "files", label: "Files" },
  { id: "transfer", label: "File Transfer" },
  { id: "exec", label: "Exec" },
  { id: "sessions", label: "Sessions" },
  { id: "web", label: "Web" },
  { id: "raw", label: "Raw API" },
  { id: "reference", label: "Reference" },
] as const;

export const metadata = {
  title: "DAIMON SDK Docs",
  description:
    "Detailed Python documentation for daimon-sdk, including connection setup, runtime context, file APIs, upload/download, exec, sessions, and web helpers.",
};

function DocsNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href={withBasePath("/")} className="flex items-center gap-3 group">
          <Image src={withBasePath("/logo.png")} alt="DAIMON" width={28} height={28} className="transition-transform group-hover:scale-110" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.22em] text-accent uppercase">DAIMON</div>
            <div className="text-xs text-muted-foreground">Python SDK docs</div>
          </div>
        </a>

        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          {sections.slice(0, 5).map((section) => (
            <a key={section.id} href={`#${section.id}`} className="transition-colors hover:text-foreground">
              {section.label}
            </a>
          ))}
          <a
            href={pypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-accent/30 bg-accent px-4 py-2 font-medium text-background transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
          >
            PyPI
          </a>
        </div>
      </div>
    </nav>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-medium tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <p className="text-lg leading-relaxed text-muted">{description}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="code-block overflow-hidden border border-border/70">
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.84rem] leading-7 text-foreground md:text-[0.92rem] md:leading-8">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Callout({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
      <div className="mb-2 text-sm font-semibold text-accent">{title}</div>
      <p className="text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

export default function SdkDocsPage() {
  return (
    <>
      <DocsNavbar />
      <main className="relative pt-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-32 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-12 left-1/4 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />

        <section className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted backdrop-blur-md">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                Assumes DAIMON Desktop is already running locally.
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                daimon-sdk{" "}
                <span className="bg-gradient-to-r from-accent via-accent-light to-amber-300 bg-clip-text text-transparent">
                  Python docs
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                Use <code className="rounded bg-card px-1.5 py-0.5 text-foreground">daimon_sdk</code> to talk to your local <code className="rounded bg-card px-1.5 py-0.5 text-foreground">processd-mcp</code> service with typed APIs, structured errors, and SDK-only file transfer helpers.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={pypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-background transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30"
                >
                  View on PyPI
                </a>
                <a
                  href={withBasePath("/")}
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-medium text-muted transition-all hover:border-muted-foreground hover:text-foreground hover:bg-card"
                >
                  Back to Home
                </a>
              </div>
            </div>

            <div className="code-block border border-accent/20 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-danger/60" />
                  <span className="h-3 w-3 rounded-full bg-accent/60" />
                  <span className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">quickstart.py</span>
              </div>
              <CodeBlock>
{`import asyncio

from daimon_sdk import DaimonClient


async def main() -> None:
    async with DaimonClient("${localEndpoint}") as client:
        runtime = await client.runtime.get_context()
        print(runtime.base_workdir)

        files = await client.files.glob("**/*.py", path=runtime.base_workdir)
        print(files.filenames[:5])

        uploaded = await client.files.upload_bytes(
            "artifacts/hello.bin",
            b"hello from daimon-sdk",
        )
        print(uploaded.file_path, uploaded.bytes_written)


asyncio.run(main())`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-border bg-card/60 p-5 backdrop-blur-md">
                <div className="mb-4 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">On This Page</div>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-accent/10 hover:text-foreground"
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-16">
              <section id="install" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Install"
                  title="Start by installing the SDK"
                  description="The SDK is published as a normal Python package. For local development, install the editable extras and keep the client code in your own app."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
                  <CodeBlock>{`pip install daimon-sdk`}</CodeBlock>
                  <Callout
                    title="What this gives you"
                    text="A typed async client, MCP transport handling, structured tool errors, session helpers, and the SDK-only HTTP file transfer endpoints."
                  />
                </div>
              </section>

              <section id="quick-start" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Quick Start"
                  title="Connect to your local DAIMON runtime"
                  description="Use the local MCP endpoint managed by DAIMON Desktop. The same pattern works whether you are reading files, calling tools, or using the SDK-only file transfer API."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`import asyncio

from daimon_sdk import DaimonClient


async def main() -> None:
    async with DaimonClient("${localEndpoint}") as client:
        runtime = await client.runtime.get_context()
        print(runtime.base_workdir)

        result = await client.files.glob("**/*.py", path=runtime.base_workdir)
        print(result.filenames[:5])


asyncio.run(main())`}</CodeBlock>
                  <Callout
                    title="Endpoint"
                    text="Use the local MCP endpoint exposed by DAIMON Desktop. If your service is configured with a token, pass it as access_token when constructing DaimonClient."
                  />
                </div>
              </section>

              <section id="authentication" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Authentication"
                  title="Pass the access token only when the server requires it"
                  description="The SDK reuses the same access token for MCP calls and the SDK-only file endpoints, so one client configuration covers both surfaces."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                  <CodeBlock>{`from daimon_sdk import DaimonClient

async with DaimonClient(
    "${localEndpoint}",
    access_token="your-token",
) as client:
    runtime = await client.runtime.get_context()
    print(runtime.capabilities)`}</CodeBlock>
                  <Callout
                    title="Behavior"
                    text="If the server runs without PROCESSD_TOKEN, you can omit access_token. If the server is protected, the SDK sends X-Access-Token on both MCP and /sdk/file requests."
                  />
                </div>
              </section>

              <section id="files" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Files"
                  title="Read, write, edit, glob, and grep"
                  description="The files namespace covers the MCP file tools and returns typed result objects instead of raw JSON payloads."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`runtime = await client.runtime.get_context()

read = await client.files.read("/tmp/demo.txt")
print(read.file.content)

written = await client.files.write("/tmp/demo.txt", "hello\\n")
print(written.file_path)

glob = await client.files.glob("**/*.rs", path=runtime.base_workdir)
print(glob.search_path, glob.num_files)

grep = await client.files.grep("TODO", path=runtime.base_workdir)
print(grep.num_matches)`}</CodeBlock>
                  <div className="space-y-4">
                    <Callout
                      title="Typed results"
                      text="Read returns ReadResult, write returns WriteResult, glob returns GlobResult, and grep returns GrepResult. Every result keeps the raw payload for debugging."
                    />
                    <Callout
                      title="Error shape"
                      text="MCP tool failures are mapped to SDK exceptions. You should handle DaimonToolError rather than parsing structured_content yourself."
                    />
                  </div>
                </div>
              </section>

              <section id="transfer" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="File Transfer"
                  title="Upload and download raw bytes through the SDK-only endpoint"
                  description="These methods target /sdk/file directly. They are meant for SDK and GUI integrations, not for the LLM tool surface."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`blob = await client.files.upload_bytes(
    "artifacts/report.pdf",
    pdf_bytes,
)
print(blob.file_path, blob.created)

downloaded = await client.files.download_bytes("artifacts/report.pdf")
print(len(downloaded))

local_path = await client.files.download_file(
    "artifacts/report.pdf",
    "/tmp/report.pdf",
)`}</CodeBlock>
                  <Callout
                    title="Returned metadata"
                    text="Upload returns FileTransferResult with file_path, bytes_written, created_parent_directories, created, and updated. Download returns bytes or writes to a local path."
                  />
                </div>
              </section>

              <section id="exec" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Exec"
                  title="Run commands with typed Bash results"
                  description="Use the exec namespace when you want simple command execution, background tasks, or a persistent shell-like interaction."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`result = await client.exec.bash("printf 'hello\\n'")
print(result.stdout)

background = await client.exec.bash(
    "sleep 1; echo done",
    run_in_background=True,
)
print(background.background_task_id)`}</CodeBlock>
                  <Callout
                    title="Why this matters"
                    text="bash() gives you a structured BashResult with stdout, stderr, background task metadata, and sandbox flags."
                  />
                </div>
              </section>

              <section id="sessions" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Sessions"
                  title="Keep interactive command sessions open"
                  description="Start a tty session once, then write, poll, and wait until the process exits."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`session = await client.exec.start_session("/bin/cat", tty=True)

echoed = await session.write("hello session\\n")
print(echoed.output)

final = await session.wait_for_exit()
print(final.exit_code)`}</CodeBlock>
                  <Callout
                    title="Session handle"
                    text="SessionHandle wraps the low-level session_id and provides write(), poll(), wait_for_exit(), and close() so callers do not manage raw tool calls."
                  />
                </div>
              </section>

              <section id="web" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Web"
                  title="Fetch pages and inspect the typed response"
                  description="Use web.fetch when the agent needs a controlled HTTP client with content-type aware parsing and persisted output metadata."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`page = await client.web.fetch("https://example.com")
print(page.status_code)
print(page.content[:200])`}</CodeBlock>
                  <Callout
                    title="Common use"
                    text="The SDK returns WebFetchResult, which includes the URL, result type, byte count, content, redirect information, and persisted output path when available."
                  />
                </div>
              </section>

              <section id="raw" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Raw API"
                  title="Drop down to call_tool only when you need the escape hatch"
                  description="Most app code should stay on the typed surface. raw.call_tool exists for debugging, experimental surfaces, and migration work."
                />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <CodeBlock>{`payload = await client.raw.call_tool(
    "GetRuntimeContext",
    {},
)
print(payload["baseWorkdir"])`}</CodeBlock>
                  <Callout
                    title="Recommendation"
                    text="If you already know the capability you need, prefer the typed namespaces first. raw.call_tool is useful, but it should stay the exception."
                  />
                </div>
              </section>

              <section id="reference" className="scroll-mt-28 pb-12">
                <SectionHeading
                  eyebrow="Reference"
                  title="Quick API summary"
                  description="This is the surface area the current Python SDK exposes. It maps directly onto processd-mcp tools plus the SDK-only file transfer endpoints."
                />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    "DaimonClient(base_url, access_token=None, timeout_s=30.0)",
                    "client.runtime.get_context()",
                    "client.files.read()/write()/edit()/glob()/grep()",
                    "client.files.upload_bytes()/download_bytes()/upload_file()/download_file()",
                    "client.exec.bash()/start_session()/write_stdin()",
                    "SessionHandle.write()/poll()/wait_for_exit()/close()",
                    "client.web.fetch()",
                    "client.raw.call_tool()",
                  ].map((entry) => (
                    <div key={entry} className="rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm text-muted backdrop-blur-sm">
                      {entry}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
