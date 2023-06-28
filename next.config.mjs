import MDX from "@next/mdx";

const withMDX = MDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: "@mdx-js/react",
    },
});

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
                source: "/blog/hogehoge",
                destination: "https://old.hayao0819.com/blog",
                permanent: true,
            },
        ];
    },
};

// Always use modules, commonjs is evil!
export default withMDX(nextConfig);
