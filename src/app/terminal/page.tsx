import Image from "next/image";

import { withBasePath } from "@/lib/site";

const releaseRepo = "daimon-hq/release";
const latestInstallerUrl = `https://github.com/${releaseRepo}/releases/latest/download/install-processd-kernel.sh`;
const standalonePolicyUrl =
  "https://raw.githubusercontent.com/BIGPPWONG/processd-standalone/main/sandbox-policy.example.yaml";

export const metadata = {
  title: "DAIMON Terminal Kernel Guide",
  description:
    "Install processd-mcp on Linux terminal with one command, enable systemd auto-start, and connect MCP clients securely.",
};

function DocsNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href={withBasePath("/")} className="flex items-center gap-3 group">
          <Image src={withBasePath("/logo.png")} alt="DAIMON" width={28} height={28} className="transition-transform group-hover:scale-110" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.22em] text-accent uppercase">DAIMON</div>
            <div className="text-xs text-muted-foreground">Terminal kernel guide</div>
          </div>
        </a>

        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#install" className="transition-colors hover:text-foreground">Install</a>
          <a href="#verify" className="transition-colors hover:text-foreground">Verify</a>
          <a href="#policy" className="transition-colors hover:text-foreground">Policy</a>
          <a href="#ops" className="transition-colors hover:text-foreground">Ops</a>
          <a
            href={withBasePath("/")}
            className="inline-flex items-center rounded-full border border-accent/30 bg-accent px-4 py-2 font-medium text-background transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
          >
            Home
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

function Callout({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
      <div className="mb-2 text-sm font-semibold text-accent">{title}</div>
      <p className="text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

export default function TerminalGuidePage() {
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
                Ubuntu/Debian Linux only · amd64 + arm64
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                Terminal-first <span className="bg-gradient-to-r from-accent via-accent-light to-amber-300 bg-clip-text text-transparent">processd-mcp</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                Deploy the standalone kernel in one command, run it as a systemd service, and auto-start on boot with secure local defaults.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={latestInstallerUrl}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-background transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30"
                >
                  Open Latest Installer
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
                <span className="text-xs font-mono text-muted-foreground">terminal install</span>
              </div>
              <CodeBlock>
{`curl -fsSL ${latestInstallerUrl} | sudo bash -s -- install

systemctl status processd-mcp --no-pager
curl -i http://127.0.0.1:8080/health`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          <div className="space-y-16">
            <section id="install" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Install"
                title="One command install with systemd auto-start"
                description="The installer detects architecture, downloads the correct binary, verifies SHA256, writes secure defaults, and enables processd-mcp.service at boot."
              />
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <CodeBlock>{`curl -fsSL ${latestInstallerUrl} | sudo bash -s -- install`}</CodeBlock>
                <Callout
                  title="What gets installed"
                  text="/usr/local/bin/processd-mcp, /etc/processd-mcp/processd-mcp.env, and /etc/systemd/system/processd-mcp.service. Defaults: MCP_HOST=127.0.0.1, MCP_PORT=8080, random PROCESSD_TOKEN."
                />
              </div>
            </section>

            <section id="verify" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Verify"
                title="Check service health and readiness"
                description="After installation, confirm systemd status and local health endpoint before connecting MCP clients."
              />
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <CodeBlock>{`sudo systemctl status processd-mcp --no-pager
sudo systemctl is-enabled processd-mcp
sudo systemctl is-active processd-mcp
curl -i http://127.0.0.1:8080/health`}</CodeBlock>
                <Callout
                  title="Expected output"
                  text="The service should be enabled+active, and /health should return HTTP 204."
                />
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <CodeBlock>{`sudo awk -F= '/^PROCESSD_TOKEN=/{print $2}' /etc/processd-mcp/processd-mcp.env`}</CodeBlock>
                <Callout
                  title="Client auth header"
                  text="Use X-Access-Token: <token> when calling /mcp or /sdk/file. /health is intentionally unauthenticated."
                />
              </div>
            </section>

            <section id="policy" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Policy (Optional)"
                title="Enable sandbox policy from processd-standalone sample"
                description="Terminal deployment can run without a policy, but you can enable kernel-level sandbox rules by wiring MCP_SANDBOX_POLICY_FILE."
              />
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <CodeBlock>{`sudo curl -fsSL ${standalonePolicyUrl} -o /etc/processd-mcp/policy.yaml
sudo chmod 644 /etc/processd-mcp/policy.yaml

echo 'MCP_SANDBOX_POLICY_FILE=/etc/processd-mcp/policy.yaml' | \
  sudo tee -a /etc/processd-mcp/processd-mcp.env

sudo systemctl restart processd-mcp`}</CodeBlock>
                <Callout
                  title="Policy source"
                  text="This uses sandbox-policy.example.yaml from processd-standalone as the baseline template."
                />
              </div>
            </section>

            <section id="ops" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Operations"
                title="Upgrade, uninstall, and troubleshoot"
                description="The same installer script supports lifecycle commands, so your runbook can stay consistent."
              />
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <CodeBlock>{`# Upgrade kernel binary and restart service
curl -fsSL ${latestInstallerUrl} | sudo bash -s -- upgrade

# Uninstall service and binary
curl -fsSL ${latestInstallerUrl} | sudo bash -s -- uninstall

# Runtime status helper
curl -fsSL ${latestInstallerUrl} | bash -s -- status`}</CodeBlock>
                <div className="space-y-4">
                  <Callout
                    title="Port already in use"
                    text="Edit MCP_PORT in /etc/processd-mcp/processd-mcp.env and restart: sudo systemctl restart processd-mcp."
                  />
                  <Callout
                    title="Inspect logs"
                    text="Use journalctl -u processd-mcp -n 200 --no-pager to inspect startup failures."
                  />
                  <Callout
                    title="systemd not found"
                    text="This guide targets Ubuntu/Debian hosts with systemd. Non-systemd distros are out of v1 scope."
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
