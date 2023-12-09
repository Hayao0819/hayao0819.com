/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            minWidth: {
                "1/2": "50%",
                "1/3": "33.3%",
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [
        require("daisyui"),
        require("tailwindcss-textshadow"),
        require("@tailwindcss/typography"),
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-all", "& *");
        },
    ],
};
