import { env } from "process";

const isRunningOnGithubActions = env.GITHUB_ACTIONS === "true";
const isForGithubPages = env.GITHUB_PAGES === "true";
const repositoryName = env.GITHUB_REPOSITORY?.split("/")[1];
const shouldDeployToGithubPages = isRunningOnGithubActions && isForGithubPages && repositoryName === "hayao0819.com";

/** @type {import("next").NextConfig} */
const switchNextConfig = {
    basePath: isForGithubPages ? "/" + repositoryName : "",
    assetPrefix: isForGithubPages ? "/" + repositoryName : "",
};

/** @type {import("next").NextConfig} */
const nextConfig = {
    swcMinify: true,
    output: "export",
    trailingSlash: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    ...(shouldDeployToGithubPages ? switchNextConfig : {}),
};

if (shouldDeployToGithubPages) {
    console.log("Deploying to Github Pages");
}

export default nextConfig;
