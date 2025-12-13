import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                industrial: {
                    paper: "#F7F5F0", // CHANGED: Warmer, creamier off-white
                    ink: "#1A1A1A",
                    orange: "#FF4F00",
                    dim: "#888888",
                },
            },
            fontFamily: {
                serif: ["var(--font-editorial)", "serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
