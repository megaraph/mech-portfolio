import type { Metadata } from "next";
import { DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Configure the Fonts
const serifFont = DM_Serif_Display({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-editorial", // This matches your tailwind.config.ts
});

const monoFont = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono", // This matches your tailwind.config.ts
});

export const metadata: Metadata = {
    title: "Raphael Murillo | Mechanical Engineer",
    description: "Mechanical Engineering Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* 2. Apply the variables to the Body */}
            <body
                className={`${serifFont.variable} ${monoFont.variable} bg-industrial-paper text-industrial-ink antialiased overflow-x-hidden`}
            >
                {children}
            </body>
        </html>
    );
}
