import js from "@eslint/js";
import mdxPlugin from "eslint-plugin-mdx";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsEslint from "typescript-eslint";

/** @type { import("eslint").Linter.Config[] } */
const flatConfig = [
    {
        files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
            },
        },
        ignores: [
            "node_modules",
            ".next",
            "public",
            "pnpm-lock.yaml",
            "Dockerfile",
            "package.json",
            "*.md",
            "out",
            "tools/assets/template.mdx",
        ],
    },
    {
        name: "eslint/recommended",
        ...js.configs.recommended,
    },
    ...tsEslint.configs.recommended,
    ...tailwindPlugin.configs["flat/recommended"],
    prettierPlugin,
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
        name: "mdx/recommended",
        ...mdxPlugin.configs.flat,
    },
    {
        plugins: {
            "unused-imports": unusedImports,
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
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
        },
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

export default flatConfig;
