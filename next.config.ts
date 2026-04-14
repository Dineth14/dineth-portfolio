import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepo = repositoryName.endsWith(".github.io");
const derivedBasePath = process.env.NEXT_PUBLIC_BASE_PATH
  ?? (process.env.GITHUB_ACTIONS && repositoryName && !isUserPagesRepo ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: derivedBasePath,
  assetPrefix: derivedBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: derivedBasePath,
  },
};

export default nextConfig;
