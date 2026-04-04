import Image from "next/image";
import { withBasePath } from "@/lib/site";

const releasePageUrl = "https://github.com/daimon-hq/release/releases";

/* ─── Inline SVG Icons ─── */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function WifiOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
    </svg>
  );
}

/* ─── Navigation ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3 group">
          <Image src={withBasePath("/logo.png")} alt="DAIMON" width={32} height={32} className="transition-transform group-hover:scale-110" />
          <span className="text-lg font-semibold tracking-tight">DAIMON</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#problem" className="transition-colors hover:text-foreground">Why DAIMON</a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a>
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#download" className="ml-2 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-background transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20">
            <DownloadIcon className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="grid-pattern absolute inset-0" />
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted backdrop-blur-md">
          <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          MCP-native &middot; macOS &amp; Linux
        </div>

        {/* Logo */}
        <div className="animate-fade-in-up-delay-1 mb-10">
          <Image
            src={withBasePath("/logo.png")}
            alt="DAIMON Logo"
            width={120}
            height={120}
            className="mx-auto animate-float drop-shadow-[0_0_60px_rgba(245,158,11,0.3)]"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up-delay-1 mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Give AI Local Access.{" "}
          <span className="bg-gradient-to-r from-accent via-accent-light to-amber-300 bg-clip-text text-transparent">
            Safely.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          DAIMON provides an OS-kernel-enforced sandbox so AI agents can run safely on your local machine with{" "}
          <span className="text-foreground font-medium">strong execution boundaries</span>.
          No Docker overhead. No risk of permanent damage to your data.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#download"
            id="hero-download-btn"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 active:scale-100"
          >
            <AppleIcon className="h-5 w-5" />
            Download for macOS
            <DownloadIcon className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://x.com/realBIGWONG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-lg font-medium text-muted transition-all hover:border-muted-foreground hover:text-foreground hover:bg-card"
          >
            <XIcon className="h-5 w-5" />
            Follow on X
          </a>
          <a
            href="https://github.com/nichochar/processd"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github-btn"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-lg font-medium text-muted transition-all hover:border-muted-foreground hover:text-foreground hover:bg-card"
          >
            <GithubIcon className="h-5 w-5" />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── The Problem Section ─── */
