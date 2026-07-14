import { env } from "node:process";

const isRunningOnGithubActions = env.GITHUB_ACTIONS === "true";
const isForGithubPages = env.GITHUB_PAGES === "true";
const repositoryName = env.GITHUB_REPOSITORY?.split("/")[1];
const shouldDeployToGithubPages = isRunningOnGithubActions && isForGithubPages && repositoryName === "hayao0819.com";

/** @type {import("next").NextConfig} */
const switchNextConfig = {
    basePath: isForGithubPages ? `/${repositoryName}` : "",
    assetPrefix: isForGithubPages ? `/${repositoryName}` : "",
};

/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
        unoptimized: true,
    },
    ...(shouldDeployToGithubPages ? switchNextConfig : {}),
    reactCompiler: true,
    reactStrictMode: true,
    transpilePackages: ["jotai"],
    typescript: {
        // The TypeScript 7 native port does not expose the classic compiler API
        // that Next's integrated type check consumes, so run it separately via
        // `tsc --noEmit` (also enforced in CI) instead.
        ignoreBuildErrors: true,
    },
};

if (shouldDeployToGithubPages) {
    console.log("Deploying to Github Pages");
}

export default nextConfig;
