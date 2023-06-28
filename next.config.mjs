import MDX from "@next/mdx";

const withMDX = MDX({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
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

    // https://hayao0819.com/twitter => https://twitter.com/hayao0819
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
                permanent: true
            }
        ];
    },
};

// Always use modules, commonjs is evil!
export default withMDX(nextConfig);
