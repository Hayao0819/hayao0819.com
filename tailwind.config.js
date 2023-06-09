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
        prefix: "daisy-",
    },
    plugins: [
        require("daisyui"),
        require("tailwindcss-textshadow"),
        function ({ addVariant }) {
            addVariant("child", "& > *");
        },
    ],
};
