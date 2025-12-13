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
                    paper: "#F5F5F7", // The Muji Background
                    ink: "#1A1A1A", // Almost Black
                    orange: "#FF4F00", // Safety Orange
                    dim: "#888888", // Technical Grey
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
