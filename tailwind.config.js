/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            minWidth: {
                "1/2": "50%",
                "1/3": "33.3%",
            },
            colors: {
                kaybase: "#ff6f21",
                line: "#06c755",
            },
            fontFamily: {
                gothic: [
                    "Hiragino Sans",
                    "ヒラギノ角ゴシック",
                    "メイリオ",
                    "Meiryo",
                    "MS Ｐゴシック",
                    "MS PGothic",
                    "sans-serif",
                    "YuGothic",
                    "Yu Gothic",
                ],
            },
        },
    },
    daisyui: {
        logs: false,
        themes: [
            {
                mono: {
                    primary: "#131313",
                    secondary: "#2b2b2b",
                    accent: "#e0002d",
                    neutral: "#333333",
                    "base-100": "#FCFCFC",
                },
            },
        ],
    },
    plugins: [
        require("daisyui"),
        require("tailwindcss-textshadow"),
        require("@tailwindcss/typography"),
        require("tailwindcss-brand-colors"),
        require("tailwind-children"),
    ],
};
