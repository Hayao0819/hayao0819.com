/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    output: "export",
    trailingSlash: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default nextConfig;
