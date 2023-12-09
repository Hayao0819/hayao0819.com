/** @type {import('next').NextConfig} */
const nextConfig = {
    // Always prefer swc typescript compiler
    swcMinify: true,

    // Output everything to standalone files
    output: "standalone",

    // Configure pageExtensions to include md and mdx
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

    async redirects() {
        return [
            {
                source: "/twitter",
                destination: "https://twitter.com/hayao0819",
                permanent: true,
            },
            {
                source: "/blog",
                destination: "https://old.hayao0819.com/blog",
                permanent: true,
            },
            {
                source: "/blog/:path*",
                destination: "https://old.hayao0819.com/blog/:path*",
                permanent: true,
            },
            {
                source: "/detail",
                destination: "/me",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
