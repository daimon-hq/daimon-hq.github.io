"use client";

import { withBasePath } from "@/lib/site";

export function DownloadComposeBtn() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <a
        href={withBasePath("/scripts/compose.manager.release.yaml")}
        download
        className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent px-4 py-2 text-sm font-medium text-background transition-all hover:bg-accent-light"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download compose.manager.release.yaml
      </a>
      <span className="text-sm text-muted-foreground">
        then run:
      </span>
    </div>
  );
}
