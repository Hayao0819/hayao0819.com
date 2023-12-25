/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            minWidth: {
                "1/2": "50%",
                "1/3": "33.3%",
            },
        },
    },
    daisyui: {
        themes: [
            {
                mono: {
                    primary: "#131313",
                    secondary: "#2b2b2b",
                    accent: "#e0002d",
                    neutral: "#333333",
                    "base-100": "#F7F7F7",
                },
            },
        ],
    },
    plugins: [
        require("daisyui"),
        require("tailwindcss-textshadow"),
        require("@tailwindcss/typography"),
        require("tailwindcss-brand-colors"),
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-all", "& *");
        },
    ],
};
