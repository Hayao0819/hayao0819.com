/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
};
