import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import mdxPlugin from "eslint-plugin-mdx";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
// import tailwindPlugin from "eslint-plugin-tailwindcss";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";
import tsEslint from "typescript-eslint";

/** @type { import("typescript-eslint").InfiniteDepthConfigWithExtends[] } */
const importPlugins = [
    {
        plugins: {
            "unused-imports": unusedImportsPlugin,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        plugins: {
            "simple-import-sort": simpleImportSortPlugin,
        },
        rules: {
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
        },
    },
];

/** @type { import("typescript-eslint").InfiniteDepthConfigWithExtends[] } */
const reactCompiler = [
    {
        plugins: {
            "react-compiler": reactCompilerPlugin,
        },
        rules: {
            "react-compiler/react-compiler": "error",
        },
    },
];

/** @type { import("typescript-eslint").InfiniteDepthConfigWithExtends[] } */
const flatConfig = [
    {
        files: ["**/*.js", "**/*.jsx", "*.ts", "*.tsx"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
            },
        },
        ignores: [
            "**/node_modules",
            "**/.next",
            "**/public",
            "**/pnpm-lock.yaml",
            "**/Dockerfile",
            "**/package.json",
            // "**/*.md",
            "**/out",
            "**/.git",
        ],
    },
    // .js に対する設定
    {
        files: ["**/*.js", "**/*.jsx"],
        extends: [js.configs.recommended],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    },
    // ...tailwindPlugin.configs["flat/recommended"],
    ...importPlugins,
    prettierPlugin,
    ...reactCompiler,
    {
        name: "react/jsx-runtime",
        plugins: {
            react: reactPlugin,
        },
        rules: reactPlugin.configs["jsx-runtime"].rules,
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        name: "next/core-web-vitals",
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
    },
    {
        name: "mdx/recommended",
        ...mdxPlugin.configs.flat,
        ignores: ["**/tools/assets/template.mdx"],
    },

    {
        name: "hayao-custom-next",
        rules: {
            "@next/next/no-img-element": "off",
            "react/react-in-jsx-scope": "off",
            "tailwindcss/no-custom-classname": "warn",
        },
    },
    {
        name: "hayao-custom-ts",
        rules: {
            "prettier/prettier": "warn",
        },
    },
];

export default tsEslint.config(flatConfig);
