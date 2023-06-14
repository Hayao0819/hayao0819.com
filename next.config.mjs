/** @type {import('next').NextConfig} */
const nextConfig = {
    // Always prefer swc typescript compiler
    swcMinify: true,

    // Output everything to standalone files
    output: "standalone",

    // https://hayao0819.com/twitter => https://twitter.com/hayao0819
    async redirects() {
        return [
            {
                source: "/twitter",
                destination: "https://twitter.com/hayao0819",
                permanent: true,
            },
        ];
    },
};

// Always use modules, commonjs is evil!
export default nextConfig;
