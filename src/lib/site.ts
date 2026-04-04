const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

export const isGithubPages = process.env.GITHUB_PAGES === "true";
export const basePath =
  isGithubPages && repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}`
    : "";

export function withBasePath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