function ProblemSection() {
  return (
    <section id="problem" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-accent uppercase">The Dilemma</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            AI Agents Need Local Access.<br />
            <span className="text-muted">But at What Cost?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Today&apos;s AI coding agents are powerful — but giving them unrestricted access to your filesystem is a gamble you can&apos;t afford.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Danger card */}
          <div className="glass-card p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-danger/10 text-danger">
              <TerminalIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Raw Terminal Access</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Giving an AI agent a bare shell is like handing your house keys to a stranger. One hallucinated <code className="rounded bg-danger/10 px-1.5 py-0.5 text-danger text-xs">rm -rf /</code> and your data is gone forever.
            </p>
            <div className="flex items-center gap-2 text-sm text-danger">
              <span className="inline-block h-2 w-2 rounded-full bg-danger" />
              Extremely dangerous
            </div>
          </div>

          {/* Docker card */}
          <div className="glass-card p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">Docker Containers</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Safe, but the AI is trapped in an isolated world. It can&apos;t use your local tools, dotfiles, SSH keys, or seamlessly edit your real project files.
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
              Safe but over-isolated
            </div>
          </div>

          {/* DAIMON card */}
          <div className="glass-card border-accent/20 p-8 shadow-lg shadow-accent/5">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ShieldIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-accent">DAIMON</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Runs natively on your host with OS-kernel sandbox. AI uses your real tools and edits your real files — but <strong className="text-foreground">can only touch what you allow</strong>.
            </p>
            <div className="flex items-center gap-2 text-sm text-success">
              <span className="inline-block h-2 w-2 rounded-full bg-success" />
              Native &amp; secure
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works Section ─── */
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative border-t border-border py-32">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-accent uppercase">Under the Hood</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            OS-Kernel Sandbox.{" "}
            <span className="text-muted">Not Another Container.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            DAIMON leverages your operating system&apos;s built-in security mechanisms — the same primitives used by browsers and the OS itself — to enforce bulletproof boundaries.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Architecture explanation */}
          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono font-bold text-sm">01</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Define Your Policy</h3>
                <p className="text-sm leading-relaxed text-muted">
                  Use the DAIMON GUI or write a simple YAML to declare exactly which directories the AI can read, which it can write to, and whether network access is allowed.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono font-bold text-sm">02</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Kernel Enforces the Rules</h3>
                <p className="text-sm leading-relaxed text-muted">
                  On macOS, <code className="rounded bg-card px-1.5 py-0.5 text-xs">sandbox-exec</code> enforces it. On Linux, <code className="rounded bg-card px-1.5 py-0.5 text-xs">Landlock</code> + <code className="rounded bg-card px-1.5 py-0.5 text-xs">seccomp</code> lock it down. No userspace escape — it&apos;s enforced at the kernel level.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono font-bold text-sm">03</div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">AI Works Natively</h3>
                <p className="text-sm leading-relaxed text-muted">
                  The agent accesses your real file system, your real toolchain, and your real project — with zero Docker overhead. It just can&apos;t cross the boundary you set.
                </p>
              </div>
            </div>
          </div>

          {/* Policy YAML example */}
          <div className="code-block animate-border-glow">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-danger/60" />
              <span className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="h-3 w-3 rounded-full bg-success/60" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">sandbox-policy.yaml</span>
            </div>
            <pre className="font-mono text-sm">
              <code>{`version: 2

filesystem_policy:
  include_workdir: true

  read_only:
    - /usr
    - /bin
    - /var/log          # AI can read logs

  read_write:
    - /workspace        # AI can ONLY write here

network:
  mode: disabled        # No network. No data exfil.

linux:
  landlock:
    compatibility: hard_requirement`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─── */
function FeaturesSection() {
  const features = [
    {
      icon: <LockIcon className="h-6 w-6" />,
      title: "Granular Filesystem Control",
      description: "Declare read-only and read-write paths with surgical precision. AI agents can browse your codebase but only modify the project you're working on.",
    },
    {
      icon: <WifiOffIcon className="h-6 w-6" />,
      title: "Network Isolation",
      description: "Cut off network access entirely, allow localhost-only for local tools, or keep it open. Your call. Prevent any chance of data exfiltration.",
    },
    {
      icon: <ShieldIcon className="h-6 w-6" />,
      title: "Kernel-Level Enforcement",
      description: "Not a polite request — a hard kernel boundary. macOS sandbox-exec on Mac, Landlock + seccomp on Linux. No userspace escape possible.",
    },
    {
      icon: <LayoutIcon className="h-6 w-6" />,
      title: "Visual Policy Editor",
      description: "DAIMON's desktop GUI lets you visually configure, validate, and inspect sandbox policies. No more hand-editing YAML unless you want to.",
    },
    {
      icon: <EyeIcon className="h-6 w-6" />,
      title: "Runtime Monitoring",
      description: "Launch, stop, and monitor your MCP service from the desktop app. View logs, check health via the built-in doctor diagnostics.",
    },
    {
      icon: <TerminalIcon className="h-6 w-6" />,
      title: "MCP Native",
      description: "First-class Model Context Protocol support. Works seamlessly with Claude Desktop, Cursor, and any MCP-compatible AI agent.",
    },
  ];

  return (
    <section id="features" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-accent uppercase">Features</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Everything You Need.{" "}
            <span className="text-muted">Nothing You Don&apos;t.</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Download CTA Section ─── */
function DownloadSection() {
  return (
    <section id="download" className="relative border-t border-border py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Image
          src={withBasePath("/logo.png")}
          alt="DAIMON"
          width={80}
          height={80}
          className="mx-auto mb-8 animate-float drop-shadow-[0_0_40px_rgba(245,158,11,0.25)]"
        />
        <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          Ready to Run AI Agents{" "}
          <span className="bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
            Fearlessly
          </span>
          ?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-muted">
          Download DAIMON, define your sandbox policy, and let AI work on your local files — with peace of mind.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="download-dmg-btn"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 active:scale-100"
          >
            <AppleIcon className="h-5 w-5" />
            Choose Release Version
            <DownloadIcon className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          You'"'"'ll land on the release page and can pick the version you want to download.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          macOS 13+ (Ventura or later) &middot; Apple Silicon &amp; Intel
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Image src={withBasePath("/logo.png")} alt="DAIMON" width={24} height={24} />
          <span className="text-sm text-muted">
            &copy; {new Date().getFullYear()} DAIMON. Built with care for safe AI agent execution.
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="https://x.com/realBIGWONG" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground flex items-center gap-1.5">
            <XIcon className="h-4 w-4" />
            X (Twitter)
          </a>
          <a href="https://github.com/nichochar/processd" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground flex items-center gap-1.5">
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
