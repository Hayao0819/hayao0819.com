module.exports = {
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "all",
    semi: true,
    endOfLine: "lf",
    printWidth: 200,
    htmlWhitespaceSensitivity: "ignore",
    plugins: [require("prettier-plugin-tailwindcss"), require("prettier-plugin-md-nocjsp")],

    overrides: [
        {
            files: ["*.md", "README"],
            options: {
                parser: "markdown-nocjsp",
            },
        },
        {
            files: "*.mdx",
            options: {
                parser: "mdx-nocjsp",
            },
        },
    ],
};
