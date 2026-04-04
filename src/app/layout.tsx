import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAIMON — Give AI Local Access. Safely.",
  description:
    "DAIMON is an OS-level sandboxed MCP server that lets AI agents work on your local files with kernel-enforced security boundaries. No containers, no risk.",
  keywords: [
    "MCP",
    "AI Agent",
    "sandbox",
    "macOS",
    "security",
    "processd",
    "DAIMON",
    "local AI",
    "Landlock",
    "Model Context Protocol",
  ],
  authors: [{ name: "DAIMON Team" }],
  openGraph: {
    title: "DAIMON — Give AI Local Access. Safely.",
    description:
      "OS-level sandboxed MCP server for AI agents. Kernel-enforced file and network boundaries without heavy containers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
