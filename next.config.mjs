/** @type {import('next').NextConfig} */
const nextConfig = {
    // Always prefer swc typescript compiler
    swcMinify: true,

    // Output everything to standalone files
    output: "export",

    // Configure pageExtensions to include md and mdx
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default nextConfig;
